import React, { useState } from 'react';
import { Smile, Meh, Frown, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const MoodTracker = () => {
    const [todayMood, setTodayMood] = useState(null);
    const [moodHistory, setMoodHistory] = useState([
        { date: '2026-01-06', mood: 'good', energy: 8 },
        { date: '2026-01-05', mood: 'neutral', energy: 6 },
        { date: '2026-01-04', mood: 'great', energy: 9 },
        { date: '2026-01-03', mood: 'bad', energy: 4 },
    ]);

    const moods = [
        { id: 'great', icon: '😊', label: 'Great', color: '#10b981' },
        { id: 'good', icon: '🙂', label: 'Good', color: '#00d1ff' },
        { id: 'neutral', icon: '😐', label: 'Okay', color: '#f59e0b' },
        { id: 'bad', icon: '😔', label: 'Low', color: '#ef4444' },
    ];

    const handleMoodSelect = (moodId) => {
        setTodayMood(moodId);
        // In real app, save to backend
    };

    const getMoodStats = () => {
        const moodCounts = moodHistory.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {});

        const avgEnergy = moodHistory.reduce((sum, entry) => sum + entry.energy, 0) / moodHistory.length;

        return { moodCounts, avgEnergy: avgEnergy.toFixed(1) };
    };

    const stats = getMoodStats();

    return (
        <div className="space-y-6">
            {/* Today's Mood */}
            <div className="glass-card border-white/10 p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4">How are you feeling today?</h3>

                <div className="grid grid-cols-4 gap-3">
                    {moods.map((mood) => (
                        <motion.button
                            key={mood.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleMoodSelect(mood.id)}
                            className={`p-4 rounded-xl text-center transition-all ${todayMood === mood.id
                                    ? 'bg-white/20 border-2'
                                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                                }`}
                            style={{
                                borderColor: todayMood === mood.id ? mood.color : 'transparent',
                            }}
                        >
                            <div className="text-4xl mb-2">{mood.icon}</div>
                            <div className="text-xs font-bold">{mood.label}</div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Mood Insights */}
            <div className="glass-card border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <TrendingUp size={20} className="text-accent" />
                    <h3 className="font-bold">This Week's Insights</h3>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-sm">Average Energy</span>
                        <span className="font-bold text-accent">{stats.avgEnergy}/10</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-sm">Most Common Mood</span>
                        <span className="font-bold">
                            {Object.keys(stats.moodCounts).reduce((a, b) =>
                                stats.moodCounts[a] > stats.moodCounts[b] ? a : b
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Mood History */}
            <div className="glass-card border-white/10 p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                    <Calendar size={20} className="text-purple-500" />
                    <h3 className="font-bold">Recent Moods</h3>
                </div>

                <div className="space-y-2">
                    {moodHistory.slice(0, 5).map((entry, index) => {
                        const moodData = moods.find(m => m.id === entry.mood);
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{moodData?.icon}</span>
                                    <span className="text-sm text-zinc-400">{entry.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-zinc-500">Energy:</span>
                                    <span className="font-bold">{entry.energy}/10</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MoodTracker;
