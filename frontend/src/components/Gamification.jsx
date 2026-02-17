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
        { id: 1, name: 'Initial Uplink', icon: '📡', unlocked: stats.totalSessions >= 1, rarity: 'Common' },
        { id: 2, name: 'Stability 10h', icon: '💎', unlocked: stats.totalHours >= 10, rarity: 'Elite' },
        { id: 3, name: 'Neural Resonance', icon: '🌀', unlocked: stats.currentStreak >= 7, rarity: 'Legendary' },
        { id: 4, name: 'Century Protocol', icon: '🔋', unlocked: stats.totalSessions >= 100, rarity: 'Relic' },
        { id: 5, name: 'Persistence Grid', icon: '🏗️', unlocked: stats.totalHours >= 50, rarity: 'Master' },
        { id: 6, name: 'Zenith Clarity', icon: '👁️', unlocked: stats.avgQuality >= 8, rarity: 'Divine' },
    ];

    const unlockedBadges = badges.filter(b => b.unlocked);

    return (
        <div className="space-y-8">
            {/* Neural Mastery Hub */}
            <div className="surface-glass p-8 rounded-[2rem] border-white/5 relative overflow-hidden group shadow-2xl">
                {/* Background Telemetry Wave */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 400 200">
                        <motion.path
                            d="M 0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100"
                            stroke="cyan"
                            strokeWidth="2"
                            fill="none"
                            animate={{
                                d: [
                                    "M 0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100",
                                    "M 0 100 Q 50 150 100 100 T 200 100 T 300 100 T 400 100",
                                    "M 0 100 Q 50 50 100 100 T 200 100 T 300 100 T 400 100"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-10 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="relative group/rank">
                            <motion.div
                                className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-xl group-hover/rank:bg-cyan-500/30 transition-all duration-700"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="w-20 h-20 rounded-full bg-black/40 border-2 border-indigo-500/30 flex items-center justify-center relative backdrop-blur-xl shadow-2xl">
                                <span className="text-3xl font-black text-white italic tracking-tighter">
                                    {currentLevel}
                                </span>
                            </div>
                            <svg className="absolute -inset-1 w-22 h-22 transform -rotate-90 pointer-events-none">
                                <circle
                                    cx="44" cy="44" r="40"
                                    stroke="url(#levelGradient)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={251}
                                    strokeDashoffset={251 - (251 * progress) / 100}
                                    className="transition-all duration-1000"
                                />
                                <defs>
                                    <linearGradient id="levelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-1 italic">Cognitive Rank</p>
                            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Mastery Level <span className="text-cyan-400">{currentLevel}</span></h2>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={14} className="text-emerald-400" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Link Stability: 98.4%</span>
                        </div>
                        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Pioneer Class v2</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency Waveform Progression</p>
                        </div>
                        <p className="text-xs font-black text-white italic tracking-widest">{progress.toFixed(0)}% <span className="text-slate-600 not-italic">to next uplink</span></p>
                    </div>
                    <div className="h-4 bg-white/[0.02] rounded-full p-1 border border-white/5 shadow-inner overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:50px_50px] animate-shimmer" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Holographic Achievement Vault */}
            <div className="surface-raised p-8 rounded-[2rem] border-white/5 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 text-[8px] font-black text-cyan-400/10 uppercase tracking-[1em] rotate-90 origin-right select-none">Vault_v1.02</div>

                <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-lg shadow-amber-900/20">
                            <Award size={24} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">Neural <span className="text-amber-400">Milestones</span></h3>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Holographic Achievement Matrix</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                            {unlockedBadges.length} / {badges.length}
                        </span>
                        <div className="w-[1px] h-3 bg-white/10" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Sync Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    {badges.map((badge) => (
                        <motion.div
                            key={badge.id}
                            whileHover={{ y: badge.unlocked ? -8 : 0, scale: badge.unlocked ? 1.02 : 1 }}
                            className={`p-6 rounded-[2rem] text-center border transition-all duration-700 group/badge relative overflow-hidden shadow-xl ${badge.unlocked
                                ? 'bg-white/[0.03] border-white/10 hover:border-cyan-500/30'
                                : 'bg-black/40 border-white/5 opacity-20 grayscale'
                                }`}
                        >
                            {badge.unlocked && (
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl group-hover/badge:bg-indigo-500/20 transition-all duration-700" />
                            )}
                            <div className="text-5xl mb-5 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover/badge:scale-125 transition-transform duration-500">{badge.icon}</div>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white italic mb-1">
                                {badge.name}
                            </p>
                            <div className={`text-[8px] font-black uppercase tracking-[0.3em] ${badge.rarity === 'Legendary' ? 'text-amber-400' :
                                    badge.rarity === 'Common' ? 'text-slate-500' :
                                        'text-cyan-400'
                                }`}>
                                // {badge.rarity}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Operative Telemetry */}
            <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="surface-glass p-8 rounded-[2rem] group hover:border-emerald-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <TrendingUp size={40} className="text-emerald-500" />
                    </div>
                    <p className="text-5xl font-black italic text-white tracking-tighter leading-none mb-2">{stats.totalSessions}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Total Operational Cycles</p>
                    <div className="mt-6 flex gap-1 items-end h-8">
                        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-emerald-500/20 rounded-t-full"
                                animate={{ height: [h * 0.5, h, h * 0.5] }}
                                transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
                            />
                        ))}
                    </div>
                </div>
                <div className="surface-glass p-8 rounded-[2rem] group hover:border-amber-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Zap size={40} className="text-amber-500" />
                    </div>
                    <p className="text-5xl font-black italic text-white tracking-tighter leading-none mb-2">{stats.avgQuality}<span className="text-xl text-slate-600">/10</span></p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Neural Focus Precision</p>
                    <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-12 h-1 bg-amber-500/20 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-amber-400" initial={{ width: 0 }} animate={{ width: '85%' }} />
                            </div>
                            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Resonance OK</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gamification;
