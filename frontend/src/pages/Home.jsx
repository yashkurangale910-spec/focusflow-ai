import React from 'react';
import ProtocolCard from '../components/ProtocolCard';
import { motion } from 'framer-motion';
import { ScrollReveal, ParallaxSection } from '../components/ScrollReveal';

const Home = () => {
    const protocols = [
        {
            title: "Deep Work Protocol",
            subtitle: "Maximized cognitive throughput for complex problem solving.",
            tag: "WORK_SESSION",
            gradient: "linear-gradient(135deg, #8B7355 0%, #6B5D52 50%, #4A4238 100%)",
        },
        {
            title: "Creative Synthesis",
            subtitle: "Lateral thinking enhancement and ideation flow.",
            tag: "ALPHA_STATE",
            gradient: "linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #1C2833 100%)",
        },
        {
            title: "Rapid Re-Alignment",
            subtitle: "Clear distractions and reset cognitive load in 5 mins.",
            tag: "RE-FOCUSS",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #5B3A8C 100%)",
        },
        {
            title: "Neural Recovery",
            subtitle: "Theta wave modulation for deep mental restoration.",
            tag: "REST",
            gradient: "linear-gradient(135deg, #4A148C 0%, #6A1B9A 50%, #8E24AA 100%)",
        },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <header className="flex flex-col gap-2">
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] font-black uppercase tracking-[0.3em]"
                    style={{ color: 'var(--color-accent)' }}
                >
                    System Active // Neural Link Established
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl font-bold tracking-tight"
                >
                    Focus <span className="text-zinc-500 font-light">Protocols</span>
                </motion.h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {protocols.map((protocol, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                        <ProtocolCard {...protocol} delay={0} />
                    </ScrollReveal>
                ))}
            </div>

            <ScrollReveal delay={0.3}>
                <section className="pt-10 border-t border-white/5">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Neuro Analysis_</h2>
                            <p className="text-zinc-500 text-sm">Real-time cognitive metrics and session performance.</p>
                        </div>
                        <button className="text-xs hover:underline font-bold uppercase tracking-widest" style={{ color: 'var(--color-accent)' }}>
                            View Analytics
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { label: 'Peak Performance Block', value: 'Focus hits 98% efficiency between 9-11', type: 'COGNITIV' },
                            { label: 'Flow State Discovery', value: 'Vocal brown noise improved your session', type: 'ANALYTICS' },
                            { label: 'Optimal Recovery', value: 'Next session: 15m meditation recommended', type: 'COACH' },
                        ].map((stat, i) => (
                            <ScrollReveal key={i} delay={i * 0.1}>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group">
                                    <span className="text-[10px] font-black text-zinc-600 transition-colors uppercase tracking-widest block mb-4">
                                        {stat.type}
                                    </span>
                                    <h4 className="font-bold text-zinc-300 mb-2">{stat.label}</h4>
                                    <p className="text-sm text-zinc-500">{stat.value}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </section>
            </ScrollReveal>
        </div>
    );
};

export default Home;
