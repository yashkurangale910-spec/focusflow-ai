import React, { useState } from 'react';
import { Play, Calendar, Clock, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../context/AnalyticsContext';

const SessionReplay = () => {
    const { sessions } = useAnalytics();
    const [selectedSession, setSelectedSession] = useState(null);

    const recentSessions = sessions.slice(-10).reverse();

    const getSessionQuality = (session) => {
        const duration = session.duration || 25;
        if (duration >= 45) return { label: 'Excellent', color: '#10b981', emoji: '🔥' };
        if (duration >= 25) return { label: 'Good', color: '#f59e0b', emoji: '✨' };
        return { label: 'Short', color: '#3b82f6', emoji: '⚡' };
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Play size={24} className="text-pink-500" />
                <div>
                    <h3 className="text-xl font-bold">Session Replay</h3>
                    <p className="text-xs text-zinc-500">Review your past focus sessions</p>
                </div>
            </div>

            {!selectedSession ? (
                /* Session List */
                <div className="space-y-2 max-h-96 overflow-y-auto">
                    {recentSessions.map((session, index) => {
                        const quality = getSessionQuality(session);
                        const date = new Date(session.createdAt);

                        return (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedSession(session)}
                                className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/50 transition-all text-left"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{quality.emoji}</span>
                                        <div>
                                            <p className="font-bold text-sm">
                                                {session.mode || 'Focus'} Session
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold" style={{ color: quality.color }}>
                                            {session.duration || 25}m
                                        </p>
                                        <p className="text-xs" style={{ color: quality.color }}>
                                            {quality.label}
                                        </p>
                                    </div>
                                </div>

                                {session.notes && (
                                    <p className="text-xs text-zinc-400 mt-2 line-clamp-1">
                                        📝 {session.notes}
                                    </p>
                                )}
                            </motion.button>
                        );
                    })}

                    {recentSessions.length === 0 && (
                        <div className="text-center py-12">
                            <Calendar size={48} className="mx-auto text-zinc-600 mb-4" />
                            <p className="text-zinc-500 text-sm">
                                No sessions yet. Complete a focus session to see it here!
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                /* Session Detail */
                <div className="space-y-4">
                    <button
                        onClick={() => setSelectedSession(null)}
                        className="text-sm text-accent hover:underline mb-4"
                    >
                        ← Back to sessions
                    </button>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                        <div className="text-center mb-4">
                            <p className="text-sm text-zinc-400 mb-2">Session Duration</p>
                            <p className="text-5xl font-black text-pink-400">
                                {selectedSession.duration || 25}
                            </p>
                            <p className="text-sm text-zinc-500">minutes</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-white/10 text-center">
                                <Clock size={20} className="mx-auto mb-1 text-blue-400" />
                                <p className="text-xs text-zinc-500">Started</p>
                                <p className="text-sm font-bold">
                                    {new Date(selectedSession.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/10 text-center">
                                <Award size={20} className="mx-auto mb-1 text-yellow-400" />
                                <p className="text-xs text-zinc-500">Quality</p>
                                <p className="text-sm font-bold">
                                    {getSessionQuality(selectedSession).label}
                                </p>
                            </div>
                        </div>
                    </div>

                    {selectedSession.notes && (
                        <div className="p-4 rounded-xl bg-white/5">
                            <h4 className="text-sm font-bold mb-2">Session Notes</h4>
                            <p className="text-sm text-zinc-300">{selectedSession.notes}</p>
                        </div>
                    )}

                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                        <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                            <TrendingUp size={16} className="text-blue-400" />
                            Insights
                        </h4>
                        <ul className="text-xs text-zinc-400 space-y-1">
                            <li>• Completed on {new Date(selectedSession.createdAt).toLocaleDateString('en-US', { weekday: 'long' })}</li>
                            <li>• {selectedSession.duration >= 45 ? 'Above average duration' : 'Standard session length'}</li>
                            <li>• Mode: {selectedSession.mode || 'Focus'}</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SessionReplay;
