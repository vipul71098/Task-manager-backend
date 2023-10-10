// attachmentController.js
const Attachment = require('../models/Attachment');

// Get all attachments
exports.getAllAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find();
    res.json(attachments);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching attachments.' });
  }
};

// Get attachment by ID
exports.getAttachmentById = async (req, res) => {
  try {
    const attachment = await Attachment.findById(req.params.id);
    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found.' });
    }
    res.json(attachment);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the attachment.' });
  }
};

// Create a new attachment
exports.createAttachment = async (req, res) => {
  try {
    const { fileName, fileType, fileSize, uploadedBy, fileData } = req.body;
    const attachment = new Attachment({
      fileName,
      fileType,
      fileSize,
      uploadedBy,
      fileData,
    });
    await attachment.save();
    res.status(201).json(attachment);
  } catch (err) {
    res.status(400).json({ error: 'Invalid request data.' });
  }
};

// Delete an attachment by ID
exports.deleteAttachment = async (req, res) => {
  try {
    const attachment = await Attachment.findByIdAndRemove(req.params.id);
    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found.' });
    }
    res.json({ message: 'Attachment deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting the attachment.' });
  }
};
