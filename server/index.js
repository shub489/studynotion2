const express = require("express");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2; // Cloudinary
const multer = require("multer"); // Multer for handling file uploads
const { cloudinaryConnect } = require("./config/cloudinary.js");
const { connect } = require("./config/database.js");
const { sendOTP, signUp, login } = require("./controllers/Auth.js");
const {
  resetPasswordToken,
  resetPassword,
} = require("./controllers/ResetPassword.js");
const { isAdmin, auth, isInstructor } = require("./middlewares/auth.js");
const {
  createCategory,
  showAllCategory,
} = require("./controllers/Category.js");
const { createCourse, getAllCourses } = require("./controllers/Course.js");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8000;
connect();

// Multer SETUP
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where the uploaded file will be stored temporarily
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // The original name of the uploaded file
  },
});

const upload = multer({ storage: storage });

// 4. API endpoint to upload image to Cloudinary
// app.post("/addCourse", upload.single("thumbnail"), async (req, res) => {
//   try {
//     // Check if file is uploaded
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: false, message: "No file uploaded." });
//     }
//     console.log(req.file);
//     // Upload the image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "Learnify", // Optional: Cloudinary folder where images will be stored
//       resource_type: "auto", // Cloudinary automatically detects the file type (image, video, etc.)
//       quality: "auto", // Automatically adjust image quality
//     });
//     console.log("result : ",result);

//     // Delete the image from the temporary storage after uploading to Cloudinary
//     // fs.unlinkSync(req.file.path); // Uncomment if you want to delete file from local storage

//     // Send the URL of the uploaded image
//     res.status(200).json({
//       success: true,
//       message: "Image uploaded successfully!",
//       imageUrl: result.secure_url, // URL of the uploaded image
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Route working");
});
app.post("/sendotp", sendOTP);
app.post("/signup", signUp);
app.post("/login", login);
app.post("/resetpasswordtoken", resetPasswordToken);
app.post("/resetpassword", resetPassword);
app.post("/createCategory", auth, isAdmin, createCategory);
app.get("/showallCategory", showAllCategory);
app.post(
  "/createCourse",
  auth,
  isInstructor,
  upload.single("thumbnail"),
  createCourse
);
app.get("/allCourses", getAllCourses);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
