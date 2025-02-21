const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import User Controller
const { register, login, getProfile, updateProfile, deleteProfile } = require('../controllers/UserController');

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.delete('/profile', auth, deleteProfile)

module.exports = router;