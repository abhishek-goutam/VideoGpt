require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const videoRoutes = require('./src/routes/videoRoutes');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/videos', videoRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1',() => console.log(`Server running on port ${PORT}`));
