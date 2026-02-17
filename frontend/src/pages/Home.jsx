import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../components/ScrollReveal';
import StreakDisplay from '../components/StreakDisplay';
import {
    Zap, Activity, Clock, Brain, Sparkles, Target,
    TrendingUp, Play, ArrowRight, Flame, Timer
} from 'lucide-react';
import { MorphingBlob, ParticleField, CosmicBackground } from '../components/UniqueEffects';

const Home = ({ onNavigate }) => {
    const handleNavigate = (page) => {
        if (onNavigate) onNavigate(page);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section - Neural Command Dashboard */}
            <div className="grid grid-cols-12 gap-8 mb-16">
                {/* Left: Strategic Directive Matrix */}
                <motion.div
                    className="col-span-12 lg:col-span-8 relative"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="relative p-12 rounded-[3rem] bg-black border border-white/5 overflow-hidden min-h-[500px] flex flex-col justify-between shadow-2xl">
                        {/* Neural Matrix Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent h-1/2 w-full"
                                animate={{ y: ['-100%', '200%'] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* Particle Field for depth */}
                        <ParticleField count={25} color="cyan" />

                        {/* Content Layer */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-md">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 italic">Neural Link: Optimal</span>
                                </div>
                                <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500/40 to-transparent" />
                            </div>

                            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.85] uppercase italic">
                                <span className="block text-white opacity-90">DEPLOY</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                                    HYPERFOCUS
                                </span>
                            </h1>

                            <div className="flex items-start gap-6 mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm max-w-xl">
                                <div className="w-1 h-full bg-cyan-500/30 rounded-full" />
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    Strategic cognitive protocols engineered for
                                    <span className="text-white font-black italic"> pioneer minds</span>.
                                    Maximize neural efficiency through structured divergence.
                                </p>
                            </div>
                        </div>

                        {/* CTA Cluster */}
                        <div className="relative z-10 flex flex-wrap items-center gap-8 mt-12">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-cyan-600 to-indigo-600 rounded-2xl opacity-40 group-hover:opacity-100 blur-xl transition-all duration-700" />
                                <button
                                    onClick={() => handleNavigate('focus')}
                                    className="relative flex items-center gap-4 px-10 py-5 bg-black border border-white/10 rounded-2xl text-white font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden group/btn italic uppercase tracking-tighter"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                                    <Play className="w-6 h-6 relative z-10 fill-current" />
                                    <span className="relative z-10">Initiate Protocol</span>
                                    <ArrowRight className="w-6 h-6 relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
                                </button>
                            </div>

                            <div className="flex gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic">// Current Iteration</p>
                                    <p className="text-white font-bold text-lg">25:00 <span className="text-slate-600 text-sm font-medium not-italic">Session</span></p>
                                </div>
                                <div className="w-[1px] h-10 bg-white/5" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">// Neural Load</p>
                                    <p className="text-white font-bold text-lg">Optimal <span className="text-slate-600 text-sm font-medium not-italic">State</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Telemetry Stack */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                    {/* Performance Monitor */}
                    <motion.div
                        className="p-8 rounded-[2.5rem] bg-black border border-white/5 flex-1 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 cursor-pointer shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                            <Activity size={80} className="text-indigo-400" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-2 italic">Performance Pulse</p>
                            <div className="flex items-baseline gap-2 mb-6">
                                <h3 className="text-5xl font-black text-white italic tracking-tighter transition-all duration-500">4.2</h3>
                                <span className="text-sm font-black text-slate-600 uppercase italic">Operational Hours</span>
                            </div>

                            <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: '70%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                            <div className="flex justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest italic">
                                <span>Efficiency Index</span>
                                <span className="text-indigo-400">70% Stability</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Streak Matrix */}
                    <motion.div
                        className="flex-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <StreakDisplay variant="home" />
                    </motion.div>

                    {/* Cognitive Intelligence Feed */}
                    <motion.div
                        className="p-8 rounded-[2.5rem] bg-black border border-cyan-500/20 flex-initial relative overflow-hidden group shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                                <Brain className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400 mb-2 italic">Neural Insight</p>
                                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                    Peak metabolic resonance in <span className="text-white font-black italic">23 min</span>.
                                    Prepare terminal for intensive protocol.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Protocol Grid - Bento Layout */}
            <section className="mb-12 relative">
                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full glow-spread" />
                    <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">Focus Protocols</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-transparent" />
                </div>

                <div className="grid grid-cols-12 gap-6 text-left">
                    {/* Deep Work */}
                    <motion.div
                        onClick={() => handleNavigate('focus')}
                        className="col-span-12 md:col-span-6 lg:col-span-5 row-span-2 p-10 rounded-[2.5rem] bg-black border border-indigo-500/30 relative overflow-hidden group cursor-pointer hover:border-indigo-400/60 shadow-2xl transition-all duration-500 min-h-[350px]"
                        whileHover={{ scale: 1.02, y: -8 }}
                    >
                        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-all duration-700" />
                        <div className="relative z-10 h-full flex flex-col justify-end">
                            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 w-fit mb-6">
                                <Brain className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tighter">Deep Work</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs uppercase font-medium tracking-widest">High-intensity cognitive focus protocol</p>
                            <div className="flex items-center gap-4">
                                <span className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">45 Minutes</span>
                                <span className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em] italic">→ Code / Research</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Task Matrix */}
                    <motion.div
                        onClick={() => handleNavigate('tasks')}
                        className="col-span-6 md:col-span-3 lg:col-span-4 p-8 rounded-[2rem] bg-black border border-emerald-500/20 relative overflow-hidden group cursor-pointer hover:border-emerald-400/40 transition-all duration-500"
                        whileHover={{ y: -5 }}
                    >
                        <div className="relative z-10 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">Task Matrix</h3>
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Directive management system</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-emerald-500" initial={{ width: 0 }} whileInView={{ width: '60%' }} />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 tracking-tighter italic">8/13 ACTIVE</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Wellness */}
                    <motion.div
                        onClick={() => handleNavigate('wellness')}
                        className="col-span-6 md:col-span-3 lg:col-span-3 p-8 rounded-[2rem] bg-black border border-rose-500/20 relative overflow-hidden group cursor-pointer hover:border-rose-400/40 transition-all duration-500"
                        whileHover={{ y: -5 }}
                    >
                        <div className="relative z-10 text-left">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6">
                                <Activity className="w-6 h-6 text-rose-400" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">Wellness</h3>
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-6">Metabolic recharge link</p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                                <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Next Break: 45m</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Strategic Insights */}
                    <motion.div
                        onClick={() => handleNavigate('insights')}
                        className="col-span-6 md:col-span-6 lg:col-span-4 p-8 rounded-[2rem] bg-black border border-amber-500/20 relative overflow-hidden group cursor-pointer hover:border-amber-400/40 transition-all duration-500"
                    >
                        <Zap size={24} className="text-amber-400 mb-6" />
                        <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">Strategic Insights</h3>
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest italic">Performance telemetry analysis</p>
                    </motion.div>

                    {/* Zenith Path */}
                    <motion.div
                        onClick={() => handleNavigate('zenith')}
                        className="col-span-6 md:col-span-6 lg:col-span-3 p-8 rounded-[2rem] bg-black border border-cyan-500/20 relative overflow-hidden group cursor-pointer hover:border-cyan-400/40 transition-all duration-500"
                    >
                        <TrendingUp size={24} className="text-cyan-400 mb-6" />
                        <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">Zenith Path</h3>
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest italic">Growth trajectory mapping</p>
                    </motion.div>
                </div>
            </section>

            {/* Performance Insights Row */}
            <section className="mt-16">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-indigo-500 rounded-full" />
                        <h2 className="text-2xl font-bold text-white uppercase italic tracking-tighter">System Telemetry</h2>
                    </div>
                    <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-all italic">Access Full Metadata → </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { label: 'Peak Resonance', value: '10:45 AM', desc: 'Max focus recorded', icon: Zap, color: 'text-amber-400' },
                        { label: 'Cumulative Load', value: '5.2 hrs', desc: '+12.4% vs baseline', icon: TrendingUp, color: 'text-emerald-400' },
                        { label: 'Cooldown Phase', value: '23 min', desc: 'Strategic rest period', icon: Clock, color: 'text-purple-400' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            className="p-8 rounded-[2rem] bg-black border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                <stat.icon size={40} className={stat.color} />
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">{stat.label}</p>
                            <h3 className="text-4xl font-black text-white italic tracking-tighter mb-2">{stat.value}</h3>
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
