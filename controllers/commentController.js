const Comment = require('../models/Comment');
const Issue = require('../models/Issue');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { issueId, commentText } = req.body;

    // Check if the issue exists
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const newComment = new Comment({
      CommentText: commentText,
      CommentedBy: req.user._id, // Assuming you have user authentication middleware
      Issue: issueId,
    });

    const savedComment = await newComment.save();

    // Add the comment to the issue's comments array
    issue.comments.push(savedComment._id);
    await issue.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all comments for an issue
exports.getCommentsForIssue = async (req, res) => {
  try {
    const issueId = req.params.issueId;

    // Check if the issue exists
    const issue = await Issue.findById(issueId).populate('comments CommentedBy');

    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    res.json(issue.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updatedCommentText = req.body.commentText;

    const comment = await Comment.findByIdAndUpdate(commentId, {
      CommentText: updatedCommentText,
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment reference from the associated issue
    const issue = await Issue.findById(comment.Issue);
    if (issue) {
      issue.comments.pull(commentId);
      await issue.save();
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
