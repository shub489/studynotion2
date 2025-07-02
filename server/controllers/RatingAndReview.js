const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// 1. Create Rating

const createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    if (!courseId || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    let course = await Course.findOne({
      _id: courseId,
      studentsEnrolled: userId,
    });

    if (!course) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not enrolled in this course.",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(409).json({
        success: false,
        message: "Not allowed. You have already rated this course",
      });
    }

    let ratingReview = await RatingAndReview.create({
      user: userId,
      course: courseId,
      rating,
      review,
    });

    if (!ratingReview) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    course.ratingAndReviews.push(ratingReview._id);
    await course.save();

    return res.status(201).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      message: error.message,
    });
  }
};

// 2. getAverageRating
const getAverageRating = async (req, res) => {
  try {
    // const courseId = req.body.courseId;
    const courseId = new mongoose.Types.ObjectId(req.body.courseid); // convert to ObjectId

    const result = await RatingAndReview.aggregate([
      {
        $match: { course: courseId },
      },
      {
        $group: { _id: "$course", avgRating: { $avg: "$rating" } },
      },
    ]);

    const avgRating = result.length > 0 ? result[0].avgRating : 0;

    return res.status(200).json({
      success: true,
      message:
        avgRating > 0
          ? "Rating found"
          : "No rating is given to this course yet.",
      averageRating: avgRating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      message: error.message,
    });
  }
};

// 3. getAllRating
const getAllRatings = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      });
    return res.status(200).json({
      success: true,
      message: "All review fetched successfully",
      allReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = {
  createRating,
  getAverageRating,
  getAllRatings,
};
