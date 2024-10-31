require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

const notFound = require("./middlewares/not-found");
const authMiddleware = require("./middlewares/auth");

const connectDb = require("./config/conn");

const authRouter = require("./routes/auth");
const authorRouter = require("./routes/authors");
const catRouter = require("./routes/categories");
const dukRouter = require("./routes/duk");
const postRouter = require("./routes/posts");

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", authMiddleware, postRouter);
app.use("/api/v1/categories", catRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/duk", dukRouter);

app.use(notFound);

const startServer = async () => {
  const port = process.env.PORT || 5001;
  const url = process.env.MONGO_URI;
  try {
    await connectDb(url);
    app.listen(port, console.log(`app listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
startServer();
