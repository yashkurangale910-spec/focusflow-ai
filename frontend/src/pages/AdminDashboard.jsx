import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Activity, Server, Shield, LogOut, Trash2, Search, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            // Fetch stats
            const statsRes = await fetch('http://localhost:5000/api/admin/stats', {
                headers: { 'Authorization': `Bearer ${token} ` }
            });
            const statsData = await statsRes.json();
            setStats(statsData);

            // Fetch users
            const usersRes = await fetch(`http://localhost:5000/api/admin/users?search=${searchTerm}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const usersData = await usersRes.json();
            setUsers(usersData.users || []);
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchData(); // Refresh
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-outfit p-6 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex justify-between items-end border-b border-white/10 pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-red-500 text-xs font-mono tracking-widest uppercase">System Online</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight">MISSION CONTROL</h1>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={fetchData}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-white/5 transition-colors text-sm font-mono"
                        >
                            <RefreshCw size={16} /> REFRESH
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-red-900/20 hover:text-red-400 transition-colors text-sm font-mono"
                        >
                            <LogOut size={16} /> ABORT
                        </button>
                    </div>
                </div>

                {/* KPI Grid */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500', border: 'border-blue-500/20' },
                            { label: 'Active Users', value: stats.activeUsers, icon: Activity, color: 'text-green-500', border: 'border-green-500/20' },
                            { label: 'Total Sessions', value: stats.totalSessions, icon: Server, color: 'text-purple-500', border: 'border-purple-500/20' },
                            { label: 'Focus Hours', value: `${stats.totalFocusHours}h`, icon: Shield, color: 'text-red-500', border: 'border-red-500/20' },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-6 rounded-2xl bg-zinc-950 border ${stat.border}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <stat.icon size={24} className={stat.color} />
                                    <span className={`text-[10px] uppercase tracking-wider font-mono ${stat.color} opacity-70`}>LIVE</span>
                                </div>
                                <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
                                <p className="text-sm text-zinc-500 font-mono uppercase tracking-wide">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* User Management */}
                <div className="p-8 rounded-2xl bg-zinc-950 border border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold font-mono">USER MANAGEMENT</h3>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                                className="bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-red-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <AnimatePresence>
                            {users.map((user, idx) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-black font-bold">
                                            {user.name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-bold flex items-center gap-2">
                                                {user.name}
                                                {user.role === 'admin' && (
                                                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-mono">ADMIN</span>
                                                )}
                                            </p>
                                            <p className="text-sm text-zinc-500 font-mono">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right text-sm">
                                            <p className="text-zinc-500">Streak</p>
                                            <p className="font-bold">{user.currentStreak || 0} days</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="p-2 rounded-lg bg-red-900/20 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-900/40 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {users.length === 0 && (
                            <div className="text-center py-12 text-zinc-600">
                                No users found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
