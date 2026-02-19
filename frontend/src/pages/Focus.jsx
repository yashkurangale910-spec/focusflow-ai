import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Pause, RotateCcw, Volume2, VolumeX,
    Brain, Zap, Coffee, Clock, Target, Plus, Minus, Settings
} from 'lucide-react';
import NeuralSoundscapes from '../components/NeuralSoundscapes';
import SpotifyPlayer from '../components/SpotifyPlayer';
import BrowserSentinel from '../components/BrowserSentinel';
import { MorphingBlob, ParticleField, CosmicBackground } from '../components/UniqueEffects';
import { notifySessionComplete, notifyBreakTime, requestNotificationPermission } from '../services/notificationService';

const Focus = ({ activeTask }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
    const [isRunning, setIsRunning] = useState(false);
    const [sessionType, setSessionType] = useState('focus'); // focus, short-break, long-break
    const [completedSessions, setCompletedSessions] = useState(0);
    const [customMinutes, setCustomMinutes] = useState(30);
    const intervalRef = useRef(null);

    useEffect(() => {
        requestNotificationPermission();
    }, []);

    // Tab Title Timer
    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            document.title = `(${formatTime(timeLeft)}) FocusFlow`;
        } else {
            document.title = 'FocusFlow AI';
        }
        return () => { document.title = 'FocusFlow AI'; };
    }, [isRunning, timeLeft]);

    const sessionPresets = {
        focus: { time: 25 * 60, label: 'Deep Focus', icon: Brain, color: 'purple' },
        shortBreak: { time: 5 * 60, label: 'Short Break', icon: Coffee, color: 'emerald' },
        longBreak: { time: 15 * 60, label: 'Long Break', icon: Zap, color: 'cyan' },
        custom: { time: customMinutes * 60, label: `${customMinutes}m Custom`, icon: Settings, color: 'amber' },
    };

    const adjustCustomTime = (delta) => {
        const newTime = Math.max(1, Math.min(10000, customMinutes + delta));
        setCustomMinutes(newTime);
        if (sessionType === 'custom') {
            setTimeLeft(newTime * 60);
        }
    };

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleSessionComplete();
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);

    const handleSessionComplete = () => {
        setIsRunning(false);
        setCompletedSessions(prev => prev + 1);

        if (sessionType === 'focus') {
            notifySessionComplete(sessionPresets.focus.time / 60);
        } else {
            notifyBreakTime();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(sessionPresets[sessionType].time);
    };

    const selectSession = (type) => {
        setSessionType(type);
        setTimeLeft(sessionPresets[type].time);
        setIsRunning(false);
    };

    const [isZenMode, setIsZenMode] = useState(false);
    const progress = ((sessionPresets[sessionType].time - timeLeft) / sessionPresets[sessionType].time) * 100;

    return (
        <div className={`min-h-screen transition-all duration-700 ${isZenMode ? 'bg-black' : ''}`}>
            <AnimatePresence>
                {isZenMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-10 cursor-none"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-cyan-900/10 opacity-50"
                            animate={{
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="relative z-10 text-center space-y-12">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-sm font-black text-cyan-500 uppercase tracking-[1em] mb-4 opacity-50 italic">
                                    Current Directive
                                </h2>
                                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                                    {activeTask ? activeTask.title : 'Absolute Focus'}
                                </h1>
                            </motion.div>

                            <motion.div
                                className="relative flex items-center justify-center"
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <svg className="w-[100vw] max-w-[500px] h-[50vw] max-h-[500px] transform -rotate-90">
                                    <circle
                                        cx="250" cy="250" r="230"
                                        stroke="rgba(255,255,255,0.03)"
                                        strokeWidth="2"
                                        fill="none"
                                    />
                                    <motion.circle
                                        cx="250" cy="250" r="230"
                                        stroke="url(#zenGradient)"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={1445}
                                        initial={{ strokeDashoffset: 1445 }}
                                        animate={{ strokeDashoffset: 1445 - (1445 * progress) / 100 }}
                                        transition={{ duration: 1, ease: "linear" }}
                                    />
                                    <defs>
                                        <linearGradient id="zenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#22d3ee" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-[12rem] md:text-[15rem] font-black text-white tracking-tighter leading-none italic select-none">
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                whileHover={{ opacity: 1, scale: 1.1 }}
                                onClick={() => setIsZenMode(false)}
                                className="px-10 py-4 rounded-full border border-white/10 text-white text-xs font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all cursor-default"
                            >
                                Deactivate Zen Link
                            </motion.button>
                        </div>

                        {/* Ambient Flow Indicators */}
                        <div className="absolute bottom-20 left-10 right-10 flex justify-between items-end opacity-20">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Stasis</p>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="h-1 w-8 bg-cyan-500/30 rounded-full" />)}
                                </div>
                            </div>
                            <div className="text-right space-y-2">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Efficiency Wave</p>
                                <div className="flex gap-1 justify-end">
                                    {[1, 2, 3, 4].map(i => (
                                        <motion.div
                                            key={i}
                                            className="h-4 w-1 bg-indigo-500/40 rounded-full"
                                            animate={{ height: [8, 16, 8] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Neural Focus Interface</span>
                    </div>
                    <button
                        onClick={() => setIsZenMode(true)}
                        className="flex items-center gap-3 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all group"
                    >
                        <Zap size={14} className="group-hover:fill-cyan-400 group-hover:text-cyan-400 transition-all" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">Initiate Zen Link</span>
                    </button>
                </div>
                <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">
                    {activeTask ? activeTask.title : 'Neural Focus'}
                </h1>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-widest opacity-60">
                    {activeTask ? activeTask.description : 'Calibrate your cognitive state for peak performance'}
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Timer Section */}
                <div className="col-span-1 xl:col-span-8">
                    <motion.div
                        className="p-10 rounded-[2.5rem] bg-black border border-white/5 relative overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {/* Background Neural Shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

                        {/* Session Type Selector */}
                        <div className="flex flex-wrap gap-3 mb-12 relative z-10 p-1.5 rounded-2xl bg-white/[0.02] border border-white/5 w-fit">
                            {Object.entries(sessionPresets).map(([key, preset]) => (
                                <button
                                    key={key}
                                    onClick={() => selectSession(key)}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 ${sessionType === key
                                        ? `bg-white/10 text-white shadow-lg border border-white/10 scale-105`
                                        : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    <preset.icon size={16} className={sessionType === key ? 'text-cyan-400' : ''} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{preset.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Custom Time Adjuster */}
                        {sessionType === 'custom' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center gap-6 mb-12 relative z-10"
                            >
                                <button
                                    onClick={() => adjustCustomTime(-5)}
                                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all border shadow-inner"
                                >
                                    <Minus size={20} />
                                </button>
                                <div className="px-8 py-4 rounded-2xl bg-black border border-white/10 flex items-center gap-4 shadow-2xl">
                                    <input
                                        type="number"
                                        value={customMinutes}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 1;
                                            const clamped = Math.max(1, Math.min(10000, val));
                                            setCustomMinutes(clamped);
                                            setTimeLeft(clamped * 60);
                                        }}
                                        className="w-24 bg-transparent text-4xl font-black text-cyan-400 text-center outline-none italic tracking-tighter"
                                        min="1"
                                    />
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">min</span>
                                </div>
                                <button
                                    onClick={() => adjustCustomTime(5)}
                                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all border shadow-inner"
                                >
                                    <Plus size={20} />
                                </button>
                            </motion.div>
                        )}

                        {/* Timer Display */}
                        <div className="relative z-10 flex flex-col items-center justify-center py-10 mb-12">
                            <div className="relative group">
                                {/* Large Telemetry Ring */}
                                <div className="absolute inset-0 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all duration-1000" />
                                <svg className="w-80 h-80 transform -rotate-90 relative z-10">
                                    <circle
                                        cx="160" cy="160" r="150"
                                        stroke="rgba(255,255,255,0.03)"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <motion.circle
                                        cx="160" cy="160" r="150"
                                        stroke="url(#timerGradient)"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={942}
                                        initial={{ strokeDashoffset: 942 }}
                                        animate={{ strokeDashoffset: 942 - (942 * progress) / 100 }}
                                        transition={{ duration: 1, ease: "linear" }}
                                    />
                                    <defs>
                                        <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#6366f1" />
                                            <stop offset="100%" stopColor="#22d3ee" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                                    <span className="text-8xl font-black text-white italic tracking-tighter select-none">
                                        {formatTime(timeLeft)}
                                    </span>
                                    <div className="flex items-center gap-3 mt-4">
                                        <div className="h-[2px] w-4 bg-cyan-500/30" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] italic">
                                            {sessionPresets[sessionType].label}
                                        </span>
                                        <div className="h-[2px] w-4 bg-cyan-500/30" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls Interface */}
                        <div className="flex items-center justify-center gap-6 relative z-10">
                            <button
                                onClick={resetTimer}
                                className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all shadow-inner"
                                title="Reset Core"
                            >
                                <RotateCcw size={20} />
                            </button>

                            <button
                                onClick={toggleTimer}
                                className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all group/play"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/play:opacity-100 transition-opacity rounded-[2rem]" />
                                {isRunning ? <Pause size={36} className="relative z-10" /> : <Play size={36} className="relative z-10 ml-1 fill-current" />}
                            </button>

                            <button
                                onClick={() => selectSession(sessionType === 'focus' ? 'shortBreak' : 'focus')}
                                className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all shadow-inner"
                                title="Toggle Break State"
                            >
                                <Coffee size={24} />
                            </button>
                        </div>

                        {/* Session Analytics Block */}
                        <div className="grid grid-cols-2 gap-px bg-white/5 mt-16 border-t border-white/5 relative z-10 rounded-b-[2.5rem] overflow-hidden">
                            <div className="bg-black/40 py-8 text-center group/stat">
                                <p className="text-4xl font-black text-white italic group-hover:text-cyan-400 transition-colors uppercase tracking-tighter">{completedSessions}</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Protocols Executed</p>
                            </div>
                            <div className="bg-black/40 py-8 text-center group/stat">
                                <div className="flex items-baseline justify-center gap-1 italic">
                                    <p className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tighter">{Math.floor(completedSessions * 25 / 60)}</p>
                                    <span className="text-sm font-black text-slate-600 uppercase">H</span>
                                    <p className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tighter ml-2">{(completedSessions * 25) % 60}</p>
                                    <span className="text-sm font-black text-slate-600 uppercase">M</span>
                                </div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Cumulative Persistence</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Tools */}
                <div className="col-span-1 xl:col-span-4 space-y-6">
                    <NeuralSoundscapes />
                    <SpotifyPlayer />
                    <BrowserSentinel />
                </div>
            </div>
        </div>
    );
};

export default Focus;
