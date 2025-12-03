from huggingface_hub import HfApi
import os
from dotenv import load_dotenv
load_dotenv()

HF_USERNAME = "SidAIML"

# Optional: you can skip this if you already did huggingface-cli login
HF_TOKEN = os.getenv("HF_TOKEN")  # or paste it directly if testing: "hf_xxxxx"

api = HfApi()

# === Upload Claim Detection Model ===
# print("🚀 Uploading Claim Detection Model...")
# api.upload_folder(
#     folder_path="./ml_worker/ml_models/Claim_detection_Model",
#     repo_id=f"{HF_USERNAME}/Claim_detection_Model",
#     repo_type="model",
#     token=HF_TOKEN,
# )
# print("✅ Claim Detection Model uploaded successfully!\n")

# === 1️⃣ Upload Claim Classifier ===
print("🚀 Uploading Claim Classifier model...")
api.upload_folder(
    folder_path="./ml_worker/ml_models/Claim_Verification_Pipeline/Claim_Classifier",
    repo_id=f"{HF_USERNAME}/Claim_Classifier",
    repo_type="model",
    token=HF_TOKEN,
)
print("✅ Claim Classifier uploaded successfully!\n")

# === 2️⃣ Upload Semantic Model ===
print("🚀 Uploading Semantic Model...")
api.upload_folder(
    folder_path="./ml_worker/ml_models/Claim_Verification_Pipeline/Semantic_Model",
    repo_id=f"{HF_USERNAME}/Semantic_Model",
    repo_type="model",
    token=HF_TOKEN,
)
print("✅ Semantic Model uploaded successfully!\n")

print("🎉 All verification models uploaded to Hugging Face Hub (private).")