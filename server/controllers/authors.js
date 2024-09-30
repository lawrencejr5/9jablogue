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

module.exports = { getAuthors, getAuthor, updateAuthor, delAuthor };
