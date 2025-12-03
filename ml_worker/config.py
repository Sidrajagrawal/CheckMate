from pymongo import MongoClient
import redis
from dotenv import load_dotenv
import os
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = int(os.getenv("REDIS_PORT"))

mongo_client = MongoClient(MONGO_URI)
db = mongo_client["checkmate"]
media_collection = db["media"]

redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)