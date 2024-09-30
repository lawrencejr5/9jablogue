const Post = require("../models/posts");

const getPosts = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const getPost = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const createPost = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const updatePost = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const delPost = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, delPost };
