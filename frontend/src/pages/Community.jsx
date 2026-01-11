import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, BookOpen, Heart, Send, Plus, Zap, MessageSquare, Shield, Activity } from 'lucide-react';

const Community = () => {
    const [wins, setWins] = useState([
        { id: 1, user: 'Alex.eth', text: 'Secured 4 hours of deep focus flow.', likes: 12, liked: false, time: '2h ago', rank: 'Neural Lead' },
        { id: 2, user: 'Sam_Nova', text: 'Hit a 14-day streak protocol 🔥', likes: 24, liked: true, time: '4h ago', rank: 'Flow Master' },
        { id: 3, user: 'Jordan.core', text: 'Architectural sprint completed ahead of schedule.', likes: 31, liked: false, time: '5h ago', rank: 'Senior Sync' },
    ]);
    const [newWin, setNewWin] = useState('');

    const handleLike = (id) => {
        setWins(wins.map(win => {
            if (win.id === id) {
                return {
                    ...win,
                    likes: win.liked ? win.likes - 1 : win.likes + 1,
                    liked: !win.liked
                };
            }
            return win;
        }));
    };

    const handlePostWin = (e) => {
        e.preventDefault();
        if (!newWin.trim()) return;

        const win = {
            id: Date.now(),
            user: 'Neural_You',
            text: newWin,
            likes: 0,
            liked: false,
            time: 'Just now',
            rank: 'Focus Initiate'
        };

        setWins([win, ...wins]);
        setNewWin('');
    };

    return (
        <div className="space-y-10 animate-soft-entry pb-20">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Activity size={14} className="text-indigo-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Collective Consciousness</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-white tracking-tight">Neural Feed</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="surface-flat px-4 py-2 rounded-xl border-slate-800/50 flex items-center gap-3">
                        <div className="relative">
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            <div className="absolute inset-0 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                        </div>
                        <span className="text-[11px] font-bold text-white uppercase tracking-widest">2,547 Synchronized</span>
                    </div>
                </div>
            </header>

            {/* Performance Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Users, count: '12.4k', label: 'Global Network', color: 'indigo', delay: 0 },
                    { icon: Trophy, count: '842', label: 'Protocol Rooms', color: 'emerald', delay: 0.1 },
                    { icon: Zap, count: '1.2m', label: 'Focus Minutes', color: 'amber', delay: 0.2 },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay }}
                        className="surface-flat p-6 rounded-3xl border-slate-800/50 relative overflow-hidden group"
                    >
                        <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700`}>
                            <stat.icon size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className={`w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4`}>
                                <stat.icon size={20} className={`text-indigo-400`} />
                            </div>
                            <p className="text-3xl font-black text-white font-display">{stat.count}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Win Feed */}
                <div className="lg:col-span-8 space-y-8">
                    <section className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <div className="flex items-center gap-2">
                                <Trophy size={16} className="text-indigo-400" />
                                <h2 className="text-sm font-bold text-white uppercase tracking-widest">Victory Logs</h2>
                            </div>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Real-time Decentralized stream</span>
                        </div>

                        {/* Input Hub */}
                        <form onSubmit={handlePostWin} className="relative mb-10 group">
                            <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <div className="relative flex items-center gap-4 bg-slate-950/50 border border-slate-800 rounded-2xl p-2 pl-6 focus-within:border-indigo-500/50 transition-all">
                                <input
                                    type="text"
                                    value={newWin}
                                    onChange={(e) => setNewWin(e.target.value)}
                                    placeholder="Log your neural victory..."
                                    className="flex-1 bg-transparent border-none text-white text-sm placeholder-slate-600 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!newWin.trim()}
                                    className="h-12 px-6 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest disabled:opacity-30 hover:bg-slate-50 hover:text-black transition-all flex items-center gap-2"
                                >
                                    Transmit <Send size={14} />
                                </button>
                            </div>
                        </form>

                        {/* Feed Stream */}
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {wins.map((win, i) => (
                                    <motion.div
                                        key={win.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:border-indigo-500/30 hover:bg-slate-900/50 transition-all group/item"
                                    >
                                        <div className="flex items-start gap-5">
                                            <div className="relative">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover/item:scale-105 transition-transform duration-500">
                                                    {win.user[0]}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                                                    <Shield size={10} className="text-indigo-400" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <span className="text-[11px] font-black text-white uppercase tracking-widest mr-3">{win.user}</span>
                                                        <span className="text-[9px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-md uppercase tracking-tighter">{win.rank}</span>
                                                    </div>
                                                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{win.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-300 leading-relaxed font-medium mb-4">{win.text}</p>

                                                <div className="flex items-center gap-5">
                                                    <button
                                                        onClick={() => handleLike(win.id)}
                                                        className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${win.liked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-400'}`}
                                                    >
                                                        <Heart size={14} className={win.liked ? 'fill-current' : ''} />
                                                        {win.likes} Units
                                                    </button>
                                                    <button className="flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors">
                                                        <MessageSquare size={14} /> Respond
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>

                {/* Sidebar Navigation */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Live Rooms */}
                    <div className="surface-raised p-8 rounded-3xl border-slate-800/80 bg-gradient-to-br from-indigo-600/10 to-transparent relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-colors" />
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
                            <Users size={24} className="text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 font-display">Neural Sprint Hub</h3>
                        <p className="text-[11px] font-medium text-slate-400 mb-6 leading-relaxed">
                            Initialize synchronized focus modules with verified accountability nodes.
                        </p>
                        <button className="w-full h-12 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                            Deploy Room <Plus size={16} />
                        </button>
                    </div>

                    {/* Resources */}
                    <div className="surface-flat p-8 rounded-3xl border-slate-800/50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Neural Archive</h3>
                            <BookOpen size={16} className="text-slate-600" />
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'Dopamine Detoxing v2', type: 'Protocol' },
                                { title: 'Deep Work Architecture', type: 'Research' },
                                { title: 'The flow state manual', type: 'Guide' }
                            ].map((res, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <p className="text-xs font-bold text-slate-300 group-hover:text-indigo-400 transition-colors">{res.title}</p>
                                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">{res.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
