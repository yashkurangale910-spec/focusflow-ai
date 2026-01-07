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
    const { token, isAuthenticated } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!isAuthenticated) return;
            try {
                // Fetch stats
                const statsRes = await fetch(`${API_URL}/sessions/analytics`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }

                // Fetch session history
                const sessionRes = await fetch(`${API_URL}/sessions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (sessionRes.ok) {
                    const sessionData = await sessionRes.json();
                    setSessions(sessionData);
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
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
            if (response.ok) {
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
            }
        } catch (error) {
            console.error('Failed to add session:', error);
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

    const value = {
        sessions,
        addSession,
        getTotalStats,
        getWeeklyData,
        getMonthlyTrend,
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};
