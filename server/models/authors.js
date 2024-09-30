const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "password cannot be less than 6 characters"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const authorModel = mongoose.model("Authors", authorSchema);
module.exports = authorModel;
