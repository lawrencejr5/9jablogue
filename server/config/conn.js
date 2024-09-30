const mongoose = require("mongoose");

const connectDb = async (url) => {
  return await mongoose.connect(url, { dbName: "9jablogue" });
};

module.exports = connectDb;
