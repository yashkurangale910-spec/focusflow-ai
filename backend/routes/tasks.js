const express = require('express');
const { auth } = require('./auth');
const sanitize = require('mongo-sanitize');
const Task = require('../models/Task');
const router = express.Router();

// In-memory backup for neural offline mode
const backupTasks = [];

// Get all tasks for user
router.get('/', auth, async (req, res) => {
    // Phase 6: try DB first, fallback to backup
    if (process.env.DB_STATUS !== 'offline') {
        try {
            const userTasks = await Task.find({ userId: req.user.userId }).sort({ createdAt: -1 });
            return res.json(userTasks);
        } catch (error) {
            console.error('DB Read Failed, using Neural Backup');
        }
    }

    // Fallback to memory
    const userTasks = backupTasks.filter(t => t.userId === req.user.userId);
    res.json(userTasks);
});

// Create new task
router.post('/', auth, async (req, res) => {
    const cleanData = sanitize(req.body);

    // Phase 6: try DB first
    if (process.env.DB_STATUS !== 'offline') {
        try {
            const task = await Task.create({
                userId: req.user.userId,
                ...cleanData,
            });
            return res.json(task);
        } catch (error) {
            console.error('DB Create Failed, using Neural Backup');
        }
    }

    // Fallback to memory
    const task = {
        _id: Date.now().toString(), // Use mongo-like id for frontend consistency
        userId: req.user.userId,
        status: 'todo',
        ...cleanData,
        createdAt: new Date(),
        isBackup: true
    };
    backupTasks.push(task);
    res.json(task);
});

// Update task
router.put('/:id', auth, async (req, res) => {
    if (process.env.DB_STATUS !== 'offline') {
        try {
            const task = await Task.findOneAndUpdate(
                { _id: req.params.id, userId: req.user.userId },
                { ...req.body, updatedAt: Date.now() },
                { new: true }
            );
            if (task) return res.json(task);
        } catch (error) {
            console.error('DB Update Failed');
        }
    }

    // Fallback/Non-DB logic
    const index = backupTasks.findIndex(t => (t.id === req.params.id || t._id === req.params.id) && t.userId === req.user.userId);
    if (index === -1) return res.status(404).json({ error: 'Task not found in any store' });

    backupTasks[index] = { ...backupTasks[index], ...req.body, updatedAt: new Date() };
    res.json(backupTasks[index]);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
    if (process.env.DB_STATUS !== 'offline') {
        try {
            const result = await Task.deleteOne({ _id: req.params.id, userId: req.user.userId });
            if (result.deletedCount > 0) return res.json({ message: 'Task deleted from DB' });
        } catch (error) {
            console.error('DB Delete Failed');
        }
    }

    const index = backupTasks.findIndex(t => (t.id === req.params.id || t._id === req.params.id) && t.userId === req.user.userId);
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    backupTasks.splice(index, 1);
    res.json({ message: 'Task deleted from Neural Backup' });
});

module.exports = router;
