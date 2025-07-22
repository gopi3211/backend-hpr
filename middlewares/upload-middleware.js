const multer = require('multer');

// Store file in memory for DB storage
const storage = multer.memoryStorage();

const upload = multer({ storage });
module.exports = upload;
