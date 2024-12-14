const multer = require('multer');

// Multer configuration to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 
});

module.exports = upload;
