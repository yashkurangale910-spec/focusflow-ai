import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Sparkles, Shield, Cpu, Code, Globe, Coffee, Info } from 'lucide-react';

const About = () => {
    const sections = [
        {
            title: "Vision & Purpose",
            icon: Brain,
            content: "FocusFlow AI is designed to help users achieve peak cognitive performance through scientifically-backed focus protocols. Our platform is built with a neurodiversity-first approach, specifically catering to individuals with ADHD and Autism.",
            color: "text-blue-400"
        },
        {
            title: "The Technology",
            icon: Cpu,
            content: "We leverage cutting-edge tools including React 19, Three.js for immersive 3D environments, and advanced neural processing for real-time cognitive coaching and task deconstruction.",
            color: "text-purple-400"
        },
        {
            title: "Zero-Noise Interface",
            icon: Shield,
            content: "Our 'Senior Dev' aesthetic design eliminates cognitive clutter, providing a calm, minimalist environment that allows you to dive into deep work instantly without friction.",
            color: "text-emerald-400"
        }
    ];

    const stats = [
        { label: "Neural Rank", value: "Level 1", icon: Zap },
        { label: "System Status", value: "Online", icon: Globe },
        { label: "Neural Engine", value: "Active", icon: Sparkles },
        { label: "Frontend", value: "Vite 7", icon: Code }
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4">
                    <Info size={12} /> System Information
                </div>
                <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
                    FocusFlow <span className="text-blue-500 font-outline-2">AI</span>
                </h1>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                    The next-generation neural productivity platform.
                    Built to bridge the gap between human focus and scientific optimization.
                </p>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-all group"
                    >
                        <stat.icon className="w-5 h-5 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{stat.label}</p>
                        <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 group-hover:rotate-12 transition-all duration-500">
                            <section.icon size={120} />
                        </div>
                        <section.icon className={`${section.color} mb-6`} size={32} />
                        <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            {section.content}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Project Credits/Academic Context */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/5 text-center relative overflow-hidden"
            >
                <div className="relative z-10">
                    <Heart className="text-red-500 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">6th Semester Major Project</h2>
                    <p className="text-zinc-500 max-w-3xl mx-auto leading-loose text-lg font-mono">
                        "FocusFlow AI demonstrates how modern web technologies can be harnessed
                        to create inclusive software that doesn't just manage tasks, but supports human cognition."
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <span className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-400 border border-white/5">HCI Research</span>
                        <span className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-400 border border-white/5">AI Ethics</span>
                        <span className="px-4 py-2 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-400 border border-white/5">Inclusive Design</span>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]" />
            </motion.div>

            {/* Footer Tagline */}
            <div className="text-center pt-8 border-t border-white/5">
                <p className="text-zinc-600 text-sm italic">
                    FocusFlow AI • Building the future of neural productivity.
                </p>
            </div>
        </div>
    );
};

export default About;
