const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 50 },
    tags: { type: [mongoose.Types.ObjectId], required: true },
    thumb: { type: String, required: true },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Posts", postSchema);
module.exports = postModel;
