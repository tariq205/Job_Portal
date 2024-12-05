const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Example of a protected route using the middleware
router.get('/dashboard', authMiddleware, (req, res) => {
    res.send('Welcome to your dashboard');
});

module.exports = router;
