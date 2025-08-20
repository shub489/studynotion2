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

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: section._id },
      },
      { new: true }
    ).populate({
      path: "courseContent", // populate courseContent (Sections)
      populate: {
        path: "subSection", // populate subSection inside Section
        model: "SubSection",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      section,
      updatedCourse,
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
    const { sectionName, sectionId, courseId } = req.body;

    console.log("Request.body for updateSection", updateSection);

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

    const updatedCourse = await Course.findOne({
      courseContent: sectionId,
    }).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Section updated successfully",
      section,
      updatedCourse,
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

    const updatedCourse = await Course.findOneAndUpdate(
      { courseContent: sectionId }, // Find courses that have the sectionId
      { $pull: { courseContent: sectionId } },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
        model: "SubSection",
      },
    });

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "No course found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      updatedCourse,
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
