import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import GoalsSystem from '../components/GoalsSystem';
import MoodTracker from '../components/MoodTracker';
import ProductivityHeatmap from '../components/ProductivityHeatmap';
import { useAnalytics } from '../context/AnalyticsContext';
import { Activity, Heart, Sparkles } from 'lucide-react';

const Wellness = () => {
    const { addSession } = useAnalytics();

    const handleSessionComplete = (sessionData) => {
        addSession(sessionData);
    };

    return (
        <div className="space-y-12 animate-soft-entry">
            {/* Vitality Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <Activity size={16} className="text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] animate-pulse">Live Vitality Feed</span>
                    </div>
                    <h1 className="text-5xl font-black font-display text-white tracking-tight">Vitality & <span className="text-indigo-500">Resonance</span></h1>
                    <p className="text-sm font-medium text-slate-500 mt-2 max-w-md">
                        Biometric cognitive monitoring and performance optimization protocols. Synchronize your mental state for maximum throughput.
                    </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/50 border border-slate-900 shadow-inner">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Stability</p>
                        <p className="text-sm font-bold text-emerald-400">98.4% Nominal</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        <Heart size={20} className="text-emerald-500 animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Primary Instrumentation - Left Column */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-3xl" />
                        <PomodoroTimer onSessionComplete={handleSessionComplete} />
                    </section>

                    <section className="relative">
                        <ProductivityHeatmap />
                    </section>
                </div>

                {/* Tactical Status - Right Column */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="space-y-8 sticky top-24">
                        <section>
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <Sparkles size={14} className="text-indigo-400" />
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Targets</h3>
                            </div>
                            <GoalsSystem />
                        </section>

                        <section>
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <Activity size={14} className="text-rose-400" />
                                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cognitive Affect</h3>
                            </div>
                            <MoodTracker />
                        </section>
                    </div>
                </div>
            </div>

            <footer className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row items-center justify-between gap-4 opacity-40 hover:opacity-100 transition-opacity">
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">Vitality Engine v6.1.0 // Bio-Link active</p>
                <div className="flex gap-6">
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Deep Focus Sync: Active</span>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Neural Load: Moderate</span>
                </div>
            </footer>
        </div>
    );
};

export default Wellness;
