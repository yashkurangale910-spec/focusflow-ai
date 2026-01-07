import React from 'react';
import { useTemplates } from '../context/TemplateContext';
import { Play, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const SessionTemplates = ({ onSelectTemplate }) => {
    const { templates } = useTemplates();

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Session Templates</h3>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((template, index) => (
                    <motion.button
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelectTemplate && onSelectTemplate(template)}
                        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 transition-all text-left group"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-3xl">{template.icon}</span>
                            <Play size={18} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="font-bold mb-1">{template.name}</p>
                        <p className="text-xs text-zinc-500 mb-2">{template.description}</p>
                        <div className="flex items-center gap-2 text-xs text-zinc-600">
                            <Clock size={12} />
                            <span>{template.duration} min</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default SessionTemplates;
