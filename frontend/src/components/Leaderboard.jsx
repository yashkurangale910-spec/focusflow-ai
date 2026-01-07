import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Flame, Users, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
    const [timeframe, setTimeframe] = useState('week'); // week, month, alltime
    const [leaderboardData, setLeaderboardData] = useState([
        { rank: 1, name: 'Sarah Chen', hours: 42, streak: 14, avatar: '🌟' },
        { rank: 2, name: 'You', hours: 38, streak: 12, avatar: '🚀', isCurrentUser: true },
        { rank: 3, name: 'Alex Kumar', hours: 35, streak: 10, avatar: '⚡' },
        { rank: 4, name: 'Jordan Lee', hours: 32, streak: 8, avatar: '🎯' },
        { rank: 5, name: 'Taylor Swift', hours: 28, streak: 7, avatar: '💫' },
        { rank: 6, name: 'Morgan Davis', hours: 25, streak: 6, avatar: '🔥' },
        { rank: 7, name: 'Casey Park', hours: 22, streak: 5, avatar: '✨' },
        { rank: 8, name: 'Riley Johnson', hours: 20, streak: 4, avatar: '🌈' },
    ]);

    const getRankColor = (rank) => {
        if (rank === 1) return '#FFD700'; // Gold
        if (rank === 2) return '#C0C0C0'; // Silver
        if (rank === 3) return '#CD7F32'; // Bronze
        return '#00d1ff';
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return `#${rank}`;
    };

    return (
        <div className="glass-card border-white/10 p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Trophy size={28} className="text-yellow-500" />
                    <h2 className="text-2xl font-bold">Leaderboard</h2>
                </div>

                <div className="flex gap-2">
                    {['week', 'month', 'alltime'].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${timeframe === tf
                                    ? 'bg-accent text-black'
                                    : 'bg-white/5 hover:bg-white/10'
                                }`}
                        >
                            {tf === 'alltime' ? 'All Time' : tf.charAt(0).toUpperCase() + tf.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {leaderboardData.slice(0, 3).map((user, index) => {
                    const order = index === 0 ? 1 : index === 1 ? 0 : 2; // Center the winner
                    const heights = ['h-32', 'h-40', 'h-28'];

                    return (
                        <motion.div
                            key={user.rank}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: order * 0.1 }}
                            className={`flex flex-col items-center ${order === 1 ? 'order-2' : order === 0 ? 'order-1' : 'order-3'}`}
                        >
                            <div className="text-4xl mb-2">{user.avatar}</div>
                            <div
                                className={`${heights[order]} w-full rounded-t-2xl flex flex-col items-center justify-center p-4 border-2`}
                                style={{
                                    backgroundColor: `${getRankColor(user.rank)}20`,
                                    borderColor: getRankColor(user.rank),
                                }}
                            >
                                <div className="text-3xl mb-2">{getRankIcon(user.rank)}</div>
                                <p className="font-bold text-sm text-center">{user.name}</p>
                                <p className="text-xs text-zinc-500 mt-1">{user.hours}h</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Rest of Leaderboard */}
            <div className="space-y-2">
                {leaderboardData.slice(3).map((user, index) => (
                    <motion.div
                        key={user.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + 3) * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all ${user.isCurrentUser
                                ? 'bg-accent/20 border-2 border-accent'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        <div className="w-8 text-center font-bold text-zinc-500">
                            #{user.rank}
                        </div>
                        <div className="text-2xl">{user.avatar}</div>
                        <div className="flex-1">
                            <p className="font-bold">{user.name}</p>
                            <div className="flex items-center gap-3 text-xs text-zinc-500">
                                <span className="flex items-center gap-1">
                                    <TrendingUp size={12} />
                                    {user.hours}h
                                </span>
                                <span className="flex items-center gap-1">
                                    <Flame size={12} />
                                    {user.streak} day streak
                                </span>
                            </div>
                        </div>
                        {user.isCurrentUser && (
                            <Medal size={20} className="text-accent" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Challenge Banner */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <div className="flex items-center gap-3">
                    <Users size={20} className="text-purple-400" />
                    <div>
                        <p className="font-bold text-sm">Weekly Challenge</p>
                        <p className="text-xs text-zinc-400">Complete 30 hours to win exclusive badge!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
