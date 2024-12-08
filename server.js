const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path'); // Import path module
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));
// Use routes
app.use('/', authRoutes);
app.use('/', contactRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
