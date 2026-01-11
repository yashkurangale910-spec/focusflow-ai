import React, { useState, useEffect } from 'react';
import { Flame, Award, Calendar, TrendingUp, Zap, Shield, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HabitStreaks = () => {
    const [streaks, setStreaks] = useState([
        {
            id: 1,
            name: 'Deep Focus Sync',
            current: 12,
            longest: 18,
            goal: 30,
            icon: '🎯',
            color: 'emerald'
        },
        {
            id: 2,
            name: 'Circadian Alignment',
            current: 7,
            longest: 10,
            goal: 14,
            icon: '🌅',
            color: 'amber'
        },
        {
            id: 3,
            name: 'Manifest Closure',
            current: 15,
            longest: 15,
            goal: 21,
            icon: '✅',
            color: 'indigo'
        },
        {
            id: 4,
            name: 'Pulse Monitoring',
            current: 5,
            longest: 8,
            goal: 7,
            icon: '😊',
            color: 'rose'
        },
    ]);

    const [milestones] = useState([
        { days: 7, reward: 'Vanguard Initiate', unlocked: true },
        { days: 14, reward: 'Neural Architect', unlocked: true },
        { days: 21, reward: 'Flow Commander', unlocked: false },
        { days: 30, reward: 'Deep Sync Master', unlocked: false },
    ]);

    return (
        <div className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <Flame size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Consistency Protocols</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Neural persistence monitoring</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-white uppercase tracking-widest">System Stable</span>
                </div>
            </div>

            {/* Active Protocols */}
            <div className="space-y-3 mb-10">
                {streaks.map((streak, i) => {
                    const progress = (streak.current / streak.goal) * 100;
                    const isRecord = streak.current === streak.longest;

                    return (
                        <motion.div
                            key={streak.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-5 rounded-2xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 transition-all group/item"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shadow-inner group-hover/item:scale-110 transition-transform">
                                        {streak.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-black text-white uppercase tracking-tight mb-1">{streak.name}</h4>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={10} className="text-slate-600" />
                                            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Terminal Record: {streak.longest}d</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className={`text-2xl font-black font-display text-${streak.color}-400 tabular-nums`}>
                                            {streak.current}
                                        </span>
                                        <Flame size={16} className={`text-${streak.color}-500`} />
                                    </div>
                                    {isRecord && (
                                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-[0.2em]">Peak Sync Achieved</span>
                                    )}
                                </div>
                            </div>

                            {/* Tactical Progress Bar */}
                            <div className="relative h-1.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800/50">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    className={`h-full rounded-full bg-${streak.color}-500 shadow-[0_0_8px_rgba(var(--color-${streak.color}-500),0.3)]`}
                                />
                            </div>
                            <div className="flex justify-between mt-2 px-1">
                                <span className={`text-[9px] font-bold text-${streak.color}-500/70 uppercase tracking-widest`}>{streak.current} Cycles</span>
                                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Protocol Goal: {streak.goal}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Protocol Unlocks */}
            <div className="p-6 rounded-3xl bg-slate-950/50 border border-slate-800/50 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-6 px-1">
                    <Award size={14} className="text-amber-500" />
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Neural Unlock Manifest</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {milestones.map((milestone, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${milestone.unlocked
                                    ? 'bg-emerald-500/5 border-emerald-500/20'
                                    : 'bg-slate-900/30 border-slate-800 opacity-40'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${milestone.unlocked ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tight">{milestone.reward}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{milestone.days}d Required</span>
                                {milestone.unlocked && <Zap size={10} className="text-emerald-400" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Status Buffer */}
            <div className="mt-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                <Shield size={16} className="text-indigo-400" />
                <p className="text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                    <strong className="text-indigo-400">Persistence Buffer:</strong> 1 System Freeze available if protocol synchronization is lost.
                </p>
            </div>
        </div>
    );
};

export default HabitStreaks;
