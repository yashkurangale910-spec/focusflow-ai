import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import {
    Zap, Activity, Clock, Brain, Sparkles, Target,
    TrendingUp, Play, ArrowRight, Flame, Timer
} from 'lucide-react';

const Home = ({ onNavigate }) => {
    const handleNavigate = (page) => {
        if (onNavigate) onNavigate(page);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section - Asymmetric Split Layout */}
            <div className="grid grid-cols-12 gap-6 mb-12">
                {/* Left: Main Hero */}
                <motion.div
                    className="col-span-12 lg:col-span-7 relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-transparent border border-white/5 overflow-hidden min-h-[400px] flex flex-col justify-between">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Neural Link Active</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-4 leading-[0.9]">
                                <span className="block text-white">UNLOCK</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
                                    HYPERFOCUS
                                </span>
                            </h1>

                            <p className="text-slate-400 text-lg max-w-md leading-relaxed mt-6">
                                Deploy cognitive protocols designed for
                                <span className="text-cyan-400 font-semibold"> neurodivergent minds</span>.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="relative z-10 flex items-center gap-4 mt-8">
                            <button
                                onClick={() => handleNavigate('focus')}
                                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl text-white font-bold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-[1.02] cursor-pointer"
                            >
                                <Play className="w-5 h-5" fill="currentColor" />
                                Start Focus Session
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <span className="text-slate-500 text-sm">25 min deep work</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Stacked Cards */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                    {/* Quick Stats Card */}
                    <motion.div
                        className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 to-slate-900/60 border border-purple-500/20 flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-1">Today's Progress</p>
                                <h3 className="text-3xl font-black text-white">4.2<span className="text-lg text-slate-500 font-normal">hrs</span></h3>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                                <Timer className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-[70%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                        </div>
                        <p className="text-slate-500 text-xs mt-2">70% of daily goal achieved</p>
                    </motion.div>

                    {/* Streak Card */}
                    <motion.div
                        className="p-6 rounded-3xl bg-gradient-to-br from-amber-900/30 to-slate-900/60 border border-amber-500/20 flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                <Flame className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">Current Streak</p>
                                <h3 className="text-4xl font-black text-white">12<span className="text-lg text-slate-500 font-normal ml-1">days</span></h3>
                            </div>
                        </div>
                    </motion.div>

                    {/* AI Suggestion */}
                    <motion.div
                        className="p-6 rounded-3xl bg-gradient-to-br from-cyan-900/30 to-slate-900/60 border border-cyan-500/20 flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-2">AI Suggestion</p>
                                <p className="text-slate-300 text-sm leading-relaxed">Your peak focus window is in <span className="text-cyan-400 font-bold">23 min</span>. Consider preparing your workspace now.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Protocol Grid - Bento Layout */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full" />
                    <h2 className="text-2xl font-bold text-white">Focus Protocols</h2>
                </div>

                <div className="grid grid-cols-12 gap-4">
                    {/* Large Featured Card - Focus */}
                    <motion.div
                        onClick={() => handleNavigate('focus')}
                        className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2 p-8 rounded-3xl bg-gradient-to-br from-indigo-900/60 to-slate-900/80 border border-indigo-500/30 relative overflow-hidden group cursor-pointer hover:border-indigo-400/50 transition-all min-h-[300px]"
                        whileHover={{ scale: 1.01 }}
                    >
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px]" />
                        <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Brain className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">Recommended</span>
                            <h3 className="text-3xl font-black text-white mb-3">Deep Work</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">Intense focus for complex engineering and architectural tasks. No distractions.</p>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">45 min</span>
                                <span className="text-slate-500 text-xs">→ Best for coding, writing</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tasks */}
                    <motion.div
                        onClick={() => handleNavigate('tasks')}
                        className="col-span-6 md:col-span-3 lg:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-emerald-900/50 to-slate-900/80 border border-emerald-500/20 relative overflow-hidden group cursor-pointer hover:border-emerald-400/40 transition-all"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Target className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Task Manager</h3>
                        <p className="text-slate-500 text-sm">Manage directives</p>
                    </motion.div>

                    {/* Wellness */}
                    <motion.div
                        onClick={() => handleNavigate('wellness')}
                        className="col-span-6 md:col-span-3 lg:col-span-3 p-6 rounded-3xl bg-gradient-to-br from-rose-900/50 to-slate-900/80 border border-rose-500/20 relative overflow-hidden group cursor-pointer hover:border-rose-400/40 transition-all"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Activity className="w-8 h-8 text-rose-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Wellness</h3>
                        <p className="text-slate-500 text-sm">Mind & body</p>
                    </motion.div>

                    {/* Insights */}
                    <motion.div
                        onClick={() => handleNavigate('insights')}
                        className="col-span-6 md:col-span-4 lg:col-span-4 p-6 rounded-3xl bg-gradient-to-br from-amber-900/50 to-slate-900/80 border border-amber-500/20 relative overflow-hidden group cursor-pointer hover:border-amber-400/40 transition-all"
                        whileHover={{ scale: 1.02 }}
                    >
                        <Zap className="w-8 h-8 text-amber-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Insights</h3>
                        <p className="text-slate-500 text-sm">Performance data</p>
                    </motion.div>

                    {/* Zenith Path */}
                    <motion.div
                        onClick={() => handleNavigate('zenith')}
                        className="col-span-6 md:col-span-4 lg:col-span-3 p-6 rounded-3xl bg-gradient-to-br from-cyan-900/50 to-slate-900/80 border border-cyan-500/20 relative overflow-hidden group cursor-pointer hover:border-cyan-400/40 transition-all"
                        whileHover={{ scale: 1.02 }}
                    >
                        <TrendingUp className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Zenith Path</h3>
                        <p className="text-slate-500 text-sm">Growth journey</p>
                    </motion.div>
                </div>
            </section>

            {/* Insights Row */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
                        <h2 className="text-2xl font-bold text-white">Performance Insights</h2>
                    </div>
                    <button className="text-sm text-slate-500 hover:text-white transition-colors">View All →</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Peak Performance', value: '10:45 AM', desc: 'Highest focus recorded', icon: Zap, gradient: 'from-amber-500 to-orange-500' },
                        { label: 'Weekly Average', value: '5.2 hrs', desc: '+12% from last week', icon: TrendingUp, gradient: 'from-emerald-500 to-cyan-500' },
                        { label: 'Next Break', value: '23 min', desc: 'Scheduled rest period', icon: Clock, gradient: 'from-purple-500 to-pink-500' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="p-6 rounded-3xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-white mb-1">{stat.value}</h3>
                                    <p className="text-slate-500 text-sm">{stat.desc}</p>
                                </div>
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
