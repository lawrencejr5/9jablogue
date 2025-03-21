const bcrypt = require("bcryptjs");

const { cloudinary } = require("../middlewares/upload");

const Author = require("../models/authors");
const Post = require("../models/posts");

const getAuthors = async (req, res) => {
  try {
    const allAuthors = await Author.find();

    const authors = await Promise.all(
      allAuthors.map(async (author) => {
        const userPosts = await Post.find({ author: author.id });
        const totalPosts = userPosts.length;
        const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
        const totalViews = userPosts.reduce((sum, post) => sum + post.views, 0);
        const data = { ...author._doc, totalPosts, totalLikes, totalViews };
        return data;
      })
    );

    res.status(200).json({ msg: "success", authors });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const getAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    res.status(200).json({ msg: "success", author, admin: author.admin });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const getAuthorNumOfLikes = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const posts = await Post.find({ author: id }).select("likes");

    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);

    res.status(200).json({ msg: "success", user: id, totalLikes });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const getAuthorNumOfViews = async (req, res) => {
  try {
    const { userId: id } = req.user;
    const posts = await Post.find({ author: id }).select("views");

    const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

    res.status(200).json({ msg: "success", user: id, totalViews });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const {
      params: { id },
      body: { fullname, username, email, status, admin, socials },
    } = req;

    if (
      !req.file &&
      !fullname &&
      !username &&
      !email &&
      !status &&
      !admin &&
      !socials
    )
      return res.status(500).json({ msg: "wetin you dey update" });

    let profilePic;
    if (req.file) {
      const filePath = req.file.path;
      const fileName =
        Date.now() + "_" + req.file.originalname.replace(/[\s\(\)\.com]/g, "_");

      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
        public_id: fileName,
        folder: "9jablogue_images",
      });
      profilePic = uploadResult.url;
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { ...req.body, profilePic },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "success", updatedAuthor });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const updateProfilePic = async (req, res) => {
  try {
    const { id } = req.params;

    await Author.findByIdAndUpdate(
      id,
      { profilePic: req.file.path },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "profile pic updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const updatePassword = async (req, res) => {
  try {
    const {
      user: { userId: id },
      body: { oldPassword, newPassword, confirmPassword },
    } = req;
    if (!oldPassword || !newPassword || !confirmPassword)
      return res
        .status(500)
        .json({ msg: "please fill in all required fields" });

    const user = await Author.findById(id);

    const oldPassCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!oldPassCorrect)
      return res.status(500).json({ msg: "Old password is not correct" });

    if (newPassword !== confirmPassword)
      return res.status(500).json({ msg: "passwords do not match" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    await Author.findByIdAndUpdate(
      id,
      { password },
      { runValidators: true, new: true }
    );
    res
      .status(200)
      .json({ msg: "password updated successfully, loging out..." });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const delAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAuthor = await Author.findByIdAndDelete(id);
    res
      .status(200)
      .json({ msg: "deleted successfully", deleted: deletedAuthor._id });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const application = async (req, res) => {
  try {
    const { application } = req.body;
    const id = req.user.userId;

    if (!application)
      return res.status(500).json({ msg: "application cannot be empty" });

    await Author.findByIdAndUpdate(id, { application });
    res.status(200).json({ msg: "Application received successfully" });
  } catch (err) {
    res.status(500).json({
      msg: "an error ocurred, please go back to registration page",
      err,
    });
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  updateAuthor,
  delAuthor,
  application,
  updatePassword,
  updateProfilePic,
  getAuthorNumOfLikes,
  getAuthorNumOfViews,
};
