import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, task = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: 'General',
        estimatedTime: 25,
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                priority: task.priority,
                category: task.category,
                estimatedTime: task.estimatedTime,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                priority: 'medium',
                category: 'General',
                estimatedTime: 25,
            });
        }
        setError('');
    }, [task, isOpen]);

    const handleSaveClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!formData.title.trim()) {
            setError('Task title is required');
            return;
        }

        onSave(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-lg glass-card border-white/10 p-8 rounded-3xl shadow-2xl surface-raised"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 font-display">
                            {task ? 'Edit Task' : 'New Directive'}
                        </h2>

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-2">
                                    Task Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({ ...formData, title: e.target.value });
                                        if (error) setError('');
                                    }}
                                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-colors ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-accent/50'}`}
                                    placeholder="Enter task title..."
                                    autoFocus
                                />
                                {error && <p className="text-red-400 text-xs mt-1 font-bold">{error}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                                    placeholder="Add details..."
                                    rows={3}
                                />
                            </div>

                            {/* Priority & Estimated Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-zinc-400 mb-2">
                                        Priority
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-zinc-400 mb-2">
                                        Estimated Time (min)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.estimatedTime}
                                        onChange={(e) => setFormData({ ...formData, estimatedTime: parseInt(e.target.value) || 25 })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
                                        min="1"
                                        max="999"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent/50 transition-colors"
                                    placeholder="e.g., Work, Personal, Study"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveClick}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                                    style={{ backgroundColor: 'var(--color-accent)', color: '#000' }}
                                >
                                    {task ? 'Update' : 'Initialize'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TaskModal;
