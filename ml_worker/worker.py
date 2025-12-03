import json
import time
from bson import ObjectId
from ml_worker.config import redis_client, media_collection
from ml_worker.transcript_video import fetch_youtube_transcript
from ml_worker.claim_detection import detect_claims
from ml_worker.claim_verification import check_claim
# from ml_worker.evidence_retrieval import retrieve_evidence
# from ml_worker.claim_verification import verify_claims
# from ml_worker.image_analysis import analyze_image

QUEUE_NAME = "media-processing"

print("Python Worker started, listening for jobs...")

while True:
    job = redis_client.blpop(f"bull:{QUEUE_NAME}:wait", timeout=10)
    if not job:
        continue

    _, job_id_bytes = job
    job_id = job_id_bytes.decode("utf-8")  

    job_key = f"bull:{QUEUE_NAME}:{job_id}"
    job_hash = redis_client.hgetall(job_key)

    if not job_hash:
        print(f"No job data found for job ID {job_id}")
        continue

    data_field = job_hash.get(b"data")
    if not data_field:
        print(f"Job {job_id} has no 'data' field.")
        continue

    data = json.loads(data_field)
    print(f"New job received: {data}")

    media_id = data.get("mediaId")
    media_type = data.get("mediaType")
    media_url = data.get("mediaUrl")

    print(f"Processing {media_type}: {media_url}")

    try:
        transcript = ""
        claims = []

        if media_type == "youtube":
            transcript = fetch_youtube_transcript(media_url)
            if not transcript.startswith("ERROR"):
                claims = detect_claims(transcript)
                verified_claims = []
                for claim in claims:
                    claim_text = claim["text"]
                    result = check_claim(claim_text)
                    verified_claims.append({
                        "text": claim_text,
                        "checkworthy": claim["checkworthy"],
                        "claim_type": result["claim_type"],
                        "verification_result": result["verification_result"],
                        "reasoning": result["reasoning"]
                        })
                print(verified_claims)
        
        elif media_type == "image":
            print("Analyzing image...")
            # transcript = analyze_image(media_url)

        else:
            raise ValueError(f"Unknown mediaType: {media_type}")

        media_collection.update_one(
            {"_id": ObjectId(media_id)},
            {"$set": {
                "status": "completed",
                "transcript": transcript,
                "claims": verified_claims
            }}
        )

        print(f"Job {job_id} completed for {media_type}: {media_url}")

        redis_client.lpush(f"bull:{QUEUE_NAME}:completed", job_id)

    except Exception as e:
        print(f"Error processing {media_url}: {e}")
        media_collection.update_one(
            {"_id": ObjectId(media_id)},
            {"$set": {"status": "failed", "error": str(e)}}
        )
    time.sleep(1)