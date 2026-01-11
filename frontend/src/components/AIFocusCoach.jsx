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
            text: "Neural Link Established. I am your specialized advisor. Specify your current cognitive objective or report deployment friction.",
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
            icon: '🤗',
            name: 'Vanguard',
            color: 'emerald',
            systemPrompt: 'You are a warm, encouraging coach who celebrates every small win and provides gentle motivation. Use soft language.'
        },
        energetic: {
            icon: '⚡',
            name: 'Catalyst',
            color: 'amber',
            systemPrompt: 'You are a high-energy, enthusiastic coach who pumps people up! Use bold language and high-energy encouragement.'
        },
        calm: {
            icon: '🧘',
            name: 'Zenith',
            color: 'blue',
            systemPrompt: 'You are a zen, mindful coach who focuses on breathing and presence. Use calm, minimalist language.'
        },
        strict: {
            icon: '💪',
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
        <div className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 flex flex-col h-[650px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-colors" />

            {/* Header */}
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 shadow-inner">
                        <Brain size={20} className="text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Neural Advisor</h3>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Intelligence Active</p>
                        </div>
                    </div>
                </div>

                {/* Personality Selector */}
                <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950/50 border border-slate-900">
                    {Object.entries(personalities).map(([key, personality]) => (
                        <button
                            key={key}
                            onClick={() => setCoachPersonality(key)}
                            className={`p-2 rounded-lg transition-all relative group/p ${coachPersonality === key
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <span className="text-lg grayscale group-hover/p:grayscale-0 transition-all">{personality.icon}</span>
                            {coachPersonality === key && (
                                <motion.div layoutId="p-dot" className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-${personality.color}-500`} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Terminal Feed */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent custom-scrollbar"
            >
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: message.type === 'user' ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-4 rounded-3xl border ${message.type === 'user'
                                ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-100 rounded-tr-none'
                                : 'bg-slate-950/50 border-slate-800 text-slate-300 rounded-tl-none'
                                }`}
                        >
                            {message.type === 'coach' && (
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={`p-1 rounded-md bg-${personalities[coachPersonality].color}-500/10`}>
                                        <Sparkles size={10} className={`text-${personalities[coachPersonality].color}-400`} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: `var(--color-${personalities[coachPersonality].color}-400)` }}>
                                        {personalities[coachPersonality].name} Module
                                    </span>
                                </div>
                            )}
                            <p className="text-[11px] font-medium leading-relaxed tracking-wide">{message.text}</p>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-3xl rounded-tl-none">
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <div className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Functional Hub */}
            <div className="relative z-10">
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => action.type === 'post-mortem' ? runPostMortem() : sendMessage(action.prompt)}
                            className="p-3 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all text-left group/action"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xs group-hover/action:scale-110 transition-transform">{action.icon}</span>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight group-hover/action:text-slate-300">{action.text}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Command Input */}
                <div className="flex gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner group/input focus-within:border-indigo-500/30 transition-all">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                        placeholder="Specify operative constraints..."
                        className="flex-1 bg-transparent px-4 py-3 text-[11px] font-medium text-white placeholder-slate-700 focus:outline-none"
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isTyping}
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
                    >
                        <Send size={16} />
                    </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-4 opacity-50">
                    <div className="flex items-center gap-1.5">
                        <Shield size={10} className="text-slate-500" />
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">End-to-End Encrypted</span>
                    </div>
                    <div className="w-px h-3 bg-slate-800" />
                    <div className="flex items-center gap-1.5">
                        <Activity size={10} className="text-slate-500" />
                        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Contextual Memory Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIFocusCoach;
