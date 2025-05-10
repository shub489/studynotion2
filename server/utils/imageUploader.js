const cloudinary = require("cloudinary").v2;

const uploadImageToCloudinary = async (path) => {
  // return await cloudinary.uploader.upload(file.tempFilePath, options);
  return await cloudinary.uploader.upload(path, {
    folder: process.env.FOLDER, // Optional: Cloudinary folder(Learnify) where images will be stored
    resource_type: "auto", // Cloudinary automatically detects the file type (image, video, etc.)
    quality: "auto", // Automatically adjust image quality
  });
};

module.exports = { uploadImageToCloudinary };
