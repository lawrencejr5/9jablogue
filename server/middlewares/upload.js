const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "_" + file.originalname.replace(/[\s\(\)\.com]/g, "_")
    );
  },
});

const upload = multer({ storage });
module.exports = upload;
