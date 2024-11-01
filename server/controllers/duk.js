const Duk = require("../models/duk");

const getDuks = async (req, res) => {
  try {
    const duks = await Duk.find();
    res.status(200).json({ msg: "success", duks });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const getDuk = async (req, res) => {
  try {
    const { id } = req.params;

    const duk = await Duk.findById(id);

    res.status(200).json({ msg: "success", duk });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const createDuk = async (req, res) => {
  try {
    const { text } = req.body;

    const dukCreated = await Duk.create({ ...req.body });
    res.status(200).json({ msg: "success", dukCreated });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const updateDuk = async (req, res) => {
  try {
    const {
      params: { id },
      body: { text },
    } = req;
    if (!text) return res.status(500).json({ msg: "wetin u dey update?" });

    const dukUpdated = await Duk.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "success", dukUpdated });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};
const delDuk = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDuk = await Duk.findByIdAndDelete(id);
    res.status(200).json({ msg: "success", deleted: deletedDuk._id });
  } catch (err) {
    res.status(500).json({ msg: "an error ocurred", err });
  }
};

module.exports = { getDuks, getDuk, createDuk, updateDuk, delDuk };
