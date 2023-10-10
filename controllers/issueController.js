// controllers/issueController.js
const Issue = require('../models/Issue');

// Controller methods for Issue entity

// Get all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get issue by ID
exports.getIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new issue
exports.createIssue = async (req, res) => {
  const { summary, description, issueType, priority, status } = req.body;
  try {
    const newIssue = new Issue({
      summary,
      description,
      issueType,
      priority,
      status,
    });
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an issue by ID
exports.updateIssueById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(updatedIssue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an issue by ID
exports.deleteIssueById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedIssue = await Issue.findByIdAndDelete(id);
    if (!deletedIssue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    res.json(deletedIssue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
