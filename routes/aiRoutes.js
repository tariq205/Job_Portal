const express = require('express');
const { getChat, postChat } = require('../controllers/aiController');
const router = express.Router();

router.get('/chat', getChat);
router.post('/chat', postChat);

module.exports = router;
