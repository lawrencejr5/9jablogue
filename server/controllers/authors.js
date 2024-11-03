const bcrypt = require("bcryptjs");

const Author = require("../models/authors");

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ msg: "success", authors });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

const getAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    res.status(200).json({ msg: "success", author });
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

    if (!fullname && !username && !email && !status && !admin && !socials)
      return res.status(500).json({ msg: "wetin you dey update" });

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { ...req.body },
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
      body: { oldPassword, newPassword, cPassword },
    } = req;
    if (!oldPassword || !newPassword || !cPassword)
      return res
        .status(500)
        .json({ msg: "please fill in all required fields" });

    const user = await Author.findById(id);

    const oldPassCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!oldPassCorrect)
      return res.status(500).json({ msg: "Old password is not correct" });

    if (newPassword !== cPassword)
      return res.status(500).json({ msg: "passwords do not match" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);

    await Author.findByIdAndUpdate(
      id,
      { password },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "password updated successfully" });
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
};
