import React, { useState, useEffect } from 'react';
import { Users, Video, Mic, MicOff, Eye, EyeOff, Clock, Activity, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BodyDoubling = () => {
    const [isActive, setIsActive] = useState(false);
    const [sessionTime, setSessionTime] = useState(0);
    const [mode, setMode] = useState('silent'); // silent, ambient, social
    const [partners] = useState([
        { id: 1, name: 'Alex.node', avatar: '👨‍💻', status: 'focusing', time: '1h 23m' },
        { id: 2, name: 'Sarah_v4', avatar: '👩‍🎨', status: 'focusing', time: '45m' },
        { id: 3, name: 'Jordan.core', avatar: '🧑‍💼', status: 'break', time: '5m' },
    ]);

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setSessionTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const modes = {
        silent: {
            icon: '🤫',
            name: 'Silent Protocol',
            description: 'Pure presence node synchronization',
            color: 'blue'
        },
        ambient: {
            icon: '🎵',
            name: 'Ambient Resonance',
            description: 'Shared background neural frequencies',
            color: 'emerald'
        },
        social: {
            icon: '💬',
            name: 'Social Uplink',
            description: 'Active interaction during buffers',
            color: 'amber'
        }
    };

    return (
        <div className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors" />

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <Users size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Sync Co-working Nodes</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Collaborative focus architecture</p>
                    </div>
                </div>
                {isActive && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Linked</span>
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!isActive ? (
                    <motion.div
                        key="setup"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {/* Mode Selection */}
                        <div className="space-y-3 mb-8">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Initialization Protocols</h4>
                            <div className="space-y-2">
                                {Object.entries(modes).map(([key, modeData]) => (
                                    <button
                                        key={key}
                                        onClick={() => setMode(key)}
                                        className={`w-full p-4 rounded-2xl text-left transition-all border ${mode === key
                                                ? `bg-${modeData.color}-500/10 border-${modeData.color}-500/30`
                                                : 'bg-slate-950/40 border-slate-900 hover:border-slate-800'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-2xl">{modeData.icon}</div>
                                            <div>
                                                <h5 className="text-[11px] font-black text-white uppercase tracking-tight">{modeData.name}</h5>
                                                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{modeData.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Nodes */}
                        <div className="mb-8">
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 mb-4">Available Nodes ({partners.length})</h4>
                            <div className="grid grid-cols-3 gap-3">
                                {partners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className="p-4 rounded-2xl bg-slate-950/40 border border-slate-900 text-center group/partner"
                                    >
                                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{partner.avatar}</div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-tight truncate">{partner.name.split('.')[0]}</p>
                                        <div className="flex items-center justify-center gap-1 mt-1">
                                            <Activity size={10} className="text-emerald-500" />
                                            <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{partner.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Start Button */}
                        <button
                            onClick={() => setIsActive(true)}
                            className="w-full h-14 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-xl"
                        >
                            Establish Neural Link <Zap size={16} />
                        </button>

                        <div className="mt-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                            <Shield size={16} className="text-indigo-400" />
                            <p className="text-[9px] font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                                <strong className="text-indigo-400">Node Presence:</strong> Instant accountability via synchronized peer monitoring.
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    /* Active Session */
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="space-y-8"
                    >
                        {/* High-Fi Timer */}
                        <div className="relative text-center py-10 rounded-[2rem] bg-slate-950/50 border border-slate-800/50 shadow-inner overflow-hidden group/clock">
                            <div className={`absolute inset-0 bg-${modes[mode].color}-500/5 blur-3xl`} />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 relative z-10">Synchronization Active</p>
                            <div className="text-6xl font-black font-display text-white tracking-widest tabular-nums relative z-10">
                                {formatTime(sessionTime)}
                            </div>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-4 relative z-10">
                                {modes[mode].name}
                            </p>
                        </div>

                        {/* Node Matrix Grid */}
                        <div>
                            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1 mb-4">Live Peer Hub</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {partners.map((partner) => (
                                    <div
                                        key={partner.id}
                                        className={`p-4 rounded-2xl border transition-all ${partner.status === 'focusing'
                                                ? 'bg-emerald-500/5 border-emerald-500/20'
                                                : 'bg-amber-500/5 border-amber-500/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-2xl">{partner.avatar}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[11px] font-black text-white uppercase tracking-tight truncate">{partner.name}</p>
                                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{partner.time} Active</p>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full ${partner.status === 'focusing' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strategic Controls */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsActive(false)}
                                className="flex-[2] h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-black text-[9px] uppercase tracking-[0.2em] hover:bg-rose-500/20 transition-all"
                            >
                                Deactivate Link
                            </button>
                            <button className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-all flex items-center justify-center">
                                <Eye size={18} />
                            </button>
                            <button className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-all flex items-center justify-center">
                                <Mic size={18} />
                            </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                            <Activity size={14} className="text-indigo-400" />
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                                Collective momentum maintaining at <span className="text-emerald-400">94.2%</span> efficiency.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BodyDoubling;
