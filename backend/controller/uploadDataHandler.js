// controllers/UploadHandler.js
const { Queue } = require("bullmq");
const Redis = require("ioredis");
const Media = require("../model/Upload");
const cloudinary = require("../utils/Cloudinary");

const redis = new Redis();
const mediaQueue = new Queue("media-processing", { connection: redis });

async function uploadDataHandler(req, res) {
  try {
    const { youtubeUrl, userId, mediaType } = req.body;
    let mediaUrl = "";

    if (!userId || !mediaType) {
      return res.status(400).send("userId and mediaType are required");
    }

    if (mediaType === "youtube") {
      if (!youtubeUrl) {
        return res.status(400).send("youtubeUrl is required for youtube type");
      }
      mediaUrl = youtubeUrl;
    }

    if (mediaType === "image") {
      if (!req.file) {
        return res.status(400).send("image file is required for image type");
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "checkmate_media",
      });
      mediaUrl = result.secure_url;
    }

    const newMedia = await Media.create({
      userId,
      mediaType,
      youtubeUrl: mediaType === "youtube" ? youtubeUrl : "",
      imageUrl: mediaType === "image" ? mediaUrl : "",
      status: "pending",
    });

    await mediaQueue.add("process-media", {
      mediaId: newMedia._id.toString(),
      userId,
      mediaType,
      mediaUrl
    });

    res.status(201).send({
      message: "Media added to processing queue",
      mediaId: newMedia._id,
      mediaType: newMedia.mediaType,
      status: newMedia.status,
      mediaUrl,
    });
  } catch (error) {
    console.error("Error in uploadDataHandler:", error);
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports.uploadDataHandler = uploadDataHandler;
