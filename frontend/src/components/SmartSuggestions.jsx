import React, { useState } from 'react';
import { Sparkles, TrendingUp, Clock, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { chatWithAI } from '../services/aiService';
import { useTasks } from '../context/TaskContext';

const SmartSuggestions = () => {
    const { tasks, addTask } = useTasks();
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateSuggestions = async () => {
        setLoading(true);
        try {
            const currentHour = new Date().getHours();
            const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';

            const taskContext = tasks.slice(0, 5).map(t => `- ${t.title} (${t.priority})`).join('\n');

            const prompt = `Based on these existing tasks and that it's ${timeOfDay}:
${taskContext}

Suggest 3 smart next tasks that would:
1. Build momentum
2. Match current energy levels (${timeOfDay})
3. Complement existing work

Format each as: "Task name | Priority (low/medium/high) | Estimated time (minutes)"`;

            const response = await chatWithAI([{ role: 'user', content: prompt }]);

            // Parse AI response into suggestions
            const lines = response.split('\n').filter(line => line.includes('|'));
            const parsed = lines.map(line => {
                const [title, priority, time] = line.split('|').map(s => s.trim());
                return {
                    title: title.replace(/^\d+\.\s*/, ''),
                    priority: priority.toLowerCase().replace(/[()]/g, ''),
                    estimatedTime: parseInt(time) || 25,
                    reason: 'AI suggested based on your workflow'
                };
            });

            setSuggestions(parsed);
        } catch (error) {
            console.error('Failed to generate suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    const acceptSuggestion = (suggestion) => {
        addTask({
            ...suggestion,
            status: 'todo',
            category: 'AI Suggested'
        });
        setSuggestions(suggestions.filter(s => s !== suggestion));
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Sparkles size={24} className="text-purple-500" />
                    <div>
                        <h3 className="text-xl font-bold">Smart Task Suggestions</h3>
                        <p className="text-xs text-zinc-500">AI-powered next steps</p>
                    </div>
                </div>
                <button
                    onClick={generateSuggestions}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold transition-all disabled:opacity-50"
                >
                    {loading ? 'Thinking...' : 'Get Ideas'}
                </button>
            </div>

            {suggestions.length === 0 && !loading && (
                <div className="text-center py-8">
                    <Sparkles size={48} className="mx-auto text-zinc-600 mb-4" />
                    <p className="text-zinc-500 text-sm">
                        Click "Get Ideas" for AI-powered task suggestions based on your current work
                    </p>
                </div>
            )}

            {loading && (
                <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-sm text-zinc-500">Analyzing your workflow...</p>
                </div>
            )}

            <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <h4 className="font-bold mb-1">{suggestion.title}</h4>
                                <div className="flex items-center gap-3 text-xs text-zinc-400">
                                    <span className={`px-2 py-1 rounded ${suggestion.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                            suggestion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-green-500/20 text-green-400'
                                        }`}>
                                        {suggestion.priority}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {suggestion.estimatedTime}min
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => acceptSuggestion(suggestion)}
                                className="ml-3 px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-bold transition-all"
                            >
                                Add
                            </button>
                        </div>
                        <p className="text-xs text-zinc-500 mt-2">💡 {suggestion.reason}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SmartSuggestions;
