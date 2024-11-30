const express = require('express');
const multer = require('../middlewares/multerConfig');  // Import Multer configuration
const { uploadFile, getFile } = require('../controllers/fileController');  // Controller methods

const router = express.Router();

// Handle file upload
router.post('/upload', multer.single('file'), uploadFile);

// Handle file download using JWT token
router.get('/files/download/:token', getFile);

module.exports = router;
