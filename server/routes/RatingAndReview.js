const express = require("express");
const {
  createRating,
  getAllRatings,
  getAverageRating,
} = require("../controllers/RatingAndReview");

const router = express.Router();

router.post("/createRating", createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRatings", getAllRatings);

module.exports = router;
