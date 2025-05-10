const Profile = require("../models/Profile");
const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth, about, contactNumber } = req.body;

    const id = req.user.id;

    const user = await User.findById(id);

    const profileId = user.additionalDetails;

    // const profile = await Profile.findByIdAndUpdate(profileId, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const profile = await Profile.findById(profileId);

    profile.gender = gender;

    await profile.save();

    return res.status(200).json({
      success: true,
      profile,
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

// TODO: Delete user

module.exports = {
  updateProfile,
  getAllUserDetails,
};
