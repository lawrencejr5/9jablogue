const Category = require("../models/categories");

const getCategories = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const getCategory = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const createCategory = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const updateCategory = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const delCategory = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  delCategory,
};
