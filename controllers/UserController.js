const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Create a new user
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "User created successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "12h"});
        res.json({ token });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// Get user profile (protected route)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // exclude password
        if(!user) {
            return res.status(404).json({message: "User not found!"});
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};