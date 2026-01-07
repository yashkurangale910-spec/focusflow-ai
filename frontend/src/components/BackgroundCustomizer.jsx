import React, { useState } from 'react';
import { Palette, Upload, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const BackgroundCustomizer = () => {
    const [selectedBg, setSelectedBg] = useState('particles');

    const backgrounds = [
        { id: 'particles', name: 'Particles', preview: '✨', gradient: 'from-purple-900/20 to-blue-900/20' },
        { id: 'waves', name: 'Waves', preview: '🌊', gradient: 'from-blue-900/20 to-cyan-900/20' },
        { id: 'aurora', name: 'Aurora', preview: '🌌', gradient: 'from-green-900/20 to-purple-900/20' },
        { id: 'matrix', name: 'Matrix', preview: '💚', gradient: 'from-green-900/20 to-black' },
        { id: 'gradient', name: 'Gradient', preview: '🎨', gradient: 'from-pink-900/20 to-orange-900/20' },
        { id: 'minimal', name: 'Minimal', preview: '⬛', gradient: 'from-zinc-900 to-black' },
    ];

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Palette size={24} className="text-accent" />
                <h3 className="text-xl font-bold">Background Style</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {backgrounds.map((bg) => (
                    <motion.button
                        key={bg.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedBg(bg.id)}
                        className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${selectedBg === bg.id
                                ? 'border-accent shadow-lg shadow-accent/50'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient}`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-3xl mb-1">{bg.preview}</div>
                            <p className="text-xs font-bold">{bg.name}</p>
                        </div>
                        {selectedBg === bg.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                <Check size={14} className="text-black" />
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Custom Upload */}
            <div className="p-4 rounded-xl border-2 border-dashed border-white/20 hover:border-accent/50 transition-all cursor-pointer text-center">
                <Upload size={32} className="mx-auto text-zinc-500 mb-2" />
                <p className="text-sm font-bold mb-1">Upload Custom Background</p>
                <p className="text-xs text-zinc-500">PNG, JPG or GIF (max 5MB)</p>
            </div>

            {/* Animation Speed */}
            <div className="mt-6">
                <label className="block text-sm font-bold mb-3">Animation Speed</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-full h-2 rounded-full appearance-none bg-white/10 cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>
        </div>
    );
};

export default BackgroundCustomizer;
