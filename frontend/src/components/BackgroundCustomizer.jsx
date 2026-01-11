import React, { useState } from 'react';
import { Palette, Upload, Check, Zap, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';

const BackgroundCustomizer = () => {
    const [selectedBg, setSelectedBg] = useState('particles');

    const backgrounds = [
        { id: 'particles', name: 'Neural Particles', preview: '✨', gradient: 'from-indigo-600/30 to-purple-900/40' },
        { id: 'waves', name: 'Flow Waves', preview: '🌊', gradient: 'from-blue-600/30 to-cyan-800/40' },
        { id: 'aurora', name: 'Quantum Aurora', preview: '🌌', gradient: 'from-emerald-600/30 to-indigo-900/40' },
        { id: 'minimal', name: 'Deep Void', preview: '⬛', gradient: 'from-slate-900 to-black' },
    ];

    return (
        <div className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Palette size={20} className="text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Environment Skin</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Neural Canvas Customization</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
                {backgrounds.map((bg) => (
                    <motion.button
                        key={bg.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedBg(bg.id)}
                        className={`relative aspect-[16/10] rounded-2xl overflow-hidden border transition-all ${selectedBg === bg.id
                            ? 'border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                            : 'border-slate-800 hover:border-slate-700'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient}`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/20 backdrop-blur-[2px]">
                            <div className="text-2xl mb-2 opacity-80">{bg.preview}</div>
                            <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{bg.name}</p>
                        </div>
                        {selectedBg === bg.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg">
                                <Check size={12} className="text-white" />
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Custom Asset Deployment */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 border-dashed hover:border-indigo-500/50 transition-all cursor-pointer group/upload relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/upload:opacity-100 transition-opacity" />
                <Upload size={24} className="mx-auto text-slate-600 group-hover/upload:text-indigo-400 mb-3 transition-colors" />
                <p className="text-[10px] font-black text-slate-200 mb-1 uppercase tracking-widest leading-none">External Asset Upload</p>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Maximum throughput: 5MB // PNG / HEIC</p>
            </div>

            {/* Parametric Controls */}
            <div className="mt-8 space-y-6">
                <div className="flex items-center gap-2 mb-2 px-1">
                    <Sliders size={12} className="text-slate-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Parametric Control</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[9px] font-black text-slate-600 uppercase tracking-widest mb-3">
                            <span>Propagation Velocity</span>
                            <span className="text-indigo-400">74%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            defaultValue="74"
                            className="w-full h-1.5 rounded-full appearance-none bg-slate-900 cursor-pointer accent-indigo-500"
                        />
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                        <Zap size={14} className="text-indigo-400" />
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                            Neural optimization enabled for background processing
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackgroundCustomizer;
