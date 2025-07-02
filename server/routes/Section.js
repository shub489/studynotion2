const express = require("express");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const router = express.Router();

router.post("/createSection", createSection);
router.post("/updateSection", updateSection);
router.delete("/deleteSection", deleteSection);

module.exports = router;
