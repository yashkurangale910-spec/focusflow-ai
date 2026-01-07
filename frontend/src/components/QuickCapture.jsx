import React, { useState } from 'react';
import { Inbox, Plus, CheckCircle, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasks } from '../context/TaskContext';

const QuickCapture = () => {
    const { addTask } = useTasks();
    const [input, setInput] = useState('');
    const [captures, setCaptures] = useState([
        { id: 1, text: 'Research competitor pricing', timestamp: new Date(Date.now() - 3600000) },
        { id: 2, text: 'Call dentist for appointment', timestamp: new Date(Date.now() - 7200000) },
        { id: 3, text: 'Review Q1 analytics report', timestamp: new Date(Date.now() - 10800000) },
    ]);

    const quickCapture = () => {
        if (!input.trim()) return;

        const newCapture = {
            id: Date.now(),
            text: input,
            timestamp: new Date()
        };

        setCaptures([newCapture, ...captures]);
        setInput('');
    };

    const convertToTask = (capture) => {
        addTask({
            title: capture.text,
            description: '',
            priority: 'medium',
            category: 'Quick Capture',
            estimatedTime: 25,
            status: 'todo'
        });

        setCaptures(captures.filter(c => c.id !== capture.id));
    };

    const deleteCapture = (id) => {
        setCaptures(captures.filter(c => c.id !== id));
    };

    const getTimeAgo = (timestamp) => {
        const seconds = Math.floor((new Date() - timestamp) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Inbox size={24} className="text-green-500" />
                <div>
                    <h3 className="text-xl font-bold">Quick Capture</h3>
                    <p className="text-xs text-zinc-500">Dump thoughts, organize later</p>
                </div>
            </div>

            {/* Quick Input */}
            <div className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && quickCapture()}
                        placeholder="What's on your mind? (Press Enter)"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500"
                        autoFocus
                    />
                    <button
                        onClick={quickCapture}
                        disabled={!input.trim()}
                        className="px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus size={20} />
                    </button>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                    💡 Just brain dump here. Process into tasks when ready.
                </p>
            </div>

            {/* Inbox Items */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-zinc-400">
                        Inbox ({captures.length})
                    </h4>
                    {captures.length > 0 && (
                        <button
                            onClick={() => setCaptures([])}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {captures.map((capture) => (
                        <motion.div
                            key={capture.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex-1">
                                    <p className="text-sm mb-1">{capture.text}</p>
                                    <p className="text-xs text-zinc-500">{getTimeAgo(capture.timestamp)}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => convertToTask(capture)}
                                        className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 transition-all"
                                        title="Convert to Task"
                                    >
                                        <ArrowRight size={14} />
                                    </button>
                                    <button
                                        onClick={() => deleteCapture(capture.id)}
                                        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {captures.length === 0 && (
                    <div className="text-center py-8">
                        <CheckCircle size={48} className="mx-auto text-green-500/30 mb-3" />
                        <p className="text-sm text-zinc-500">Inbox Zero! 🎉</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuickCapture;
