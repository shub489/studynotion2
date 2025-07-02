const express = require("express");
const {
  createCategory,
  categoryPageDetails,
  showAllCategories,
} = require("../controllers/Category");
const { auth, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/categoryPageDetails", categoryPageDetails);

module.exports = router;
