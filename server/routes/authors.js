const express = require("express");
const authorRouter = express.Router();

const authMiddleware = require("../middlewares/auth");
const uploadMiddleware = require("../middlewares/upload");

const {
  getAuthors,
  getAuthor,
  updateAuthor,
  delAuthor,
  application,
  updatePassword,
  updateProfilePic,
} = require("../controllers/authors");

authorRouter.get("/", getAuthors);
authorRouter.get("/:id", getAuthor);
authorRouter.patch("/:id", authMiddleware, updateAuthor);
authorRouter.delete("/:id", authMiddleware, delAuthor);
authorRouter.post("/application", authMiddleware, application);
authorRouter.patch("/password/update", authMiddleware, updatePassword);
authorRouter.patch(
  "/profilePic/:id",
  uploadMiddleware.single("pic"),
  updateProfilePic
);

module.exports = authorRouter;
