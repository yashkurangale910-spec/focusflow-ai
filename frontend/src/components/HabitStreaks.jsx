import React, { useState, useEffect } from 'react';
import { Flame, Award, Calendar, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HabitStreaks = () => {
    const [streaks, setStreaks] = useState([
        {
            id: 1,
            name: 'Daily Focus',
            current: 12,
            longest: 18,
            goal: 30,
            icon: '🎯',
            color: '#00d1ff'
        },
        {
            id: 2,
            name: 'Morning Sessions',
            current: 7,
            longest: 10,
            goal: 14,
            icon: '🌅',
            color: '#f59e0b'
        },
        {
            id: 3,
            name: 'Task Completion',
            current: 15,
            longest: 15,
            goal: 21,
            icon: '✅',
            color: '#10b981'
        },
        {
            id: 4,
            name: 'Mood Tracking',
            current: 5,
            longest: 8,
            goal: 7,
            icon: '😊',
            color: '#ec4899'
        },
    ]);

    const [milestones] = useState([
        { days: 7, reward: '🥉 Bronze Badge', unlocked: true },
        { days: 14, reward: '🥈 Silver Badge', unlocked: true },
        { days: 21, reward: '🥇 Gold Badge', unlocked: false },
        { days: 30, reward: '💎 Diamond Badge', unlocked: false },
        { days: 100, reward: '👑 Legend Status', unlocked: false },
    ]);

    return (
        <div className="glass-card border-white/10 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Flame size={28} className="text-orange-500" />
                <div>
                    <h2 className="text-2xl font-bold">Habit Streaks</h2>
                    <p className="text-sm text-zinc-500">Build consistency, unlock rewards</p>
                </div>
            </div>

            {/* Active Streaks */}
            <div className="space-y-4 mb-8">
                {streaks.map((streak) => {
                    const progress = (streak.current / streak.goal) * 100;
                    const isRecord = streak.current === streak.longest;

                    return (
                        <motion.div
                            key={streak.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{streak.icon}</div>
                                    <div>
                                        <h3 className="font-bold">{streak.name}</h3>
                                        <p className="text-xs text-zinc-500">
                                            Longest: {streak.longest} days
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2">
                                        <Flame size={20} style={{ color: streak.color }} />
                                        <span className="text-2xl font-black" style={{ color: streak.color }}>
                                            {streak.current}
                                        </span>
                                    </div>
                                    {isRecord && (
                                        <span className="text-[10px] text-yellow-500 font-bold">
                                            🏆 NEW RECORD!
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: streak.color }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-zinc-500 mt-1">
                                <span>{streak.current} days</span>
                                <span>Goal: {streak.goal} days</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Milestones */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Award size={20} className="text-yellow-500" />
                    Milestone Rewards
                </h3>
                <div className="space-y-2">
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-2 rounded-lg ${milestone.unlocked ? 'bg-green-500/20' : 'bg-white/5'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-zinc-500" />
                                <span className="text-sm">{milestone.days} days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">{milestone.reward}</span>
                                {milestone.unlocked && (
                                    <Zap size={14} className="text-green-400" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Streak Protection */}
            <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-center">
                💡 <strong>Streak Freeze Available:</strong> Use 1 freeze to protect your streak if you miss a day
            </div>
        </div>
    );
};

export default HabitStreaks;
