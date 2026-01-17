import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, ExternalLink } from 'lucide-react';

const NeuralSoundscapes = () => {
    const [activePlaylist, setActivePlaylist] = useState('focus');

    // Real Spotify playlist IDs for focus music
    const playlists = [
        {
            id: 'focus',
            name: 'Deep Focus',
            spotifyId: '37i9dQZF1DWZeKCadgRdKQ', // Spotify's Deep Focus playlist
            color: 'from-indigo-500 to-purple-600'
        },
        {
            id: 'lofi',
            name: 'Lo-Fi Beats',
            spotifyId: '37i9dQZF1DWWQRwui0ExPn', // Lo-Fi Beats playlist
            color: 'from-pink-500 to-rose-600'
        },
        {
            id: 'nature',
            name: 'Nature Sounds',
            spotifyId: '37i9dQZF1DX4PP3DA4J0N8', // Nature Sounds
            color: 'from-emerald-500 to-teal-600'
        },
        {
            id: 'classical',
            name: 'Peaceful Piano',
            spotifyId: '37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
            color: 'from-amber-500 to-orange-600'
        },
        {
            id: 'ambient',
            name: 'Ambient Chill',
            spotifyId: '37i9dQZF1DX3Ogo9pFvBkY', // Ambient Chill
            color: 'from-cyan-500 to-blue-600'
        },
        {
            id: 'study',
            name: 'Brain Food',
            spotifyId: '37i9dQZF1DWXLeA8Omikj7', // Brain Food
            color: 'from-violet-500 to-fuchsia-600'
        },
    ];

    const currentPlaylist = playlists.find(p => p.id === activePlaylist);

    return (
        <div className="surface-raised p-4 md:p-6 rounded-[2rem] border-slate-800/80 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16" />

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 relative z-10">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20">
                        <Music size={16} className="text-[#1DB954]" />
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm font-bold text-white">Spotify Player</h3>
                        <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Focus Music</p>
                    </div>
                </div>
                <a
                    href={`https://open.spotify.com/playlist/${currentPlaylist?.spotifyId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 md:p-2 rounded-lg bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] hover:bg-[#1DB954]/20 transition-all"
                >
                    <ExternalLink size={12} />
                </a>
            </div>

            {/* Playlist Selector */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5 relative z-10">
                {playlists.map((playlist) => (
                    <button
                        key={playlist.id}
                        onClick={() => setActivePlaylist(playlist.id)}
                        className={`p-2 md:p-3 rounded-xl border text-center transition-all ${activePlaylist === playlist.id
                            ? `bg-gradient-to-br ${playlist.color} border-white/20 shadow-lg`
                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-tight ${activePlaylist === playlist.id ? 'text-white' : 'text-slate-400'
                            }`}>
                            {playlist.name}
                        </p>
                    </button>
                ))}
            </div>

            {/* Spotify Embed */}
            <div className="relative z-10 rounded-2xl overflow-hidden bg-slate-900">
                <iframe
                    title="Spotify Player"
                    src={`https://open.spotify.com/embed/playlist/${currentPlaylist?.spotifyId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="280"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    style={{ borderRadius: '12px' }}
                    className="md:h-[352px]"
                />
            </div>

            {/* Status */}
            <div className="mt-3 md:mt-4 p-2.5 md:p-3 rounded-xl bg-[#1DB954]/5 border border-[#1DB954]/10 flex items-center gap-2 md:gap-3 relative z-10">
                <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
                <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Spotify Connected • Premium for full playback
                </p>
            </div>
        </div>
    );
};

export default NeuralSoundscapes;
