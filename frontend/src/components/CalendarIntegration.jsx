import React, { useState } from 'react';
import { Calendar, Plus, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const CalendarIntegration = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [events, setEvents] = useState([
        { id: 1, title: 'Team Meeting', time: '10:00 AM', duration: '1h', synced: true },
        { id: 2, title: 'Deep Work Block', time: '2:00 PM', duration: '2h', synced: false },
        { id: 3, title: 'Review Session', time: '4:30 PM', duration: '30m', synced: true },
    ]);

    const connectCalendar = () => {
        // In real app: OAuth flow
        setIsConnected(true);
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Calendar size={24} className="text-blue-500" />
                    <h3 className="text-xl font-bold">Calendar Sync</h3>
                </div>
                {!isConnected ? (
                    <button
                        onClick={connectCalendar}
                        className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all"
                    >
                        Connect Google
                    </button>
                ) : (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                        <Check size={16} />
                        <span>Connected</span>
                    </div>
                )}
            </div>

            {!isConnected ? (
                <div className="text-center py-8">
                    <Calendar size={48} className="mx-auto text-zinc-600 mb-4" />
                    <p className="text-zinc-500 mb-2">Connect your calendar to:</p>
                    <ul className="text-sm text-zinc-400 space-y-1">
                        <li>• Auto-schedule focus sessions</li>
                        <li>• Block time for deep work</li>
                        <li>• Sync tasks with events</li>
                        <li>• Get smart reminders</li>
                    </ul>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-zinc-400">Today's Schedule</h4>
                        <button className="text-xs text-accent hover:underline">
                            <Plus size={14} className="inline" /> Add Event
                        </button>
                    </div>

                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                            <div className={`w-1 h-12 rounded ${event.synced ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                            <div className="flex-1">
                                <p className="font-bold text-sm">{event.title}</p>
                                <p className="text-xs text-zinc-500">{event.time} • {event.duration}</p>
                            </div>
                            {event.synced ? (
                                <Check size={16} className="text-green-400" />
                            ) : (
                                <button className="text-xs text-accent hover:underline">
                                    Sync
                                </button>
                            )}
                        </motion.div>
                    ))}

                    <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs">
                        <strong>Auto-Sync:</strong> Your focus sessions will automatically appear in Google Calendar
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarIntegration;
