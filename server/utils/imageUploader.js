const cloudinary = require("cloudinary").v2;

// const uploadImageToCloudinary = async (path) => {
//   // return await cloudinary.uploader.upload(file.tempFilePath, options);
//   return await cloudinary.uploader.upload(path, {
//     folder: process.env.FOLDER, // Optional: Cloudinary folder(Learnify) where images will be stored
//     resource_type: "auto", // Cloudinary automatically detects the file type (image, video, etc.)
//     quality: "auto", // Automatically adjust image quality
//   });
// };

const path = require("path");

const uploadImageToCloudinary = async (filePath) => {
  // extract extension
  const ext = path.extname(filePath).toLowerCase();
  let type = "auto";

  if ([".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(ext)) {
    type = "video";
  } else if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
    type = "image";
  }

  const options = {
    folder: process.env.FOLDER,
    quality: "auto",
    resource_type: type,
  };

  if (type === "video") {
    options.resource_type = "video"; // 🔑 force karo video type
    options.eager = [
      { format: "mp4", transformation: [{ width: 720, crop: "scale" }] },
    ];
    options.eager_async = true;
  }

  console.log("UPLOAD OPTIONS >>>", options); // 👀 debug
  return await cloudinary.uploader.upload(filePath, options);
};

module.exports = { uploadImageToCloudinary };
