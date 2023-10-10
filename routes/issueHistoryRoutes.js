// routes/issueHistoryRoutes.js
const express = require('express');
const router = express.Router();
const issueHistoryController = require('../controllers/issueHistoryController');

// Get issue history by issue ID
router.get('/issue/:issueId', issueHistoryController.getIssueHistoryByIssueId);

// Create issue history
router.post('/', issueHistoryController.createIssueHistory);

module.exports = router;
