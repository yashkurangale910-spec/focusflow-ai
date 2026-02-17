import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Zap, RefreshCw, Activity, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAI } from '../services/aiService';
import { useTasks } from '../context/TaskContext';

const AIDailyPlanner = () => {
    const { tasks } = useTasks();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const generatePlan = async () => {
        if (tasks.length === 0) return;
        setLoading(true);
        setError(null);
        try {
            const taskList = tasks.map(t => `- ${t.title} (${t.priority} priority, ${t.estimatedTime}min)`).join('\n');

            const prompt = `Based on these tasks, create an optimized daily focus plan for someone with ADHD:

${taskList}

Please provide:
1. Recommended order(hardest tasks when energy is high)
2. Suggested time blocks
3. Break recommendations
4. Energy management tips

Format as a structured plan with time blocks.`;

            const response = await chatWithAI([
                { role: 'user', content: prompt }
            ]);

            if (response) {
                setPlan(response);
            } else {
                setError("Neural uplink timed out. Please try again.");
            }
        } catch (error) {
            console.error('Failed to generate plan:', error);
            setError("Synchronization failed. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="surface-glass p-8 rounded-[2rem] border-white/5 group relative overflow-hidden h-full flex flex-col shadow-2xl">
            {/* Background Neural Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-10 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="p-4 rounded-[1.2rem] bg-indigo-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                        <Brain size={28} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Cognitive <span className="text-cyan-400 not-italic">Scheduler</span></h2>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">AI Matrix Synthesis</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={generatePlan}
                    disabled={loading || tasks.length === 0}
                    className="px-8 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-xl shadow-cyan-900/40 relative overflow-hidden group/btn"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    {loading ? (
                        <><RefreshCw size={14} className="animate-spin text-cyan-200" />Linking...</>
                    ) : (
                        <><Zap size={14} className="fill-current" />Optimize Grid</>
                    )}
                </button>
            </div>

            <div className="flex-1 relative z-10">
                <AnimatePresence mode="wait">
                    {!plan && !loading && !error ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                        >
                            <div className="relative group/icon">
                                <div className="absolute inset-0 bg-cyan-500/10 rounded-[2rem] blur-xl group-hover/icon:bg-indigo-500/20 transition-all duration-700" />
                                <div className="w-20 h-20 rounded-[2rem] bg-black/40 border border-white/5 flex items-center justify-center relative">
                                    <Calendar size={36} className="text-slate-600 group-hover/icon:text-cyan-500/50 transition-colors" />
                                </div>
                            </div>
                            <div className="max-w-[320px]">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
                                    Awaiting Neural Directives
                                </p>
                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.1em] mt-2">
                                    Connect your task buffer to synthesize a focus timeline
                                </p>
                                {tasks.length === 0 && (
                                    <div className="mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-rose-500/5 border border-rose-500/10 w-fit mx-auto">
                                        <Activity size={10} className="text-rose-500 animate-pulse" />
                                        <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest">Buffer Empty</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : null}

                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20 text-center space-y-8"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" />
                                <div className="w-24 h-24 rounded-full border border-white/10 p-2 relative flex items-center justify-center">
                                    <div className="absolute inset-0 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
                                    <Sparkles size={40} className="text-cyan-400 animate-pulse" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.4em] animate-pulse">
                                    Neural Matrix Sync
                                </p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Optimizing Session Grids...</p>
                            </div>
                        </motion.div>
                    ) : null}

                    {error && !loading ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                        >
                            <div className="w-20 h-20 rounded-[2rem] bg-rose-500/5 border border-rose-500/10 flex items-center justify-center shadow-lg shadow-rose-900/10">
                                <Activity size={32} className="text-rose-500 animate-bounce" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-[11px] font-black text-rose-400 uppercase tracking-[0.3em]">
                                    Sync Fragmented
                                </p>
                                <p className="text-[9px] font-bold text-slate-500">{error}</p>
                            </div>
                            <button onClick={generatePlan} className="px-6 py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                                Re-Link Uplink
                            </button>
                        </motion.div>
                    ) : null}

                    {plan && !loading ? (
                        <motion.div
                            key="plan"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8 h-full flex flex-col"
                        >
                            <div className="flex-1 p-8 rounded-[2rem] bg-black/40 border border-white/5 shadow-inner overflow-y-auto no-scrollbar relative min-h-[300px]">
                                <div className="absolute top-0 right-0 p-8 text-[8px] font-black text-cyan-400/20 uppercase tracking-[0.5em] rotate-90 origin-right">Briefing_v1.0</div>
                                <div className="prose prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap text-[11px] font-medium leading-relaxed tracking-wide text-slate-300 first-letter:text-2xl first-letter:font-black first-letter:text-cyan-400">
                                        {plan}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/5 pt-6">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest italic">Succession Protocol Active</p>
                                <button
                                    onClick={generatePlan}
                                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black text-slate-400 hover:text-cyan-400 uppercase tracking-widest transition-all border border-white/5"
                                >
                                    <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-700" />
                                    Synthesize New Trajectory
                                </button>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AIDailyPlanner;
