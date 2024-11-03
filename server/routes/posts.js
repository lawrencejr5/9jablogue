const express = require("express");
const postRouter = express.Router();

const uploadMiddleware = require("../middlewares/upload");
const authMiddleware = require("../middlewares/auth");

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

postRouter.get("/", getPosts);
postRouter.get("/:id", getPost);
postRouter.post(
  "/",
  [authMiddleware, uploadMiddleware.single("thumb")],
  createPost
);
postRouter.patch(
  "/:id",
  [authMiddleware, uploadMiddleware.single("thumb")],
  updatePost
);
postRouter.patch("/feature/:id", authMiddleware, featurePost);
postRouter.patch("/view/:id", viewPost);
postRouter.patch("/like/:id", likePost);
postRouter.delete("/:id", authMiddleware, delPost);

module.exports = postRouter;
