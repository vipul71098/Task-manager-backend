const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const userController = require('../controllers/userController');

// Create a new user
router.post('/', authMiddleware, userController.createUser);

// Get a list of all users
router.get('/', authMiddleware , userController.getAllUsers);

// Get a single user by ID
router.get('/:userId', authMiddleware,  userController.getUserById);

// Update a user by ID
router.put('/:userId', authMiddleware , userController.updateUser);

// Delete a user by ID
router.delete('/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
