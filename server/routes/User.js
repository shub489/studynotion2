const express = require("express");
const {
  sendOTP,
  signUp,
  login,
  changePassword,
} = require("../controllers/Auth");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/sendotp", sendOTP);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/reset-password-token", resetPasswordToken);
router.patch("/reset-password", resetPassword);

// TODO: Route for Changing the password
router.post("/changepassword", auth, changePassword);

module.exports = router;
