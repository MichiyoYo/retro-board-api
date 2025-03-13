const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = new express.Router();

// Register a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Logout user
router.post('/logout', auth, userController.logout);

// update user
router.patch('/update/:id', auth, userController.update);

module.exports = router;
