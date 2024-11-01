const Author = require("../models/authors");

const getAuthors = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const getAuthor = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const updateAuthor = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const delAuthor = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
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
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  updateAuthor,
  delAuthor,
  application,
};
