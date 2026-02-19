const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Environment Validation
const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter(env => !process.env[env]);
if (missingEnv.length > 0) {
    console.error(`❌ CRITICAL ERROR: Missing environment variables: ${missingEnv.join(', ')}`);
    console.error('Please check your .env file.');
    process.exit(1);
}

const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
// xss-clean removed: incompatible with Express 5 (req.query is read-only)
// XSS protection is handled by input sanitization in routes + helmet CSP headers
const morgan = require('morgan');

const app = express();

// Log requests (Dev Mode)
app.use(morgan('dev'));

// Security Middleware (Glow up for Safety)
app.use(helmet()); // Sets various security HTTP headers
// XSS protection via helmet CSP + mongo-sanitize in auth routes
app.use(hpp());    // Prevent HTTP Parameter Pollution

// Rate Limiting (Prevent Brute Force)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use('/api/', limiter);

// Stricter Rate Limit for AI (Cost & Abuse Protection)
const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // 20 requests per hour
    message: { error: 'Neural link capacity reached. Please wait an hour to cool down.' }
});
app.use('/api/ai', aiLimiter);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB with timeout and non-blocking fallback
const connectDB = async () => {
    try {
        console.log('🔄 Attempting Neural Link to Database...');
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/focusflow', {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            connectTimeoutMS: 10000,
        });
        console.log('✅ MongoDB Connected: Neural Grid Online');
        process.env.DB_STATUS = 'connected';
    } catch (err) {
        console.error('⚠️ Database Connection Failed. Activating Neural Backup Mode (Offline Storage).');
        process.env.DB_STATUS = 'offline';
    }
};

connectDB();

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'FocusFlow API is running' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Task routes
app.use('/api/tasks', require('./routes/tasks'));

// Session routes  
app.use('/api/sessions', require('./routes/sessions'));

// AI routes (proxies OpenAI with server-side API key)
app.use('/api/ai', require('./routes/ai'));

// Admin routes
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware
app.use(require('./middleware/errorMiddleware'));

const server = app.listen(PORT, () => {
    console.log(`✅ FocusFlow API running on http://localhost:${PORT}`);
});

// Initialize Socket.io (Study Together Mode)
const socketHandler = require('./socketHandler');
socketHandler(server, allowedOrigins);

process.on('unhandledRejection', (err) => {
    console.log(`❌ Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

// Graceful Shutdown
const shutdown = async (signal) => {
    console.log(`\n🔄 ${signal} received. Shutting down gracefully...`);
    server.close(async () => {
        console.log('🛑 HTTP Server closed.');
        try {
            await mongoose.connection.close();
            console.log('📦 Database connection closed.');
            process.exit(0);
        } catch (err) {
            console.error('❌ Error during database closure:', err);
            process.exit(1);
        }
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = app;
