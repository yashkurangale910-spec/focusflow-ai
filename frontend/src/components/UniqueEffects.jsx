import React from 'react';
import { motion } from 'framer-motion';

/**
 * Holographic Card - Creates a unique holographic shimmer effect
 */
export const HolographicCard = ({ children, className = "", intensity = "medium" }) => {
    const intensityMap = {
        low: "opacity-30",
        medium: "opacity-50",
        high: "opacity-70"
    };

    return (
        <div className={`relative overflow-hidden group ${className}`}>
            {/* Holographic shimmer overlay */}
            <div className={`absolute inset-0 ${intensityMap[intensity]} bg-gradient-to-r from-transparent via-white/10 to-transparent 
                           translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out pointer-events-none`}
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 25%, rgba(147,51,234,0.2) 50%, rgba(6,182,212,0.2) 75%, transparent)',
                }}
            />

            {/* Rainbow border effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 blur-xl animate-pulse" />
            </div>

            {children}
        </div>
    );
};

/**
 * Morphing Blob Background - Organic, flowing background shapes
 */
export const MorphingBlob = ({ color = "purple", size = "large", position = "top-right" }) => {
    const sizeMap = {
        small: "w-64 h-64",
        medium: "w-96 h-96",
        large: "w-[600px] h-[600px]"
    };

    const positionMap = {
        "top-left": "-top-32 -left-32",
        "top-right": "-top-32 -right-32",
        "bottom-left": "-bottom-32 -left-32",
        "bottom-right": "-bottom-32 -right-32",
        "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    };

    const colorMap = {
        purple: "bg-purple-600/30",
        cyan: "bg-cyan-600/30",
        pink: "bg-pink-600/30",
        amber: "bg-amber-600/30"
    };

    return (
        <motion.div
            className={`absolute ${sizeMap[size]} ${positionMap[position]} ${colorMap[color]} rounded-full blur-[120px] pointer-events-none`}
            animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                borderRadius: ["50%", "40%", "50%"],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

/**
 * Particle Field - Creates ambient floating particles
 */
export const ParticleField = ({ count = 20, color = "cyan" }) => {
    const particles = Array.from({ length: count });

    const colorMap = {
        cyan: "bg-cyan-400",
        purple: "bg-purple-400",
        pink: "bg-pink-400",
        white: "bg-white"
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-1 h-1 ${colorMap[color]} rounded-full opacity-40`}
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                        y: [null, Math.random() * -500],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

/**
 * Glitch Text Effect - Cyberpunk-style glitch animation
 */
export const GlitchText = ({ children, className = "" }) => {
    return (
        <div className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <span
                className="absolute top-0 left-0 text-cyan-400 opacity-70 animate-glitch-1"
                aria-hidden="true"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 text-purple-400 opacity-70 animate-glitch-2"
                aria-hidden="true"
                style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
            >
                {children}
            </span>
        </div>
    );
};

/**
 * Neon Glow Border - Animated neon border effect
 */
export const NeonBorder = ({ children, color = "purple", animated = true, className = "" }) => {
    const colorMap = {
        purple: {
            border: "border-purple-500",
            shadow: "shadow-purple-500/50",
            glow: "from-purple-600 via-cyan-600 to-purple-600"
        },
        cyan: {
            border: "border-cyan-500",
            shadow: "shadow-cyan-500/50",
            glow: "from-cyan-600 via-purple-600 to-cyan-600"
        },
        pink: {
            border: "border-pink-500",
            shadow: "shadow-pink-500/50",
            glow: "from-pink-600 via-purple-600 to-pink-600"
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* Animated gradient border */}
            {animated && (
                <div className="absolute -inset-0.5 opacity-75 blur-sm">
                    <div className={`absolute inset-0 bg-gradient-to-r ${colorMap[color].glow} rounded-[inherit]`}
                        style={{
                            backgroundSize: '200% 200%',
                            animation: 'gradient-shift 3s ease infinite'
                        }}
                    />
                </div>
            )}

            {/* Content */}
            <div className={`relative border ${colorMap[color].border} shadow-lg ${colorMap[color].shadow} rounded-[inherit] bg-slate-900`}>
                {children}
            </div>
        </div>
    );
};

/**
 * Liquid Button - Button with flowing liquid effect
 */
export const LiquidButton = ({ children, onClick, className = "", variant = "primary" }) => {
    const variants = {
        primary: "from-purple-600 to-cyan-600",
        success: "from-emerald-600 to-cyan-600",
        danger: "from-pink-600 to-orange-600"
    };

    return (
        <motion.button
            onClick={onClick}
            className={`relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden group ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Base gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${variants[variant]}`} />

            {/* Liquid wave effect */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${variants[variant]} opacity-0 group-hover:opacity-100`}
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Bubble effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bottom-0 w-2 h-2 bg-white/30 rounded-full"
                        initial={{ y: 0, x: `${i * 20}%` }}
                        animate={{ y: -100, opacity: [0, 1, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </div>

            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

/**
 * Cosmic Background Pattern - Starfield effect
 */
export const CosmicBackground = ({ density = "medium" }) => {
    const densityMap = {
        low: 50,
        medium: 100,
        high: 200
    };

    const stars = Array.from({ length: densityMap[density] });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-px h-px bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
};

/**
 * Ripple Effect - Click ripple animation
 */
export const Ripple = ({ x, y, color = "purple" }) => {
    const colorMap = {
        purple: "bg-purple-500",
        cyan: "bg-cyan-500",
        pink: "bg-pink-500"
    };

    return (
        <motion.div
            className={`absolute ${colorMap[color]} rounded-full pointer-events-none`}
            style={{
                left: x,
                top: y,
                width: 0,
                height: 0,
            }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 100, height: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        />
    );
};

export default {
    HolographicCard,
    MorphingBlob,
    ParticleField,
    GlitchText,
    NeonBorder,
    LiquidButton,
    CosmicBackground,
    Ripple
};
