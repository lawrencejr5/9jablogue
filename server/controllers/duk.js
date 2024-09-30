const Duk = require("../models/duk");

const getDuks = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const getDuk = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const createDuk = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const updateDuk = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const delDuk = async (req, res) => {
  try {
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

module.exports = { getDuks, getDuk, createDuk, updateDuk, delDuk };
