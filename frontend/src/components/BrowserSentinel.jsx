import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Lock, Globe, Terminal, Activity, EyeOff } from 'lucide-react';

const BrowserSentinel = () => {
    const [status, setStatus] = useState('active'); // active, alert, lockdown
    const [blockedAttempts, setBlockedAttempts] = useState([
        { id: 1, site: 'distraction-hub.com', time: '14:20:05', threat: 'High' },
        { id: 2, site: 'social-feed.net', time: '14:22:12', threat: 'Medium' },
        { id: 3, site: 'video-loop.io', time: '14:25:30', threat: 'Low' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newAttempt = {
                id: Date.now(),
                site: ['infinite-scroll.com', 'news-void.org', 'click-bait.tv'][Math.floor(Math.random() * 3)],
                time: new Date().toLocaleTimeString(),
                threat: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
            };
            setBlockedAttempts(prev => [newAttempt, ...prev.slice(0, 4)]);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const StatusIcon = {
        active: ShieldCheck,
        alert: ShieldAlert,
        lockdown: Lock,
    }[status];

    const StatusColor = {
        active: 'text-emerald-400',
        alert: 'text-amber-400',
        lockdown: 'text-rose-400',
    }[status];

    return (
        <div className="surface-raised p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border-slate-800/80 relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />

            <div className="flex items-center justify-between gap-2 md:gap-4 mb-5 md:mb-6 relative z-10 flex-wrap">
                <div className="flex items-center gap-2.5 md:gap-3">
                    <div className="p-2 rounded-xl bg-slate-950/50 border border-slate-800 shadow-inner">
                        <Shield size={16} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm font-bold text-white uppercase tracking-tight">Browser Sentinel</h3>
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Shielding Active</p>
                    </div>
                </div>

                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-900 ${StatusColor} whitespace-nowrap`}>
                    <StatusIcon size={10} />
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">{status}</span>
                </div>
            </div>

            <div className="space-y-4 md:space-y-5 relative z-10">
                {/* Security Matrix */}
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-950/40 border border-slate-900 text-center">
                        <Activity size={14} className="text-indigo-500 mx-auto mb-1.5" />
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Integrity</p>
                        <p className="text-base md:text-lg font-black text-white font-display">99.2%</p>
                    </div>
                    <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-slate-950/40 border border-slate-900 text-center">
                        <EyeOff size={14} className="text-indigo-500 mx-auto mb-1.5" />
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cloaking</p>
                        <p className="text-base md:text-lg font-black text-white font-display uppercase">Level 4</p>
                    </div>
                </div>

                {/* Real-time Block Log */}
                <div className="space-y-2 md:space-y-3">
                    <h4 className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-[0.15em] md:tracking-[0.2em] px-1">Intercept Log</h4>
                    <div className="space-y-1.5 md:space-y-2">
                        <AnimatePresence initial={false}>
                            {blockedAttempts.map((attempt) => (
                                <motion.div
                                    key={attempt.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center justify-between p-2 md:p-2.5 rounded-lg md:rounded-xl bg-slate-950/60 border border-slate-900/50 hover:bg-slate-900/40 transition-colors"
                                >
                                    <div className="flex items-center gap-2 md:gap-2.5 min-w-0 flex-1">
                                        <Globe size={11} className="text-slate-700 flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-[9px] md:text-[10px] font-bold text-slate-300 tracking-tight truncate">{attempt.site}</p>
                                            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-wider md:tracking-widest">{attempt.time}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest px-1.5 md:px-2 py-0.5 rounded-md flex-shrink-0 ${attempt.threat === 'High' ? 'bg-rose-500/10 text-rose-500' :
                                        attempt.threat === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                                            'bg-emerald-500/10 text-emerald-500'
                                        }`}>
                                        {attempt.threat}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setStatus('lockdown')}
                        className="flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-slate-900 border border-slate-800 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider md:tracking-widest hover:text-rose-400 hover:border-rose-500/30 transition-all"
                    >
                        Lockdown
                    </button>
                    <button className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-indigo-400 transition-all">
                        <Terminal size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrowserSentinel;
