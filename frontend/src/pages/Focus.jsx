import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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

    const progress = ((sessionPresets[sessionType].time - timeLeft) / sessionPresets[sessionType].time) * 100;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Neural Focus Mode</span>
                </div>
                <h1 className="text-4xl font-black text-white mb-2">
                    {activeTask ? activeTask.title : 'Focus Session'}
                </h1>
                <p className="text-slate-400">
                    {activeTask ? activeTask.description : 'Enter deep focus mode to maximize productivity'}
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Timer Section */}
                <div className="col-span-1 xl:col-span-8">
                    <motion.div
                        className="p-6 md:p-10 rounded-[2rem] bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/5 relative overflow-hidden holographic-shine glass-reflection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Morphing backgrounds */}
                        <MorphingBlob color="purple" size="large" position="top-right" />
                        <MorphingBlob color="cyan" size="medium" position="bottom-left" />

                        {/* Particle field */}
                        <ParticleField count={20} color="cyan" />

                        {/* Session Type Selector */}
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10 relative z-10">
                            {Object.entries(sessionPresets).map(([key, preset]) => (
                                <button
                                    key={key}
                                    onClick={() => selectSession(key)}
                                    className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 rounded-xl transition-all ${sessionType === key
                                        ? `bg-${preset.color}-500/20 border border-${preset.color}-500/40 text-${preset.color}-400`
                                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <preset.icon className="w-4 h-4" />
                                    <span className="text-xs md:text-sm font-medium">{preset.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Custom Time Adjuster - shows when Custom is selected */}
                        {sessionType === 'custom' && (
                            <div className="flex items-center justify-center gap-4 mb-8 relative z-10">
                                <button
                                    onClick={() => adjustCustomTime(-5)}
                                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <div className="px-4 py-3 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={customMinutes}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value) || 1;
                                            const clamped = Math.max(1, Math.min(10000, val));
                                            setCustomMinutes(clamped);
                                            setTimeLeft(clamped * 60);
                                        }}
                                        className="w-20 bg-transparent text-2xl font-bold text-amber-400 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        min="1"
                                        max="10000"
                                    />
                                    <span className="text-amber-400/70">min</span>
                                </div>
                                <button
                                    onClick={() => adjustCustomTime(5)}
                                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Timer Display */}
                        <div className="relative z-10 text-center mb-10">
                            <div className="relative inline-block">
                                {/* Progress Ring */}
                                <svg className="w-72 h-72 transform -rotate-90">
                                    <circle
                                        cx="144" cy="144" r="130"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="none"
                                        className="text-slate-800"
                                    />
                                    <circle
                                        cx="144" cy="144" r="130"
                                        stroke="url(#gradient)"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={817}
                                        strokeDashoffset={817 - (817 * progress) / 100}
                                        className="transition-all duration-1000"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#06b6d4" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Time - Clean and simple */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-7xl font-black text-white tracking-tight">
                                        {formatTime(timeLeft)}
                                    </span>
                                    <span className="text-slate-500 text-sm mt-2">
                                        {sessionPresets[sessionType].label}
                                    </span>
                                </div>

                                {/* Liquid decoration around timer */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-64 h-64 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 liquid-shape blur-2xl" />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4 relative z-10">
                            <button
                                onClick={resetTimer}
                                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>

                            <button
                                onClick={toggleTimer}
                                className="w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all"
                            >
                                {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                            </button>

                            <button
                                onClick={() => selectSession(sessionType === 'focus' ? 'shortBreak' : 'focus')}
                                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <Coffee className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Session Stats */}
                        <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-white/5 relative z-10">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">{completedSessions}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Sessions</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">{Math.floor(completedSessions * 25 / 60)}h {(completedSessions * 25) % 60}m</p>
                                <p className="text-xs text-slate-500 uppercase tracking-wider">Total Focus</p>
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
