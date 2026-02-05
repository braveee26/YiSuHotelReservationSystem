const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    if (Object.keys(req.query).length > 0) {
        console.log('  Query:', JSON.stringify(req.query));
    }
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('  Body:', JSON.stringify(req.body));
    }
    next();
});

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to YiSu Hotel Reservation API' });
});

// Import Routes
const hotelRoutes = require('./routes/hotels');
const userRoutes = require('./routes/users');
const roomRoutes = require('./routes/rooms');

// Use Routes
app.use('/api/hotels', hotelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);

// Global error handler
app.use((err, req, res, next) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR:`, err.message);
    console.error('  Stack:', err.stack);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API available at http://localhost:${port}/api`);
});

