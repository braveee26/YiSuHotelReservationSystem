const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS 配置，允许来自 Capacitor App (https://localhost) 和其他开发环境的请求
app.use(cors({
    origin: [
        'http://localhost:10086',  // H5 开发服务器
        'http://localhost',        // Capacitor Android App (HTTP)
        'https://localhost',       // Capacitor Android App (HTTPS, 备用)
        'capacitor://localhost',   // Capacitor iOS App (Optional)
        'http://192.168.0.102:10086', // 局域网 (可选，用于真机调试)
        'https://yisuhotelreservationsystem.gyang5973.workers.dev', // 生产环境
        /\.pages\.dev$/,           // Cloudflare Pages preview 域名
        /\.workers\.dev$/          // Cloudflare Workers 域名
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
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

app.get('/api', (req, res) => {
    res.json({
        status: 'Online',
        message: 'YiSu Hotel API is responding',
        endpoints: ['/api/users', '/api/hotels', '/api/rooms']
    });
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

// Windows/Node process crash prevention & logging
process.on('uncaughtException', (err) => {
    console.error('\n# CRITICAL: UNCAUGHT EXCEPTION #');
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('\n# CRITICAL: UNHANDLED REJECTION #');
    console.error('Reason:', reason);
});

// Vercel Serverless 模式下不使用 listen，通过 module.exports 导出
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API available at http://localhost:${port}/api`);
  });
}

module.exports = app;
