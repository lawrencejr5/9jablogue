const express = require("express");
const postRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  featurePost,
  getFeaturedPost,
  viewPost,
  likePost,
  delPost,
  searchPosts,
} = require("../controllers/posts");

postRouter.get("/", getPosts);
postRouter.get("/featured/post", getFeaturedPost);
postRouter.get("/search/post", searchPosts);
postRouter.get("/:id", getPost);
postRouter.post("/", [authMiddleware, upload.single("thumb")], createPost);
postRouter.patch("/:id", [authMiddleware, upload.single("thumb")], updatePost);
postRouter.patch("/feature/:id", authMiddleware, featurePost);
postRouter.patch("/view/:id", viewPost);
postRouter.patch("/like/:id", likePost);
postRouter.delete("/:id", authMiddleware, delPost);

module.exports = postRouter;
