const express = require("express");
const authorRouter = express.Router();

const authMiddleware = require("../middlewares/auth");

const {
  getAuthors,
  getAuthor,
  updateAuthor,
  delAuthor,
  application,
} = require("../controllers/authors");

authorRouter.route("/").get(getAuthors);
authorRouter.route("/:id").get(getAuthor).patch(updateAuthor).delete(delAuthor);
authorRouter.post("/application", authMiddleware, application);

module.exports = authorRouter;
