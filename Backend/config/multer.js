const multer = require("multer");

const storage = multer.diskStorage({}); // temp storage

const upload = multer({ storage });

module.exports = upload;
