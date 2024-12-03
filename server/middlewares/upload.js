require("dotenv").config();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "_" + file.originalname.replace(/[\s\(\)\.com]/g, "_")
    );
  },
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = { upload, cloudinary };
