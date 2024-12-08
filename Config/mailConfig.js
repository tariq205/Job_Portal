// config/mailConfig.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use another email service
    auth: {
        user: 'muhammadtariq.wali2@gmail.com',
        pass: 'tast gjjv ioag epjy'
    }
});

module.exports = transporter;
