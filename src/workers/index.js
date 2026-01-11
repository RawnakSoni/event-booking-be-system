const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');

// Register models
require('../models/User');
require('../models/Event');
require('../models/Booking');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Worker connected to MongoDB'))
    .catch(err => console.error('Worker MongoDB connection error:', err));

// Initialize worker
console.log('Worker process starting...');
require('./emailWorker');
