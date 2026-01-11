import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';
import { Activity, Shield, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductivityHeatmap = () => {
    const { sessions } = useAnalytics();

    // Generate heatmap data (hour by day)
    const generateHeatmapData = () => {
        const data = Array.from({ length: 7 }, () => Array(24).fill(0));
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        sessions.forEach(session => {
            const date = new Date(session.createdAt);
            const day = date.getDay();
            const hour = date.getHours();
            data[day][hour] += session.duration || 25;
        });

        return { data, days };
    };

    const { data, days } = generateHeatmapData();
    const maxValue = Math.max(...data.flat()) || 1;

    const getColor = (value) => {
        if (value === 0) return 'rgba(15, 23, 42, 0.4)'; // Slate 900
        const intensity = value / maxValue;
        // Using indigo for the heatmap scale
        return `rgba(99, 102, 241, ${0.1 + intensity * 0.8})`;
    };

    return (
        <div className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
                        <Activity size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Cognitive Load Mapping</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">High-density focus telemetry</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Sync</span>
                </div>
            </div>

            <div className="relative z-10 overflow-x-auto custom-scrollbar pb-4">
                <div className="inline-block min-w-full">
                    {/* Hour labels */}
                    <div className="flex mb-4">
                        <div className="w-12" />
                        {Array.from({ length: 24 }).map((_, hour) => (
                            <div
                                key={hour}
                                className="w-7 text-[8px] font-black text-center text-slate-600 uppercase"
                            >
                                {hour % 4 === 0 ? `${hour}h` : ''}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap grid */}
                    {data.map((dayData, dayIndex) => (
                        <div key={dayIndex} className="flex items-center mb-1.5">
                            <div className="w-12 text-[10px] font-black text-slate-500 uppercase tracking-tighter">
                                {days[dayIndex].slice(0, 3)}
                            </div>
                            <div className="flex gap-1.5">
                                {dayData.map((value, hour) => (
                                    <motion.div
                                        key={hour}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: (dayIndex * 24 + hour) * 0.001 }}
                                        className="w-7 h-7 rounded-lg border border-slate-900/50 transition-all hover:scale-110 cursor-crosshair group/cell relative"
                                        style={{ backgroundColor: getColor(value) }}
                                    >
                                        {value > 0 && (
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-bold text-white whitespace-nowrap opacity-0 group-hover/cell:opacity-100 transition-all shadow-2xl pointer-events-none z-20">
                                                <div className="flex items-center gap-2">
                                                    <Zap size={10} className="text-indigo-400" />
                                                    <span>{value} min focus</span>
                                                </div>
                                                <div className="text-[8px] text-slate-500 mt-1 uppercase tracking-widest">{days[dayIndex]} @ {hour}:00</div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tactical Legend & Insights */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Density scale:</span>
                        <div className="flex gap-1.5">
                            {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
                                <div
                                    key={i}
                                    className="w-4 h-4 rounded-md border border-slate-900"
                                    style={{
                                        backgroundColor: intensity === 0
                                            ? 'rgba(15, 23, 42, 0.4)'
                                            : `rgba(99, 102, 241, ${0.1 + intensity * 0.8})`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-sm px-4 py-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                    <Info size={16} className="text-indigo-400 shrink-0" />
                    <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">
                        Peak neural density detected between <span className="text-indigo-400 font-bold">09:00 - 11:30</span>. Optimal session depth achieved during mid-week cycles.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductivityHeatmap;
