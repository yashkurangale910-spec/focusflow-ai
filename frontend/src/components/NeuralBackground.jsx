import React from 'react';

/**
 * NeuralBackground - A premium, performant background component
 * Uses SVG filters and CSS animations to create a "Neural" energy field effect.
 */
const NeuralBackground = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-slate-950">
            {/* Animated Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[150px] animate-float" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/5 rounded-full blur-[100px] animate-pulse-glow" />

            {/* Neural Lattice Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.03]" 
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Grain/Noise for premium texture */}
            <div className="noise-overlay" />

            {/* Gradient Sweep */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-950" />
        </div>
    );
};

export default NeuralBackground;
