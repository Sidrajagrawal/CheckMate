import axios from "axios";

const BASE_API = "http://localhost:8080/api/upload"; 

export const uploadData = async (activeMode, uploadedData, selectedImage, userId) => {
  try {
    console.log(activeMode, uploadedData,selectedImage,userId);
    
    let res;
    if (activeMode === "youtube") {
      res = await axios.post(
        `${BASE_API}/new`,
        {
          youtubeUrl: uploadedData,
          userId,
          mediaType: "youtube",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    else if (activeMode === "image" && selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage.file);
      formData.append("userId", userId);
      formData.append("mediaType", "image");

      res = await axios.post(`${BASE_API}/new`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    throw err;
  }
};
