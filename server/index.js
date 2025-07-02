const express = require("express");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2; // Cloudinary
const multer = require("multer"); // Multer for handling file uploads
const cors = require("cors");

/* Initialize Express application */
const app = express();

/* Setup for access to .env file constants */
require("dotenv").config();

/* Cloudinary connection */
const { cloudinaryConnect } = require("./config/cloudinary.js");

/* Database connection */
const { connect } = require("./config/database.js");
connect();

/* Middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/* PORT define */
const PORT = process.env.PORT || 8000;

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

// Profile

// Routes

/* Routes Fetch */
const userRoutes = require("./routes/User.js");
const courseRoutes = require("./routes/Course.js");
const profileRoutes = require("./routes/Profile.js");
const paymentRoutes = require("./routes/Payment");
const sectionRoutes = require("./routes/Section.js");
const subSectionRoutes = require("./routes/SubSection.js");
const resetRoutes = require("./routes/ResetPassword.js");
const categoryRoutes = require("./routes/Category.js");
const ratingAndReviewRoutes = require("./routes/RatingAndReview.js");

/* Routes Mapping-Mounting */
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/section", sectionRoutes);
app.use("/api/v1/sub-section", subSectionRoutes);
app.use("/api/v1/reset", resetRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/rating-and-review", ratingAndReviewRoutes);

/* Default Routes */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running",
  });
});

/* Server Activation */
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
