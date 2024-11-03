const express = require("express");
const catRouter = express.Router();

const authMiddleware = require("../middlewares/auth");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  delCategory,
} = require("../controllers/categories");

catRouter.get("/", getCategories);
catRouter.post("/", authMiddleware, createCategory);
catRouter.get("/:id", getCategory);
catRouter.patch("/:id", authMiddleware, updateCategory);
catRouter.delete("/:id", authMiddleware, delCategory);

module.exports = catRouter;
