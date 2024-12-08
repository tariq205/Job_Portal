const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route to render home page with the form
router.get('/', (req, res) => res.render('home'));

// Route to handle form submission
router.post('/submit', contactController.submitForm);

// Route to render Thank You page
router.get('/thankyou',contactController.renderThankYou);

module.exports = router;
