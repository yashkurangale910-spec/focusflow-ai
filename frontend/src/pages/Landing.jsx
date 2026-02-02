import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Brain, Activity, ArrowRight, Play, Star,
    ChevronDown, ChevronUp, Twitter, Linkedin, Github,
    CheckCircle2, Globe, Clock, Shield, Sparkles
} from 'lucide-react';
import { MorphingBlob, ParticleField, CosmicBackground } from '../components/UniqueEffects';

const Reveal = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        {children}
    </motion.div>
);

const Landing = ({ onStart }) => {
    const [expandedFaq, setExpandedFaq] = useState(null);

    const navLinks = ['Features', 'Solutions', 'Testimonials', 'Pricing'];

    const features = [
        {
            icon: Brain,
            title: 'Intelligent Deep Work',
            desc: 'Deep-learning algorithms that adapt to your unique cognitive patterns, identifying when you are in "the zone."',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Clock,
            title: 'Neural Scheduling',
            desc: 'Predictive time-blocking that aligns with your natural circadian rhythms to maximize energy output.',
            color: 'from-purple-500 to-indigo-500'
        },
        {
            icon: Activity,
            title: 'Bio-Feedback Analytics',
            desc: 'Real-time data visualization of your focus and recovery states, allowing for optimized rest periods.',
            color: 'from-emerald-500 to-teal-500'
        }
    ];

    const testimonials = [
        {
            name: 'Alex Rivera',
            role: 'CTO at Tech Bloom',
            quote: 'FocusFlow transformed how our engineering team handles deep work. It\'s a game changer for technical complex tasks.',
            avatar: 'https://i.pravatar.cc/150?u=alex'
        },
        {
            name: 'Sarah Chen',
            role: 'Lead Designer at Enso',
            quote: 'The neural scheduling is scarily accurate. It knows exactly when I\'m peaking and protects that time vigorously.',
            avatar: 'https://i.pravatar.cc/150?u=sarah'
        },
        {
            name: 'Marcus Thorne',
            role: 'Founder of DeepFocus',
            quote: 'A beautiful interface paired with powerful AI. The glassmorphic UI is stunning and makes productivity feel elegant.',
            avatar: 'https://i.pravatar.cc/150?u=marcus'
        }
    ];

    const faqs = [
        {
            q: 'How does the AI track my focus?',
            a: 'FocusFlow AI uses a combination of application usage monitoring, keyboard/mouse cadence, and voluntary biometric data (if connected) to create a baseline of your "Flow State" using local machine learning.'
        },
        {
            q: 'Is my neural data kept private?',
            a: 'Absolutely. All processing of sensitive focus data happens locally on your device. We use end-to-end encryption for any cloud-synced settings, and we never sell your productivity data.'
        },
        {
            q: 'Does it integrate with Slack and Google Calendar?',
            a: 'Yes! FocusFlow seamlessly integrates with your favorite tools to silence notifications during deep work and auto-block focus time in your calendar.'
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
            <CosmicBackground density="low" />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white">FocusFlow <span className="text-blue-500">AI</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition-colors">Log In</button>
                        <button
                            onClick={onStart}
                            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/25"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Next-Gen Cognitive Tech</span>
                        </div>

                        <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                            Transcend the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient-x">Noise</span>
                        </h1>

                        <p className="text-slate-400 text-xl leading-relaxed max-w-xl mb-10">
                            Harness the power of neural-driven focus to reclaim your productivity in a world of endless distractions. Our AI adapts to your brain, not the other way around.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <button
                                onClick={onStart}
                                className="group relative flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl text-white font-bold text-lg transition-all hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                            >
                                Start Your Flow
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-lg hover:bg-white/10 transition-all">
                                <Play className="w-5 h-5 fill-current" />
                                Watch Demo
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">
                                <span className="text-slate-200 font-bold">50k+</span> deep workers already in flow
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
                        <div className="relative z-10 p-4 rounded-[3rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/brain_viz.png"
                                alt="Neural Brain Visualization"
                                className="w-full h-auto rounded-[2.5rem] mix-blend-lighten"
                            />
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            className="absolute -top-10 -right-10 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl"
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                    <Activity className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Focus Level</div>
                                    <div className="text-xl font-black text-white">98%</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </header>

            {/* Features Grid */}
            <section id="features" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <Reveal>
                        <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight mb-4">Redefine Your Productivity</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Experience the next generation of AI-assisted focus tools designed for the modern professional.
                        </p>
                    </Reveal>
                </div>

                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            className="group p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity`} />

                            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
                                <f.icon className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{f.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-32 px-6 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <Reveal>
                            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 text-center">Voices of the Flow</h2>
                        </Reveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                className="p-8 rounded-3xl bg-slate-900/60 border border-white/5 relative"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                            >
                                <div className="flex gap-1 mb-6 text-amber-500">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-300 italic mb-8 leading-relaxed">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{t.name}</div>
                                        <div className="text-xs text-slate-500">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-black text-white text-center mb-16">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="rounded-2xl bg-slate-900/50 border border-white/5 overflow-hidden transition-all"
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-bold text-white">{faq.q}</span>
                                    {expandedFaq === i ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === i && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-6 text-slate-400 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="p-16 lg:p-24 rounded-[4rem] bg-gradient-to-br from-blue-900/40 via-blue-900/20 to-transparent border border-white/10 relative overflow-hidden text-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter">Ready to find your flow?</h2>
                            <p className="text-slate-400 text-xl mb-12">Join thousands of high-performers today. Start your 14-day free trial.</p>

                            <div className="flex flex-wrap justify-center gap-6">
                                <button
                                    onClick={onStart}
                                    className="px-12 py-5 bg-blue-600 rounded-2xl text-white font-bold text-xl hover:bg-blue-500 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                                >
                                    Get Started Now
                                </button>
                                <button className="px-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-xl hover:bg-white/10 transition-all">
                                    Enterprise Solutions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5 bg-[#010413]">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <Brain className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-black tracking-tighter text-white">FocusFlow AI</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
                            Building the future of human-AI cognitive collaboration. Reclaim your time, master your mind.
                        </p>
                        <div className="flex gap-4">
                            <Twitter className="w-5 h-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
                            <Linkedin className="w-5 h-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
                            <Github className="w-5 h-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <h4 className="font-bold text-white mb-6">Newsletter</h4>
                        <p className="text-slate-500 text-sm mb-6">Weekly insights into the psychology of focus.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                            />
                            <button className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors group">
                                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                    <p>&copy; 2026 FocusFlow AI Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">System Status</a>
                        <a href="#" className="hover:text-white transition-colors">Security</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
