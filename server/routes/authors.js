const express = require("express");
const authorRouter = express.Router();

const {
  getAuthors,
  getAuthor,
  updateAuthor,
  delAuthor,
} = require("../controllers/authors");

authorRouter.route("/").get(getAuthors);
authorRouter.route("/:id").get(getAuthor).patch(updateAuthor).delete(delAuthor);

module.exports = authorRouter;
