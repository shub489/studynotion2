const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // gender: {
  //   type: String,
  //   enum: ["male", "female", "other"],
  //   default: null,
  // },
  gender: {
    type: String,
    default: null,
    validate: {
      validator: function (value) {
        return value === null || ["male", "female", "other"].includes(value);
      },
      message: (props) => `${props.value} is not a valid gender`,
    },
  },

  dateOfBirth: {
    type: String,
  },
  about: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
