const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Add this middleware for protected routes

// Render register and login pages
router.get('/', (req, res) => {
    const message = req.query.message || null;
    res.render('register', { message });
});

router.get('/login', (req, res) => {
    const message = req.query.message || null;
    res.render('login', { message });
});

// Render the dashboard (protected route)
router.get('/home', authenticateToken, (req, res) => {
    res.render('home', { username: req.user.username }); // Assuming req.user contains user data
});

// Handle register and login submissions
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login?message=Logged out successfully');
});
module.exports = router;

