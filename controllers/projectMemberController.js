const ProjectMember = require('../models/ProjectMember');

// Get all project members
exports.getAllProjectMembers = async (req, res) => {
  try {
    const projectMembers = await ProjectMember.find();
    res.json(projectMembers);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new project member
exports.createProjectMember = async (req, res) => {
  try {
    const { Project, User, Role } = req.body;
    const projectMember = new ProjectMember({ Project, User, Role });
    await projectMember.save();
    res.status(201).json(projectMember);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Get a project member by ID
exports.getProjectMemberById = async (req, res) => {
  try {
    const projectMember = await ProjectMember.findById(req.params.id);
    if (!projectMember) {
      return res.status(404).json({ error: 'Project member not found' });
    }
    res.json(projectMember);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a project member by ID
exports.updateProjectMember = async (req, res) => {
  try {
    const { Project, User, Role } = req.body;
    const projectMember = await ProjectMember.findByIdAndUpdate(
      req.params.id,
      { Project, User, Role },
      { new: true }
    );
    if (!projectMember) {
      return res.status(404).json({ error: 'Project member not found' });
    }
    res.json(projectMember);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Delete a project member by ID
exports.deleteProjectMember = async (req, res) => {
  try {
    const projectMember = await ProjectMember.findByIdAndRemove(req.params.id);
    if (!projectMember) {
      return res.status(404).json({ error: 'Project member not found' });
    }
    res.json({ message: 'Project member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
