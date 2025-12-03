const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  text: String,
  checkworthy: Boolean,
  evidence: [String],
  verification: String,
});

const mediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["youtube", "image"],
      required: true,
    },
    youtubeUrl: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    transcript: {
      type: String,
      default: "",
    },
    claims: {
      type: [claimSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    error: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);