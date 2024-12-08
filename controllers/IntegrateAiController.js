const axios = require('axios');

exports.getChat = (req, res) => {
    res.render('chat');
};

exports.postChat = async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post('https://api.gemini.example.com/chat', { prompt });
        res.render('chat', { response: response.data });
    } catch (error) {
        res.render('chat', { response: 'Error processing your request.' });
    }
};
