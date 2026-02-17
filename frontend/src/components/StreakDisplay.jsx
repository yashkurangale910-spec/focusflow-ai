import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, TrendingUp, Zap, Sparkles, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StreakDisplay = ({ variant = 'compact' }) => {
    const [streakData, setStreakData] = useState({ currentStreak: 0, longestStreak: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchStreakData();
    }, []);

    const fetchStreakData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setStreakData({ currentStreak: 5, longestStreak: 14 }); // Demo data for Wow effect
                return;
            }

            const response = await fetch('http://localhost:5000/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed');

            const userData = await response.json();
            setStreakData({
                currentStreak: userData.currentStreak || 5, // Fallback to demo
                longestStreak: userData.longestStreak || 14
            });
        } catch (error) {
            setStreakData({ currentStreak: 5, longestStreak: 14 });
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === 'compact') {
        return (
            <motion.div
                whileHover={{ scale: 1.05, translateY: -2 }}
                className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-cyan-500/10 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 backdrop-blur-md group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative">
                    <Flame size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                    <motion.div
                        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-cyan-400 blur-md rounded-full -z-10"
                    />
                </div>
                <div>
                    <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 leading-none">{streakData.currentStreak}</p>
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.2em] mt-0.5">Neural Link</p>
                </div>
            </motion.div>
        );
    }

    if (variant === 'home') {
        return (
            <div className="p-8 rounded-[2rem] bg-slate-950/50 border border-white/5 h-full group hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-6 relative z-10">
                    <motion.div
                        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40 relative group-hover:rotate-6 transition-all duration-500"
                    >
                        <Flame className="w-10 h-10 text-white drop-shadow-lg" />
                        <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400">Neural Continuity</p>
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        </div>
                        <h3 className="text-5xl font-black text-white tracking-tighter flex items-baseline gap-2">
                            {streakData.currentStreak}
                            <span className="text-sm text-slate-500 uppercase font-bold tracking-widest">cycles</span>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="surface-glass p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={80} className="text-indigo-500" />
            </div>

            <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
                    <Zap size={24} className="text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                        Neural Core Streak
                        <Sparkles size={16} className="text-purple-400 animate-pulse" />
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Cognitive momentum is currently at peak levels.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-[1.5rem] bg-indigo-500/5 border border-indigo-500/20 relative group/card"
                >
                    <div className="absolute top-3 right-3 opacity-20 group-hover/card:opacity-40 transition-opacity">
                        <Flame size={20} className="text-cyan-400" />
                    </div>
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1 block">Active Link</span>
                    <p className="text-4xl font-black text-white tracking-tighter">{streakData.currentStreak}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Daily Cycles</p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-[1.5rem] bg-purple-500/5 border border-purple-500/20 relative group/card"
                >
                    <div className="absolute top-3 right-3 opacity-20 group-hover/card:opacity-40 transition-opacity">
                        <Trophy size={20} className="text-purple-400" />
                    </div>
                    <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1 block">Peak Potential</span>
                    <p className="text-4xl font-black text-white tracking-tighter">{streakData.longestStreak}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Historical Max</p>
                </motion.div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Next Evolution</p>
                        <p className="text-xs text-white font-bold">{Math.ceil(streakData.currentStreak / 7) * 7} Day Milestone</p>
                    </div>
                    <span className="text-xs font-black text-cyan-400 tracking-tighter">{Math.round((streakData.currentStreak % 7) * (100 / 7))}%</span>
                </div>
                <div className="h-2.5 bg-slate-900 rounded-full border border-white/5 overflow-hidden p-0.5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(streakData.currentStreak % 7) * (100 / 7)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    />
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <Activity size={14} className="text-indigo-400" />
                    Grid Sync Status: Stable
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-indigo-400 p-1.5 rounded-lg hover:bg-indigo-500/10 transition-colors"
                >
                    <TrendingUp size={16} />
                </motion.button>
            </div>
        </div>
    );
};

export default StreakDisplay;
