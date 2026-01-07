import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Calendar, Bell, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const TimeBlindnessHelper = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeAnchors, setTimeAnchors] = useState([
        { time: '09:00', label: 'Morning Start', passed: false },
        { time: '12:00', label: 'Lunch Time', passed: false },
        { time: '15:00', label: 'Afternoon Break', passed: false },
        { time: '18:00', label: 'Evening Wind Down', passed: false },
    ]);

    const [upcomingEvents] = useState([
        { time: '14:30', title: 'Team Meeting', in: '2h 15m' },
        { time: '16:00', title: 'Deep Work Block', in: '3h 45m' },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getTimeUntil = (targetTime) => {
        const [hours, minutes] = targetTime.split(':').map(Number);
        const target = new Date();
        target.setHours(hours, minutes, 0);

        const diff = target - currentTime;
        if (diff < 0) return 'Passed';

        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hoursLeft > 0) return `${hoursLeft}h ${minutesLeft}m`;
        return `${minutesLeft}m`;
    };

    const getProgressToNextAnchor = () => {
        const now = currentTime.getHours() * 60 + currentTime.getMinutes();
        const nextAnchor = timeAnchors.find(anchor => {
            const [h, m] = anchor.time.split(':').map(Number);
            return (h * 60 + m) > now;
        });

        if (!nextAnchor) return 100;

        const [h, m] = nextAnchor.time.split(':').map(Number);
        const nextTime = h * 60 + m;
        const prevAnchor = timeAnchors[timeAnchors.indexOf(nextAnchor) - 1];
        const prevTime = prevAnchor ? parseInt(prevAnchor.time.split(':')[0]) * 60 + parseInt(prevAnchor.time.split(':')[1]) : 0;

        return ((now - prevTime) / (nextTime - prevTime)) * 100;
    };

    return (
        <div className="glass-card border-white/10 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Clock size={28} className="text-blue-500" />
                <div>
                    <h2 className="text-2xl font-bold">Time Awareness Helper</h2>
                    <p className="text-sm text-zinc-500">Combat time blindness with visual time tracking</p>
                </div>
            </div>

            {/* Current Time - Large Display */}
            <div className="text-center mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <p className="text-sm text-zinc-400 mb-2">Right Now</p>
                <p className="text-6xl font-black text-blue-400">
                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-zinc-500 mt-2">
                    {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>

            {/* Time Anchors */}
            <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500" />
                    Time Anchors (Visual Checkpoints)
                </h3>
                <div className="space-y-2">
                    {timeAnchors.map((anchor, index) => {
                        const timeUntil = getTimeUntil(anchor.time);
                        const isPassed = timeUntil === 'Passed';

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`flex items-center justify-between p-3 rounded-xl ${isPassed ? 'bg-white/5 opacity-50' : 'bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${isPassed ? 'bg-zinc-600' : 'bg-blue-500 animate-pulse'
                                        }`} />
                                    <div>
                                        <p className="font-bold text-sm">{anchor.label}</p>
                                        <p className="text-xs text-zinc-500">{anchor.time}</p>
                                    </div>
                                </div>
                                <div className={`text-sm font-bold ${isPassed ? 'text-zinc-600' : 'text-blue-400'
                                    }`}>
                                    {timeUntil}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Progress Bar to Next Anchor */}
            <div className="mb-6">
                <div className="flex justify-between text-xs text-zinc-500 mb-2">
                    <span>Progress to Next Checkpoint</span>
                    <span>{Math.round(getProgressToNextAnchor())}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressToNextAnchor()}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                        <Bell size={16} className="text-yellow-500" />
                        Coming Up Soon
                    </h3>
                    <div className="space-y-2">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div>
                                    <p className="font-bold">{event.title}</p>
                                    <p className="text-xs text-zinc-500">{event.time}</p>
                                </div>
                                <span className="text-yellow-400 font-bold">in {event.in}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Settings */}
            <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs font-bold">
                    <Calendar size={14} className="inline mr-1" />
                    Add Anchor
                </button>
                <button className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-xs font-bold">
                    <Bell size={14} className="inline mr-1" />
                    Set Reminder
                </button>
            </div>
        </div>
    );
};

export default TimeBlindnessHelper;
