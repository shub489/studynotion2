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

const showAllCategory = async (req, res) => {
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

module.exports = {
  createCategory,
  showAllCategory,
};
