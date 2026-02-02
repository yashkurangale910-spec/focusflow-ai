import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap, Activity, Clock, BarChart3, Search,
    Bell, Settings, User, RefreshCw, Play,
    Pause, SkipForward, SkipBack, Circle,
    Timer, Flame, TrendingUp, ShieldCheck
} from 'lucide-react';

const NexusDashboard = () => {
    // Mock data for the heatmap
    const heatmapData = Array(48).fill(0).map(() => Math.random());

    const stats = [
        { label: "Neural Stability", value: "88%", change: "+2.4%", color: "bg-blue-600" },
        { label: "Cognitive Momentum", value: "4.2h", change: "+15m", color: "bg-purple-600" },
        { label: "Resilience Index", value: "92/100", change: "+5", color: "bg-cyan-500" }
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-white p-6 font-sans">
            {/* Top Bar */}
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4 bg-blue-900/20 border border-blue-500/20 px-4 py-2 rounded-full">
                    <Flame className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-blue-200 uppercase tracking-widest">Neural Persistence: 15 Day Streak</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search neural patterns..."
                            className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2.5 text-sm w-64 outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                        />
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#030712]" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Settings className="w-5 h-5 text-slate-400" />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="profile" className="w-8 h-8 rounded-full" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Welcome Section */}
            <section className="mb-12 flex items-end justify-between">
                <div>
                    <h1 className="text-5xl font-bold mb-3 tracking-tight">Systems Optimal, Alex</h1>
                    <p className="text-slate-400 text-lg">
                        Current cognitive load is at <span className="text-blue-400 font-bold">42%</span>. Optimal environment detected
                        for deep-work architecture.
                    </p>
                </div>
                <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl font-bold hover:bg-white/10 transition-all group">
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                    Sync Neural Data
                </button>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        className="bg-[#0a0f1e] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <p className="text-sm font-medium text-slate-500 mb-4">{stat.label}</p>
                        <div className="flex items-baseline gap-3 mb-6">
                            <h3 className="text-4xl font-bold">{stat.value}</h3>
                            <span className="text-sm font-bold text-green-400">{stat.change}</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${stat.color} shadow-[0_0_10px_rgba(37,99,235,0.5)]`}
                                initial={{ width: 0 }}
                                animate={{ width: '70%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-12 gap-8">
                {/* Temporal Architecture (Center) */}
                <motion.div
                    className="col-span-12 lg:col-span-8 bg-[#0a0f1e] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-start justify-between mb-16">
                        <div>
                            <h3 className="text-2xl font-bold mb-1">Temporal Architecture</h3>
                            <p className="text-slate-500 text-sm">Deep work session: 01:42:00 elapsed</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                            <Timer className="w-5 h-5 text-blue-500" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-10 relative">
                        {/* Circular Timer Visualization */}
                        <div className="relative w-80 h-80 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="160"
                                    cy="160"
                                    r="150"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-white/5"
                                />
                                <motion.circle
                                    cx="160"
                                    cy="160"
                                    r="150"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray="942"
                                    initial={{ strokeDashoffset: 942 }}
                                    animate={{ strokeDashoffset: 650 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="text-blue-600"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-7xl font-bold tracking-tighter">18:42</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-400 mt-2">Current Pulse</span>
                            </div>
                        </div>

                        {/* Timeline Mock */}
                        <div className="w-full mt-20 flex items-end justify-between h-20 gap-1 px-4">
                            {[0.2, 0.4, 0.3, 0.6, 0.8, 1, 0.7, 0.4, 0.2, 0.1, 0.15, 0.2].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full bg-blue-600 rounded-lg transition-all duration-300"
                                        style={{ height: `${h * 100}%`, opacity: h > 0.5 ? 1 : 0.3 }}
                                    />
                                    <span className="text-[8px] text-slate-600 font-bold">
                                        {i === 0 ? '08:00 AM' : i === 3 ? '12:00 PM' : i === 6 ? '04:00 PM' : i === 9 ? '08:00 PM' : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    {/* Vitality Heatmap */}
                    <motion.div
                        className="bg-[#0a0f1e] border border-white/5 rounded-[2.5rem] p-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h3 className="text-xl font-bold mb-1">Vitality Heatmap</h3>
                        <p className="text-slate-500 text-xs mb-8">Peak cognitive energy hotspots</p>

                        <div className="grid grid-cols-8 gap-3 mb-10">
                            {heatmapData.map((val, i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-md transition-all duration-500"
                                    style={{
                                        backgroundColor: val > 0.8 ? '#2563eb' : val > 0.6 ? '#1d4ed8' : val > 0.4 ? '#1e3a8a' : '#0f172a',
                                        opacity: val > 0.2 ? 1 : 0.3,
                                        boxShadow: val > 0.8 ? '0 0 10px rgba(37,99,235,0.4)' : 'none'
                                    }}
                                />
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium tracking-wide">Next Peak Forecast</span>
                                <span className="text-xs font-bold text-cyan-400">02:15 PM</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-500 font-medium tracking-wide">Energy Drain Warning</span>
                                <span className="text-xs font-bold text-orange-500">04:45 PM</span>
                            </div>
                        </div>

                        {/* Player Mini */}
                        <div className="mt-10 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 relative overflow-hidden group">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] uppercase tracking-widest font-black text-blue-400 mb-0.5">Soundscape</p>
                                <h4 className="text-sm font-bold truncate">Binaural Beta</h4>
                                <p className="text-[10px] text-slate-500 truncate italic">"Complex problem solving..."</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:text-blue-400 transition-colors"><SkipBack className="w-4 h-4" /></button>
                                <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-all"><Pause className="w-4 h-4 fill-white" /></button>
                                <button className="p-2 hover:text-blue-400 transition-colors"><SkipForward className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Session Launcher */}
                    <motion.div
                        className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden group cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                            <Zap className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-2">Initiate Protocol</h3>
                            <p className="text-white/80 text-sm mb-6">Launch customized deep-work environment with optimized neural feedback loop.</p>
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                                Start Focus Session
                                <Play className="w-4 h-4 fill-blue-600" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default NexusDashboard;
