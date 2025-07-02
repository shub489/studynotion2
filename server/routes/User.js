const express = require("express");
const { sendOTP, signUp, login } = require("../controllers/Auth");
const router = express.Router();

router.post("/sendotp", sendOTP);
router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
