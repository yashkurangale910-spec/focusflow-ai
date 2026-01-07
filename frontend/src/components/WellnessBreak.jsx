import React, { useState } from 'react';
import { Clock, Coffee, Dumbbell, Eye, Droplet, Play, X, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WellnessBreak = () => {
    const [activeBreak, setActiveBreak] = useState(null);
    const [breathPhase, setBreathPhase] = useState('idle'); // idle, inhale, hold, exhale
    const [breathCount, setBreathCount] = useState(0);

    const breakActivities = [
        { id: 'breathing', name: 'Box Breathing', icon: Coffee, duration: 2, color: '#10b981', desc: 'Calm your nervous system' },
        { id: 'stretch', name: 'Neck Release', icon: Dumbbell, duration: 3, color: '#f59e0b', desc: 'Relieve tension' },
        { id: 'eye-rest', name: '20-20-20 Rule', icon: Eye, duration: 1, color: '#3b82f6', desc: 'Reduce eye strain' },
        { id: 'hydrate', name: 'Rehydrate', icon: Droplet, duration: 0, color: '#00d1ff', desc: 'Boost brain function' },
    ];

    const startBreathing = () => {
        setBreathPhase('inhale');
        setBreathCount(0);
    };

    React.useEffect(() => {
        let timeouts = [];

        if (activeBreak === 'breathing' && breathPhase !== 'idle') {
            // Cycle: Inhale (4s) -> Hold In (4s) -> Exhale (4s) -> Hold Out (4s)

            const runCycle = () => {
                // Inhale started by state change to 'inhale'

                // 1. Hold In after 4s
                timeouts.push(setTimeout(() => {
                    setBreathPhase('hold-in');

                    // 2. Exhale after another 4s
                    timeouts.push(setTimeout(() => {
                        setBreathPhase('exhale');

                        // 3. Hold Out after another 4s
                        timeouts.push(setTimeout(() => {
                            setBreathPhase('hold-out');

                            // 4. Restart or Finish after another 4s
                            timeouts.push(setTimeout(() => {
                                setBreathCount(prev => {
                                    const next = prev + 1;
                                    if (next >= 4) {
                                        setBreathPhase('idle');
                                        return 0;
                                    } else {
                                        setBreathPhase('inhale'); // Triggers next cycle effect if we structured it that way, but here we just need to loop or let effect re-run?
                                        // Actually, simpler to just recursive call here or let a dependency change trigger it.
                                        // Let's use a separate useEffect for phase changes effectively or just keep it contained here.
                                        // A cleaner way for this imperative sequence without complex effects:
                                        return next;
                                    }
                                });
                            }, 4000));
                        }, 4000));
                    }, 4000));
                }, 4000));
            };

            // To properly chain this with state updates, it's better to react to phase changes, 
            // but for a strict 4-4-4-4 rhythm, a single effect orchestrating one full cycle is easiest 
            // IF we rely on the state only for UI.

            // However, to keep it simple and robust:
            if (breathPhase === 'inhale') {
                timeouts.push(setTimeout(() => setBreathPhase('hold-in'), 4000));
            } else if (breathPhase === 'hold-in') {
                timeouts.push(setTimeout(() => setBreathPhase('exhale'), 4000));
            } else if (breathPhase === 'exhale') {
                timeouts.push(setTimeout(() => setBreathPhase('hold-out'), 4000));
            } else if (breathPhase === 'hold-out') {
                timeouts.push(setTimeout(() => {
                    setBreathCount(c => {
                        if (c >= 3) { // 0, 1, 2, 3 = 4 cycles
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
            case 'inhale': return 'Inhale...';
            case 'hold-in': return 'Hold...';
            case 'exhale': return 'Exhale...';
            case 'hold-out': return 'Hold...';
            case 'idle': return 'Ready to relax?';
            default: return '';
        }
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl h-full flex flex-col relative overflow-hidden">
            {/* Background enhancement */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10" />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                        <Coffee size={20} className="text-accent" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Wellness Break</h3>
                        <p className="text-xs text-zinc-500">Recharge your mind</p>
                    </div>
                </div>
                {activeBreak && (
                    <button
                        onClick={() => setActiveBreak(null)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!activeBreak ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {breakActivities.map((activity, idx) => (
                            <motion.button
                                key={activity.id}
                                onClick={() => setActiveBreak(activity.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent/30 transition-all text-left group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-3">
                                        <activity.icon size={22} style={{ color: activity.color }} />
                                        {activity.duration > 0 && (
                                            <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-black/20 text-zinc-400">
                                                {activity.duration}m
                                            </span>
                                        )}
                                    </div>
                                    <p className="font-bold text-sm mb-0.5">{activity.name}</p>
                                    <p className="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
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
                        className="flex-1 flex flex-col items-center justify-center py-4"
                    >
                        {activeBreak === 'breathing' && (
                            <div className="relative flex flex-col items-center">
                                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                                    {/* Breathing Rings */}
                                    <motion.div
                                        animate={{
                                            scale: breathPhase === 'inhale' ? 1.5 : (breathPhase === 'exhale' ? 1 : (breathPhase === 'hold-in' ? 1.5 : 1)),
                                            opacity: breathPhase === 'idle' ? 0.3 : 0.6,
                                        }}
                                        transition={{ duration: 4, ease: "easeInOut" }}
                                        className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                                    />
                                    <motion.div
                                        animate={{
                                            scale: breathPhase === 'inhale' ? 1.3 : (breathPhase === 'exhale' ? 1 : (breathPhase === 'hold-in' ? 1.3 : 1)),
                                        }}
                                        transition={{ duration: 4, ease: "easeInOut" }}
                                        className="w-32 h-32 rounded-full border-2 border-accent/50 flex items-center justify-center relative z-10 bg-accent/5 backdrop-blur-sm"
                                    >
                                        <span className="text-xl font-bold tracking-widest text-accent">
                                            {breathPhase === 'idle' ? 'START' : getInstruction()}
                                        </span>
                                    </motion.div>
                                </div>

                                <button
                                    onClick={breathPhase === 'idle' ? startBreathing : () => setBreathPhase('idle')}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,209,255,0.3)]"
                                    style={{ backgroundColor: 'var(--color-accent)', color: '#09090b' }}
                                >
                                    {breathPhase === 'idle' ? <Play size={18} fill="currentColor" /> : <Timer size={18} />}
                                    {breathPhase === 'idle' ? 'Start Session' : 'Stop'}
                                </button>
                            </div>
                        )}

                        {activeBreak === 'stretch' && (
                            <div className="w-full space-y-4">
                                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Dumbbell className="text-amber-500" />
                                        <h4 className="font-bold text-amber-500">Quick Release</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {['Neck rolls (slowly)', 'Shoulder shrugs', 'Wrist circles', 'Overhead reach'].map((item, i) => (
                                            <motion.li
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                key={i}
                                                className="flex items-center gap-3 text-sm text-zinc-300"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeBreak === 'eye-rest' && (
                            <div className="text-center">
                                <Eye size={48} className="text-blue-500 mx-auto mb-4" />
                                <h4 className="text-xl font-bold mb-2">20-20-20 Rule</h4>
                                <p className="text-sm text-zinc-400 mb-6">
                                    Every 20 minutes, look at something<br />
                                    <span className="text-white font-semibold">20 feet away</span> for <span className="text-white font-semibold">20 seconds</span>.
                                </p>
                                <div className="w-full bg-blue-500/10 h-1 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 20 }}
                                        className="h-full bg-blue-500"
                                    />
                                </div>
                            </div>
                        )}

                        {activeBreak === 'hydrate' && (
                            <div className="text-center">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Droplet size={64} className="mx-auto text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mb-6" fill="currentColor" fillOpacity={0.2} />
                                </motion.div>
                                <h4 className="text-2xl font-bold text-cyan-400 mb-2">Drink Water!</h4>
                                <p className="text-zinc-400">Hydration boosts cognitive performance.</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WellnessBreak;
