const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/project-images"); // 👈 folder for storing images
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();

    // 👇 Remove spaces, emojis, and special characters
    const safeName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")        // replace spaces with hyphens
      .replace(/[^\w.-]/g, "");    // remove anything except letters, numbers, _, ., -

    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
