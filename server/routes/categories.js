const express = require("express");
const catRouter = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  delCategory,
} = require("../controllers/categories");

catRouter.route("/").get(getCategories).post(createCategory);
catRouter
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .delete(delCategory);

module.exports = catRouter;
