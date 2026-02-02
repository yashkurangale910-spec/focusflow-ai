import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Trophy, Flame, Users, Zap, Search,
    Bell, Shield, Target, Plus, ChevronRight,
    Star, Award, CheckCircle, Waves, Medal,
    MessageSquare, Play, Calendar, UserPlus
} from 'lucide-react';

const Community = () => {
    const [activeTab, setActiveTab] = useState('global');

    const leaderboardData = [
        { rank: '01', name: 'Neural_Ghost_99', tier: 'Vanguard Elite', level: '88', xp: 95, streak: 42, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost' },
        { rank: '02', name: 'SyncMaster_Pro', tier: 'Alpha Focus', level: '82', xp: 42, streak: 28, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sync' },
        { rank: '03', name: 'Void_Seeker', tier: 'Deep Vanguard', level: '75', xp: 68, streak: 15, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Void' },
    ];

    const squadSessions = [
        { id: 1, title: 'Deep Work Sprint', users: ['A', 'B', 'C'], slots: '4/5', status: 'LIVE' },
        { id: 2, title: 'Indie Hacker Flow', users: ['D', 'E'], slots: '2 Pioneers', time: '12:30 PM' },
    ];

    const badges = [
        { icon: CheckCircle, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
        { icon: Waves, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { icon: Medal, color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-white p-6 font-sans">
            {/* Main Header */}
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">FocusFlow <span className="text-cyan-400">AI</span></h1>
                    <nav className="flex items-center gap-8">
                        <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Hub</button>
                        <button className="text-sm font-bold text-cyan-400 border-b-2 border-cyan-400 pb-1">Leaderboard</button>
                        <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Missions</button>
                        <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Squads</button>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find Pioneers..."
                            className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-sm w-64 outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>
                    <button className="relative">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#030712]" />
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="text-right">
                            <p className="text-xs font-bold text-white uppercase tracking-tight">Vanguard Elite</p>
                            <p className="text-[10px] text-slate-500 font-bold tracking-widest text-right">@alex_pioneer</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-cyan-500/50 p-0.5">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="avatar" className="w-full h-full rounded-full" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Panel: Personal Pulse */}
                <div className="col-span-12 lg:col-span-3 space-y-8">
                    <div className="bg-[#0a0f1d] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

                        <div className="flex justify-between items-start mb-8">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Personal Pulse</h3>
                            <span className="text-3xl font-black text-cyan-400">#14</span>
                        </div>

                        <div className="mb-8">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Rank</p>
                            <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                />
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">240 XP to next level: <span className="text-white">Neural Master</span></p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Focus Streak</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xl font-bold">12</span>
                                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Focus Hours</p>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-xl font-bold">142h</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0a0f1d] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Active Badges</h3>
                            <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex gap-4">
                            {badges.map((badge, i) => (
                                <div key={i} className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center`}>
                                    <badge.icon className={`w-5 h-5 ${badge.color}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Center Panel: Leaderboard */}
                <div className="col-span-12 lg:col-span-6">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">Vanguard <span className="text-cyan-400">Leaderboard</span></h2>
                        <p className="text-slate-400 text-sm font-medium">Real-time neural activity from across the flow collective.</p>
                    </div>

                    <div className="flex justify-center gap-4 mb-10">
                        <button
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'global' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                            onClick={() => setActiveTab('global')}
                        >
                            Global Rank
                        </button>
                        <button
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'squad' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                            onClick={() => setActiveTab('squad')}
                        >
                            Squad Only
                        </button>
                        <button
                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'monthly' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                            onClick={() => setActiveTab('monthly')}
                        >
                            Monthly
                        </button>
                    </div>

                    <div className="bg-[#0a0f1d]/50 border border-white/5 rounded-[2.5rem] p-8 shadow-inner">
                        <div className="grid grid-cols-12 px-6 mb-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <div className="col-span-1">#</div>
                            <div className="col-span-6">Pioneer</div>
                            <div className="col-span-3">Neural XP</div>
                            <div className="col-span-2 text-right">Streak</div>
                        </div>

                        <div className="space-y-4">
                            {leaderboardData.map((node, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`grid grid-cols-12 items-center px-6 py-6 rounded-3xl border border-white/[0.03] transition-all hover:bg-white/[0.02] ${i === 0 ? 'bg-cyan-500/5' : ''}`}
                                >
                                    <div className="col-span-1 text-xl font-black text-cyan-500/50">{node.rank}</div>
                                    <div className="col-span-6 flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-900 overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                                <img src={node.avatar} alt="avatar" className="w-full h-full object-cover" />
                                            </div>
                                            {i === 0 && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#030712] flex items-center justify-center">
                                                <Zap className="w-2 h-2 text-white fill-current" />
                                            </div>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">{node.name}</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded uppercase tracking-tighter">{node.tier}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">LVL {node.level}</span>
                                            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-[100px]">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${node.xp}%` }}
                                                    className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-500">{node.xp}%</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="text-xl font-black text-white">{node.streak}</span>
                                            <Flame className={`w-4 h-4 ${i < 2 ? 'text-orange-500 fill-orange-500' : 'text-slate-600'}`} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button className="w-full mt-10 py-6 text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] hover:text-white transition-colors border-t border-white/5">
                            Load Full Rankings (Top 100)
                        </button>
                    </div>
                </div>

                {/* Right Panel: Squad Sync & Global Pulse */}
                <div className="col-span-12 lg:col-span-3 space-y-8">
                    <div className="bg-[#0a0f1d] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Users className="w-4 h-4 text-cyan-400" /> Squad Sync
                            </h3>
                        </div>

                        <div className="space-y-6">
                            {squadSessions.map((session) => (
                                <div key={session.id} className="relative p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] group cursor-pointer hover:bg-white/[0.04] transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-bold uppercase tracking-tight">{session.title}</h4>
                                        {session.status === 'LIVE' && <span className="text-[8px] font-black bg-rose-500/20 text-rose-500 px-2 py-0.5 rounded animate-pulse uppercase tracking-widest">Live</span>}
                                        {session.time && <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{session.time}</span>}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {session.users.map((u, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0f1d] bg-slate-800 overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u}`} alt="user" className="w-full h-full" />
                                                </div>
                                            ))}
                                            {session.slots === '4/5' && <div className="w-8 h-8 rounded-full border-2 border-[#0a0f1d] bg-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-500">+1</div>}
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{session.slots} filled</p>
                                    </div>
                                    <button className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-900/40">
                                        {session.status === 'LIVE' ? 'Join Party' : 'Reserve Slot'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0a0f1d] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Global Pulse</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <p className="text-xs font-medium text-slate-400">Community Hours</p>
                                <p className="text-xs font-black text-emerald-400">+12,402h</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs font-medium text-slate-400">Active Vanguards</p>
                                <p className="text-xs font-black text-cyan-400">842 online</p>
                            </div>
                        </div>

                        <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] relative group">
                            <div className="flex items-start gap-4">
                                <MessageSquare className="w-4 h-4 text-cyan-400 mt-1" />
                                <p className="text-[10px] leading-relaxed text-slate-300">
                                    <span className="text-cyan-400 font-bold">@J_Smith</span> just hit a 14-day streak!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
