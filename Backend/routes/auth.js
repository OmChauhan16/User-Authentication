const express = require('express');
const router = express.Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });

    // Check if username or email already exists
    const existingUserByUsername = await User.findOne({ username });
    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already taken!" });
    }

    if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already registered!" });
    }

    const saveUser = await user.save();
    if (!saveUser) {
        res.send('Error in creating User!');
    }
    return res.status(200).json({ message: "User Registered Successfully!" });
})


//Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Create a JWT payload 
        const payload = {
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        };

        // Sign the token with the secret key, and set an expiration time (e.g., 1 hour)
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token to the client
        res.json({
            token,
            payload,
            message: 'Login Successful!'
        });

    }
    catch (err) {
        console.log(err, 'err');

        res.status(500).send('Error logging in');
    }
})

module.exports = router; 
