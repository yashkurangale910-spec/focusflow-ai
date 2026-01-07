import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Flame, Clock, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Insights = () => {
    const { getWeeklyData, getTotalStats, getMonthlyTrend } = useAnalytics();

    const weeklyData = getWeeklyData();
    const stats = getTotalStats();
    const monthlyTrend = getMonthlyTrend();

    const statCards = [
        {
            icon: Clock,
            label: 'Total Hours',
            value: stats.totalHours,
            unit: 'hrs',
            color: '#00d1ff'
        },
        {
            icon: Flame,
            label: 'Current Streak',
            value: stats.currentStreak,
            unit: 'days',
            color: '#ff6b35'
        },
        {
            icon: Target,
            label: 'Sessions',
            value: stats.totalSessions,
            unit: 'total',
            color: '#10b981'
        },
        {
            icon: Zap,
            label: 'Avg Quality',
            value: stats.avgQuality,
            unit: '/10',
            color: '#f59e0b'
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black mb-2">Insights_</h1>
                <p className="text-zinc-500">Track your focus journey and celebrate your progress.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all group"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                style={{ backgroundColor: `${stat.color}20` }}
                            >
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-black" style={{ color: stat.color }}>
                                {stat.value}
                                <span className="text-lg text-zinc-600 ml-1">{stat.unit}</span>
                            </p>
                            <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Weekly Heatmap */}
            <div className="glass-card border-white/10 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={24} className="text-accent" />
                    <h2 className="text-2xl font-bold">This Week</h2>
                </div>

                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="day"
                            stroke="#71717a"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#71717a"
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                            labelStyle={{ color: '#00d1ff' }}
                        />
                        <Bar
                            dataKey="minutes"
                            fill="#00d1ff"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>

                {/* Day Pills */}
                <div className="grid grid-cols-7 gap-2 mt-6">
                    {weeklyData.map((day, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-xl text-center transition-all ${day.isToday
                                    ? 'bg-accent/20 border-2 border-accent'
                                    : 'bg-white/5 border border-white/10'
                                }`}
                        >
                            <p className="text-xs text-zinc-500 font-bold uppercase mb-1">{day.day}</p>
                            <p className="text-lg font-black text-white">{day.sessions}</p>
                            <p className="text-xs text-zinc-600">{day.minutes}m</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 30-Day Trend */}
            <div className="glass-card border-white/10 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">30-Day Trend</h2>

                <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyTrend}>
                        <defs>
                            <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00d1ff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00d1ff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                            dataKey="date"
                            stroke="#71717a"
                            style={{ fontSize: '10px' }}
                            tickFormatter={(value) => new Date(value).getDate()}
                        />
                        <YAxis
                            stroke="#71717a"
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#fff'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="minutes"
                            stroke="#00d1ff"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorMinutes)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Motivational Card */}
            {stats.currentStreak >= 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(0,209,255,0.2))',
                        border: '1px solid rgba(255,107,53,0.3)'
                    }}
                >
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <Flame size={32} className="text-orange-400" />
                            <h3 className="text-2xl font-black">You're on fire! 🔥</h3>
                        </div>
                        <p className="text-zinc-300 text-lg">
                            {stats.currentStreak} days in a row! Keep this momentum going.
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Insights;
