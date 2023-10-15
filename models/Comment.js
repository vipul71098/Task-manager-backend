const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxlength: 50000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
