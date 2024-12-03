const express = require("express");
const catRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  delCategory,
} = require("../controllers/categories");

catRouter.get("/", getCategories);
catRouter.post("/", [upload.single("file"), authMiddleware], createCategory);
catRouter.get("/:id", getCategory);
catRouter.patch(
  "/:id",
  [upload.single("file"), authMiddleware],
  updateCategory
);
catRouter.delete("/:id", authMiddleware, delCategory);

module.exports = catRouter;
