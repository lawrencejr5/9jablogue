const express = require("express");
const dukRouter = express.Router();

const authMiddleware = require("../middlewares/auth");

const {
  getDuks,
  getDuk,
  createDuk,
  updateDuk,
  delDuk,
} = require("../controllers/duk");

dukRouter.get("/", getDuks);
dukRouter.post("/", authMiddleware, createDuk);
dukRouter.get("/:id", getDuk);
dukRouter.patch("/:id", authMiddleware, updateDuk);
dukRouter.delete("/:id", authMiddleware, delDuk);

module.exports = dukRouter;
