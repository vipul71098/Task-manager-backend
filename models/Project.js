const mongoose = require('mongoose');
// Define the Project schema
const projectSchema = new mongoose.Schema({
    ProjectName: { type: String, required: true },
    Description: String,
    StartDate: Date,
    EndDate: Date,
    ProjectLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    CreatedAt: { type: Date, default: Date.now },
  });
  

  const Project = mongoose.model('Project', projectSchema);

  module.exports = Project;