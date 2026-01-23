import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, TrendingUp } from 'lucide-react';
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
                // No token, use default values
                setStreakData({ currentStreak: 0, longestStreak: 0 });
                return;
            }

            const response = await fetch('http://localhost:5000/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            setStreakData({
                currentStreak: userData.currentStreak || 0,
                longestStreak: userData.longestStreak || 0
            });
        } catch (error) {
            console.error('Failed to fetch streak:', error);
            // Gracefully fallback to default values
            setStreakData({ currentStreak: 0, longestStreak: 0 });
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === 'compact') {
        return (
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20"
            >
                <Flame size={20} className="text-orange-500" />
                <div>
                    <p className="text-lg font-black text-white">{streakData.currentStreak}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Day Streak</p>
                </div>
            </motion.div>
        );
    }

    if (variant === 'home') {
        return (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-900/30 to-slate-900/60 border border-amber-500/20 h-full group hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <motion.div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 group-hover:shadow-amber-500/50 transition-all duration-300"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        <Flame className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Current Streak</p>
                        <h3 className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-400 transition-all duration-300">
                            {streakData.currentStreak}<span className="text-lg text-slate-500 font-normal ml-1">days</span>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/10">
                    <Flame size={20} className="text-orange-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">Focus Streak</h3>
                    <p className="text-xs text-zinc-500">Keep the momentum going!</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Flame size={16} className="text-orange-500" />
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">Current</span>
                    </div>
                    <p className="text-3xl font-black text-white">{streakData.currentStreak}</p>
                    <p className="text-xs text-zinc-500">days</p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Trophy size={16} className="text-yellow-500" />
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">Best</span>
                    </div>
                    <p className="text-3xl font-black text-white">{streakData.longestStreak}</p>
                    <p className="text-xs text-zinc-500">days</p>
                </div>
            </div>

            {/* Progress to next milestone */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Next milestone</span>
                    <span className="text-white font-bold">{Math.ceil(streakData.currentStreak / 7) * 7} days</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(streakData.currentStreak % 7) * (100 / 7)}%` }}
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                    />
                </div>
            </div>

            {streakData.currentStreak >= 7 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2"
                >
                    <TrendingUp size={16} className="text-green-500" />
                    <p className="text-xs text-green-400 font-medium">Amazing! You're on fire! 🔥</p>
                </motion.div>
            )}
        </div>
    );
};

export default StreakDisplay;
