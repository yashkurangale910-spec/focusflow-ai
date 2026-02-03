import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Calendar, CheckCircle, Shield, Activity, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GoalsSystem = () => {
    const [dailyGoal, setDailyGoal] = useState({ target: 4, current: 0 });
    const [weeklyGoal, setWeeklyGoal] = useState({ target: 20, current: 0 });
    const [showGoalSetter, setShowGoalSetter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch goals data from API
    useEffect(() => {
        const fetchGoalsData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setDailyGoal({ target: 4, current: 0 });
                    setWeeklyGoal({ target: 20, current: 0 });
                    setIsLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:5000/api/goals', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch goals data');
                }

                const data = await response.json();
                setDailyGoal(data.daily || { target: 4, current: 0 });
                setWeeklyGoal(data.weekly || { target: 20, current: 0 });
                setError(null);
            } catch (err) {
                console.error('Error fetching goals:', err);
                setError(err.message);
                // Fallback to default values
                setDailyGoal({ target: 4, current: 0 });
                setWeeklyGoal({ target: 20, current: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        fetchGoalsData();
    }, []);

    const dailyProgress = (dailyGoal.current / dailyGoal.target) * 100;
    const weeklyProgress = (weeklyGoal.current / weeklyGoal.target) * 100;

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div key={i} className="surface-raised p-8 rounded-[2rem] border-slate-800/80 animate-pulse">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-800/50" />
                                <div className="space-y-2">
                                    <div className="h-4 w-24 bg-slate-800/50 rounded" />
                                    <div className="h-3 w-32 bg-slate-800/30 rounded" />
                                </div>
                            </div>
                            <div className="h-8 w-16 bg-slate-800/50 rounded" />
                        </div>
                        <div className="h-2 bg-slate-900 rounded-full mb-4" />
                        <div className="flex items-center justify-between">
                            <div className="h-3 w-24 bg-slate-800/30 rounded" />
                            <div className="h-3 w-20 bg-slate-800/30 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="surface-raised p-8 rounded-[2rem] border-rose-500/20"
            >
                <div className="flex items-center gap-4 text-rose-400">
                    <AlertCircle size={24} />
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-tight">System Alert</h3>
                        <p className="text-xs text-slate-500 mt-1">Unable to sync goal data. Using offline mode.</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="space-y-6">{/* Daily Target Acquisition */}
            {/* Daily Target Acquisition */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-24 bg-rose-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-rose-500/10 transition-colors" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shadow-inner">
                            <Target size={20} className="text-rose-500" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Daily Target</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Focus sessions protocol</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black font-display text-rose-500 tabular-nums">
                            {dailyGoal.current}<span className="text-slate-700 mx-1">/</span>{dailyGoal.target}
                        </p>
                    </div>
                </div>

                <div className="relative h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-900 mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(dailyProgress, 100)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-rose-600 to-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]"
                    />
                </div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                        <Activity size={12} className="text-slate-600" />
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Trajectory Active</span>
                    </div>
                    {dailyProgress >= 100 ? (
                        <div className="flex items-center gap-2 text-rose-400">
                            <CheckCircle size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Protocol Secured</span>
                        </div>
                    ) : (
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{Math.round(dailyProgress)}% Synced</span>
                    )}
                </div>
            </motion.div>

            {/* Weekly Trajectory Monitor */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-24 bg-indigo-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-indigo-500/10 transition-colors" />

                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
                            <Calendar size={20} className="text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Weekly Trajectory</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Sustained output monitor</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black font-display text-indigo-400 tabular-nums">
                            {weeklyGoal.current}<span className="text-slate-700 mx-1">/</span>{weeklyGoal.target}
                        </p>
                    </div>
                </div>

                <div className="relative h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-900 mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                    />
                </div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-slate-600">
                        <Shield size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{weeklyGoal.target - weeklyGoal.current} remaining</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Zap size={10} className="text-indigo-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{Math.round(weeklyProgress)}% Alignment</span>
                    </div>
                </div>
            </motion.div>

            {/* Adjust Protocol Hub */}
            <button
                onClick={() => setShowGoalSetter(!showGoalSetter)}
                className="w-full h-12 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-slate-700 hover:text-slate-300 transition-all flex items-center justify-center gap-3 group/btn"
            >
                <TrendingUp size={16} className="group-hover/btn:scale-110 transition-transform" />
                Modify Acquisition Parameters
            </button>
        </div>
    );
};

export default GoalsSystem;
