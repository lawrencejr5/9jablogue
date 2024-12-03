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
  cloud_name: "dijtcsqey",
  api_key: "389553529394387",
  api_secret: "_Uh6N4WMcfSH7D1G6QaeXMHwUQE",
});

module.exports = { upload, cloudinary };
