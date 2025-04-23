require("dotenv").config();
const jwt = require("jsonwebtoken");

//auth
const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating token",
      error: error.message,
    });
  }
};

//isStudent
const isStudent = (req, res, next) => {
  if (req.user.role === "Student") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied - Only students are allowed",
  });
};

//isInstructor
const isInstructor = (req, res, next) => {
  if (req.user.role === "Instructor") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied - Only Instructor are allowed",
  });
};

//isAdmin
const isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Access denied - Only Admin are allowed",
  });
};

module.exports = {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
};
