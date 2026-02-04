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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
