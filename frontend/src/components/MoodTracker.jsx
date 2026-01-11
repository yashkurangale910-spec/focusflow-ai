import { Smile, Meh, Frown, TrendingUp, Calendar, Zap, Heart, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnalytics } from '../context/AnalyticsContext';

const MoodTracker = () => {
    const { updateMood } = useAnalytics();
    const [todayMood, setTodayMood] = useState(null);
    const [moodHistory, setMoodHistory] = useState([
        { date: '2026-01-06', mood: 'good', energy: 8 },
        { date: '2026-01-05', mood: 'neutral', energy: 6 },
        { date: '2026-01-04', mood: 'great', energy: 9 },
        { date: '2026-01-03', mood: 'bad', energy: 4 },
    ]);

    const moods = [
        { id: 'great', icon: '😊', label: 'Great', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
        { id: 'good', icon: '🙂', label: 'Good', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
        { id: 'neutral', icon: '😐', label: 'Okay', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
        { id: 'bad', icon: '😔', label: 'Low', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    ];

    const handleMoodSelect = (moodId) => {
        setTodayMood(moodId);
        updateMood(moodId);
    };

    const getMoodStats = () => {
        const moodCounts = moodHistory.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {});

        const avgEnergy = moodHistory.reduce((sum, entry) => sum + entry.energy, 0) / moodHistory.length;

        return { moodCounts, avgEnergy: avgEnergy.toFixed(1) };
    };

    const stats = getMoodStats();

    return (
        <div className="space-y-6">
            {/* Today's Mood */}
            <div className="surface-flat p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                    <Heart size={16} className="text-rose-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Emotional State</h3>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {moods.map((mood) => (
                        <motion.button
                            key={mood.id}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleMoodSelect(mood.id)}
                            className={`p-4 rounded-xl text-center transition-all duration-300 border ${todayMood === mood.id
                                ? 'bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                                : 'bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                                }`}
                        >
                            <div className="text-3xl mb-3 filter drop-shadow-md">{mood.icon}</div>
                            <div className={`text-[10px] font-bold uppercase tracking-wider ${todayMood === mood.id ? 'text-indigo-400' : 'text-slate-500'}`}>
                                {mood.label}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Mood Insights */}
            <div className="surface-flat p-6 rounded-2xl group">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-indigo-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Resilience Metrics</h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap size={12} className="text-amber-500" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg Energy</span>
                        </div>
                        <p className="text-2xl font-bold font-display text-white">{stats.avgEnergy}<span className="text-xs text-slate-600 ml-1">/10</span></p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity size={12} className="text-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dominant</span>
                        </div>
                        <p className="text-lg font-bold font-display text-white uppercase">
                            {Object.keys(stats.moodCounts).reduce((a, b) =>
                                stats.moodCounts[a] > stats.moodCounts[b] ? a : b
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mood History */}
            <div className="surface-flat p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar size={16} className="text-slate-500" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Timeline</h3>
                </div>

                <div className="space-y-3">
                    {moodHistory.slice(0, 5).map((entry, index) => {
                        const moodData = moods.find(m => m.id === entry.mood);
                        return (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:bg-slate-900/50 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{moodData?.icon}</span>
                                    <div>
                                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none mb-1">{entry.date}</p>
                                        <p className="text-xs font-bold text-slate-300 uppercase leading-none">{moodData?.label}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mb-1">Energy</span>
                                    <span className="text-xs font-bold text-white">{entry.energy}/10</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MoodTracker;
