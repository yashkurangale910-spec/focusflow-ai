const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    context: {
        type: String,
        required: true
    },
    metadata: {
        type: Object,
        default: {}
    },
    importance: {
        type: Number,
        default: 1
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Memory', memorySchema);
