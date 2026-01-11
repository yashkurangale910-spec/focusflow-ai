import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Check, X, Bell, Clock, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CalendarIntegration = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [events, setEvents] = useState([
        { id: 1, title: 'Neural Optimization Sync', time: '10:00 AM', duration: '1h', type: 'COGNITIVE' },
        { id: 2, title: 'Deep Work Block', time: '2:00 PM', duration: '2h', type: 'ISOLATION' },
        { id: 3, title: 'Architecture Review', time: '4:30 PM', duration: '30m', type: 'REVIEW' },
    ]);

    const connectCalendar = () => {
        setIsConnected(true);
    };

    return (
        <div className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <CalendarIcon size={20} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">System Calendar</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Scheduling Active</p>
                    </div>
                </div>
                {!isConnected ? (
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={connectCalendar}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-lg shadow-indigo-600/20"
                    >
                        Initialize G-Link
                    </motion.button>
                ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Check size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Linked</span>
                    </div>
                )}
            </div>

            {!isConnected ? (
                <div className="relative p-10 rounded-3xl bg-slate-950 border border-slate-800 border-dashed text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent" />
                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Link2 size={24} className="text-slate-600" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-tight">Sync Authorization Required</h4>
                        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                            {[
                                'Auto-Block Time',
                                'Smart Reminders',
                                'Goal Mapping',
                                'Dynamic Scheduling'
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1 mb-2">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Today's Chronology</h4>
                        <button className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                            <Plus size={12} /> New Module
                        </button>
                    </div>

                    <div className="space-y-3">
                        {events.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group/event flex items-center gap-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80 hover:border-indigo-500/30 transition-all hover:bg-slate-950 shadow-inner"
                            >
                                <div className={`w-1 h-10 rounded-full ${event.type === 'COGNITIVE' ? 'bg-indigo-500' :
                                        event.type === 'ISOLATION' ? 'bg-purple-500' : 'bg-emerald-500'
                                    } shadow-[0_0_10px_rgba(99,102,241,0.3)]`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-white uppercase tracking-tight truncate">{event.title}</p>
                                    <div className="flex items-center gap-3 mt-1.5 opacity-60">
                                        <div className="flex items-center gap-1">
                                            <Clock size={10} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{event.time}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{event.duration}</span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 opacity-0 group-hover/event:opacity-100 transition-all cursor-pointer hover:text-white text-slate-500">
                                    <Bell size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_infinite]" />
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                            Adaptive Scheduler: Real-time conflict resolution enabled
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarIntegration;
