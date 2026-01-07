import React, { useState } from 'react';
import { Target, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const GoalsSystem = () => {
    const [dailyGoal, setDailyGoal] = useState({ target: 4, current: 2 });
    const [weeklyGoal, setWeeklyGoal] = useState({ target: 20, current: 12 });
    const [showGoalSetter, setShowGoalSetter] = useState(false);

    const dailyProgress = (dailyGoal.current / dailyGoal.target) * 100;
    const weeklyProgress = (weeklyGoal.current / weeklyGoal.target) * 100;

    return (
        <div className="space-y-4">
            {/* Daily Goal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card border-white/10 p-6 rounded-2xl"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Target size={24} className="text-accent" />
                        <div>
                            <h3 className="font-bold">Daily Goal</h3>
                            <p className="text-xs text-zinc-500">Focus sessions today</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-accent">
                            {dailyGoal.current}/{dailyGoal.target}
                        </p>
                    </div>
                </div>

                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(dailyProgress, 100)}%` }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                </div>

                {dailyProgress >= 100 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 flex items-center gap-2 text-green-400"
                    >
                        <CheckCircle size={16} />
                        <span className="text-sm font-bold">Goal achieved! 🎉</span>
                    </motion.div>
                )}
            </motion.div>

            {/* Weekly Goal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card border-white/10 p-6 rounded-2xl"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <Calendar size={24} className="text-purple-500" />
                        <div>
                            <h3 className="font-bold">Weekly Goal</h3>
                            <p className="text-xs text-zinc-500">Sessions this week</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-purple-500">
                            {weeklyGoal.current}/{weeklyGoal.target}
                        </p>
                    </div>
                </div>

                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                        className="h-full bg-purple-500 rounded-full"
                    />
                </div>

                <div className="mt-3 text-xs text-zinc-500">
                    {weeklyGoal.target - weeklyGoal.current} sessions to go
                </div>
            </motion.div>

            {/* Set Goals Button */}
            <button
                onClick={() => setShowGoalSetter(!showGoalSetter)}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all text-sm font-bold"
            >
                <TrendingUp size={16} className="inline mr-2" />
                Adjust Goals
            </button>
        </div>
    );
};

export default GoalsSystem;
