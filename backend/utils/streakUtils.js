const User = require('../models/User');

/**
 * Calculate if user should maintain or break streak
 * @param {Date} lastActiveDate - User's last active date
 * @returns {Object} - { shouldIncrement: boolean, shouldReset: boolean }
 */
const calculateStreakStatus = (lastActiveDate) => {
    if (!lastActiveDate) {
        return { shouldIncrement: true, shouldReset: false };
    }

    const now = new Date();
    const lastActive = new Date(lastActiveDate);

    // Reset times to start of day for comparison
    now.setHours(0, 0, 0, 0);
    lastActive.setHours(0, 0, 0, 0);

    const diffTime = now - lastActive;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        // Same day - no change
        return { shouldIncrement: false, shouldReset: false };
    } else if (diffDays === 1) {
        // Next day - increment streak
        return { shouldIncrement: true, shouldReset: false };
    } else {
        // Missed a day - reset streak
        return { shouldIncrement: false, shouldReset: true };
    }
};

/**
 * Update user's streak based on activity
 * @param {String} userId - User ID
 */
const updateUserStreak = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return;

        const { shouldIncrement, shouldReset } = calculateStreakStatus(user.lastActiveDate);

        if (shouldReset) {
            user.currentStreak = 1;
        } else if (shouldIncrement) {
            user.currentStreak += 1;
            if (user.currentStreak > user.longestStreak) {
                user.longestStreak = user.currentStreak;
            }
        }

        user.lastActiveDate = new Date();
        await user.save();

        return {
            currentStreak: user.currentStreak,
            longestStreak: user.longestStreak
        };
    } catch (error) {
        console.error('Error updating streak:', error);
        return null;
    }
};

module.exports = {
    calculateStreakStatus,
    updateUserStreak
};
