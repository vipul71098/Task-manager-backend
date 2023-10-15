const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  url: String,
  description: String,
  category: {
    type: String,
    required: true,
    enum: ['SOFTWARE', 'HARDWARE', 'OTHER'], // Modify with your enum values
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue',
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
