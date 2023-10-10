const mongoose = require('mongoose');
// Define the Issue schema
const issueSchema = new mongoose.Schema({
    IssueKey: { type: String, unique: true },
    Summary: String,
    Description: String,
    IssueType: String,
    Priority: String,
    Status: String,
    Resolution: String,
    Assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date, default: Date.now },
    DueDate: Date,
    EstimatedTime: Number,
    OriginalEstimate: Number,
    TimeSpent: Number,
    ParentIssue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  });


  const Issue = mongoose.model('Issue', issueSchema);
  

  module.exports = Issue;