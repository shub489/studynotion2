const express = require("express");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const router = express.Router();

router.post("/resetpasswordtoken", resetPasswordToken);
router.patch("/resetpassword", resetPassword);

module.exports = router;
