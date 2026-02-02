import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, Zap, Calendar, BarChart3, ChevronDown,
    ArrowRight, Star, Quote, Play, CheckCircle2,
    Twitter, Linkedin, Github, Mail, Send
} from 'lucide-react';

const LandingPage = ({ onGetStarted, onLogin }) => {
    const [activeFaq, setActiveFaq] = useState(null);

    const features = [
        {
            icon: <Zap className="w-6 h-6 text-blue-400" />,
            title: "Intelligent Deep Work",
            description: "Deep-learning algorithms that adapt to your unique cognitive patterns, identifying when you are in 'the zone'."
        },
        {
            icon: <Calendar className="w-6 h-6 text-purple-400" />,
            title: "Neural Scheduling",
            description: "Predictive time-blocking that aligns with your natural circadian rhythms to maximize energy output."
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
            title: "Bio-Feedback Analytics",
            description: "Real-time data visualization of your focus and recovery states, allowing for data-backed rest periods."
        }
    ];

    const testimonials = [
        {
            name: "Alex Rivera",
            role: "CTO at Tech Stream",
            text: "FocusFlow transformed how our engineering team handles deep work. It's a game changer for technical complex tasks.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        },
        {
            name: "Sarah Chen",
            role: "Lead Designer at Edin",
            text: "The neural scheduling is scarily accurate. It knows exactly when I'm peaking and protects that time vigorously.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
        },
        {
            name: "Marcus Thorne",
            role: "Founder of DeepFocus",
            text: "A beautiful interface paired with powerful AI. The glassmorphic UI is stunning and makes productivity feel elegant.",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
        }
    ];

    const faqs = [
        {
            question: "How does the AI track my focus?",
            answer: "FocusFlow AI uses a combination of application usage monitoring, keyboard/mouse cadence, and voluntary biometric data (if connected) to create a baseline of your 'Flow State' using machine learning."
        },
        {
            question: "Is my neural data kept private?",
            answer: "Absolutely. All processing is done with end-to-end encryption. Your focus patterns are your own, and we never share individual data with third parties."
        },
        {
            question: "Does it integrate with Slack and Google Calendar?",
            answer: "Yes, FocusFlow integrates seamlessly with your favorite tools to automatically block time and update your status when you go into deep work."
        }
    ];

    return (
        <div className="bg-[#030712] text-white font-sans selection:bg-blue-500/30">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            <Brain className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">FocusFlow AI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
                        <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
                        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={onLogin} className="text-sm font-semibold hover:text-blue-400 transition-colors">Log In</button>
                        <button
                            onClick={onGetStarted}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400">Next-Gen Cognitive Tech</span>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                            Transcend the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Noise</span>
                        </h1>

                        <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
                            Harness the power of neural-driven focus to reclaim your productivity.
                            In a world of endless distractions, our AI adapts to your brain,
                            not the other way around.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <button
                                onClick={onGetStarted}
                                className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 shadow-xl shadow-blue-900/40"
                            >
                                Start Your Flow
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all outline-none">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Play className="w-4 h-4 fill-white" />
                                </div>
                                Watch Demo
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <img key={i} className="w-10 h-10 rounded-full border-2 border-[#030712] bg-slate-800" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">
                                <span className="font-bold text-slate-300">10k+</span> deep workers trusts us
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="relative z-10 p-4 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-sm overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors" />
                            <img
                                src="/brain-core.png"
                                alt="Neural Focus Core"
                                className="w-full h-auto rounded-[2rem] relative z-10 shadow-2xl"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 blur-[60px] rounded-full animate-pulse" />
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/20 blur-[80px] rounded-full" />
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">Redefine Your Productivity</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Experience the next generation of AI-assisted focus tools designed for the modern professional.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                className="p-10 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all duration-500 group cursor-default"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-32 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-16 px-4">
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Voices of the Flow</h2>
                            <p className="text-slate-400">Hear from those who've mastered their focus window.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                                <ChevronDown className="w-6 h-6 rotate-90" />
                            </button>
                            <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                                <ChevronDown className="w-6 h-6 -rotate-90" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 relative overflow-hidden group"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex gap-1 mb-8">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-yellow-500 text-yellow-500" />)}
                                </div>
                                <Quote className="absolute top-10 right-10 w-20 h-20 text-white/[0.03] pointer-events-none" />
                                <p className="text-xl text-slate-300 mb-8 italic leading-relaxed relative z-10">"{t.text}"</p>
                                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10" />
                                    <div>
                                        <h4 className="font-bold">{t.name}</h4>
                                        <p className="text-sm text-slate-500">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-32">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
                        <p className="text-slate-400">Everything you need to know about FocusFlow AI.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                                >
                                    <span className="font-bold text-lg">{faq.question}</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-6">
                                                {faq.answer}
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
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-blue-700/20 via-[#0a0f1e] to-[#030712] border border-blue-500/20 p-16 lg:p-24 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-600/5 opacity-50" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight">Ready to find <br /> your flow?</h2>
                        <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                            Join thousands of high-performers today. Start your 14-day free trial.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <button
                                onClick={onGetStarted}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95"
                            >
                                Get Started Now
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all border border-white/10">
                                Enterprise Solutions
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-20 pb-12 border-t border-white/5 bg-black/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                                    <Brain className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold">FocusFlow AI</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                Building the future of human-AI cognitive collaboration.
                                Reclaim your time, master your mind.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group">
                                    <Twitter className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group">
                                    <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group">
                                    <Github className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-8">Product</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-8">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-8">Newsletter</h4>
                            <p className="text-sm text-slate-500 mb-6">Weekly insights into the psychology of focus.</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm outline-none focus:border-blue-500 focus:bg-white/[0.08] transition-all"
                                />
                                <button className="absolute right-2 top-2 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all">
                                    <Send className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5 text-xs text-slate-600">
                        <p>© 2026 FocusFlow AI. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Settings</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
