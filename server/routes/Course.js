const express = require("express");

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");
const {
  auth,
  isInstructor,
  isAdmin,
  isStudent,
} = require("../middlewares/auth");

const { upload } = require("../utils/multer");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  updateSubsection,
  deleteSubsection,
  createSubsection,
} = require("../controllers/Subsection");
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");
const {
  createRating,
  getAverageRating,
  getAllRatings,
} = require("../controllers/RatingAndReview");

const router = express.Router();

router.post(
  "/createCourse",
  auth,
  isInstructor,
  upload.single("thumbnail"),
  createCourse
);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post(
  "/addSubSection",
  auth,
  isInstructor,
  upload.single("video"),
  createSubsection
);
router.post(
  "/updateSubSection",
  auth,
  isInstructor,
  upload.single("video"),
  updateSubsection
);
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection);

router.get("/getAllCourses", getAllCourses);
// router.get("/getCourseDetails", getCourseDetails);
router.post("/getCourseDetails", getCourseDetails);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatings);

module.exports = router;
