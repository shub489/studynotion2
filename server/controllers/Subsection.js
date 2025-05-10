const Section = require("../models/Section");

const SubSection = require("../models/SubSection.js");
const { uploadImageToCloudinary } = require("../utils/imageUploader.js");

const createSubsection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;

    // TODO: Handle timeDuration
    if (!title || !description || !req.file || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await uploadImageToCloudinary(req.file.path);

    const subSection = await SubSection.create({
      title,
      description,
      videoUrl: result.secure_url,
    });

    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: subSection._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      subSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createSubsection,
};
