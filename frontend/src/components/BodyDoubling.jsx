import React, { useState, useEffect } from 'react';
import { Users, Video, Mic, MicOff, Eye, EyeOff, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const BodyDoubling = () => {
    const [isActive, setIsActive] = useState(false);
    const [sessionTime, setSessionTime] = useState(0);
    const [mode, setMode] = useState('silent'); // silent, ambient, social
    const [partners] = useState([
        { id: 1, name: 'Alex', avatar: '👨‍💻', status: 'focusing', time: '1h 23m' },
        { id: 2, name: 'Sarah', avatar: '👩‍🎨', status: 'focusing', time: '45m' },
        { id: 3, name: 'Jordan', avatar: '🧑‍💼', status: 'break', time: '5m' },
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
            name: 'Silent Co-Working',
            description: 'Just presence, no interaction',
            color: '#3b82f6'
        },
        ambient: {
            icon: '🎵',
            name: 'Ambient Sounds',
            description: 'Shared background sounds',
            color: '#10b981'
        },
        social: {
            icon: '💬',
            name: 'Social Sessions',
            description: 'Chat during breaks',
            color: '#f59e0b'
        }
    };

    return (
        <div className="glass-card border-white/10 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Users size={28} className="text-green-500" />
                <div>
                    <h2 className="text-2xl font-bold">Body Doubling</h2>
                    <p className="text-sm text-zinc-500">Work alongside others for accountability</p>
                </div>
            </div>

            {!isActive ? (
                <>
                    {/* Mode Selection */}
                    <div className="space-y-3 mb-6">
                        <h3 className="text-sm font-bold text-zinc-400">Choose Your Mode</h3>
                        {Object.entries(modes).map(([key, modeData]) => (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setMode(key)}
                                className={`w-full p-4 rounded-xl text-left transition-all ${mode === key
                                        ? 'bg-white/20 border-2'
                                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                                    }`}
                                style={{
                                    borderColor: mode === key ? modeData.color : 'transparent'
                                }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">{modeData.icon}</span>
                                    <div>
                                        <h4 className="font-bold">{modeData.name}</h4>
                                        <p className="text-xs text-zinc-500">{modeData.description}</p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Active Partners */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-zinc-400 mb-3">
                            Currently Focusing ({partners.filter(p => p.status === 'focusing').length})
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {partners.map((partner) => (
                                <div
                                    key={partner.id}
                                    className="p-3 rounded-xl bg-white/5 text-center"
                                >
                                    <div className="text-3xl mb-1">{partner.avatar}</div>
                                    <p className="text-xs font-bold">{partner.name}</p>
                                    <p className="text-[10px] text-zinc-500">{partner.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={() => setIsActive(true)}
                        className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg transition-all shadow-lg"
                    >
                        Start Body Doubling Session
                    </button>

                    <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-xs">
                        💡 <strong>What is Body Doubling?</strong> Working alongside others (even virtually) helps ADHD brains stay focused and accountable.
                    </div>
                </>
            ) : (
                /* Active Session */
                <div className="space-y-6">
                    {/* Timer */}
                    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30">
                        <p className="text-sm text-zinc-400 mb-2">Session Time</p>
                        <p className="text-5xl font-black text-green-400">
                            {formatTime(sessionTime)}
                        </p>
                        <p className="text-sm text-zinc-500 mt-2">
                            {modes[mode].name}
                        </p>
                    </div>

                    {/* Partners Grid */}
                    <div>
                        <h3 className="text-sm font-bold mb-3">Working Together</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {partners.map((partner) => (
                                <div
                                    key={partner.id}
                                    className={`p-3 rounded-xl ${partner.status === 'focusing'
                                            ? 'bg-green-500/20 border border-green-500/30'
                                            : 'bg-yellow-500/20 border border-yellow-500/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{partner.avatar}</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold">{partner.name}</p>
                                            <p className="text-xs text-zinc-500">{partner.time}</p>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full ${partner.status === 'focusing' ? 'bg-green-500' : 'bg-yellow-500'
                                            } animate-pulse`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsActive(false)}
                            className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold transition-all"
                        >
                            End Session
                        </button>
                        <button className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                            <Eye size={20} />
                        </button>
                        <button className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                            <Mic size={20} />
                        </button>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-center">
                        ✨ You're doing great! {partners.length} others are working with you
                    </div>
                </div>
            )}
        </div>
    );
};

export default BodyDoubling;
