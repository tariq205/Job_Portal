const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },  // File name
  contentType:{
     type: String,
     required: true
     },  // Content type (e.g., 'application/pdf')
  data: 
  {
     type: Buffer,
     required: true 
    },  // File data (binary format)
  uploadDate: { 
    type: Date, 
    default: Date.now 
  }  // Upload timestamp
});

module.exports = mongoose.model('File', fileSchema);
