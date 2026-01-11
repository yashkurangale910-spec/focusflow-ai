import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Flame, Clock, Target, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Insights = () => {
    const { getWeeklyData, getTotalStats, getMonthlyTrend } = useAnalytics();

    const weeklyData = getWeeklyData();
    const stats = getTotalStats();
    const monthlyTrend = getMonthlyTrend();

    const statCards = [
        {
            icon: Clock,
            label: 'Total Output',
            value: stats.totalHours.toFixed(1),
            unit: 'hrs',
            color: '#6366f1'
        },
        {
            icon: Flame,
            label: 'Current Streak',
            value: stats.currentStreak,
            unit: 'days',
            color: '#f59e0b'
        },
        {
            icon: Target,
            label: 'Total Sessions',
            value: stats.totalSessions,
            unit: 'cycles',
            color: '#10b981'
        },
        {
            icon: Zap,
            label: 'Focus Quality',
            value: stats.avgQuality,
            unit: '/10',
            color: '#8b5cf6'
        },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="surface-raised p-4 border border-slate-700/50 backdrop-blur-xl shadow-2xl">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-lg font-bold text-white">
                        {payload[0].value} <span className="text-xs text-indigo-400">minutes</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-10 animate-soft-entry">
            {/* Header */}
            <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-2">Cognitive Analytics</p>
                <h1 className="text-4xl font-extrabold font-display">Neural <span className="text-slate-500 font-light italic text-3xl">Feedback</span></h1>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="surface-raised p-6 rounded-2xl group relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20"
                                style={{ backgroundColor: `${stat.color}10`, borderColor: `${stat.color}30` }}
                            >
                                <stat.icon size={18} style={{ color: stat.color }} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-bold font-display text-white">
                                {stat.value}
                                <span className="text-xs text-slate-500 font-medium ml-1.5 uppercase tracking-widest">{stat.unit}</span>
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">
                                {stat.label}
                            </p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-[0.03] scale-150 rotate-12 -mr-4 -mb-4">
                            <stat.icon size={120} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Weekly Heatmap */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="surface-flat p-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                <TrendingUp size={16} className="text-indigo-400" />
                            </div>
                            <h2 className="text-lg font-bold font-display text-white italic">Weekly Performance</h2>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Minutes / Day</span>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Bar
                                    dataKey="minutes"
                                    fill="url(#barGradient)"
                                    radius={[4, 4, 4, 4]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Day Pills */}
                    <div className="grid grid-cols-7 gap-3 mt-10">
                        {weeklyData.map((day, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-2xl text-center border transition-all duration-300 ${day.isToday
                                    ? 'bg-indigo-500/10 border-indigo-500/30 ring-1 ring-indigo-500/20'
                                    : 'bg-slate-900/40 border-slate-800'
                                    }`}
                            >
                                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">{day.day}</p>
                                <p className={`text-xl font-bold font-display ${day.isToday ? 'text-indigo-400' : 'text-white'}`}>
                                    {day.sessions}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 30-Day Trend */}
                <div className="surface-flat p-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                <Activity size={16} className="text-emerald-400" />
                            </div>
                            <h2 className="text-lg font-bold font-display text-white italic">Neural Consistency</h2>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">30-Day Trend</span>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyTrend}>
                                <defs>
                                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }}
                                    tickFormatter={(value) => new Date(value).getDate()}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="minutes"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorMinutes)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Motivational Card */}
            {stats.currentStreak >= 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-10 rounded-[2.5rem] relative overflow-hidden border border-indigo-500/20"
                    style={{
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(15,23,42,0.6) 100%)',
                    }}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-amber-500 shadow-2xl">
                            <Flame size={40} className="filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-3xl font-extrabold font-display text-white mb-2">Momentum Lock Established</h3>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-2xl">
                                You have maintained a <span className="text-indigo-400 font-bold">{stats.currentStreak}-day focus streak</span>.
                                Your neural pathways are adapting to this high-performance cycle.
                            </p>
                        </div>
                        <div className="px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-indigo-400 text-sm font-bold uppercase tracking-widest shadow-xl">
                            Keep the flow
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Insights;
