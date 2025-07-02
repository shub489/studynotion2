const express = require("express");
const {
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
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

module.exports = router;
