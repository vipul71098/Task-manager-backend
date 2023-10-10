const mongoose = require('mongoose');
// Define the IssueHistory schema
const issueHistorySchema = new mongoose.Schema({
    Issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
    FieldName: String,
    OldValue: String,
    NewValue: String,
    UpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    UpdatedAt: { type: Date, default: Date.now },
  });


const IssueHistory = mongoose.model('IssueHistory', issueHistorySchema);

module.exports = IssueHistory;