const Post = require("../models/posts");

const getPosts = async (req, res) => {
  try {
    const { user } = req.query;
    if (user) {
      const userPosts = await Post.find({ author: user })
        .populate("categories", "category")
        .populate("author", "username");
      return res.status(200).json({ msg: "success", userPosts });
    }

    const posts = await Post.find()
      .populate("categories", "category")
      .populate("author", "username");
    res.status(200).json({ msg: "success", posts });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

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
    const thumb = req.file.path.split(`\\`)[1];
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

    if (!title && !desc && !categories && !body && !status)
      return res.status(400).json({ msg: "Nothing to update" });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body, contentHTML: body },
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
    res.status(200).json({ msg: "success", updatedPost });
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
  getPost,
  createPost,
  updatePost,
  featurePost,
  viewPost,
  likePost,
  delPost,
};
