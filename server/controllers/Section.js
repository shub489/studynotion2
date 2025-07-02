const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

const createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    // validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const section = await Section.create({
      sectionName,
    });

    if (!section) {
      return res.status(500).json({
        success: false,
        message: "Unable to create Section",
      });
    }

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: section._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      section,
      updatedCourseDetails,
    });

    // End
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server erorr",
    });
  }
};

const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    // validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "No section found",
      });
    }

    section.sectionName = sectionName;
    await section.save();

    return res.status(201).json({
      success: true,
      message: "Section updated successfully",
      section,
    });

    // End
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server erorr",
    });
  }
};

const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const section = await Section.findById(sectionId);

    const subSectionsToBeDeletedArr = section.subSection;

    if (subSectionsToBeDeletedArr.length) {
      // Deleting subsection
      const deletedSubsection = await SubSection.deleteMany({
        _id: { $in: subSectionsToBeDeletedArr },
      });
    }

    const deletedSection = await Section.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "No section found",
      });
    }

    const course = await Course.updateMany(
      { courseContent: sectionId }, // Find courses that have the sectionId
      { $pull: { courseContent: sectionId } },
      { new: true } // Remove it
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "No course found",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createSection,
  updateSection,
  deleteSection,
};
