const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;
const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const RatingAndReview = require("../models/RatingAndReview");
require("dotenv").config();

const createCourse = async (req, res) => {
  console.log("req.body ", req.body);
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      tag,
      instructions,
      // instructor,
      // courseContent,
      // ratingAndReviews,
      // thumbnail,
      // studentsEnrolled,
    } = req.body;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: true,
        message: "All fields are required",
      });
    }

    console.log("req.file ", req.file);

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    // check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      res.status(404),
        json({
          success: true,
          message: "Instructor details not found",
        });
    }

    //check if Category is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      res.status(404).json({
        success: true,
        message: "Category details not found",
      });
    }

    // Upload image to cloudinary - Babbar
    const result = await uploadImageToCloudinary(req.file.path);

    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: process.env.FOLDER, // Optional: Cloudinary folder where images will be stored
    //   resource_type: "auto", // Cloudinary automatically detects the file type (image, video, etc.)
    //   quality: "auto", // Automatically adjust image quality
    // });
    console.log(tag.split(","));

    const newCourse = new Course({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      instructions: instructions,
      category: categoryDetails._id,
      thumbnail: result.secure_url,
      tag: tag.split(","),
      status: "Draft",
      // courseContent,
      // ratingAndReviews,
      // studentsEnrolled,
    });

    // add new course to the userschema of Instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    // update Category schema
    // add newCourse._id to course field in course schema

    await Category.findByIdAndUpdate(
      categoryDetails._id,
      { $push: { course: newCourse._id } },
      { new: true }
    );

    await newCourse.save();

    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: 1,
        price: 1,
        thumbnail: 1,
        instructor: 1,
        ratingAndReviews: 1,
        studentsEnrolled: 1,
      }
    ).populate("instructor");

    return res.status(200).json({
      success: true,
      message: "All courses found",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get course details
const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: courseId not found",
      });
    }

    let course = await Course.findById(courseId).populate([
      {
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      },
      {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
      {
        path: "ratingAndReviews",
      },
      {
        path: "category",
      },
      {
        path: "studentsEnrolled",
      },
    ]);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details found",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseDetails,
};
