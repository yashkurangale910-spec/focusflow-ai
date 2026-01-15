import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Calendar, Bell, Zap, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TimeBlindnessHelper = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeAnchors, setTimeAnchors] = useState([
        { time: '09:00', label: 'Initial Sync', passed: false },
        { time: '12:00', label: 'Mid-Day Calibration', passed: false },
        { time: '15:00', label: 'Post-Peak Buffer', passed: false },
        { time: '18:00', label: 'System Shutdown', passed: false },
    ]);

    const [upcomingEvents] = useState([
        { time: '14:30', title: 'Architecture Review', in: '2h 15m' },
        { time: '16:00', title: 'Deep Work Protocol', in: '3h 45m' },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getTimeUntil = (targetTime) => {
        const [hours, minutes] = targetTime.split(':').map(Number);
        const target = new Date();
        target.setHours(hours, minutes, 0);

        const diff = target - currentTime;
        if (diff < 0) return 'Archived';

        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hoursLeft > 0) return `${hoursLeft}h ${minutesLeft}m`;
        return `${minutesLeft}m`;
    };

    const getProgressToNextAnchor = () => {
        const now = currentTime.getHours() * 60 + currentTime.getMinutes();
        const nextAnchor = timeAnchors.find(anchor => {
            const [h, m] = anchor.time.split(':').map(Number);
            return (h * 60 + m) > now;
        });

        if (!nextAnchor) return 100;

        const [h, m] = nextAnchor.time.split(':').map(Number);
        const nextTime = h * 60 + m;
        const prevAnchor = timeAnchors[timeAnchors.indexOf(nextAnchor) - 1];
        const prevTime = prevAnchor ? parseInt(prevAnchor.time.split(':')[0]) * 60 + parseInt(prevAnchor.time.split(':')[1]) : 0;

        return ((now - prevTime) / (nextTime - prevTime)) * 100;
    };

    return (
        <div className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <Clock size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Temporal Alignment</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Real-time chronometry system</p>
                    </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 cursor-help hover:text-white transition-colors">
                    <Info size={14} />
                </div>
            </div>

            {/* Neural Chronometer */}
            <div className="relative mb-10 text-center py-10 rounded-3xl bg-slate-950/50 border border-slate-800/50 shadow-inner group/clock">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Universal Synchronizer</p>
                <div className="text-7xl font-black font-display text-white tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(59,130,246,0.2)] animate-[clockPulse_2s_infinite]">
                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
                {/* Visual Hour Progress */}
                <div className="mt-4 px-12">
                    <div className="flex items-center justify-between text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-1.5 px-1">
                        <span>Cycle Start</span>
                        <span className="text-blue-500/80">Segment {currentTime.getMinutes()}m</span>
                    </div>
                    <div className="h-1 bg-slate-900 rounded-full overflow-hidden border border-slate-800/50 p-[1px]">
                        <motion.div
                            className="h-full bg-blue-500/40 rounded-full"
                            style={{ width: `${(currentTime.getMinutes() / 60) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[pulse_1s_infinite]" />
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Anchor Manifest */}
            <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between px-1 mb-2">
                    <div className="flex items-center gap-2">
                        <Zap size={12} className="text-amber-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Sync Anchors</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Sequential Manifest</span>
                </div>

                <div className="space-y-2">
                    {timeAnchors.map((anchor, index) => {
                        const timeUntil = getTimeUntil(anchor.time);
                        const isPassed = timeUntil === 'Archived';

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isPassed
                                    ? 'bg-slate-950/20 border-slate-900 opacity-40'
                                    : 'bg-slate-950/50 border-slate-800/80 hover:border-blue-500/30'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${isPassed ? 'bg-slate-700' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`} />
                                    <div>
                                        <p className="text-[11px] font-black text-white uppercase tracking-tight">{anchor.label}</p>
                                        <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{anchor.time}</p>
                                    </div>
                                </div>
                                <div className={`text-[10px] font-black uppercase tracking-widest ${isPassed ? 'text-slate-700' : 'text-blue-400'}`}>
                                    {timeUntil}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Flow Trajectory */}
            <div className="mb-10 px-1">
                <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                    <span>Trajectory Completion</span>
                    <span className="text-blue-400">{Math.round(getProgressToNextAnchor())}%</span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-900 p-0.5">
                    <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressToNextAnchor()}%` }}
                    />
                </div>
            </div>

            {/* Warning System */}
            {upcomingEvents.length > 0 && (
                <div className="p-5 rounded-3xl bg-blue-500/5 border border-blue-500/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <Activity size={12} className="text-blue-400" />
                        </div>
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Upcoming Interruption</h4>
                    </div>
                    <div className="space-y-3">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-[11px] font-black text-slate-300 uppercase tracking-tight leading-none mb-1">{event.title}</p>
                                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{event.time}</p>
                                </div>
                                <div className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                    -{event.in}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Control Hub */}
            <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="h-11 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-slate-700 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Calendar size={14} /> Log Anchor
                </button>
                <button className="h-11 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-slate-700 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Bell size={14} /> Alert Protocol
                </button>
            </div>
        </div>
    );
};

export default TimeBlindnessHelper;
