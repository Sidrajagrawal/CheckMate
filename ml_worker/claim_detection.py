import torch
from transformers import DebertaV2Tokenizer, DebertaV2ForSequenceClassification
from ml_worker.utils.text_splitter import split_into_sentences
import os
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model_path = "SidAIML/Claim_detection_Model"

tokenizer = DebertaV2Tokenizer.from_pretrained(model_path, token=HF_TOKEN)
model = DebertaV2ForSequenceClassification.from_pretrained(model_path, token=HF_TOKEN)
model.to(device)


label_map = {0: "Not Checkworthy", 1: "Checkworthy"}

def predict_text(text):
    inputs = tokenizer(
        text,
        return_tensors="pt",
        padding=True,
        truncation=True,
        max_length=512
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    model.eval()
    with torch.no_grad():
        logits = model(**inputs).logits

    pred_class = torch.argmax(logits, dim=1).item()
    return label_map[pred_class]


def detect_claims(transcript: str):
    sentences = split_into_sentences(transcript)
    results = []

    for sentence in sentences:
        prediction = predict_text(sentence)
        results.append({
            "text": sentence,
            "checkworthy": (prediction == "Checkworthy")
        })

    checkworthy_claims = [c for c in results if c["checkworthy"]]

    return checkworthy_claims
