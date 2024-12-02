const multer = require("multer");
const cloudinary = require("cloudinary").v2;

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

// cloudinary.config({
//   cloud_name: "dijtcsqey",
//   api_key: "389553529394387",
//   api_secret: "_Uh6N4WMcfSH7D1G6QaeXMHwUQE",
// });

// const cloudinaryStorage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, ""),
//   filename: async (req, file, cb) => {
//     const originalName = file.originalname;
//     const extension = path.extname(originalName);
//     const sanitizedName = originalName.replace(/[\s\(\)\.com]/g, "_");

//     const filename = Date.now() + "_" + sanitizedName + extension;

//     try {
//       const uploadResponse = await cloudinary.uploader.upload(file.buffer, {
//         resource_type: file.mimetype.startsWith("image/") ? "image" : "auto", // Set resource type based on mimetype
//         public_id: filename,
//         folder: "your_folder_name",
//       });

//       cb(null, uploadResponse.public_id);
//     } catch (error) {
//       console.error("Error uploading to Cloudinary:", error);
//       cb(error, null);
//     }
//   },
// });

// const upload = multer({ storage: cloudinaryStorage });

module.exports = upload;
