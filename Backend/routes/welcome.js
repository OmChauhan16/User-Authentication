const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/auth');


//Welcome Page
router.post('/', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}!` });
});

module.exports = router; 
