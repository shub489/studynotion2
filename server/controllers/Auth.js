const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const Profile = require("../models/Profile.js");
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

//sendOTP
const sendOTP = async (req, res) => {
  const email = req.body.email;

  // If not recieved
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "No email found",
    });
  }

  // Checking for valid email id
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error, value } = schema.validate({ email });

  if (error) {
    return res.status(200).json({
      success: false,
      message: `Invalid email - ${error.details[0].message}`,
      email,
    });
  }

  const isEmailExist = await OTP.findOne({ email });

  if (isEmailExist) {
    return res.status(409).json({
      success: false,
      message: "OTP already sent",
    });
  }

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  let result = await OTP.findOne({ otp });

  while (result) {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    result = await OTP.findOne({ otp });
  }

  const newOtp = await OTP.create({ email, otp });

  res.status(201).json({
    success: true,
    message: "OTP sent succesfully",
    otp,
  });
};

//signUp

const signUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { firstName, lastName, email, mobile, password, accountType, otp } =
      req.body;

    const userValidationSchema = Joi.object({
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().required(),
      // mobile: Joi.string()
      //   .pattern(/^[0-9]{10}$/)
      //   .required(),
      password: Joi.string().min(6).required(),
      accountType: Joi.string()
        .valid("Admin", "Student", "Instructor")
        .required(),
      otp: Joi.string().length(6).required(),
    });

    const { error } = userValidationSchema.validate(req.body);

    if (error) {
      await OTP.findOneAndDelete({ email });
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    const recentOtpList = await OTP.find({ email }).sort({ createdAt: -1 });
    console.log("recentOtpList : ", recentOtpList);

    if (!recentOtpList || !recentOtpList.length) {
      return res.status(400).json({
        success: true,
        message: "OTP not found",
      });
    }

    let recentOtp = recentOtpList[0].otp;
    if (recentOtp !== otp) {
      return res.status(400).json({
        success: true,
        message: "Invalid OTP",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create(
      [
        {
          gender: null,
          dateOfBirth: null,
          about: null,
          contactNumber: null,
        },
      ],
      { session }
    );

    const user = await User.create(
      [
        {
          firstName,
          lastName,
          email,
          mobile,
          password: hashPassword,
          accountType,
          additionalDetails: profileDetails[0]._id,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: user[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Interval server error",
      error: error.message,
    });
  }
};

//Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = userValidationSchema.validate({ email, password });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please register first",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    user.jwtToken = jwtToken;
    await user.save();
    user.password = undefined;

    return res
      .cookie("token", jwtToken, {
        httpOnly: true,
        secure: true,
        maxage: 1000 * 24 * 60 * 60,
      })
      .status(200)
      .json({
        success: true,
        message: "User login successfully",
        jwtToken,
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

//changePassword

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confimPassword } = req.body;

    const passwordSchema = Joi.object({
      oldPassword: Joi.string().min(6).required(),
      newPassword: Joi.string().min(6).required(),
      confimPassword: Joi.string().min(6).required(),
    });

    const { error } = passwordSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  sendOTP,
  signUp,
  login,
  changePassword,
};
