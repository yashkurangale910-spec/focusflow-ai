import React from 'react';
import { motion } from 'framer-motion';
import AIDailyPlanner from '../components/AIDailyPlanner';
import Leaderboard from '../components/Leaderboard';
import CoWorkingRoom from '../components/CoWorkingRoom';
import { Share2, Users, Activity } from 'lucide-react';

const Social = () => {
    return (
        <div className="space-y-12 animate-soft-entry pb-24">
            {/* Social Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
                <div className="absolute -top-24 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Collective Intelligence Uplink</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[8px] font-bold text-slate-500 uppercase tracking-widest">v2.4.0-STABLE</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-5xl font-extrabold font-display text-white tracking-tight leading-none">
                            Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Collective</span> Gateway
                        </h1>
                        <p className="text-sm font-medium text-slate-500 max-w-xl leading-relaxed">
                            Access shared cognitive environments, establish real-time sync links with other nodes, and monitor the global performance matrix.
                        </p>
                    </div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="flex items-center gap-5 p-5 rounded-[2rem] bg-slate-950/40 border border-slate-900 shadow-2xl group/density cursor-pointer hover:border-indigo-500/30 transition-all relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover/density:opacity-100 transition-opacity" />
                    <div className="text-right relative z-10">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-1">Global Density</p>
                        <div className="flex items-center justify-end gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                            <p className="text-sm font-bold text-indigo-400">High Resolution</p>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative z-10 group-hover/density:bg-indigo-500/20 transition-colors shadow-inner">
                        <Share2 size={20} className="text-indigo-400 group-hover/density:scale-110 transition-transform" />
                    </div>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Right Column (Leaderboard) - Takes 5 cols on lg, but we'll swap order for visual flow if needed */}
                <div className="lg:col-span-12 xl:col-span-12 grid grid-cols-1 xl:grid-cols-2 gap-10">
                    <div className="space-y-10">
                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-indigo-400" />
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Synchronization Hub</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest underline decoration-emerald-500/30">Network Online</span>
                                </div>
                            </div>
                            <CoWorkingRoom />
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2">
                                    <Activity size={14} className="text-emerald-400" />
                                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cognitive Scheduling</h3>
                                </div>
                                <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">AI Engine Optimized</span>
                            </div>
                            <AIDailyPlanner />
                        </section>
                    </div>

                    <div className="space-y-4 h-full">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <Activity size={14} className="text-indigo-400" />
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Performance Matrix</h3>
                            </div>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                                <div className="w-1 h-1 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Elite Tier Only</span>
                            </div>
                        </div>
                        <Leaderboard />
                    </div>
                </div>
            </div>

            <footer className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Collective Engine v2.4.0 // Multi-Node Enabled</p>
                <div className="flex gap-6">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Protocol: Encrypted Sync</span>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Uptime: 99.99%</span>
                </div>
            </footer>
        </div>
    );
};

export default Social;
