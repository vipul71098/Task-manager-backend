const Issue = require('../models/Issue');

// Create a new issue
exports.createIssue = async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).json({ error: 'Could not create issue' });
  }
};

// Get all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve issues' });
  }
};
