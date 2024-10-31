const express = require("express");
const authRouter = express.Router();

const authMiddleware = require("../middlewares/auth");

const { register, login, application } = require("../controllers/auth");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/application", authMiddleware, application);

module.exports = authRouter;
