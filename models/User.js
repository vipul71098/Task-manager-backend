const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  type: {
    type: String,
    required: true,
    enum: ['Admin', 'Pro-Man', 'General'], // Modify with your enum values
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 200,
  },
  avatarUrl: {
    type: String,
    maxlength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
