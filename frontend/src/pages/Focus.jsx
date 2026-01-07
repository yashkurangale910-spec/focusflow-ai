import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Bell, BellOff, Volume2, VolumeX } from 'lucide-react';

const Focus = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [activeMode, setActiveMode] = useState('pomodoro');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [notifEnabled, setNotifEnabled] = useState(false);
    const [customMinutes, setCustomMinutes] = useState(60);
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [tempMinutes, setTempMinutes] = useState(60);

    const timerRef = useRef(null);

    const modes = [
        { id: 'pomodoro', label: 'Pomodoro', duration: 25 * 60 },
        { id: 'deep-focus', label: 'Deep Focus', duration: 45 * 60 },
        { id: 'custom', label: 'Custom', duration: customMinutes * 60 },
    ];

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            clearInterval(timerRef.current);
            if (soundEnabled) {
                // Placeholder for sound play
                console.log("Timer finished!");
            }
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft, soundEnabled]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        const mode = modes.find(m => m.id === activeMode);
        setTimeLeft(mode.duration);
    };

    const handleModeChange = (modeId) => {
        if (modeId === 'custom') {
            setTempMinutes(customMinutes);
            setShowCustomModal(true);
        } else {
            setActiveMode(modeId);
            setIsActive(false);
            const mode = modes.find(m => m.id === modeId);
            setTimeLeft(mode.duration);
        }
    };

    const onConfirmCustom = () => {
        setCustomMinutes(tempMinutes);
        setActiveMode('custom');
        setIsActive(false);
        setTimeLeft(tempMinutes * 60);
        setShowCustomModal(false);
    };

    const onCloseCustom = () => {
        setShowCustomModal(false);
        // If they were already in custom, stay there, otherwise stay in previous mode
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / modes.find(m => m.id === activeMode).duration) * 100;

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-12 py-10 animate-in fade-in zoom-in duration-700">
            <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                    Focus. Work. <span style={{ color: 'var(--color-accent)' }}>Achieve.</span>
                </h1>
                <p className="text-zinc-500 max-w-md mx-auto">
                    Optimized neural intervals for high-throughput cognitive performance.
                </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => handleModeChange(mode.id)}
                        className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeMode === mode.id
                            ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.2)] text-black'
                            : 'text-zinc-500 hover:text-zinc-200'
                            }`}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {/* Custom Duration Modal */}
            <AnimatePresence>
                {showCustomModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onCloseCustom}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm glass-card border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onCloseCustom}
                                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>

                            <h3 className="text-xl font-bold text-center mb-6">Custom Duration (minutes)</h3>

                            <div className="flex items-center justify-center gap-4 mb-8">
                                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-4 group focus-within:border-accent/50 transition-colors">
                                    <input
                                        type="number"
                                        autoFocus
                                        value={tempMinutes}
                                        onChange={(e) => setTempMinutes(Math.min(Math.max(parseInt(e.target.value) || 0, 1), 999))}
                                        className="w-20 bg-transparent border-none focus:ring-0 text-center text-3xl font-bold text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="flex flex-col gap-1 pr-2">
                                        <button onClick={() => setTempMinutes(m => Math.min(m + 1, 999))} className="text-zinc-500 hover:text-accent transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                        </button>
                                        <button onClick={() => setTempMinutes(m => Math.max(m - 1, 1))} className="text-zinc-500 hover:text-accent transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={onConfirmCustom}
                                    className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,209,255,0.4)]"
                                    style={{ backgroundColor: 'var(--color-accent)' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Timer Display */}
            <div className="relative group">
                {/* Progress Ring Background */}
                <div className="w-[320px] h-[320px] rounded-full border-4 border-white/5 absolute inset-0" />

                {/* Glow Effects */}
                <div
                    className="absolute inset-[-20px] rounded-full opacity-30 blur-3xl transition-opacity duration-500"
                    style={{
                        backgroundColor: 'var(--color-accent)',
                        opacity: isActive ? 0.4 : 0.15
                    }}
                />

                {/* The Timer Circle */}
                <div className="w-[320px] h-[320px] rounded-full glass-card flex flex-col items-center justify-center relative z-10 border-white/10 shadow-2xl overflow-hidden">
                    {/* Progress Indicator (SVG) */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="160"
                            cy="160"
                            r="158"
                            fill="transparent"
                            stroke="var(--color-accent)"
                            strokeWidth="4"
                            strokeDasharray={1000}
                            strokeDashoffset={1000 - (progress * 10)}
                            className="transition-all duration-300 ease-linear opacity-50"
                        />
                    </svg>

                    <motion.span
                        key={timeLeft}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-7xl font-light tracking-tighter text-white tabular-nums"
                    >
                        {formatTime(timeLeft)}
                    </motion.span>

                    <div className="flex items-center gap-2 mt-4">
                        <div
                            className={`w-2 h-2 rounded-full animate-pulse`}
                            style={{ backgroundColor: isActive ? 'var(--color-accent)' : '#ef4444' }}
                        />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                            {isActive ? 'Neural Link Active' : 'Ready to focus'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
                <button
                    onClick={resetTimer}
                    className="p-4 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                    title="Reset"
                >
                    <RotateCcw size={24} />
                </button>

                <button
                    onClick={toggleTimer}
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                        backgroundColor: isActive ? 'white' : 'var(--color-accent)',
                        color: isActive ? 'black' : 'black'
                    }}
                >
                    {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>

                <button
                    className="p-4 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all opacity-0 pointer-events-none"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            {/* Bottom Toggles */}
            <div className="flex gap-4">
                <button
                    onClick={() => setNotifEnabled(!notifEnabled)}
                    className={`px-6 py-2 rounded-xl flex items-center gap-3 border transition-all ${notifEnabled
                        ? 'bg-white/10 border-white/20 text-white'
                        : 'bg-white/5 border-white/5 text-zinc-500'
                        }`}
                >
                    {notifEnabled ? <Bell size={18} /> : <BellOff size={18} />}
                    <span className="text-xs font-bold uppercase tracking-wider">
                        {notifEnabled ? 'Notifications Enabled' : 'Notifications Disabled'}
                    </span>
                </button>

                <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`px-6 py-2 rounded-xl flex items-center gap-3 border transition-all ${soundEnabled
                        ? 'bg-accent/10 border-accent/20 text-accent'
                        : 'bg-white/5 border-white/5 text-zinc-500'
                        }`}
                    style={soundEnabled ? { color: 'var(--color-accent)', borderColor: 'rgba(0,209,255,0.2)' } : {}}
                >
                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    <span className="text-xs font-bold uppercase tracking-wider">
                        {soundEnabled ? 'Sound Enabled' : 'Sound Disabled'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Focus;
