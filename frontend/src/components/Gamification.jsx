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
            <div className="surface-raised p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div>
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">Current Mastery</p>
                        <p className="text-5xl font-extrabold text-white font-display">Lvl {currentLevel}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <Star size={28} />
                    </div>
                </div>

                <div className="space-y-3 relative z-10">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <span>{stats.totalHours.toFixed(1)}h / {nextLevelHours}h</span>
                        <span className="text-indigo-400">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                        />
                    </div>
                </div>
            </div>

            {/* Badges */}
            <div className="surface-flat p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Award size={20} className="text-amber-500" />
                        <h3 className="text-lg font-bold font-display">Achieved Milestones</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {unlockedBadges.length} / {badges.length}
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {badges.map((badge) => (
                        <motion.div
                            key={badge.id}
                            whileHover={{ y: badge.unlocked ? -4 : 0 }}
                            className={`p-5 rounded-2xl text-center border transition-all duration-300 ${badge.unlocked
                                    ? 'bg-indigo-500/5 border-indigo-500/20'
                                    : 'bg-slate-900/50 border-slate-800/50 opacity-40 grayscale'
                                }`}
                        >
                            <div className="text-3xl mb-3 filter drop-shadow-md">{badge.icon}</div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300 leading-tight">
                                {badge.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
                <div className="surface-flat p-6 rounded-2xl group hover:border-emerald-500/30 transition-colors">
                    <TrendingUp size={20} className="text-emerald-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <p className="text-3xl font-bold font-display text-white">{stats.totalSessions}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total Cycles</p>
                </div>
                <div className="surface-flat p-6 rounded-2xl group hover:border-amber-500/30 transition-colors">
                    <Zap size={20} className="text-amber-500 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <p className="text-3xl font-bold font-display text-white">{stats.avgQuality}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Focus Quality</p>
                </div>
            </div>
        </div>
    );
};

export default Gamification;
