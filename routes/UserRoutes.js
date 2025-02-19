const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import User Controller
const { register, login, getProfile } = require('../controllers/UserController');

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router;