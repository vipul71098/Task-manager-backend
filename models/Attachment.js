const mongoose = require('mongoose');
// Define the Attachment schema
const attachmentSchema = new mongoose.Schema({
    FileName: String,
    FileType: String,
    FileSize: Number,
    UploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    UploadedAt: { type: Date, default: Date.now },
    FileData: Buffer, // Store as Binary data or reference to storage location
  });


const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;
  