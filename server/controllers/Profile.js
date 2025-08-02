const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

/* Mainly - DATE OF BIRTH, MOBILE NO, GENDER, ABOUT */
const updateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth, about, contactNumber } = req.body;

    const id = req.user.id;

    const user = await User.findById(id);

    const profileId = user.additionalDetails;

    const profile = await Profile.findByIdAndUpdate(profileId, req.body, {
      new: true,
      runValidators: true,
    });

    user.additionalDetails = profile;

    // const profile = await Profile.findById(profileId);

    // profile.gender = gender;

    // await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated succesfully",
      profile,
      user,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* Mainly - FIRST NAME AND LAST NAME*/
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    console.log("FIRSTname -", firstName);
    console.log("LASTname -", lastName);

    const id = req.user.id;

    const user = await User.findById(id).populate("additionalDetails");

    if (firstName) {
      user.firstName = firstName[0].toUpperCase() + firstName.slice(1);
    }

    if (lastName) {
      user.lastName = lastName[0].toUpperCase() + lastName.slice(1);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated succesfully",
      user,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).populate(
      "additionalDetails",
      "gender about dateOfBirth contactNumber"
    );

    //     const user = await User.findById(id).populate({
    //   path: "additionalDetails",
    //   select: "name about",
    // });
    return res.status(200).json({
      success: true,
      message: "User details found",
      data: user,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateDisplayPicture = async (req, res) => {
  try {
    console.log(req.file);
    const result = await uploadImageToCloudinary(req.file.path);
    console.log(result);
    const id = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { image: result.secure_url },
      },
      { new: true }
    ).populate("additionalDetails");

    return res.status(200).json({
      success: true,
      message: "Display picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// TODO: Delete user

module.exports = {
  updateProfile,
  updateUser,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
};
