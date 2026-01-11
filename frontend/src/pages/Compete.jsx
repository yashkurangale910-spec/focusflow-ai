import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Shield, Target } from 'lucide-react';
import HabitStreaks from '../components/HabitStreaks';
import TimeBlindnessHelper from '../components/TimeBlindnessHelper';
import BodyDoubling from '../components/BodyDoubling';
import AIFocusCoach from '../components/AIFocusCoach';

const Compete = () => {
    return (
        <div className="space-y-12 animate-soft-entry pb-24">
            {/* Lab Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Live Performance Labs</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-white tracking-tight">Neuro-Performance Lab</h1>
                    <p className="text-sm font-medium text-slate-500 max-w-xl leading-relaxed">
                        Deploy specialized cognitive instruments designed to optimize neurodivergent throughput and maintain temporal alignment.
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Rank</span>
                        <span className="text-2xl font-black text-rose-500 font-display">#842</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                        <Target size={24} className="text-slate-400" />
                    </div>
                </div>
            </header>

            {/* Matrix Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Neural Load', value: '42%', icon: Activity, color: 'indigo' },
                    { label: 'Sync Status', value: 'Active', icon: Zap, color: 'emerald' },
                    { label: 'Shielding', value: 'Encrypted', icon: Shield, color: 'indigo' },
                    { label: 'Lab Priority', value: 'Critical', icon: Target, color: 'rose' },
                ].map((stat, i) => (
                    <div key={i} className="surface-flat p-5 rounded-3xl border-slate-800/50 flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                            <stat.icon size={16} className={`text-${stat.color}-400`} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <p className="text-sm font-black text-white uppercase tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Primary Instrumentation */}
                <div className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-10 group/col">
                        <TimeBlindnessHelper />
                        <BodyDoubling />
                    </div>

                    <div className="space-y-10 group/col">
                        <AIFocusCoach />
                        <HabitStreaks />
                    </div>
                </div>
            </div>

            {/* Lab Footer */}
            <footer className="pt-10 mt-10 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <Activity size={12} className="text-slate-500" />
                    </div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Performance Lab v4.0.2 // Advanced Neuro-Instrumentation</p>
                </div>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Biometric sync protocol active</p>
            </footer>
        </div>
    );
};

export default Compete;
