const Category = require("../models/categories");
const { cloudinary } = require("../middlewares/upload");

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
    const { category, description } = req.body;
    if (!category || !description)
      return res.status(500).json({ msg: "fill in required fields oga!" });

    const filePath = req.file.path;
    const fileName =
      Date.now() + "_" + req.file.originalname.replace(/[\s\(\)\.com]/g, "_");

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      public_id: fileName,
      folder: "9jablogue_images",
    });
    const img = uploadResult.url;

    const categoryCreated = await Category.create({
      ...req.body,
      img,
    });

    res.status(200).json({ msg: "created successfully", categoryCreated });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { category, description } = req.body;
    const { id } = req.params;

    // Validate input fields
    if (!category && !description && !req.file) {
      return res.status(400).json({ msg: "Nothing to update!" });
    }

    let img;

    // Handle image upload if file is provided
    if (req.file) {
      const fileName =
        Date.now() + "_" + req.file.originalname.replace(/[\s\(\)\.com]/g, "_");
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        public_id: fileName,
        folder: "9jablogue_images",
      });
      img = uploadResult.url;
    }

    // Build update object
    const updateData = { ...req.body };
    if (img) {
      updateData.img = img;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found!" });
    }

    res.status(200).json({ msg: "Success", updatedCategory });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({ msg: "An error occurred", err });
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
