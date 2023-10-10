// routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Define Issue routes

// Get all issues
router.get('/', issueController.getAllIssues);

// Get issue by ID
router.get('/:id', issueController.getIssueById);

// Create a new issue
router.post('/', issueController.createIssue);

// Update an issue by ID
router.put('/:id', issueController.updateIssueById);

// Delete an issue by ID
router.delete('/:id', issueController.deleteIssueById);

module.exports = router;
