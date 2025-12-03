import os
import re
import torch
import joblib
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity
from serpapi import GoogleSearch
import google.generativeai as genai
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY", "")
SERPAPI_KEY = os.getenv("SERPAPI_API_KEY", "")

if not HF_TOKEN:
    raise EnvironmentError("HF_TOKEN not found. Please set it in your environment variables.")
if not GEMINI_API_KEY:
    print("WARNING: Gemini API key not set.")
if not SERPAPI_KEY:
    print("WARNING: SerpApi key not set.")

genai.configure(api_key=GEMINI_API_KEY)
llm_model = genai.GenerativeModel("gemini-2.5-flash")

CLASSIFIER_REPO = "SidAIML/Claim_Classifier"
SEMANTIC_REPO = "SidAIML/Semantic_Model"

BASE_DIR = "SidAIML/Claim_Verification_Pipeline"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

classifier_tokenizer = AutoTokenizer.from_pretrained(CLASSIFIER_REPO, token=HF_TOKEN)
classifier_model = AutoModelForSequenceClassification.from_pretrained(CLASSIFIER_REPO, token=HF_TOKEN).to(device)

label_encoder_path = "./ml_worker/ml_models/Claim_Verification_Pipeline/label_encoder.pkl"
le = joblib.load(label_encoder_path)


embed_model = SentenceTransformer(SEMANTIC_REPO, token=HF_TOKEN)

print(f"Claim Verification Pipeline loaded on {device}.")

def retrieve_live_web_evidence(claim):
    try:
        search_params = {
            "q": claim,
            "location": "United States",
            "hl": "en",
            "gl": "us",
            "api_key": SERPAPI_KEY
        }
        search = GoogleSearch(search_params)
        results = search.get_dict()

        snippets = [r["snippet"] for r in results.get("organic_results", []) if "snippet" in r]
        return snippets
    except Exception as e:
        print(f"Error retrieving evidence for claim '{claim}': {e}")
        return []

def semantic_retrieve_rerank(claim, candidate_texts, top_k=3):
    if not candidate_texts:
        return []
    claim_emb = embed_model.encode(claim, convert_to_tensor=True)
    chunk_embs = embed_model.encode(candidate_texts, convert_to_tensor=True)
    cos_scores = util.cos_sim(claim_emb, chunk_embs)[0]
    top_results = torch.topk(cos_scores, k=min(top_k, len(candidate_texts)))
    return [candidate_texts[idx] for idx in top_results.indices]

def retrieve_evidence_for_claim(claim):
    candidates = retrieve_live_web_evidence(claim)
    return semantic_retrieve_rerank(claim, candidates, top_k=3)

# --- LLM Verification ---
def verify_claim_with_llm(claim, evidence_list):
    if not evidence_list:
        return "Unverified", "No evidence found."

    evidence_str = "\n".join([f"Evidence {i+1}: {e}" for i, e in enumerate(evidence_list)])
    prompt = f"""
    You are an expert fact-checker.
    Analyze the following claim and determine if it is True, False, or Unverified.

    Claim: "{claim}"

    Evidence:
    {evidence_str}

    Provide reasoning, then end with:
    Final Verdict: [True/False/Unverified]
    """

    try:
        response = llm_model.generate_content(prompt)
        text = response.text.strip()
        match = re.search(r"Final Verdict:\s*(True|False|Unverified)", text, re.IGNORECASE)
        verdict = match.group(1).capitalize() if match else "Unverified"
        reasoning = text.split("Final Verdict:")[0].strip() if "Final Verdict:" in text else text
        return verdict, reasoning
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return "Unverified", "Error during LLM call."

def check_claim(claim_text):
    inputs = classifier_tokenizer(claim_text, return_tensors="pt", truncation=True, padding=True).to(device)
    outputs = classifier_model(**inputs)
    pred_label = torch.argmax(outputs.logits, dim=1).item()
    claim_type = le.inverse_transform([pred_label])[0]

    docs = retrieve_evidence_for_claim(claim_text)
    if not docs:
        return {
            "claim": claim_text,
            "claim_type": claim_type,
            "verification_result": "Unverified",
            "reasoning": "No evidence found."
        }

    query_emb = embed_model.encode(claim_text).reshape(1, -1)
    doc_embs = embed_model.encode(docs)
    sims = cosine_similarity(query_emb, doc_embs)[0]
    best_doc = docs[np.argmax(sims)]
    max_sim = float(sims[np.argmax(sims)])

    verdict, reasoning = verify_claim_with_llm(claim_text, docs)

    return {
        "claim": claim_text,
        "claim_type": claim_type,
        "best_source": best_doc,
        "verification_result": verdict,
        "reasoning": reasoning,
        "similarity": max_sim
    }
