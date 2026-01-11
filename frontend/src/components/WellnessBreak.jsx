import React, { useState } from 'react';
import { Clock, Coffee, Dumbbell, Eye, Droplet, Play, X, Timer, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WellnessBreak = () => {
    const [activeBreak, setActiveBreak] = useState(null);
    const [breathPhase, setBreathPhase] = useState('idle'); // idle, inhale, hold, exhale
    const [breathCount, setBreathCount] = useState(0);

    const breakActivities = [
        { id: 'breathing', name: 'Box Breathing', icon: Coffee, duration: 2, color: '#6366f1', desc: 'Calm your nervous system' },
        { id: 'stretch', name: 'Neck Release', icon: Dumbbell, duration: 3, color: '#f59e0b', desc: 'Relieve tension' },
        { id: 'eye-rest', name: '20-20-20 Rule', icon: Eye, duration: 1, color: '#3b82f6', desc: 'Reduce eye strain' },
        { id: 'hydrate', name: 'Rehydrate', icon: Droplet, duration: 0, color: '#10b981', desc: 'Boost brain function' },
    ];

    React.useEffect(() => {
        let timeouts = [];

        if (activeBreak === 'breathing' && breathPhase !== 'idle') {
            if (breathPhase === 'inhale') {
                timeouts.push(setTimeout(() => setBreathPhase('hold-in'), 4000));
            } else if (breathPhase === 'hold-in') {
                timeouts.push(setTimeout(() => setBreathPhase('exhale'), 4000));
            } else if (breathPhase === 'exhale') {
                timeouts.push(setTimeout(() => setBreathPhase('hold-out'), 4000));
            } else if (breathPhase === 'hold-out') {
                timeouts.push(setTimeout(() => {
                    setBreathCount(c => {
                        if (c >= 3) {
                            setBreathPhase('idle');
                            return 0;
                        }
                        setBreathPhase('inhale');
                        return c + 1;
                    });
                }, 4000));
            }
        }

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [activeBreak, breathPhase]);

    const getInstruction = () => {
        switch (breathPhase) {
            case 'inhale': return 'Inhale';
            case 'hold-in': return 'Hold';
            case 'exhale': return 'Exhale';
            case 'hold-out': return 'Hold';
            case 'idle': return 'Ready?';
            default: return '';
        }
    };

    return (
        <div className="surface-raised p-8 rounded-[2rem] h-full flex flex-col relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px] -z-10 transition-opacity group-hover:opacity-100 opacity-50" />

            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                        <Activity size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Wellness Terminal</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Recovery Active</p>
                    </div>
                </div>
                {activeBreak && (
                    <button
                        onClick={() => {
                            setActiveBreak(null);
                            setBreathPhase('idle');
                        }}
                        className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white transition-all shadow-sm"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!activeBreak ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {breakActivities.map((activity) => (
                            <motion.button
                                key={activity.id}
                                onClick={() => setActiveBreak(activity.id)}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 transition-all text-left group relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-indigo-500/20 transition-colors">
                                            <activity.icon size={18} style={{ color: activity.color }} />
                                        </div>
                                        {activity.duration > 0 && (
                                            <span className="text-[9px] font-bold px-2 py-1 rounded-md bg-slate-950 text-slate-500 border border-slate-800 uppercase tracking-widest">
                                                {activity.duration}m
                                            </span>
                                        )}
                                    </div>
                                    <p className="font-bold text-xs text-white uppercase tracking-tight mb-1">{activity.name}</p>
                                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                        {activity.desc}
                                    </p>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex-1 flex flex-col items-center justify-center"
                    >
                        {activeBreak === 'breathing' && (
                            <div className="relative flex flex-col items-center w-full">
                                <div className="relative w-56 h-56 flex items-center justify-center mb-10">
                                    {/* Focus Ring - Internal Version */}
                                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                                        <circle
                                            cx="50%"
                                            cy="50%"
                                            r="90"
                                            fill="transparent"
                                            stroke="rgba(30, 41, 59, 0.4)"
                                            strokeWidth="1"
                                        />
                                        <motion.circle
                                            cx="50%"
                                            cy="50%"
                                            r="90"
                                            fill="transparent"
                                            stroke="#6366f1"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            animate={{
                                                scale: breathPhase === 'inhale' ? 1.1 : (breathPhase === 'exhale' ? 1 : 1.1),
                                                opacity: breathPhase === 'idle' ? 0.2 : 0.8,
                                            }}
                                            transition={{ duration: 4, ease: "easeInOut" }}
                                        />
                                    </svg>

                                    <div className="relative z-10 flex flex-col items-center">
                                        <motion.span
                                            key={breathPhase}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-2xl font-display font-light text-white tracking-[0.2em] uppercase"
                                        >
                                            {getInstruction()}
                                        </motion.span>
                                        {breathPhase !== 'idle' && (
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Cycle {breathCount + 1}/4</p>
                                        )}
                                    </div>

                                    {/* Ambient Glow */}
                                    <motion.div
                                        animate={{
                                            scale: breathPhase === 'inhale' ? 1.5 : (breathPhase === 'exhale' ? 1 : 1.5),
                                            opacity: breathPhase === 'idle' ? 0.1 : 0.4,
                                        }}
                                        transition={{ duration: 4, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[60px] -z-10"
                                    />
                                </div>

                                <button
                                    onClick={breathPhase === 'idle' ? () => setBreathPhase('inhale') : () => setBreathPhase('idle')}
                                    className="px-10 py-3.5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98] border border-indigo-500/20"
                                    style={{
                                        backgroundColor: breathPhase === 'idle' ? '#6366f1' : 'transparent',
                                        color: breathPhase === 'idle' ? '#fff' : '#6366f1'
                                    }}
                                >
                                    {breathPhase === 'idle' ? 'Begin Synthesis' : 'Terminate'}
                                </button>
                            </div>
                        )}

                        {activeBreak === 'stretch' && (
                            <div className="w-full space-y-6">
                                <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Dumbbell size={60} />
                                    </div>
                                    <h4 className="font-bold text-sm text-amber-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <Zap size={14} /> Somatic Reset
                                    </h4>
                                    <ul className="space-y-4">
                                        {['Slow Neck Rotation', 'Shoulder Retraction', 'Wrist Articulation', 'Thoracic Extension'].map((item, i) => (
                                            <motion.li
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i}
                                                className="flex items-center gap-4 text-xs font-bold text-slate-300 uppercase tracking-wide"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeBreak === 'eye-rest' && (
                            <div className="text-center w-full max-w-xs">
                                <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
                                    <Eye size={32} className="text-blue-400" />
                                </div>
                                <h4 className="text-xl font-bold mb-3 font-display text-white italic">The 20-20-20 Protocol</h4>
                                <p className="text-xs text-slate-500 mb-8 leading-relaxed font-medium uppercase tracking-widest">
                                    Every 20 minutes, isolate a target<br />
                                    <span className="text-blue-400 font-bold">20 feet away</span> for <span className="text-blue-400 font-bold">20 seconds</span>.
                                </p>
                                <div className="w-full bg-slate-900 border border-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 20, ease: "linear" }}
                                        className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </div>
                        )}

                        {activeBreak === 'hydrate' && (
                            <div className="text-center">
                                <motion.div
                                    animate={{
                                        y: [0, -12, 0],
                                        rotate: [0, -5, 5, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="mb-10"
                                >
                                    <Droplet size={80} className="mx-auto text-indigo-400 filter drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]" fill="currentColor" fillOpacity={0.1} />
                                </motion.div>
                                <h4 className="text-3xl font-bold font-display text-white mb-2 italic">Molecular Reset</h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Hydrate to maintain neural conductivity</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WellnessBreak;
