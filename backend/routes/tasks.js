const express = require('express');
const { auth } = require('./auth');
const router = express.Router();

// In-memory task storage (replace with database)
const tasks = [];

// Get all tasks for user
router.get('/', auth, (req, res) => {
    const userTasks = tasks.filter(t => t.userId === req.user.userId);
    res.json(userTasks);
});

// Create new task
router.post('/', auth, (req, res) => {
    const task = {
        id: Date.now().toString(),
        userId: req.user.userId,
        ...req.body,
        createdAt: new Date()
    };
    tasks.push(task);
    res.json(task);
});

// Update task
router.put('/:id', auth, (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id && t.userId === req.user.userId);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks[index] = { ...tasks[index], ...req.body, updatedAt: new Date() };
    res.json(tasks[index]);
});

// Delete task
router.delete('/:id', auth, (req, res) => {
    const index = tasks.findIndex(t => t.id === req.params.id && t.userId === req.user.userId);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
