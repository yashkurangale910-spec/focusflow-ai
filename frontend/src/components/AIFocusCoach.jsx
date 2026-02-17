import React, { useState, useRef, useEffect } from 'react';
import { Brain, Lightbulb, Zap, Heart, MessageCircle, Send, Sparkles, Shield, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAI } from '../services/aiService';
import { useAnalytics } from '../context/AnalyticsContext';

const AIFocusCoach = () => {
    const { mood, sessions } = useAnalytics();
    const [coachPersonality, setCoachPersonality] = useState('supportive');
    const [messages, setMessages] = useState([
        {
            type: 'coach',
            text: "Neural Link Established. I am your specialized advisor. Specify your cognitive objective or report deployment friction.",
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Adaptive Personality Sync
    useEffect(() => {
        const moodMap = {
            great: 'strict', // Push harder when feeling great
            good: 'energetic',
            neutral: 'calm',
            bad: 'supportive' // Gentle when feeling low
        };
        if (mood && moodMap[mood]) {
            setCoachPersonality(moodMap[mood]);
        }
    }, [mood]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const personalities = {
        supportive: {
            icon: '🛡️',
            name: 'Vanguard',
            color: 'emerald',
            systemPrompt: 'You are a warm, encouraging coach who celebrates every small win and provides gentle motivation. Use soft language.'
        },
        energetic: {
            icon: '⚡',
            name: 'Catalyst',
            color: 'cyan',
            systemPrompt: 'You are a high-energy, enthusiastic coach who pumps people up! Use bold language and high-energy encouragement.'
        },
        calm: {
            icon: '🧘',
            name: 'Zenith',
            color: 'indigo',
            systemPrompt: 'You are a zen, mindful coach who focuses on breathing and presence. Use calm, minimalist language.'
        },
        strict: {
            icon: '⚔️',
            name: 'Overlord',
            color: 'rose',
            systemPrompt: 'You are a high-performance coach. Use technical, precise language. Hold the user to elite standards.'
        }
    };

    const quickActions = [
        { icon: '📊', text: 'Neural Post-Mortem', type: 'post-mortem' },
        { icon: '🎯', text: 'Prioritize Output', prompt: 'I have multiple tasks. Help me prioritize what to do first.' },
        { icon: '😰', text: 'Friction detected', prompt: 'I\'m feeling overwhelmed with everything I need to do.' },
        { icon: '🧠', text: 'Deconstruct Protocol', prompt: 'Can you help me break down my current task into smaller steps?' },
    ];

    const runPostMortem = async () => {
        if (sessions.length === 0) {
            sendMessage("No session data available for analysis. Initiate a protocol first.");
            return;
        }
        const lastSession = sessions[0];
        const analysisPrompt = `Perform a high-fidelity Neural Post-Mortem on this session: Duration: ${lastSession.duration}m, Quality: ${lastSession.quality || 'N/A'}/10, Mode: ${lastSession.mode || 'Standard'}. Provide a technical briefing on efficiency and potential optimizations.`;
        sendMessage(analysisPrompt);
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = {
            type: 'user',
            text,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await chatWithAI(
                [{ role: 'user', content: text }],
                personalities[coachPersonality].systemPrompt
            );

            setMessages(prev => [...prev, {
                type: 'coach',
                text: response,
                timestamp: new Date(),
            }]);
        } catch (error) {
            console.error('Coach error:', error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="surface-glass p-8 rounded-[2rem] border-white/5 flex flex-col h-[700px] relative overflow-hidden shadow-2xl">
            {/* Ambient Neural Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                        <Brain size={24} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Neural <span className="text-indigo-400 not-italic">Advisor</span></h3>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">Guidance Stream Active</p>
                        </div>
                    </div>
                </div>

                {/* Cognitive Mode Switcher */}
                <div className="flex gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl">
                    {Object.entries(personalities).map(([key, personality]) => (
                        <button
                            key={key}
                            onClick={() => setCoachPersonality(key)}
                            className={`p-2.5 rounded-xl transition-all relative group/p ${coachPersonality === key
                                ? 'bg-white/10 text-white shadow-lg'
                                : 'text-slate-600 hover:text-slate-400'
                                }`}
                            title={personality.name}
                        >
                            <span className="text-sm font-bold">{personality.icon}</span>
                            {coachPersonality === key && (
                                <motion.div layoutId="p-dot" className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]`} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Intelligence Stream */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-6 mb-8 pr-4 custom-scrollbar no-scrollbar"
            >
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-5 rounded-[1.8rem] border relative overflow-hidden ${message.type === 'user'
                                ? 'bg-indigo-600/10 border-indigo-500/20 text-white rounded-tr-none'
                                : 'bg-white/[0.03] border-white/5 text-slate-200 rounded-tl-none'
                                } shadow-xl`}
                        >
                            {message.type === 'coach' && (
                                <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-2">
                                    <div className="p-1 px-2 rounded-lg bg-black/40 border border-white/10">
                                        <Sparkles size={10} className="text-cyan-400" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400/80">
                                        {personalities[coachPersonality].name} v1.02
                                    </span>
                                </div>
                            )}
                            <p className="text-[12px] font-medium leading-[1.6] tracking-wide first-letter:text-sm first-letter:font-black">
                                {message.text}
                            </p>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/[0.03] border border-white/5 p-5 rounded-[1.5rem] rounded-tl-none">
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Operative Hub */}
            <div className="relative z-10 pt-4 mt-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => action.type === 'post-mortem' ? runPostMortem() : sendMessage(action.prompt)}
                            className="p-3.5 rounded-2xl bg-black/20 border border-white/5 hover:border-cyan-500/30 hover:bg-black/40 transition-all text-left group/action shadow-lg"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-sm group-hover/action:scale-125 transition-transform duration-500 grayscale group-hover/action:grayscale-0">{action.icon}</span>
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover/action:text-cyan-400 transition-colors">{action.text}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Direct Command Interface */}
                <div className="flex gap-3 p-2 rounded-[1.5rem] bg-black border border-white/10 shadow-2xl group focus-within:border-cyan-500/30 transition-all duration-500">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                        placeholder="Uplink with Neural Advisor..."
                        className="flex-1 bg-transparent px-5 py-4 text-[12px] font-medium text-white placeholder-slate-700 focus:outline-none uppercase tracking-widest"
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isTyping}
                        className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-2xl shadow-cyan-900/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale group/send"
                    >
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2">
                        <Shield size={12} className="text-cyan-500" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">End-to-End Secure Matrix</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-white/10 rounded-full" />
                    <div className="flex items-center gap-2">
                        <Activity size={12} className="text-cyan-500" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">Deep Context Retention</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIFocusCoach;
