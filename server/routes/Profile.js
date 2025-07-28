const express = require("express");
const {
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile");
const { auth } = require("../middlewares/auth");
const { upload } = require("../utils/multer");

const router = express.Router();
router.patch("/updateProfile", auth, updateProfile);
router.get("/getAllUserDetails", auth, getAllUserDetails);
router.patch(
  "/updateDisplayPicture",
  auth,
  upload.single("thumbnail"),
  updateDisplayPicture
);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// TODO
// router.delete("/deleteProfile", auth, deleteAccount)

module.exports = router;
