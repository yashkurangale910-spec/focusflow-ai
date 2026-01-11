import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward, Volume2, Search, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const SpotifyPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({
        name: 'Neural Resonance Part IV',
        artist: 'Synchronic Labs',
        album: 'Binaural Flow',
        image: '🧠',
    });

    const focusPlaylists = [
        { id: 1, name: 'Deep Work Protocol', emoji: '🎯', tracks: 150 },
        { id: 2, name: 'Alpha Wave Synth', emoji: '🎹', tracks: 200 },
        { id: 3, name: 'Lo-Fi Isolation', emoji: '🎧', tracks: 180 },
        { id: 4, name: 'Ambient Static', emoji: '🌊', tracks: 120 },
    ];

    return (
        <div className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 flex items-center justify-center">
                        <Music size={20} className="text-[#1DB954]" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Audio Interface</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Sync Active</p>
                    </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-500">
                    <Search size={16} />
                </div>
            </div>

            {/* Now Playing Component */}
            <div className="mb-8 p-6 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden group/player">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -z-10" />

                <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-5xl shadow-2xl border border-slate-800 group-hover/player:scale-105 transition-transform duration-500">
                        {currentTrack.image}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-bold font-display text-white truncate">{currentTrack.name}</p>
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{currentTrack.artist}</p>
                    </div>
                    <Heart size={18} className="text-slate-700 hover:text-rose-500 transition-colors cursor-pointer" />
                </div>

                {/* Progress Interface */}
                <div className="mt-4 mb-6">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-tighter mb-2 tabular-nums">
                        <span>1:42</span>
                        <span>4:20</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden cursor-pointer group/progress">
                        <motion.div
                            className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] relative"
                            initial={{ width: '0%' }}
                            animate={{ width: isPlaying ? '40%' : '35%' }}
                            transition={{ duration: 2 }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                        </motion.div>
                    </div>
                </div>

                {/* Control Hub */}
                <div className="flex items-center justify-center gap-8">
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <SkipForward size={20} className="rotate-180" />
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
                    >
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
                    </motion.button>
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <SkipForward size={20} />
                    </button>
                </div>
            </div>

            {/* Neural Playlists */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Recommended Streams</h4>
                    <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest hover:underline cursor-pointer">Explore Archive</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {focusPlaylists.map((playlist) => (
                        <button
                            key={playlist.id}
                            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 transition-all text-left group/pl relative overflow-hidden"
                        >
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xl group-hover/pl:bg-slate-900 transition-colors">
                                {playlist.emoji}
                            </div>
                            <div className="flex-1">
                                <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">{playlist.name}</p>
                                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">{playlist.tracks} DATA STRANDS</p>
                            </div>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all">
                                <Play size={16} fill="currentColor" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                    System Bridge: Spotify Secure Link Ready
                </p>
            </div>
        </div>
    );
};

export default SpotifyPlayer;
