import React from 'react';
import AIDailyPlanner from '../components/AIDailyPlanner';
import Leaderboard from '../components/Leaderboard';
import CoWorkingRoom from '../components/CoWorkingRoom';
import { Share2, Users, Activity } from 'lucide-react';

const Social = () => {
    return (
        <div className="space-y-12 animate-soft-entry pb-24">
            {/* Social Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Collective Intelligence Uplink</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-white tracking-tight">Neural <span className="text-indigo-500">Collective</span> Gateway</h1>
                    <p className="text-sm font-medium text-slate-500 max-w-xl leading-relaxed">
                        Access shared cognitive environments, establish real-time sync links with other nodes, and monitor the global performance matrix.
                    </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-900 shadow-inner">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Density</p>
                        <p className="text-sm font-bold text-indigo-400">High Resolution</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Share2 size={20} className="text-indigo-400" />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Synchronization Instruments */}
                <div className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-10">
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 px-2">
                                <Users size={14} className="text-indigo-400" />
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Synchronization Hub</h3>
                            </div>
                            <CoWorkingRoom />
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-center gap-2 px-2">
                                <Activity size={14} className="text-emerald-400" />
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cognitive Scheduling</h3>
                            </div>
                            <AIDailyPlanner />
                        </section>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-2">
                            <Activity size={14} className="text-indigo-400" />
                            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Performance Matrix</h3>
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
