import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain, Settings } from 'lucide-react';
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

            // Auto-switch to break
            const nextMode = newSessionCount % settings.sessionsUntilLongBreak === 0
                ? 'longBreak'
                : 'shortBreak';
            setMode(nextMode);

            if (settings.autoStartBreaks) {
                setTimeout(() => setIsRunning(true), 1000);
            }

            notifyBreakTime();
        } else {
            // Break completed
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

    const modeConfig = {
        work: { icon: Brain, color: '#00d1ff', label: 'Focus Time' },
        shortBreak: { icon: Coffee, color: '#10b981', label: 'Short Break' },
        longBreak: { icon: Coffee, color: '#f59e0b', label: 'Long Break' },
    };

    const ModeIcon = modeConfig[mode].icon;

    return (
        <div className="glass-card border-white/10 p-8 rounded-3xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <ModeIcon size={28} style={{ color: modeConfig[mode].color }} />
                    <h2 className="text-2xl font-bold">{modeConfig[mode].label}</h2>
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                    <Settings size={20} />
                </button>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 p-4 rounded-xl bg-white/5 space-y-3"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-zinc-500 uppercase">Work (min)</label>
                                <input
                                    type="number"
                                    value={settings.workDuration}
                                    onChange={(e) => setSettings({ ...settings, workDuration: parseInt(e.target.value) })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-500 uppercase">Short Break (min)</label>
                                <input
                                    type="number"
                                    value={settings.shortBreakDuration}
                                    onChange={(e) => setSettings({ ...settings, shortBreakDuration: parseInt(e.target.value) })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 mt-1"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={settings.autoStartBreaks}
                                onChange={(e) => setSettings({ ...settings, autoStartBreaks: e.target.checked })}
                                className="rounded"
                            />
                            <label className="text-sm">Auto-start breaks</label>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Timer Display */}
            <div className="relative mb-8">
                <svg className="w-full h-64" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke={modeConfig[mode].color}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 90}`}
                        strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                        transform="rotate(-90 100 100)"
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-6xl font-black" style={{ color: modeConfig[mode].color }}>
                            {formatTime(timeLeft)}
                        </p>
                        <p className="text-sm text-zinc-500 mt-2">
                            Session {sessionsCompleted + 1}
                        </p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={toggleTimer}
                    className="px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95"
                    style={{
                        backgroundColor: modeConfig[mode].color,
                        color: mode === 'work' ? '#000' : '#fff',
                    }}
                >
                    {isRunning ? (
                        <><Pause size={20} className="inline mr-2" />Pause</>
                    ) : (
                        <><Play size={20} className="inline mr-2" />Start</>
                    )}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-3 gap-2 mt-6">
                {Object.keys(modeConfig).map((m) => (
                    <button
                        key={m}
                        onClick={() => {
                            setMode(m);
                            setIsRunning(false);
                        }}
                        className={`py-2 px-3 rounded-lg text-sm font-bold transition-all ${mode === m
                                ? 'bg-white/20 border-2'
                                : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                            }`}
                        style={{
                            borderColor: mode === m ? modeConfig[m].color : 'transparent',
                        }}
                    >
                        {modeConfig[m].label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PomodoroTimer;
