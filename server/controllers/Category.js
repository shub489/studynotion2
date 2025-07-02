const Joi = require("joi");
const Category = require("../models/Category");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const categoryValidationSchema = Joi.object({
      name: Joi.string().min(3).required(),
      description: Joi.string().required(),
    });

    const { error } = categoryValidationSchema.validate({ name, description });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const categoryExist = await Category.findOne({ name });

    if (categoryExist) {
      return res.status(409).json({
        success: false,
        message: `${name} Category already exist`,
      });
    }

    const category = await Category.create({
      name,
      description,
      course: [],
    });

    return res.status(200).json({
      success: true,
      message: "Category created succesfully",
      category,
    });
  } catch (error) {
    console.log("Error:: ", error);
    return res.status(500).json({
      success: false,
      messgae: "Internal server error",
      error: error.messgae,
    });
  }
};

const showAllCategories = async (req, res) => {
  try {
    const category = await Category.find({}, { name: 1, description: 1 });
    console.log("Category: ", category);
    if (!category || !category.length) {
      return res.status(404).json({
        success: false,
        messgae: "No category found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All category found",
      category,
    });
  } catch (error) {
    console.log("Error:: ", error);
    return res.status(500).json({
      success: false,
      messgae: "Internal server error",
      error: error.messgae,
    });
  }
};

const categoryPageDetails = async (req, res) => {
  try {
    // Get categoryId
    const categoryId = req.body.categoryId;

    // Get course for specified categoryId
    const selectedCategory = await Category.findById(categoryId).populate(
      "course"
    );

    // Get course for specified categoryId - method 2
    // db.categories.aggregate([
    //   { $match: { _id: ObjectId("68626007f6550630226c4bda") } },
    //   {
    //     $lookup: {
    //       from: "courses",
    //       localField: "courses",
    //       foreignField: "_id",
    //       as: "courseDetails",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       courseDetails: {
    //         $map: {
    //           input: "$courseDetails",
    //           as: "course",
    //           in: {
    //             _id: "$$course._id",
    //             name: "$$course.name",
    //             studentsEnrolled: "$$course.studentsEnrolled",
    //             category: "$$course.category",
    //             totalStudents: { $size: "$$course.studentsEnrolled" },
    //           },
    //         },
    //       },
    //     },
    //   },
    // ]);

    // validation

    // get courses for different categories

    // Different Categories
    const differentCategories = await Category.find({
      _id: { $ne: categoryId },
    }).populate("course");

    // Get top selling courses
    const topSellingCourses = await Category.aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courses",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      {
        $unwind: "$courseDetails",
      },
      {
        $addFields: {
          totalStudents: { $size: "$courseDetails.studentsEnrolled" },
        },
      },
      {
        $sort: { totalStudents: -1 },
      },
    ]);

    // return response
    return res.status(500).json({
      success: true,
      messgae:
        "selectedCategory, differentCategories, topSellingCourses fetched successfully",
      selectedCategory,
      differentCategories,
      topSellingCourses,
    });
  } catch (error) {
    console.log("Error:: ", error);
    return res.status(500).json({
      success: false,
      messgae: "Internal server error",
      error: error.messgae,
    });
  }
};

module.exports = {
  createCategory,
  showAllCategories,
  categoryPageDetails,
};
