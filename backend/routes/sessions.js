const express = require('express');
const { auth } = require('./auth');
const Session = require('../models/Session');
const { updateUserStreak } = require('../utils/streakUtils');
const router = express.Router();

// Get all sessions for user
router.get('/', auth, async (req, res) => {
    try {
        const userSessions = await Session.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(userSessions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
});

// Create new session
router.post('/', auth, async (req, res) => {
    try {
        const session = await Session.create({
            userId: req.user.userId,
            ...req.body,
        });

        // Update user's streak
        const streakData = await updateUserStreak(req.user.userId);

        res.json({
            session,
            streak: streakData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create session' });
    }
});

// Get analytics
router.get('/analytics', auth, async (req, res) => {
    try {
        // Simple aggregation using JS for now, can be optimized with MongoDB aggregation pipeline later
        const userSessions = await Session.find({ userId: req.user.userId });

        const totalSessions = userSessions.length;
        const totalMinutes = userSessions.reduce((sum, s) => sum + (s.duration || 0), 0);
        const avgQuality = userSessions.length > 0
            ? userSessions.reduce((sum, s) => sum + (s.quality || 5), 0) / userSessions.length
            : 0;

        res.json({
            totalSessions,
            totalMinutes,
            totalHours: Math.floor(totalMinutes / 60),
            avgQuality: avgQuality.toFixed(1),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

module.exports = router;
