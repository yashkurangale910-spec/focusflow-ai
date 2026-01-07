const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    quality: {
        type: Number, // 1-5 rating
        default: 0
    },
    notes: {
        type: String,
        trim: true
    },
    type: {
        type: String, // 'focus', 'break', etc.
        default: 'focus'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Session', sessionSchema);
