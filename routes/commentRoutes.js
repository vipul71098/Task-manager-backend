const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticationMiddleware = require('../middleware/authentication');

// Create a new comment
router.post('/', authenticationMiddleware, commentController.createComment);

// Get all comments for an issue
router.get('/:issueId', commentController.getAllComments);

// Update a comment
// router.put('/:commentId', authenticationMiddleware, commentController.updateComment);

// Delete a comment
// router.delete('/:commentId', authenticationMiddleware, commentController.deleteComment);

module.exports = router;
