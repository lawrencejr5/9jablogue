const Category = require("../models/categories");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ msg: "success", categories });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    res.status(200).json({ msg: "success", category });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const createCategory = async (req, res) => {
  try {
    const { img, category, description } = req.body;
    if (!img || !category || !description)
      return res.status(500).json({ msg: "fill in required fields oga!" });

    const categoryCreated = await Category.create({ ...req.body });

    res.status(200).json({ msg: "created successfully", categoryCreated });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const updateCategory = async (req, res) => {
  try {
    const {
      body: { img, category, description },
      params: { id },
    } = req;
    if (!img && !category && !description)
      return res.status(500).json({ msg: "wetin you come dey update" });

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "success", updatedCategory });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const delCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    res.status(200).json({ msg: "success", deleted: deletedCategory._id });
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
