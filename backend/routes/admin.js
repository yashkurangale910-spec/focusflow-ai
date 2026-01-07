const express = require('express');
const { auth } = require('./auth');
const User = require('../models/User');
const Session = require('../models/Session');
const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admin only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: 'Authorization check failed' });
    }
};

// Get all users (admin only)
router.get('/users', auth, isAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 20, search = '' } = req.query;

        const query = search
            ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const users = await User.find(query)
            .select('-password')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const count = await User.countDocuments(query);

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Delete user (admin only)
router.delete('/users/:id', auth, isAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Don't allow deleting yourself
        if (user._id.toString() === req.user.userId) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        // Delete user's sessions
        await Session.deleteMany({ userId: req.params.id });

        // Delete user
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Get system-wide statistics (admin only)
router.get('/stats', auth, isAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalSessions = await Session.countDocuments();

        // Users created in last 7 days
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const newUsersThisWeek = await User.countDocuments({
            createdAt: { $gte: weekAgo }
        });

        // Total focus time
        const sessions = await Session.find();
        const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

        // Active users (users with sessions in last 7 days)
        const activeSessions = await Session.find({
            createdAt: { $gte: weekAgo }
        }).distinct('userId');

        res.json({
            totalUsers,
            totalSessions,
            newUsersThisWeek,
            activeUsers: activeSessions.length,
            totalFocusHours: Math.floor(totalMinutes / 60),
            avgSessionsPerUser: totalUsers > 0 ? (totalSessions / totalUsers).toFixed(1) : 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

module.exports = router;
