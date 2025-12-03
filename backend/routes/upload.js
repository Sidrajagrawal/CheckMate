const express = require("express");
const route = express.Router();
const multer = require("multer"); // ✅ Import multer
const { uploadDataHandler } = require("../controller/uploadDataHandler");

const upload = multer({ dest: "uploads/" }); 

route.post("/new", upload.single("image"), uploadDataHandler);

module.exports = route;
