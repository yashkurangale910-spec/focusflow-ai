import React from 'react';
import { useAnalytics } from '../context/AnalyticsContext';

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
    const maxValue = Math.max(...data.flat());

    const getColor = (value) => {
        if (value === 0) return 'rgba(255,255,255,0.05)';
        const intensity = value / maxValue;
        return `rgba(0, 209, 255, ${intensity * 0.8})`;
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-6">Productivity Heatmap</h3>
            <p className="text-sm text-zinc-500 mb-4">
                Your most productive hours throughout the week
            </p>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    {/* Hour labels */}
                    <div className="flex mb-2">
                        <div className="w-12" />
                        {Array.from({ length: 24 }).map((_, hour) => (
                            <div
                                key={hour}
                                className="w-6 text-[8px] text-center text-zinc-600"
                            >
                                {hour % 3 === 0 ? hour : ''}
                            </div>
                        ))}
                    </div>

                    {/* Heatmap grid */}
                    {data.map((dayData, dayIndex) => (
                        <div key={dayIndex} className="flex items-center mb-1">
                            <div className="w-12 text-xs font-bold text-zinc-500">
                                {days[dayIndex]}
                            </div>
                            {dayData.map((value, hour) => (
                                <div
                                    key={hour}
                                    className="w-6 h-6 mx-[1px] rounded-sm transition-all hover:scale-110 cursor-pointer group relative"
                                    style={{ backgroundColor: getColor(value) }}
                                    title={`${days[dayIndex]} ${hour}:00 - ${value} min`}
                                >
                                    {value > 0 && (
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                            {value} min
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-4">
                <span className="text-xs text-zinc-600">Less</span>
                {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
                    <div
                        key={i}
                        className="w-4 h-4 rounded-sm"
                        style={{
                            backgroundColor: intensity === 0
                                ? 'rgba(255,255,255,0.05)'
                                : `rgba(0, 209, 255, ${intensity * 0.8})`
                        }}
                    />
                ))}
                <span className="text-xs text-zinc-600">More</span>
            </div>

            {/* Peak hours insight */}
            <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/30">
                <p className="text-sm">
                    <strong className="text-accent">💡 Peak Hours:</strong> You're most productive between 9-11 AM and 2-4 PM
                </p>
            </div>
        </div>
    );
};

export default ProductivityHeatmap;
