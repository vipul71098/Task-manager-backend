const mongoose = require('mongoose');
// Define the ProjectMember schema
const projectMemberSchema = new mongoose.Schema({
    Project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Role: String,
  });
  
const ProjectMember = mongoose.model('ProjectMember', projectMemberSchema);

module.exports = ProjectMember;