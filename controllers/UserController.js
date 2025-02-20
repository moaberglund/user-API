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
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "12h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get user profile (protected route)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update user profile (protected route)
exports.updateProfile = async (req, res) => {
    try {
        const { username, email, firstname, lastname, age } = req.body;
        
        // Controll if the user wants to update the username
        if (username) {
            // Check if username already exists and not belongs to other user
            const existingUser = await User.findOne({ 
                username, 
                _id: { $ne: req.user.userId } 
            });
            if (existingUser) {
                return res.status(400).json({ message: "Username already taken!" });
            }
        }

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            {
                $set: {
                    ...(username && { username }),
                    ...(email && { email }),
                    ...(firstname && { firstname }),
                    ...(lastname && { lastname }),
                    ...(age && { age })
                }
            },
            { 
                new: true, // Return user
                runValidators: true, // Run model validations
                select: '-password' // Exclude password from result
            }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

// Delete user account with password verification (protected route)
exports.deleteProfile = async (req, res) => {
    try {
        const { password } = req.body;
        
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        await user.deleteOne();

        res.json({ 
            message: "Account deleted successfully" 
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};