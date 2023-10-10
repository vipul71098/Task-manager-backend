// attachmentRoutes.js
const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachmentController');

// Get all attachments
router.get('/', attachmentController.getAllAttachments);

// Get attachment by ID
router.get('/:id', attachmentController.getAttachmentById);

// Create a new attachment
router.post('/', attachmentController.createAttachment);

// Delete an attachment by ID
router.delete('/:id', attachmentController.deleteAttachment);

module.exports = router;
