// controllers/issueHistoryController.js
const IssueHistory = require('../models/IssueHistory');

// Controller methods for Issue History
exports.getIssueHistoryByIssueId = async (req, res) => {
  try {
    const issueHistory = await IssueHistory.find({ Issue: req.params.issueId }).populate('UpdatedBy');
    res.json(issueHistory);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching issue history.' });
  }
};

exports.createIssueHistory = async (req, res) => {
  const { Issue, FieldName, OldValue, NewValue, UpdatedBy } = req.body;
  try {
    const issueHistory = new IssueHistory({ Issue, FieldName, OldValue, NewValue, UpdatedBy });
    await issueHistory.save();
    res.status(201).json(issueHistory);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating issue history.' });
  }
};
