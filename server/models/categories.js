const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Categories", categorySchema);
module.exports = categoryModel;
