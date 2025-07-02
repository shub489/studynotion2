const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
// Course enrollment email import

const capturePayment = async (req, res) => {
  const { course_id } = req.body;
  const user_id = req.user.id;

  if (!course_id) {
    return res.status(404).json({
      success: false,
      message: "Invalid course id",
    });
  }

  try {
    let course = await Course.findById(course_id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Invalid course id",
      });
    }

    const uid = new mongoose.Types.ObjectId(user_id);

    if (course.studentsEnrolled.includes(uid)) {
      return res.status(409).json({
        success: false,
        message: "Student already enrolled",
      });
    }

    try {
      // Initiate the payment
      const paymentResponse = await instance.orders.create({
        amount: course.price * 100,
        currency: "INR",
        notes: {
          courseId: course_id,
          userID: user_id,
        },
      });
      console.log({ paymentResponse });

      return res.status(500).json({
        success: true,
        message: "Order created succesfully",
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbail: course.thumbail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Verify of signature razorpay  and server
const verifySignatue = async (req, res) => {
  // Apna wala - server par hoga -> Love
  // your secret set in Razorpay dashboard -> Chatgpt
  const webhookSecret = "123456789";

  //   razorpay wala signature
  const signature = req.headers["x-razorpay-signature"];

  //   webhookSecket to signature -> love
  //   ✅ Create expected signature by hashing the request body -> chatgpt

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(shasum));
  const digest = shasum.digest("hex");

  //

  if (signature === digest) {
    console.log("Payment is Authorised");
    const { userId, courseId } = req.body.payload.payment.entity;

    const enrolledCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { studentsEnrolled: userId },
      },
      { new: true }
    );

    if (!enrolledCourse) {
      return res.status(500).json({
        success: false,
        message: "Course not found",
        error: error.message,
      });
    }

    console.log(enrolledCourse);

    const enrolledStudent = await User.findByIdAndUpdate(
      userId,
      {
        $push: { courses: courseId },
      },
      { new: true }
    );

    if (!enrolledStudent) {
      return res.status(500).json({
        success: false,
        message: "User not found",
        error: error.message,
      });
    }

    console.log(enrolledStudent);

    // Send confirmation email
    const emailResponse = await mailSender(
      enrolledStudent.email,
      "Congratulations, You enrolled in new course",
      "Great, You enrolled in a new course"
    );
    console.log(emailResponse);

    return res.status(200).json({
      success: true,
      message: "Signature verified",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }

  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { capturePayment, verifySignatue };
