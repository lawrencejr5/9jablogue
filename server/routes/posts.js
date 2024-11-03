const express = require("express");
const postRouter = express.Router();

const uploadMiddleware = require("../middlewares/upload");

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  featurePost,
  viewPost,
  likePost,
  delPost,
} = require("../controllers/posts");

postRouter.route("/").get(getPosts);
postRouter.route("/:id").get(getPost).delete(delPost);
postRouter.post("/", uploadMiddleware.single("thumb"), createPost);
postRouter.patch("/:id", uploadMiddleware.single("thumb"), updatePost);
postRouter.patch("/feature/:id", featurePost);
postRouter.patch("/view/:id", viewPost);
postRouter.patch("/like/:id", likePost);

module.exports = postRouter;
