import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Zap, Award, BarChart3, Shield, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '../context/AnalyticsContext';

const FocusScore = () => {
    const { sessions, mood } = useAnalytics();
    const [score, setScore] = useState(0);
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        calculateScore();
    }, [sessions]);

    const calculateScore = () => {
        if (sessions.length === 0) {
            setScore(74); // Demo baseline
            return;
        }

        const recentSessions = sessions.slice(-7);
        const daysWithSessions = new Set(recentSessions.map(s => new Date(s.createdAt).toDateString())).size;
        const consistencyScore = (daysWithSessions / 7) * 40;
        const qualitySessions = recentSessions.filter(s => (s.duration || 25) >= 25).length;
        const durationScore = (qualitySessions / Math.max(recentSessions.length, 1)) * 30;
        const totalMinutes = recentSessions.reduce((sum, s) => sum + (s.duration || 25), 0);
        const timeScore = Math.min((totalMinutes / 300) * 30, 30);

        const totalScore = Math.round(consistencyScore + durationScore + timeScore);
        setScore(Math.max(Math.min(totalScore, 100), 10));

        const newInsights = [];
        if (score > 85) newInsights.push({ type: 'prime', text: 'Neural Peak: Cognitive threshold exceeded.', icon: <Zap size={14} /> });
        else if (score > 60) newInsights.push({ type: 'stable', text: 'Steady Sync: Performance remaining consistent.', icon: <Shield size={14} /> });
        else newInsights.push({ type: 'sync', text: 'Calibration Required: Low duration protocols detected.', icon: <Activity size={14} /> });

        setInsights(newInsights);
    };

    const getScoreVariant = () => {
        if (score >= 85) return { color: '#8b5cf6', label: 'Prime Link', glow: 'rgba(139, 92, 246, 0.5)' };
        if (score >= 65) return { color: '#06b6d4', label: 'Optimized', glow: 'rgba(6, 182, 212, 0.5)' };
        if (score >= 45) return { color: '#6366f1', label: 'Calibrated', glow: 'rgba(99, 102, 241, 0.5)' };
        return { color: '#475569', label: 'Syncing...', glow: 'rgba(71, 85, 105, 0.5)' };
    };

    const variant = getScoreVariant();

    return (
        <div className="surface-glass p-8 relative overflow-hidden group">
            {/* Ambient background telemetry */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden flex flex-wrap gap-4 p-4 font-mono text-[8px] text-white">
                {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i}>0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
                ))}
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center shadow-inner">
                        <Cpu size={24} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter">Neural Performance</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cognitive Efficiency Index</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Global Status</p>
                    <p className="text-xs text-white font-bold uppercase tracking-tight">{variant.label}</p>
                </div>
            </div>

            {/* Score Ring */}
            <div className="relative flex items-center justify-center mb-10 h-48">
                <svg className="w-64 h-64 -rotate-90 transform" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke="rgba(255,255,255,0.03)"
                        strokeWidth="8"
                    />
                    <motion.circle
                        cx="50" cy="50" r="40"
                        fill="none"
                        stroke={variant.color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        animate={{ strokeDashoffset: 251.2 - (score / 100) * 251.2 }}
                        transition={{ duration: 1.5, ease: 'circOut' }}
                        style={{ filter: `drop-shadow(0 0 10px ${variant.glow})` }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <span className="text-7xl font-black text-white tracking-tighter leading-none">{score}</span>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                            />
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Telemetry</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Metric Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group/metric">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity" />
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 relative z-10">Session Count</p>
                    <p className="text-2xl font-black text-white relative z-10">{sessions.length || 12}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group/metric">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity" />
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 relative z-10">Focus Purity</p>
                    <p className="text-2xl font-black text-white relative z-10">92%</p>
                </div>
            </div>

            {/* Neural Insights */}
            <AnimatePresence>
                {insights.map((insight, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/20 flex items-start gap-3 shadow-2xl relative group/insight overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 -translate-x-full group-hover/insight:translate-x-full transition-transform duration-1000" />
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/20">
                            {insight.icon}
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Neural Stream</p>
                            <p className="text-xs text-slate-200 font-medium leading-relaxed">{insight.text}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Analytics Shortcut */}
            <div className="mt-8 flex justify-center">
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-lg shadow-indigo-600/20 group">
                    <BarChart3 size={14} className="group-hover:rotate-12 transition-transform" />
                    Open Neural Stream
                </button>
            </div>
        </div>
    );
};

export default FocusScore;
