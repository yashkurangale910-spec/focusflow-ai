import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingUp, Download, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';

const SessionHistory = () => {
    const [sessions, setSessions] = useState([]);
    const [filteredSessions, setFilteredSessions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date'); // date, duration, quality
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSessions();
    }, []);

    useEffect(() => {
        filterAndSortSessions();
    }, [sessions, searchTerm, sortBy]);

    const fetchSessions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/sessions', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            // Ensure data is an array
            setSessions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
            setSessions([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortSessions = () => {
        // Ensure sessions is an array
        if (!Array.isArray(sessions)) {
            setFilteredSessions([]);
            return;
        }

        let filtered = [...sessions];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(s =>
                s.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.type?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort
        filtered.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'duration') {
                return (b.duration || 0) - (a.duration || 0);
            } else if (sortBy === 'quality') {
                return (b.quality || 0) - (a.quality || 0);
            }
            return 0;
        });

        setFilteredSessions(filtered);
    };

    const exportToCSV = () => {
        const headers = ['Date', 'Duration (min)', 'Quality', 'Type', 'Notes'];
        const rows = sessions.map(s => [
            format(new Date(s.createdAt), 'yyyy-MM-dd HH:mm'),
            s.duration || 0,
            s.quality || 0,
            s.type || 'focus',
            s.notes || ''
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `focus-sessions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
    };

    const getTotalStats = () => {
        // Ensure sessions is an array
        if (!Array.isArray(sessions) || sessions.length === 0) {
            return {
                totalSessions: 0,
                totalHours: 0,
                totalMinutes: 0,
                avgQuality: 0
            };
        }

        const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
        const avgQuality = sessions.reduce((sum, s) => sum + (s.quality || 0), 0) / sessions.length;

        return {
            totalSessions: sessions.length,
            totalHours: Math.floor(totalMinutes / 60),
            totalMinutes: totalMinutes % 60,
            avgQuality: avgQuality.toFixed(1)
        };
    };

    const stats = getTotalStats();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black mb-2">Session History</h1>
                <p className="text-zinc-400">Track your focus journey over time</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Sessions', value: stats.totalSessions, icon: Calendar, color: 'text-blue-500' },
                    { label: 'Total Time', value: `${stats.totalHours}h ${stats.totalMinutes}m`, icon: Clock, color: 'text-green-500' },
                    { label: 'Avg Quality', value: stats.avgQuality, icon: TrendingUp, color: 'text-purple-500' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass-card border-white/10 p-4 rounded-xl"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <stat.icon size={16} className={stat.color} />
                            <span className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-black">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search sessions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-600 outline-none focus:border-accent/50 transition-all"
                    />
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-accent/50 transition-all"
                >
                    <option value="date">Sort by Date</option>
                    <option value="duration">Sort by Duration</option>
                    <option value="quality">Sort by Quality</option>
                </select>

                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-accent text-black font-bold hover:bg-accent/90 transition-colors"
                >
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            {/* Sessions List */}
            <div className="glass-card border-white/10 p-6 rounded-2xl">
                {filteredSessions.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar size={48} className="mx-auto text-zinc-700 mb-4" />
                        <p className="text-zinc-500">No sessions found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredSessions.map((session, idx) => (
                            <motion.div
                                key={session._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm font-mono text-zinc-500">
                                                {format(new Date(session.createdAt), 'MMM dd, yyyy • HH:mm')}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold">
                                                {session.type || 'focus'}
                                            </span>
                                        </div>
                                        {session.notes && (
                                            <p className="text-sm text-zinc-300 mb-2">{session.notes}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="text-right">
                                            <p className="text-zinc-500 text-xs">Duration</p>
                                            <p className="font-bold">{session.duration || 0} min</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-zinc-500 text-xs">Quality</p>
                                            <p className="font-bold">{session.quality || 0}/5</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SessionHistory;
