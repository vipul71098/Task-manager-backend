const mongoose = require('mongoose');
// Define the Comment schema
const commentSchema = new mongoose.Schema({
    CommentText: String,
    CommentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CommentedAt: { type: Date, default: Date.now },
  });
  


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;