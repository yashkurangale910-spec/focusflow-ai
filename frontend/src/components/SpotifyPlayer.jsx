import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SpotifyPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState({
        name: 'Deep Focus',
        artist: 'Spotify',
        album: 'Focus Playlists',
        image: '🎵',
    });

    const focusPlaylists = [
        { id: 1, name: 'Deep Focus', emoji: '🎯', tracks: 150 },
        { id: 2, name: 'Peaceful Piano', emoji: '🎹', tracks: 200 },
        { id: 3, name: 'Lo-Fi Beats', emoji: '🎧', tracks: 180 },
        { id: 4, name: 'Ambient Chill', emoji: '🌊', tracks: 120 },
        { id: 5, name: 'Brain Food', emoji: '🧠', tracks: 165 },
    ];

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Music size={24} className="text-green-500" />
                <h3 className="text-xl font-bold">Spotify Focus Music</h3>
            </div>

            {/* Now Playing */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30">
                <div className="flex items-center gap-4">
                    <div className="text-5xl">{currentTrack.image}</div>
                    <div className="flex-1">
                        <p className="font-bold">{currentTrack.name}</p>
                        <p className="text-sm text-zinc-400">{currentTrack.artist}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 mb-3">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: '0%' }}
                            animate={{ width: isPlaying ? '60%' : '0%' }}
                            transition={{ duration: 2 }}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-all">
                        <SkipForward size={20} className="rotate-180" />
                    </button>
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-4 rounded-full bg-green-500 hover:bg-green-600 transition-all"
                    >
                        {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" />}
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-all">
                        <SkipForward size={20} />
                    </button>
                </div>
            </div>

            {/* Focus Playlists */}
            <div>
                <h4 className="text-sm font-bold mb-3 text-zinc-400">Focus Playlists</h4>
                <div className="space-y-2">
                    {focusPlaylists.map((playlist) => (
                        <button
                            key={playlist.id}
                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left"
                        >
                            <div className="text-2xl">{playlist.emoji}</div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">{playlist.name}</p>
                                <p className="text-xs text-zinc-500">{playlist.tracks} tracks</p>
                            </div>
                            <Play size={16} className="text-green-500" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-xs text-center">
                💡 <strong>Connect Spotify:</strong> OAuth integration coming soon!
            </div>
        </div>
    );
};

export default SpotifyPlayer;
