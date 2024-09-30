const express = require("express");
const postRouter = express.Router();

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  delPost,
} = require("../controllers/posts");

postRouter.route("/").get(getPosts).post(createPost);
postRouter.route("/:id").get(getPost).patch(updatePost).delete(delPost);

module.exports = postRouter;
