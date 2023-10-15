const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
  },
  type: {
    type: String,
    required: true,
    enum: ['TASK', 'STORY', 'BUG'], // Modify with your enum values
  },
  status: {
    type: String,
    required: true,
    enum: ['BACKLOG', 'SELECTED', 'INPROGRESS', 'DONE'], // Modify with your enum values
  },
  priority: {
    type: String,
    required: true,
    enum: ['LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST'], // Modify with your enum values
  },
  listPosition: {
    type: Number,
    required: true,
  },
  reporterId: {
    type: Number,
    required: true,
  },
  description: String,
  descriptionText: String,
  estimate: Number,
  timeSpent: Number,
  timeRemaining: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  reporterId: Number,
  projectId: Number, // Modify based on your associations

  // Define associations
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  userIds: [Number],
});

IssueSchema.pre('save', function (next) {
  if (this.description) {
    // Strip HTML tags from the description and store in descriptionText
    this.descriptionText = this.description.replace(/(<([^>]+)>)/gi, '');
  }
  next();
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;
