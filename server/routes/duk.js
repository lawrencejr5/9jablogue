const express = require("express");
const dukRouter = express.Router();

const {
  getDuks,
  getDuk,
  createDuk,
  updateDuk,
  delDuk,
} = require("../controllers/duk");

dukRouter.route("/").get(getDuks).post(createDuk);
dukRouter.route("/:id").get(getDuk).patch(updateDuk).delete(delDuk);

module.exports = dukRouter;
