const Post = require("../models/posts");

const { cloudinary } = require("../middlewares/upload");

const getPosts = async (req, res) => {
  try {
    const { user, category, featured, status } = req.query;

    let queryObj = {};

    if (user) queryObj.author = user;
    if (category) queryObj.categories = category;
    if (featured) queryObj.featured = featured;
    if (status) queryObj.status = status;

    const posts = await Post.find(queryObj)
      .populate("categories", "category")
      .populate("author", "username profilePic")
      .sort("-createdAt");
    res.status(200).json({ msg: "success", rowCount: posts.length, posts });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;

    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
      ],
    })
      .populate("categories", "category")
      .populate("author", "username profilePic")
      .sort("-createdAt");

    res.status(200).json({ msg: "success", rowCount: posts.length, posts });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const getFeaturedPost = async (req, res) => {
  try {
    const post = await Post.findOne({ featured: true })
      .populate("categories", "category")
      .populate("author", "username profilePic");
    res.status(200).json({ msg: "success", post });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate(
      "author",
      "username profilePic"
    );

    res.status(200).json({ msg: "success", post });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, desc, categories, body } = req.body;
    const { userId } = req.user;
    if (!title || !desc || !categories || !body)
      return res.status(400).json({ msg: "Fill in required fields" });

    const fileName = req.file.originalname.replace(/[\s\(\)\.com]/g, "_");
    const filePath = req.file.path;

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "9jablogue_images",
      resource_type: "image",
      public_id: fileName,
    });
    const thumb = uploadResult.url;

    const post = await Post.create({
      ...req.body,
      author: userId,
      thumb,
      contentHTML: body,
    });

    res.status(200).json({ msg: "success", post });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const updatePost = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, desc, categories, body, status },
    } = req;

    if (!title && !desc && !categories && !body && !status && !req.file)
      return res.status(400).json({ msg: "Nothing to update" });

    let thumb;
    if (req.file) {
      const fileName = req.file.originalname.replace(/[\s\(\)\.com]/g, "_");
      const filePath = req.file.path;

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "9jablogue_images",
        resource_type: "image",
        public_id: fileName,
      });
      thumb = uploadResult.url;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body, thumb, contentHTML: body },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "success", updatedPost });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const viewPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { views: (post.views += 1) },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "success", updatedPost });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: (post.likes += 1) },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "liked!", updatedPost });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const featurePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.updateMany({ featured: false });
    const featuredPost = await Post.findByIdAndUpdate(
      id,
      { featured: true },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "featured", featuredPost });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const delPost = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Post.findByIdAndDelete(id);
    res.status(200).json({ msg: "success", deleted: deleted._id });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

module.exports = {
  getPosts,
  searchPosts,
  getPost,
  createPost,
  updatePost,
  featurePost,
  getFeaturedPost,
  viewPost,
  likePost,
  delPost,
};
