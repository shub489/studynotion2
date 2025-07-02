const multer = require("multer");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where the uploaded file will be stored temporarily
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // The original name of the uploaded file
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
