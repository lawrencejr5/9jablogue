const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "default.png",
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
    status: {
      type: Number,
      default: 0,
    },
    socials: {
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      threads: { type: String, default: "" },
    },
    application: {
      type: String,
    },
  },
  { timestamps: true }
);

const authorModel = mongoose.model("Authors", authorSchema);
module.exports = authorModel;
