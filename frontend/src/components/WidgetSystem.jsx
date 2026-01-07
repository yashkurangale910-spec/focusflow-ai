import React, { useState } from 'react';
import { Layout, Plus, X, GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const WidgetSystem = () => {
    const [availableWidgets] = useState([
        { id: 'timer', name: 'Focus Timer', icon: '⏱️', size: 'medium' },
        { id: 'tasks', name: 'Quick Tasks', icon: '✅', size: 'large' },
        { id: 'mood', name: 'Mood Tracker', icon: '😊', size: 'small' },
        { id: 'goals', name: 'Daily Goals', icon: '🎯', size: 'medium' },
        { id: 'music', name: 'Music Player', icon: '🎵', size: 'medium' },
        { id: 'calendar', name: 'Calendar', icon: '📅', size: 'large' },
        { id: 'leaderboard', name: 'Leaderboard', icon: '🏆', size: 'medium' },
        { id: 'ai', name: 'AI Assistant', icon: '🤖', size: 'small' },
    ]);

    const [activeWidgets, setActiveWidgets] = useState([
        { id: 'timer', position: { x: 0, y: 0 } },
        { id: 'tasks', position: { x: 1, y: 0 } },
        { id: 'mood', position: { x: 0, y: 1 } },
    ]);

    const addWidget = (widgetId) => {
        if (!activeWidgets.find(w => w.id === widgetId)) {
            setActiveWidgets([...activeWidgets, { id: widgetId, position: { x: 0, y: activeWidgets.length } }]);
        }
    };

    const removeWidget = (widgetId) => {
        setActiveWidgets(activeWidgets.filter(w => w.id !== widgetId));
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Layout size={24} className="text-accent" />
                <h3 className="text-xl font-bold">Dashboard Widgets</h3>
            </div>

            {/* Active Widgets */}
            <div className="mb-6">
                <h4 className="text-sm font-bold text-zinc-400 mb-3">Active Widgets</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activeWidgets.map((widget) => {
                        const widgetData = availableWidgets.find(w => w.id === widget.id);
                        return (
                            <motion.div
                                key={widget.id}
                                layout
                                className="relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/50 transition-all cursor-move"
                            >
                                <button
                                    onClick={() => removeWidget(widget.id)}
                                    className="absolute top-2 right-2 p-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all"
                                >
                                    <X size={12} className="text-red-400" />
                                </button>
                                <GripVertical size={16} className="absolute top-2 left-2 text-zinc-600" />
                                <div className="text-center mt-4">
                                    <div className="text-3xl mb-2">{widgetData?.icon}</div>
                                    <p className="text-xs font-bold">{widgetData?.name}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Available Widgets */}
            <div>
                <h4 className="text-sm font-bold text-zinc-400 mb-3">Add Widgets</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {availableWidgets
                        .filter(w => !activeWidgets.find(aw => aw.id === w.id))
                        .map((widget) => (
                            <button
                                key={widget.id}
                                onClick={() => addWidget(widget.id)}
                                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all text-center"
                            >
                                <div className="text-2xl mb-1">{widget.icon}</div>
                                <p className="text-[10px] font-bold">{widget.name}</p>
                                <Plus size={12} className="mx-auto mt-1 text-accent" />
                            </button>
                        ))}
                </div>
            </div>

            <div className="mt-6 p-3 rounded-xl bg-accent/10 border border-accent/30 text-xs text-center">
                💡 <strong>Drag & Drop:</strong> Rearrange widgets by dragging them
            </div>
        </div>
    );
};

export default WidgetSystem;
