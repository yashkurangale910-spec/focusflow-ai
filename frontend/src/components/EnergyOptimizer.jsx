import React, { useState } from 'react';
import { Zap, Battery, TrendingUp, Sun, Moon, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const EnergyOptimizer = () => {
    const [currentEnergy, setCurrentEnergy] = useState(7);
    const [energyLog] = useState([
        { time: '09:00', level: 8, activity: 'Morning coffee' },
        { time: '11:00', level: 9, activity: 'Deep work' },
        { time: '13:00', level: 6, activity: 'After lunch' },
        { time: '15:00', level: 7, activity: 'Afternoon focus' },
    ]);

    const recommendations = {
        high: [
            { icon: '🎯', text: 'Perfect time for your hardest tasks', color: '#10b981' },
            { icon: '🧠', text: 'Tackle complex problem-solving now', color: '#10b981' },
            { icon: '⚡', text: 'Your peak performance window', color: '#10b981' },
        ],
        medium: [
            { icon: '📝', text: 'Good for routine tasks and emails', color: '#f59e0b' },
            { icon: '🤝', text: 'Schedule meetings or collaboration', color: '#f59e0b' },
            { icon: '📚', text: 'Review and organize work', color: '#f59e0b' },
        ],
        low: [
            { icon: '☕', text: 'Take a break or have a snack', color: '#ef4444' },
            { icon: '🚶', text: 'Go for a short walk', color: '#ef4444' },
            { icon: '🎵', text: 'Do simple, mindless tasks', color: '#ef4444' },
        ]
    };

    const getEnergyLevel = () => {
        if (currentEnergy >= 7) return 'high';
        if (currentEnergy >= 4) return 'medium';
        return 'low';
    };

    const getEnergyColor = () => {
        if (currentEnergy >= 7) return '#10b981';
        if (currentEnergy >= 4) return '#f59e0b';
        return '#ef4444';
    };

    const currentRecs = recommendations[getEnergyLevel()];

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Battery size={24} className="text-yellow-500" />
                <div>
                    <h3 className="text-xl font-bold">Energy Optimizer</h3>
                    <p className="text-xs text-zinc-500">Match tasks to your energy levels</p>
                </div>
            </div>

            {/* Current Energy */}
            <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <p className="text-sm text-zinc-400 mb-3">How's your energy right now?</p>

                <div className="flex items-center gap-4 mb-4">
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={currentEnergy}
                        onChange={(e) => setCurrentEnergy(parseInt(e.target.value))}
                        className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)`
                        }}
                    />
                    <div
                        className="text-4xl font-black"
                        style={{ color: getEnergyColor() }}
                    >
                        {currentEnergy}
                    </div>
                </div>

                <div className="flex justify-between text-xs text-zinc-500">
                    <span>Drained</span>
                    <span>Moderate</span>
                    <span>Energized</span>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
                <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <Zap size={16} style={{ color: getEnergyColor() }} />
                    What to do now
                </h4>
                <div className="space-y-2">
                    {currentRecs.map((rec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                        >
                            <span className="text-2xl">{rec.icon}</span>
                            <span className="text-sm">{rec.text}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Energy Pattern */}
            <div className="p-4 rounded-xl bg-white/5">
                <h4 className="text-sm font-bold mb-3">Today's Energy Pattern</h4>
                <div className="space-y-2">
                    {energyLog.map((log, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500 w-12">{log.time}</span>
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${log.level * 10}%`,
                                        backgroundColor: log.level >= 7 ? '#10b981' : log.level >= 4 ? '#f59e0b' : '#ef4444'
                                    }}
                                />
                            </div>
                            <span className="text-xs text-zinc-500 w-24">{log.activity}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-center">
                💡 Track your energy to discover your peak performance times
            </div>
        </div>
    );
};

export default EnergyOptimizer;
