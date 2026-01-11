import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Settings2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notifySessionComplete, notifyBreakTime } from '../services/notificationService';

const PomodoroTimer = ({ onSessionComplete }) => {
    const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const [showSettings, setShowSettings] = useState(false);

    const [settings, setSettings] = useState({
        workDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        sessionsUntilLongBreak: 4,
        autoStartBreaks: true,
        autoStartWork: false,
    });

    const intervalRef = useRef(null);

    const durations = {
        work: settings.workDuration * 60,
        shortBreak: settings.shortBreakDuration * 60,
        longBreak: settings.longBreakDuration * 60,
    };

    useEffect(() => {
        setTimeLeft(durations[mode]);
    }, [mode, settings]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    const handleTimerComplete = () => {
        setIsRunning(false);

        if (mode === 'work') {
            const newSessionCount = sessionsCompleted + 1;
            setSessionsCompleted(newSessionCount);
            notifySessionComplete(settings.workDuration);

            if (onSessionComplete) {
                onSessionComplete({
                    duration: settings.workDuration,
                    mode: 'pomodoro',
                    quality: 8,
                });
            }

            const nextMode = newSessionCount % settings.sessionsUntilLongBreak === 0
                ? 'longBreak'
                : 'shortBreak';
            setMode(nextMode);

            if (settings.autoStartBreaks) {
                setTimeout(() => setIsRunning(true), 1000);
            }

            notifyBreakTime();
        } else {
            setMode('work');
            if (settings.autoStartWork) {
                setTimeout(() => setIsRunning(true), 1000);
            }
        }
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(durations[mode]);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;
    const strokeDashoffset = 565 - (565 * progress) / 100;

    const modeConfig = {
        work: { icon: Brain, color: '#6366f1', label: 'Initial Focus', accent: 'indigo' },
        shortBreak: { icon: Coffee, color: '#10b981', label: 'Brief Respite', accent: 'emerald' },
        longBreak: { icon: Coffee, color: '#f59e0b', label: 'Extended Break', accent: 'amber' },
    };

    const currentMode = modeConfig[mode];
    const ModeIcon = currentMode.icon;

    return (
        <div className="surface-raised p-8 rounded-[2rem] relative overflow-hidden group">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 transition-colors`}>
                        <ModeIcon size={20} style={{ color: currentMode.color }} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Current State</p>
                        <h2 className="text-sm font-bold text-white uppercase tracking-tight">{currentMode.label}</h2>
                    </div>
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white transition-all shadow-sm"
                >
                    <Settings2 size={18} />
                </button>
            </div>

            {/* Expansion Settings */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Focus (m)</label>
                                <input
                                    type="number"
                                    value={settings.workDuration}
                                    onChange={(e) => setSettings({ ...settings, workDuration: parseInt(e.target.value) || 1 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Rest (m)</label>
                                <input
                                    type="number"
                                    value={settings.shortBreakDuration}
                                    onChange={(e) => setSettings({ ...settings, shortBreakDuration: parseInt(e.target.value) || 1 })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Radial Clock */}
            <div className="relative flex items-center justify-center mb-12">
                <svg className="w-64 h-64 -rotate-90">
                    <circle
                        cx="128"
                        cy="128"
                        r="90"
                        fill="transparent"
                        stroke="rgba(30, 41, 59, 0.4)"
                        strokeWidth="1.5"
                    />
                    <motion.circle
                        cx="128"
                        cy="128"
                        r="90"
                        fill="transparent"
                        stroke={currentMode.color}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="565"
                        animate={{ strokeDashoffset: strokeDashoffset }}
                        transition={{ duration: 1, ease: "linear" }}
                        className="shadow-xl"
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        key={timeLeft}
                        initial={{ opacity: 0.8, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-thin font-display text-white tabular-nums tracking-tighter"
                    >
                        {formatTime(timeLeft)}
                    </motion.span>
                    <div className="flex items-center gap-2 mt-2">
                        <CheckCircle2 size={12} className="text-slate-600" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Interval {sessionsCompleted + 1}</span>
                    </div>
                </div>

                {/* Glow Backdrop */}
                <div
                    className="absolute inset-0 rounded-full blur-[60px] opacity-20 -z-10 transition-colors duration-1000"
                    style={{ backgroundColor: currentMode.color }}
                />
            </div>

            {/* Interaction Dock */}
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={toggleTimer}
                        className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-xl active:scale-[0.98]"
                        style={{
                            backgroundColor: currentMode.color,
                            color: mode === 'work' ? '#fff' : '#000',
                            boxShadow: `0 10px 30px ${currentMode.color}20`
                        }}
                    >
                        {isRunning ? (
                            <><Pause size={16} fill="currentColor" />Halt Session</>
                        ) : (
                            <><Play size={16} fill="currentColor" />Initialize Session</>
                        )}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all shadow-sm"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {Object.keys(modeConfig).map((m) => {
                        const mCfg = modeConfig[m];
                        return (
                            <button
                                key={m}
                                onClick={() => {
                                    setMode(m);
                                    setIsRunning(false);
                                }}
                                className={`py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest border transition-all ${mode === m
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-transparent border-transparent text-slate-600 hover:text-slate-400'
                                    }`}
                                style={{
                                    borderColor: mode === m ? mCfg.color : 'transparent',
                                }}
                            >
                                {mCfg.label.split(' ')[0]}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
