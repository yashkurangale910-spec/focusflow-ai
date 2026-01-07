import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, AlertTriangle, Award, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../context/AnalyticsContext';

const FocusScore = () => {
    const { sessions } = useAnalytics();
    const [score, setScore] = useState(0);
    const [insights, setInsights] = useState([]);

    useEffect(() => {
        calculateScore();
    }, [sessions]);

    const calculateScore = () => {
        if (sessions.length === 0) {
            setScore(0);
            return;
        }

        // Calculate score based on multiple factors
        const recentSessions = sessions.slice(-7); // Last 7 sessions

        // Factors:
        // 1. Consistency (sessions per day)
        const daysWithSessions = new Set(recentSessions.map(s =>
            new Date(s.createdAt).toDateString()
        )).size;
        const consistencyScore = (daysWithSessions / 7) * 30;

        // 2. Duration quality (25+ min sessions)
        const qualitySessions = recentSessions.filter(s => (s.duration || 25) >= 25).length;
        const durationScore = (qualitySessions / recentSessions.length) * 30;

        // 3. Total time this week
        const totalMinutes = recentSessions.reduce((sum, s) => sum + (s.duration || 25), 0);
        const timeScore = Math.min((totalMinutes / 300) * 20, 20); // Max 20 points for 5 hours

        // 4. Streak bonus
        const streakScore = Math.min(daysWithSessions * 4, 20);

        const totalScore = Math.round(consistencyScore + durationScore + timeScore + streakScore);
        setScore(Math.min(totalScore, 100));

        // Generate insights
        const newInsights = [];

        if (consistencyScore < 15) {
            newInsights.push({
                type: 'warning',
                text: 'Try to focus every day this week to boost your score',
                icon: '📅'
            });
        }

        if (durationScore < 15) {
            newInsights.push({
                type: 'tip',
                text: 'Aim for 25+ minute sessions for better focus quality',
                icon: '⏱️'
            });
        }

        if (totalScore >= 80) {
            newInsights.push({
                type: 'success',
                text: 'Excellent focus habits! Keep it up!',
                icon: '🔥'
            });
        }

        if (totalMinutes < 120) {
            newInsights.push({
                type: 'tip',
                text: 'Target 2+ hours of focused work this week',
                icon: '🎯'
            });
        }

        setInsights(newInsights);
    };

    const getScoreColor = () => {
        if (score >= 80) return '#10b981'; // Green
        if (score >= 60) return '#f59e0b'; // Yellow
        if (score >= 40) return '#f97316'; // Orange
        return '#ef4444'; // Red
    };

    const getScoreLabel = () => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Work';
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Target size={24} className="text-accent" />
                <div>
                    <h3 className="text-xl font-bold">Focus Score</h3>
                    <p className="text-xs text-zinc-500">Your weekly focus quality rating</p>
                </div>
            </div>

            {/* Score Display */}
            <div className="relative mb-6">
                <svg className="w-full h-48" viewBox="0 0 200 120">
                    {/* Background arc */}
                    <path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    {/* Score arc */}
                    <motion.path
                        d="M 20 100 A 80 80 0 0 1 180 100"
                        fill="none"
                        stroke={getScoreColor()}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${score * 2.5} 1000`}
                        initial={{ strokeDasharray: '0 1000' }}
                        animate={{ strokeDasharray: `${score * 2.5} 1000` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.p
                        className="text-6xl font-black"
                        style={{ color: getScoreColor() }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                    >
                        {score}
                    </motion.p>
                    <p className="text-sm text-zinc-500 mt-1">{getScoreLabel()}</p>
                </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/5 text-center">
                    <p className="text-2xl font-bold text-blue-400">
                        {new Set(sessions.slice(-7).map(s => new Date(s.createdAt).toDateString())).size}
                    </p>
                    <p className="text-xs text-zinc-500">Days Active</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center">
                    <p className="text-2xl font-bold text-green-400">
                        {sessions.slice(-7).filter(s => (s.duration || 25) >= 25).length}
                    </p>
                    <p className="text-xs text-zinc-500">Quality Sessions</p>
                </div>
            </div>

            {/* Insights */}
            {insights.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-zinc-400 mb-2">Insights</h4>
                    {insights.map((insight, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-3 rounded-xl text-sm ${insight.type === 'success' ? 'bg-green-500/10 border border-green-500/30' :
                                    insight.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                                        'bg-blue-500/10 border border-blue-500/30'
                                }`}
                        >
                            <span className="mr-2">{insight.icon}</span>
                            {insight.text}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FocusScore;
