import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Zap, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { chatWithAI } from '../services/aiService';
import { useTasks } from '../context/TaskContext';

const AIDailyPlanner = () => {
    const { tasks } = useTasks();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        setLoading(true);
        try {
            const taskList = tasks.map(t => `- ${t.title} (${t.priority} priority, ${t.estimatedTime}min)`).join('\n');

            const prompt = `Based on these tasks, create an optimized daily focus plan for someone with ADHD:

${taskList}

Please provide:
1. Recommended order (hardest tasks when energy is high)
2. Suggested time blocks
3. Break recommendations
4. Energy management tips

Format as a structured plan with time blocks.`;

            const response = await chatWithAI([
                { role: 'user', content: prompt }
            ]);

            setPlan(response);
        } catch (error) {
            console.error('Failed to generate plan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card border-white/10 p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Sparkles size={28} className="text-accent" />
                    <div>
                        <h2 className="text-2xl font-bold">AI Daily Planner</h2>
                        <p className="text-sm text-zinc-500">Optimized schedule based on your tasks</p>
                    </div>
                </div>
                <button
                    onClick={generatePlan}
                    disabled={loading || tasks.length === 0}
                    className="px-4 py-2 rounded-xl bg-accent text-black font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {loading ? (
                        <><RefreshCw size={16} className="animate-spin" />Generating...</>
                    ) : (
                        <><Sparkles size={16} />Generate Plan</>
                    )}
                </button>
            </div>

            {!plan && !loading && (
                <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-zinc-600 mb-4" />
                    <p className="text-zinc-500">Click "Generate Plan" to get your AI-optimized daily schedule</p>
                    {tasks.length === 0 && (
                        <p className="text-sm text-zinc-600 mt-2">Add some tasks first to get started</p>
                    )}
                </div>
            )}

            {plan && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <div className="prose prose-invert max-w-none">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {plan}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <button
                            onClick={generatePlan}
                            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm font-bold"
                        >
                            <RefreshCw size={14} className="inline mr-2" />
                            Regenerate
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AIDailyPlanner;
