const Course = require("../models/Course.js");
const Section = require("../models/Section");

const SubSection = require("../models/SubSection.js");
const { uploadImageToCloudinary } = require("../utils/imageUploader.js");

const createSubsection = async (req, res) => {
  try {
    const { title, timeDuration, description, sectionId } = req.body;

    console.log("req.body ----> ", req.body);
    console.log("req.file : ", req.file);
    console.log("title : ", title);
    console.log("timeDuration : ", timeDuration);
    console.log("tidescriptiontle : ", description);
    console.log("sectionId : ", sectionId);

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
      timeDuration,
      videoUrl: result.secure_url,
    });

    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: subSection._id },
      },
      { new: true }
    );

    const updatedCourse = await Course.findOneAndUpdate(
      { courseContent: sectionId }, // Find courses that have the sectionId
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      subSection,
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateSubsection = async (req, res) => {
  try {
    const { subSectionId } = req.body;

    // req.body.subSectionId = undefined;

    let resultCloudinary;
    let updates = { ...req.body };
    console.log("req.file.path ", req.file?.path);
    if (req.file?.path) {
      resultCloudinary = await uploadImageToCloudinary(req.file.path);
      updates = { ...req.body, videoUrl: resultCloudinary.secure_url };
    }

    let updatedSubsection = await SubSection.findByIdAndUpdate(
      subSectionId,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    // 2. Find Section which contains this SubSection
    const section = await Section.findOne({ subSection: subSectionId });
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // 3. Find Course which contains this Section
    const course = await Course.findOne({ courseContent: section._id })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          model: "SubSection",
        },
      })
      .exec();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // 4. Send populated course data
    res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSubsection,
      data: course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteSubsection = async (req, res) => {
  try {
    const subSectionId = req.body.subSectionId;
    const sectionId = req.body.sectionId;

    const deletedSubsection = await SubSection.findByIdAndDelete(subSectionId);

    if (!deletedSubsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    const updateCourse = await Course.findOne({
      courseContent: sectionId,
    }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      course: updateCourse,
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
  updateSubsection,
  deleteSubsection,
};
