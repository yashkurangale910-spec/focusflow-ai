import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, Clock, Target, Users, Settings, Home, Layout, Brain } from 'lucide-react';
const CommandPalette = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    const commands = [
        { id: 'focus', label: 'Start Focus Protocol', icon: Brain, shortcut: 'F', action: () => onNavigate('focus') },
        { id: 'tasks', label: 'Manage Directives', icon: Target, shortcut: 'T', action: () => onNavigate('tasks') },
        { id: 'community', label: 'Access Squad Matrix', icon: Users, shortcut: 'C', action: () => onNavigate('community') },
        { id: 'insights', label: 'View Neural Analytics', icon: Zap, shortcut: 'I', action: () => onNavigate('insights') },
        { id: 'dashboard', label: 'Return to Hub', icon: Home, shortcut: 'H', action: () => onNavigate('home') },
        { id: 'settings', label: 'System Configuration', icon: Settings, shortcut: 'S', action: () => onNavigate('settings') },
    ];

    const filteredCommands = query === ''
        ? commands
        : commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()));

    const handleKeyDown = useCallback((e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(prev => !prev);
        }
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const executeCommand = (action) => {
        action();
        setIsOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] relative z-10"
                    >
                        <div className="flex items-center gap-4 px-6 py-5 border-b border-white/5 bg-white/[0.02]">
                            <Search className="text-slate-500" size={20} />
                            <input
                                autoFocus
                                placeholder="Neural Command Entry..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-slate-700 font-medium italic tracking-tight"
                            />
                            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                ESC to Exit
                            </div>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto py-2 custom-scrollbar">
                            {filteredCommands.length > 0 ? (
                                filteredCommands.map((cmd) => (
                                    <button
                                        key={cmd.id}
                                        onClick={() => executeCommand(cmd.action)}
                                        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-all group text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
                                                <cmd.icon size={18} className="text-slate-400 group-hover:text-cyan-400" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-400 group-hover:text-white uppercase tracking-widest italic">{cmd.label}</span>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="px-2 py-1 rounded-md bg-black border border-white/10 text-[9px] font-black text-cyan-400 italic">
                                                {cmd.shortcut}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">No Neural Matches Found</p>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-3 border-t border-white/5 bg-black flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-black text-slate-500">↑↓</kbd>
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Navigate</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-black text-slate-500">ENTER</kbd>
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Execute</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Brain size={12} className="text-cyan-500" />
                                <span className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em]">Neural Link active</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
