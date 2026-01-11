import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Users, Lock, ChevronRight, Activity, Award, Star } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const ZenithPath = () => {
    const { getTotalStats } = useAnalytics();
    const stats = getTotalStats();

    // Skill levels derived from stats
    const throughputLevel = Math.min(Math.floor(stats.totalHours / 5), 10);
    const stabilityLevel = Math.min(Math.floor(stats.totalSessions / 3), 10);
    const collectiveLevel = Math.min(Math.floor(stats.totalHours / 8), 10); // Simulated collective XP

    const skills = [
        {
            id: 'throughput',
            title: 'Neural Throughput',
            icon: Zap,
            color: 'indigo',
            level: throughputLevel,
            nodes: [
                { id: 't1', name: 'Rapid Synchronization', requirement: 1, description: 'Protocol entry speed +15%' },
                { id: 't2', name: 'Deep Focus Uplink', requirement: 3, description: 'Distraction shielding phase 1' },
                { id: 't3', name: 'Cognitive Overclock', requirement: 7, description: 'Extended high-density cycles' },
                { id: 't4', name: 'Zenith Singularity', requirement: 10, description: 'Unlimited neural throughput' },
            ]
        },
        {
            id: 'stability',
            title: 'Resilience Stability',
            icon: Shield,
            color: 'emerald',
            level: stabilityLevel,
            nodes: [
                { id: 's1', name: 'Anchor Calibration', requirement: 1, description: 'Baseline mood stabilization' },
                { id: 's2', name: 'Shield Resonance', requirement: 4, description: 'Anxiety dampening protocols' },
                { id: 's3', name: 'Mental Fortitude', requirement: 8, description: 'Burnout prevention active' },
                { id: 's4', name: 'Diamond Core', requirement: 10, description: 'Indestructible stability' },
            ]
        },
        {
            id: 'collective',
            title: 'Collective Intelligence',
            icon: Users,
            color: 'rose',
            level: collectiveLevel,
            nodes: [
                { id: 'c1', name: 'Node Awareness', requirement: 1, description: 'Sync channel visibility' },
                { id: 'c2', name: 'Pulse Resonance', requirement: 5, description: 'Mirror session efficiency' },
                { id: 'c3', name: 'Hive Mind Synergy', requirement: 9, description: 'Team-based throughput boost' },
                { id: 'c4', name: 'Omni-Node Zenith', requirement: 10, description: 'Global collective leadership' },
            ]
        }
    ];

    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <div className="space-y-12 animate-soft-entry pb-24">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">The Path of Ascension</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-white tracking-tight">The Zenith <span className="text-indigo-500">Path</span></h1>
                    <p className="text-sm font-medium text-slate-500 max-w-xl leading-relaxed">
                        Decrypt and evolve your neural capabilities. Each focus cycle provides the resonance needed to unlock the next phase of your cognitive evolution.
                    </p>
                </div>

                <div className="flex items-center gap-6 p-6 rounded-2xl bg-slate-950/50 border border-slate-900 shadow-inner">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural XP</p>
                        <p className="text-2xl font-black text-white font-display">{(stats.totalHours * 100).toFixed(0)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Star size={24} className="text-indigo-400" />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {skills.map((skillBranch) => (
                    <div key={skillBranch.id} className="space-y-8">
                        <div className="flex items-center gap-4 px-2">
                            <div className={`p-2.5 rounded-xl bg-${skillBranch.color}-500/10 border border-${skillBranch.color}-500/20`}>
                                <skillBranch.icon size={20} className={`text-${skillBranch.color}-400`} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-tight">{skillBranch.title}</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Level {skillBranch.level} / 10</p>
                            </div>
                        </div>

                        <div className="space-y-4 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[2.4rem] top-8 bottom-8 w-0.5 bg-slate-900 z-0" />

                            {skillBranch.nodes.map((node, index) => {
                                const isUnlocked = skillBranch.level >= node.requirement;
                                return (
                                    <motion.div
                                        key={node.id}
                                        whileHover={isUnlocked ? { x: 4 } : {}}
                                        onClick={() => isUnlocked && setSelectedSkill(node)}
                                        className={`relative z-10 flex items-center gap-6 p-1 group cursor-pointer ${!isUnlocked ? 'cursor-not-allowed' : ''}`}
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${isUnlocked
                                            ? `bg-slate-950 border-${skillBranch.color}-500/30 text-${skillBranch.color}-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:border-${skillBranch.color}-500`
                                            : 'bg-slate-950/20 border-slate-900 text-slate-700'}`}>
                                            {isUnlocked ? <Zap size={18} /> : <Lock size={16} />}
                                        </div>

                                        <div className="flex-1">
                                            <p className={`text-xs font-black uppercase tracking-tight ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>{node.name}</p>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Requirement: Lvl {node.requirement}</p>
                                        </div>

                                        {isUnlocked && <ChevronRight size={14} className="text-slate-700 group-hover:text-indigo-400 transition-colors" />}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Skill Detail Overlay */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSkill(null)}
                        className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

                            <div className="relative z-10 text-center space-y-6">
                                <div className="w-20 h-20 bg-indigo-500/20 border border-indigo-500/30 rounded-[2rem] mx-auto flex items-center justify-center text-indigo-400 shadow-inner">
                                    <Star size={32} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight mb-2">{selectedSkill.name}</h2>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                                        <Activity size={10} className="text-indigo-400" />
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Capability Decrypted</span>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed italic">
                                        "{selectedSkill.description}"
                                    </p>
                                </div>

                                <button
                                    onClick={() => setSelectedSkill(null)}
                                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-indigo-500/20"
                                >
                                    Synchronization Confirmed
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ZenithPath;
