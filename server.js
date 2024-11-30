const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const cors = require('cors');  
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
dotenv.config();
const app = express();
// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', fileRoutes);
app.use('/api/auth', authRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
