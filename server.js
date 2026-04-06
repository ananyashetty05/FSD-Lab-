const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/portfolio').then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.log('MongoDB connection error:', err);
});

// Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/student', studentRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('MERN Stack Student Portfolio API');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
