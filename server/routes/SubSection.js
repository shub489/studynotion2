const express = require("express");
const { upload } = require("../utils/multer");
const {
  createSubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/Subsection");
const router = express.Router();

router.post("/createSubsection", upload.single("videoFile"), createSubsection);
router.patch("/updateSubsection", upload.single("videoFile"), updateSubsection);
router.delete("/deleteSubsection", deleteSubsection);

module.exports = router;
