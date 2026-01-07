import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, BookOpen, MessageCircle, Heart, Send, Plus } from 'lucide-react';

const Community = () => {
    const [wins, setWins] = useState([
        { id: 1, user: 'Alex', text: 'Completed 3 focus sessions today!', likes: 12, liked: false, time: '2h ago' },
        { id: 2, user: 'Sam', text: 'Hit a 7day streak 🔥', likes: 24, liked: true, time: '4h ago' },
        { id: 3, user: 'Jordan', text: 'Finally finished that big project!', likes: 31, liked: false, time: '5h ago' },
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
            user: 'You',
            text: newWin,
            likes: 0,
            liked: false,
            time: 'Just now'
        };

        setWins([win, ...wins]);
        setNewWin('');
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
                        Community <span className="text-accent">_</span>
                    </h1>
                    <p className="text-zinc-400">Connect with fellow focus warriors.</p>
                </div>
                <div className="hidden md:flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        2,547 Online
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { icon: Users, count: '2,547', label: 'Active Users', color: 'text-accent', delay: 0 },
                    { icon: Trophy, count: '48', label: 'Focus Rooms', color: 'text-yellow-500', delay: 0.1 },
                    { icon: BookOpen, count: '156', label: 'Resources', color: 'text-pink-500', delay: 0.2 },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay }}
                        whileHover={{ y: -5 }}
                        className="glass-card border-white/5 p-6 rounded-2xl relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 right-0 p-24 rounded-full blur-3xl opacity-10 bg-current ${stat.color} -mr-10 -mt-10`} />
                        <stat.icon size={32} className={`${stat.color} mb-4 relative z-10`} />
                        <p className="text-3xl font-black relative z-10">{stat.count}</p>
                        <p className="text-sm text-zinc-500 relative z-10">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Daily Wins */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card border-white/10 p-1 rounded-2xl overflow-hidden">
                        <div className="p-6 pb-2">
                            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                                Daily Wins <span className="text-2xl">🎉</span>
                            </h2>
                            <p className="text-sm text-zinc-500 mb-6">Celebrate small victories with the community</p>

                            {/* Add Win Input */}
                            <form onSubmit={handlePostWin} className="relative mb-8 group">
                                <input
                                    type="text"
                                    value={newWin}
                                    onChange={(e) => setNewWin(e.target.value)}
                                    placeholder="Share your win today..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder-zinc-500 focus:outline-none focus:border-accent/50 focus:bg-white/10 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!newWin.trim()}
                                    className="absolute right-2 top-2 bottom-2 p-2 bg-accent text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>

                        <div className="space-y-1 px-2 pb-2">
                            <AnimatePresence mode="popLayout">
                                {wins.map((win) => (
                                    <motion.div
                                        key={win.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-accent/20">
                                                {win.user[0]}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-bold text-white flex items-center gap-2">
                                                            {win.user}
                                                            <span className="text-xs font-normal text-zinc-500 block md:inline md:ml-2">{win.time}</span>
                                                        </p>
                                                        <p className="text-zinc-300 mt-1 leading-relaxed">{win.text}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 mt-3">
                                                    <button
                                                        onClick={() => handleLike(win.id)}
                                                        className={`flex items-center gap-1.5 text-xs font-medium transition-all ${win.liked ? 'text-pink-500' : 'text-zinc-500 hover:text-pink-400'}`}
                                                    >
                                                        <Heart size={14} className={win.liked ? 'fill-current' : ''} />
                                                        {win.likes}
                                                    </button>
                                                    <button className="text-xs font-medium text-zinc-500 hover:text-white transition-colors">
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl -z-10" />
                        <MessageCircle size={28} className="text-indigo-400 mb-4" />
                        <h3 className="font-bold text-lg mb-2">Focus Rooms</h3>
                        <p className="text-sm text-zinc-400 mb-4">
                            Join live focus sessions with accountability partners.
                        </p>
                        <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-bold flex items-center justify-center gap-2">
                            <Plus size={16} /> Create Room
                        </button>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="font-bold text-lg mb-4">Top Contributors</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10" />
                                    <div className="flex-1">
                                        <div className="h-3 w-24 bg-white/10 rounded mb-1" />
                                        <div className="h-2 w-16 bg-white/5 rounded" />
                                    </div>
                                    <Trophy size={14} className="text-yellow-500" />
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
