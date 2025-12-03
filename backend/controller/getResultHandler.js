const Media = require("../model/Upload");

async function getResultHandler(req, res) {
  try {
    const { mediaId } = req.params;
    if (!mediaId) return res.status(400).send("Media ID is required.");

    const media = await Media.findById(mediaId);
    if (!media) return res.status(404).send("No media found for this ID.");

    res.status(200).send({ success: true, data: media });
  } catch (err) {
    console.error("Error fetching result:", err);
    res.status(500).send("Server error while fetching result.");
  }
};

module.exports.getResultHandler = getResultHandler;
