const express = require('express');
const router = express.Router();
const projectMemberController = require('../controllers/projectMemberController');

// Get all project members
router.get('/', projectMemberController.getAllProjectMembers);

// Create a new project member
router.post('/', projectMemberController.createProjectMember);

// Get a project member by ID
router.get('/:id', projectMemberController.getProjectMemberById);

// Update a project member by ID
router.put('/:id', projectMemberController.updateProjectMember);

// Delete a project member by ID
router.delete('/:id', projectMemberController.deleteProjectMember);

module.exports = router;
