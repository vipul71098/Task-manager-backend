// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/', projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get a project by ID
router.get('/:id', projectController.getProjectById);

// Update a project by ID
router.put('/:id', projectController.updateProjectById);

// Delete a project by ID
router.delete('/:id', projectController.deleteProjectById);

module.exports = router;
