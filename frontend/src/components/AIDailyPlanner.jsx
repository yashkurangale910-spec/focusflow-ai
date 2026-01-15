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
        <div className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 group relative overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
                        <Sparkles size={24} className="text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black font-display text-white uppercase tracking-tight">Cognitive <span className="text-indigo-500">Scheduler</span></h2>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">AI Optimized</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={generatePlan}
                    disabled={loading || tasks.length === 0}
                    className="px-6 h-12 rounded-xl bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-400 active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
                >
                    {loading ? (
                        <><RefreshCw size={14} className="animate-spin" />Syncing...</>
                    ) : (
                        <><Zap size={14} />Generate Plan</>
                    )}
                </button>
            </div>

            <div className="flex-1 relative z-10">
                <AnimatePresence mode="wait">
                    {!plan && !loading && !error ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-slate-950/50 border border-slate-900 flex items-center justify-center mb-2">
                                <Calendar size={32} className="text-slate-600" />
                            </div>
                            <div className="max-w-[280px]">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                    Initiate neural optimization to generate your focus timeline
                                </p>
                                {tasks.length === 0 && (
                                    <p className="text-[9px] font-bold text-rose-500/70 uppercase tracking-widest mt-2">
                                        No active tasks detected in local buffer
                                    </p>
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
                            className="flex flex-col items-center justify-center py-10 text-center space-y-6"
                        >
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 animate-ping" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Brain size={32} className="text-indigo-500 animate-pulse" />
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] animate-pulse">
                                Synthesizing Neural Schedule
                            </p>
                        </motion.div>
                    ) : null}

                    {error && !loading ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                        >
                            <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-2">
                                <Activity size={32} className="text-rose-500" />
                            </div>
                            <p className="text-[11px] font-bold text-rose-400 uppercase tracking-widest">
                                {error}
                            </p>
                            <button onClick={generatePlan} className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:underline">
                                Retry Uplink
                            </button>
                        </motion.div>
                    ) : null}

                    {plan && !loading ? (
                        <motion.div
                            key="plan"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-900 shadow-inner">
                                <div className="prose prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap text-[11px] font-medium leading-relaxed tracking-wide text-slate-300">
                                        {plan}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={generatePlan}
                                className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors"
                            >
                                <RefreshCw size={12} />
                                Re-Calculate Trajectory
                            </button>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AIDailyPlanner;
