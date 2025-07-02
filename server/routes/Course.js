const express = require("express");

const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controllers/Course");
const { auth, isInstructor } = require("../middlewares/auth");

const { upload } = require("../utils/multer");

const router = express.Router();

router.post(
  "/createCourse",
  auth,
  isInstructor,
  upload.single("thumbnail"),
  createCourse
);
router.get("/allCourses", getAllCourses);
router.get("/getCourseDetails", getCourseDetails);

module.exports = router;
