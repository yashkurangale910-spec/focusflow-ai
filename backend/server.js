const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/focusflow')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ FocusFlow API running on http://localhost:${PORT}`);
    });
}

module.exports = app;
