import React, { useState } from 'react';
import { Star, Award, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../context/AnalyticsContext';

const Gamification = () => {
    const { getTotalStats } = useAnalytics();
    const stats = getTotalStats();

    const currentLevel = Math.floor(stats.totalHours / 10) + 1;
    const nextLevelHours = currentLevel * 10;
    const progress = ((stats.totalHours % 10) / 10) * 100;

    const badges = [
        { id: 1, name: 'First Session', icon: '🎯', unlocked: stats.totalSessions >= 1 },
        { id: 2, name: '10 Hour Club', icon: '⏰', unlocked: stats.totalHours >= 10 },
        { id: 3, name: 'Streak Master', icon: '🔥', unlocked: stats.currentStreak >= 7 },
        { id: 4, name: 'Century', icon: '💯', unlocked: stats.totalSessions >= 100 },
        { id: 5, name: 'Marathon', icon: '🏃', unlocked: stats.totalHours >= 50 },
        { id: 6, name: 'Zen Master', icon: '🧘', unlocked: stats.avgQuality >= 8 },
    ];

    const unlockedBadges = badges.filter(b => b.unlocked);

    return (
        <div className="space-y-6">
            {/* Level Progress */}
            <div className="glass-card border-white/10 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm text-zinc-500 uppercase tracking-wider">Level</p>
                        <p className="text-4xl font-black text-accent">{currentLevel}</p>
                    </div>
                    <Star size={48} className="text-yellow-500" />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>{stats.totalHours} hours</span>
                        <span>{nextLevelHours} hours</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="glass-card border-white/10 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <Award size={24} className="text-accent" />
                    <h3 className="text-xl font-bold">Badges</h3>
                    <span className="text-sm text-zinc-500">({unlockedBadges.length}/{badges.length})</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {badges.map((badge) => (
                        <motion.div
                            key={badge.id}
                            whileHover={{ scale: badge.unlocked ? 1.05 : 1 }}
                            className={`p-4 rounded-xl text-center transition-all ${badge.unlocked
                                    ? 'bg-accent/20 border-2 border-accent'
                                    : 'bg-white/5 border border-white/10 opacity-40'
                                }`}
                        >
                            <div className="text-4xl mb-2">{badge.icon}</div>
                            <p className="text-xs font-bold">{badge.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card border-white/10 p-6 rounded-2xl">
                    <TrendingUp size={24} className="text-green-500 mb-2" />
                    <p className="text-2xl font-black">{stats.totalSessions}</p>
                    <p className="text-sm text-zinc-500">Total Sessions</p>
                </div>
                <div className="glass-card border-white/10 p-6 rounded-2xl">
                    <Zap size={24} className="text-yellow-500 mb-2" />
                    <p className="text-2xl font-black">{stats.avgQuality}</p>
                    <p className="text-sm text-zinc-500">Avg Quality</p>
                </div>
            </div>
        </div>
    );
};

export default Gamification;
