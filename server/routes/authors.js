const express = require("express");
const authorRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

const {
  getAuthors,
  getAuthor,
  updateAuthor,
  delAuthor,
  application,
  updatePassword,
  updateProfilePic,
  getAuthorNumOfLikes,
  getAuthorNumOfViews,
} = require("../controllers/authors");

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthor);
authorRouter.patch(
  "/:id",
  [authMiddleware, upload.single("profilePic")],
  updateAuthor
);
authorRouter.delete("/:id", authMiddleware, delAuthor);

authorRouter.get("/posts/likes", authMiddleware, getAuthorNumOfLikes);
authorRouter.get("/posts/views", authMiddleware, getAuthorNumOfViews);

authorRouter.patch("/register/application", authMiddleware, application);
authorRouter.patch("/password/update", authMiddleware, updatePassword);

module.exports = authorRouter;
