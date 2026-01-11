import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Flame, Users, Medal, Zap, Shield, Activity, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Leaderboard = () => {
    const [timeframe, setTimeframe] = useState('week'); // week, month, alltime
    const [leaderboardData, setLeaderboardData] = useState([
        { rank: 1, name: 'Sarah.Chen', hours: 42, streak: 14, avatar: '🌟', level: 'Level 42 Zenith' },
        { rank: 2, name: 'You (Node_0x1)', hours: 38, streak: 12, avatar: '🚀', isCurrentUser: true, level: 'Level 38 Vanguard' },
        { rank: 3, name: 'Alex.Kumar', hours: 35, streak: 10, avatar: '⚡', level: 'Level 35 Catalyst' },
        { rank: 4, name: 'Jordan.Lee', hours: 32, streak: 8, avatar: '🎯', level: 'Level 32 Node' },
        { rank: 5, name: 'Taylor.S', hours: 28, streak: 7, avatar: '💫', level: 'Level 28 Node' },
        { rank: 6, name: 'Morgan.D', hours: 25, streak: 6, avatar: '🔥', level: 'Level 25 Node' },
        { rank: 7, name: 'Casey.P', hours: 22, streak: 5, avatar: '✨', level: 'Level 22 Node' },
        { rank: 8, name: 'Riley.J', hours: 20, streak: 4, avatar: '🌈', level: 'Level 20 Node' },
    ]);

    const getRankColor = (rank) => {
        if (rank === 1) return '#f59e0b'; // Gold
        if (rank === 2) return '#94a3b8'; // Silver
        if (rank === 3) return '#b45309'; // Bronze
        return '#6366f1'; // Indigo
    };

    return (
        <div className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-40 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-indigo-500/10 transition-colors" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
                        <Globe size={24} className="text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black font-display text-white tracking-tight">Global Performance <span className="text-indigo-500">Matrix</span></h2>
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5">
                                <Activity size={10} className="text-emerald-500" />
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">4.2k Nodes Active</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950/50 border border-slate-900 self-start md:self-center">
                    {['week', 'month', 'alltime'].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${timeframe === tf
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            {tf === 'alltime' ? 'All Time' : tf}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top 3 Elite Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                {leaderboardData.slice(0, 3).map((user, index) => {
                    const order = index === 0 ? 1 : index === 1 ? 0 : 2; // Selection logic remains
                    const colors = {
                        1: 'amber', // Gold
                        2: 'slate', // Silver
                        3: 'orange', // Bronze
                    };
                    const color = colors[user.rank];

                    return (
                        <motion.div
                            key={user.rank}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: order * 0.1 }}
                            className={`relative p-6 rounded-[2rem] bg-slate-950/40 border border-slate-900 flex flex-col items-center group/node hover:border-${color}-500/30 transition-all ${order === 1 ? 'md:-mt-4' : ''}`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity`} />

                            <div className="relative mb-4">
                                <div className="text-5xl group-hover:scale-110 transition-transform">{user.avatar}</div>
                                <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-${color}-500 border-2 border-slate-950 flex items-center justify-center text-[10px] font-black text-white shadow-lg`}>
                                    #{user.rank}
                                </div>
                            </div>

                            <h3 className="text-xs font-black text-white uppercase tracking-tight text-center">{user.name}</h3>
                            <p className={`text-[8px] font-black text-${color}-400/70 uppercase tracking-widest mt-1 mb-4`}>{user.level}</p>

                            <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-slate-900">
                                <div className="text-center border-r border-slate-900">
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Throughput</p>
                                    <p className="text-sm font-bold text-white tabular-nums">{user.hours}h</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Persistence</p>
                                    <p className="text-sm font-bold text-white tabular-nums">{user.streak}d</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Matrix Rank Feed */}
            <div className="space-y-3 relative z-10">
                <div className="px-4 flex items-center text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2">
                    <span className="w-12">Rank</span>
                    <span className="flex-1">Node Identity</span>
                    <span className="w-20 text-right">Throughput</span>
                    <span className="w-24 text-right">Stability</span>
                </div>

                {leaderboardData.slice(3).map((user, index) => (
                    <motion.div
                        key={user.rank}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + 3) * 0.05 }}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${user.isCurrentUser
                            ? 'bg-indigo-500/10 border-indigo-500/30'
                            : 'bg-slate-950/20 border-slate-900/50 hover:bg-slate-950/40 hover:border-slate-800'
                            }`}
                    >
                        <div className="w-12 text-center text-[10px] font-black font-display text-slate-600">
                            {user.rank.toString().padStart(2, '0')}
                        </div>
                        <div className="text-2xl min-w-[2.5rem] flex justify-center">{user.avatar}</div>
                        <div className="flex-1">
                            <p className={`text-xs font-black uppercase tracking-tight ${user.isCurrentUser ? 'text-indigo-400' : 'text-slate-300'}`}>
                                {user.name}
                            </p>
                            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{user.level}</p>
                        </div>
                        <div className="w-20 text-right">
                            <p className="text-xs font-bold text-white tabular-nums">{user.hours}h</p>
                        </div>
                        <div className="w-24 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                                <Flame size={10} className="text-rose-500" />
                                <span className="text-[10px] font-bold text-slate-400">{user.streak}d</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Neural Challenge Uplink */}
            <div className="mt-10 p-6 rounded-[2rem] bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6 group/challenge">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-lg group-hover/challenge:scale-110 transition-transform">
                        <Zap size={24} className="text-indigo-400 animate-pulse" />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">Active Neural Challenge</h4>
                        <p className="text-[10px] font-medium text-slate-500 leading-relaxed max-w-xs">Complete <span className="text-indigo-400 font-bold">30 hours</span> of focused output to decrypt the "Zenith Node" badge.</p>
                    </div>
                </div>
                <button className="px-6 h-12 rounded-xl bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20">
                    Sync Progress
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;
