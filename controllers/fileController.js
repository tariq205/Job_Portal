const jwt = require('jsonwebtoken');
const File = require('../models/Files');
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
 // Ensure only PDFs are uploaded
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).send('Only PDF files are allowed.');
    }
    const { originalname, mimetype, buffer } = req.file;
    // Create a new file document in MongoDB
    const newFile = new File({
      name: originalname,
      contentType: mimetype,
      data: buffer,
    });
    // Save the file to the database
    await newFile.save();

    // Generate a token for the fileId
    const token = jwt.sign({ fileId: newFile._id }, 'your-secret-key', { expiresIn: '1h' });

    // Respond with success and the tokenized download link
    res.status(201).json({
      message: 'PDF uploaded successfully',
     
      downloadUrl: `http://localhost:8000/api/files/download/${token}`, // Tokenized URL
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload PDF', error: error.message });
  }
};

// Retrieve file handler (for downloading using token)
exports.getFile = async (req, res) => {
    try {
      // Decode the token to get the file ID
      const token = req.params.token;
      const decoded = jwt.verify(token, 'your-secret-key');
      
      // Find the file by its decoded ID
      const file = await File.findById(decoded.fileId);
      if (!file) return res.status(404).send('File not found.');
  
      // Set headers to indicate the file is downloadable
      res.set('Content-Type', file.contentType); // PDF content type
      res.set('Content-Disposition', `attachment; filename=${file.name}`); // Force download
      res.send(file.data); // Send the file data to the user
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving file', error: error.message });
    }
  };
