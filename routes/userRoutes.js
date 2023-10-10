const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');
const userController = require('../controllers/userController');

// Create a new user
router.post('/', userController.createUser);

// Get a list of all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:userId',  userController.getUserById);

// Update a user by ID
router.put('/:userId' , userController.updateUser);

// Delete a user by ID
router.delete('/:userId', userController.deleteUser);

module.exports = router;
