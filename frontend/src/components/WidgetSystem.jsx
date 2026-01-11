import React, { useState } from 'react';
import { Layout, Plus, X, GripVertical, Zap, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Layout size={20} className="text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">System Widgets</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dashboard Component Management</p>
                </div>
            </div>

            {/* Active Infrastructure */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 px-1">
                    <Layers size={12} className="text-slate-500" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Infrastructure</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <AnimatePresence mode="popLayout">
                        {activeWidgets.map((widget) => {
                            const widgetData = availableWidgets.find(w => w.id === widget.id);
                            return (
                                <motion.div
                                    key={widget.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="relative p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/30 transition-all cursor-move group/widget shadow-inner"
                                >
                                    <button
                                        onClick={() => removeWidget(widget.id)}
                                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 opacity-0 group-hover/widget:opacity-100 transition-all hover:bg-rose-500/20 hover:text-rose-400 text-slate-500"
                                    >
                                        <X size={10} />
                                    </button>
                                    <div className="absolute top-2 left-2 p-1 text-slate-800 group-hover/widget:text-slate-600 transition-colors">
                                        <GripVertical size={14} />
                                    </div>
                                    <div className="text-center mt-4">
                                        <div className="text-3xl mb-3 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{widgetData?.icon}</div>
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{widgetData?.name}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Component Repository */}
            <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                    <Plus size={12} className="text-slate-500" />
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Component Repository</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableWidgets
                        .filter(w => !activeWidgets.find(aw => aw.id === w.id))
                        .map((widget) => (
                            <button
                                key={widget.id}
                                onClick={() => addWidget(widget.id)}
                                className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900 transition-all text-center group/add relative overflow-hidden"
                            >
                                <div className="text-xl mb-1 group-hover/add:scale-110 transition-transform">{widget.icon}</div>
                                <p className="text-[9px] font-black text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-tighter">{widget.name}</p>
                                <div className="absolute top-1 right-1 opacity-0 group-hover/add:opacity-100 transition-opacity">
                                    <Plus size={10} className="text-indigo-400" />
                                </div>
                            </button>
                        ))}
                </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                <Zap size={14} className="text-indigo-400" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed text-center w-full">
                    Modular interface architecture enabled
                </p>
            </div>
        </div>
    );
};

export default WidgetSystem;
