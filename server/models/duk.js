const mongoose = require("mongoose");

const dukSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true }
);

const dukModel = mongoose.model("Duk", dukSchema);
module.exports = dukModel;
