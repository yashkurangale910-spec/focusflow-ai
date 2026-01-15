import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SoundscapePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [activeSound, setActiveSound] = useState('rain');

    const audioRef = useRef(new Audio());

    const soundscapes = [
        { id: 'rain', name: 'Rain', emoji: '🌧️', url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_f5bd351c24.mp3?filename=soft-rain-ambient-111154.mp3' },
        { id: 'forest', name: 'Forest', emoji: '🌲', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_24922e92c1.mp3?filename=forest-at-day-ambient-13536.mp3' },
        { id: 'cafe', name: 'Café', emoji: '☕', url: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_2774a9193b.mp3?filename=coffee-shop-ambience-8344.mp3' },
        { id: 'ocean', name: 'Ocean', emoji: '🌊', url: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_55a299d7a2.mp3?filename=ocean-waves-ambient-110098.mp3' },
        { id: 'white-noise', name: 'White Noise', emoji: '📻', url: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_2193fdf6e6.mp3?filename=white-noise-8117.mp3' },
    ];

    useEffect(() => {
        const sound = soundscapes.find(s => s.id === activeSound);
        if (sound) {
            setIsLoading(true);
            audioRef.current.src = sound.url;
            audioRef.current.loop = true;
            audioRef.current.preload = 'auto';

            audioRef.current.oncanplaythrough = () => {
                setIsLoading(false);
                if (isPlaying) {
                    audioRef.current.play().catch(e => console.error("Playback failed:", e));
                }
            };
        }
    }, [activeSound]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Volume2 size={24} className="text-accent" />
                    <h3 className="text-xl font-bold">Ambient Sounds</h3>
                </div>
                <button
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="p-3 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
                    style={{
                        backgroundColor: isPlaying ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)',
                        color: isPlaying ? '#000' : '#fff',
                    }}
                >
                    {isLoading ? <Loader2 size={20} className="animate-spin" /> : isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>

            {/* Sound Selection */}
            <div className="grid grid-cols-5 gap-2 mb-6">
                {soundscapes.map((sound) => (
                    <button
                        key={sound.id}
                        onClick={() => setActiveSound(sound.id)}
                        className={`p-3 rounded-xl text-center transition-all flex flex-col items-center gap-2 border-2 ${activeSound === sound.id
                            ? 'bg-accent/20 border-accent'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                            }`}
                    >
                        <div className="text-2xl">{sound.emoji}</div>
                        <div className="text-[10px] font-bold uppercase tracking-tight">{sound.name}</div>
                    </button>
                ))}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4">
                <button onClick={() => setVolume(0)}>
                    <VolumeX size={20} className={volume === 0 ? "text-accent" : "text-zinc-500"} />
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer accent-accent"
                    style={{
                        background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`,
                    }}
                />
                <button onClick={() => setVolume(1)}>
                    <Volume2 size={20} className={volume === 1 ? "text-accent" : "text-zinc-300"} />
                </button>
            </div>

            <p className="text-[10px] text-zinc-600 mt-4 text-center italic uppercase tracking-widest">
                Optimized for Focus & Clarity
            </p>
        </div>
    );
};

export default SoundscapePlayer;
