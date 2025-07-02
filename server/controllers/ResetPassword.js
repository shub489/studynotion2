const Joi = require("joi");
const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const path = require("path");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

//resetPasswordToken

const resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    const userValidationSchema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error } = userValidationSchema.validate({ email });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    // Generate password reset token and url
    const token = crypto.randomUUID();

    const url = `http://localhost:3000/update-password/${token}`;

    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
      { new: true }
    );

    //  Code - To get email template and send as an body to mail sender

    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "resetPasswordTemplate.html"
    );
    let template = await readFile(templatePath, "utf-8");

    // Replace placeholder with actual reset link
    const emailBody = template.replace("{{RESET_URL}}", url);

    await mailSender(
      email,
      "ShubLearnify: Reset Your Password – Action Required",
      emailBody,
      "ShubLearnify"
    );

    return res.status(200).json({
      success: true,
      message: "token & url generated for password reset",
      url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//resetPassword

const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message:
          "Bad request - password, confirmPassword, token all are required ",
      });
    }

    const passwordValidationSchema = Joi.object({
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string().min(6).required(),
    });

    const { error } = passwordValidationSchema.validate({
      password,
      confirmPassword,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({
      token: token,
      resetPasswordExpires: { $gt: new Date() }, // current time check
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirmPassword not matched",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.token = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  resetPasswordToken,
  resetPassword,
};
