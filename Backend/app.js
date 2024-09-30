require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const welcomeRoutes = require('./routes/welcome');

const app = express();
const port = 5000;

//Middleware
app.use(cors()); // Enable CORS to allow cross-origin requests from React frontend
app.use(express.json());  // Parse JSON data

//MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to mongodb'))
    .catch((err) => console.log('Could not connect to mongodb...', err))

// Routes
app.use('/api', authRoutes);
app.use('/welcome', welcomeRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})