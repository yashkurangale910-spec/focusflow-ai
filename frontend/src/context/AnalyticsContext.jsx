import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const [sessions, setSessions] = useState([]);
    const [stats, setStats] = useState({
        totalSessions: 0,
        totalHours: 0,
        avgQuality: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, isAuthenticated } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!isAuthenticated) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                // Fetch stats
                const statsRes = await fetch(`${API_URL}/sessions/analytics`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                } else {
                    throw new Error(`Stats fetch failed: ${statsRes.status}`);
                }

                // Fetch session history
                const sessionRes = await fetch(`${API_URL}/sessions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (sessionRes.ok) {
                    const sessionData = await sessionRes.json();
                    setSessions(sessionData);
                } else {
                    throw new Error(`Sessions fetch failed: ${sessionRes.status}`);
                }
                setError(null);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
                setError(error.message);
                // Set fallback data
                setStats({
                    totalSessions: 0,
                    totalHours: 0,
                    avgQuality: 0,
                });
                setSessions([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [isAuthenticated, token, API_URL]);

    const addSession = async (sessionData) => {
        try {
            const response = await fetch(`${API_URL}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sessionData)
            });

            if (!response.ok) {
                throw new Error(`Failed to add session: ${response.status}`);
            }

            const newSession = await response.json();
            setSessions(prev => [newSession, ...prev]);

            // Refresh stats
            const statsRes = await fetch(`${API_URL}/sessions/analytics`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData);
            }

            return { success: true, session: newSession };
        } catch (error) {
            console.error('Failed to add session:', error);
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    const getWeeklyData = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days.map((day, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (date.getDay() - index));
            const daySessions = sessions.filter(s => {
                const sDate = new Date(s.createdAt);
                return sDate.toDateString() === date.toDateString();
            });
            return {
                day,
                minutes: daySessions.reduce((sum, s) => sum + (s.duration || 0), 0),
                sessions: daySessions.length,
                isToday: new Date().toDateString() === date.toDateString()
            };
        });
    };

    const getMonthlyTrend = () => {
        return Array.from({ length: 30 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const daySessions = sessions.filter(s => {
                const sDate = new Date(s.createdAt);
                return sDate.toDateString() === date.toDateString();
            });
            return {
                date: date.toISOString().split('T')[0],
                minutes: daySessions.reduce((sum, s) => sum + (s.duration || 0), 0)
            };
        }).reverse();
    };

    const getTotalStats = () => ({
        ...stats,
        currentStreak: calculateStreak(sessions)
    });

    const calculateStreak = (sessionList) => {
        if (sessionList.length === 0) return 0;
        let streak = 0;
        const today = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        const hasSessionToday = sessionList.some(s => new Date(s.createdAt).toDateString() === today);
        const hasSessionYesterday = sessionList.some(s => new Date(s.createdAt).toDateString() === yesterdayStr);

        if (!hasSessionToday && !hasSessionYesterday) return 0;

        let checkDate = new Date();
        if (!hasSessionToday) checkDate.setDate(checkDate.getDate() - 1);

        while (true) {
            const dateStr = checkDate.toDateString();
            const hasSession = sessionList.some(s => new Date(s.createdAt).toDateString() === dateStr);
            if (hasSession) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    };

    const [mood, setMood] = useState('neutral');

    const updateMood = (newMood) => {
        setMood(newMood);
    };

    const getProductivityInsights = () => {
        if (sessions.length < 3) return "Insufficient data for neural analysis.";

        const lowQualitySessions = sessions.filter(s => s.quality < 6).length;
        const avgDuration = sessions.reduce((a, b) => a + (b.duration || 0), 0) / sessions.length;

        let insights = [];
        if (lowQualitySessions > sessions.length / 2) {
            insights.push("High frequency of low-quality sessions detected. Consider shorter 15-minute 'Micro-Sprints'.");
        }
        if (avgDuration < 20) {
            insights.push("Short session average detected. Try 'Body Doubling' to increase focus stamina.");
        }

        return insights.length > 0 ? insights.join(' ') : "System stable. Focus flow is optimal.";
    };

    const value = {
        sessions,
        addSession,
        getTotalStats,
        getWeeklyData,
        getMonthlyTrend,
        mood,
        updateMood,
        getProductivityInsights
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};
