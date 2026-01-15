import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Terminal, Cpu, Sparkles } from 'lucide-react';
import { chatWithAI } from '../services/aiService';
import { useAnalytics } from '../context/AnalyticsContext';
import { useAuth } from '../context/AuthContext';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Neural link established. I am your cognitive performance assistant. How can I optimize your current session?",
            timestamp: Date.now(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Processing Query...');
    const { getTotalStats, mood } = useAnalytics();
    const { user } = useAuth();
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const loaderMessages = [
        "Synthesizing neural pathways...",
        "Analyzing temporal performance...",
        "Optimizing cognitive load...",
        "Accessing FocusFlow database...",
        "Modulating feedback loops..."
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        let interval;
        if (isLoading) {
            let i = 0;
            interval = setInterval(() => {
                setLoadingMessage(loaderMessages[i % loaderMessages.length]);
                i++;
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    // Fallback responses when backend fails
    const getFallbackResponse = (msg) => {
        const lowerMsg = msg.toLowerCase();

        // Handle continuation/follow-up words
        if (lowerMsg === 'then' || lowerMsg === 'next' || lowerMsg === 'and then' || lowerMsg === 'what next' || lowerMsg === 'after that') {
            return "Here's the next step:\n\n⏱️ Set a timer for 25 minutes and work on JUST that one task. When it goes off, take a 5-minute break.\n\nDuring the break, move around, drink water, look away from the screen. Then you can do another round!\n\nShould we try this now?";
        }

        if (lowerMsg === 'more' || lowerMsg === 'tell me more' || lowerMsg === 'what else' || lowerMsg === 'continue') {
            return "Here are more tips:\n\n💪 Make it visible: Keep your task list where you can see it\n🎵 Use background sounds: Try Neural Soundscapes in FocusFlow\n🤝 Body doubling: Work alongside someone (virtual or in-person)\n🎯 One thing at a time: Multitasking kills focus\n\nWhich of these sounds most helpful?";
        }

        if (lowerMsg.includes('focus') || lowerMsg.includes('concentrate')) {
            return "To improve focus, try these steps:\n\n1. 🎧 Put on some lo-fi or white noise\n2. 📱 Put your phone on airplane mode\n3. ⏱️ Set a 25-minute timer\n4. 🎯 Work on ONE task only\n5. ☕ Take a 5-min break after!\n\nWant me to walk you through more steps?";
        }
        if (lowerMsg.includes('task') || lowerMsg.includes('break down') || lowerMsg.includes('help')) {
            return "I'd love to help break that down! Here's my approach:\n\n1. 📝 What's the main goal?\n2. 🔍 What's the very FIRST tiny step?\n3. ⏰ How long will each step take?\n\nTell me more about what you're working on!";
        }
        if (lowerMsg.includes('stuck') || lowerMsg.includes('procrastinat')) {
            return "I totally get it - starting is the hardest part! Try this:\n\n🎲 The 5-minute rule: Commit to just 5 minutes. That's it!\n\nUsually once you start, you'll want to keep going. And if not? That's okay too - you still did 5 minutes more than zero! 💪";
        }
        const tips = [
            "Great question! Break your task into chunks of 10-15 minutes each. Way less overwhelming! 🎯",
            "Focus tip: Put your phone in another room and set a 25-min timer. You've got this! 💪",
            "Try the 2-minute rule - if it takes less than 2 minutes, do it now! ⚡",
            "Start with the easiest part first. Small wins build momentum! 🌟",
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            content: input.trim(),
            timestamp: Date.now(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stats = getTotalStats();
            const context = `Context: User ${user?.name || 'Unknown'} is currently in a ${mood} mood with a ${stats.currentStreak}-day streak and ${stats.totalHours.toFixed(1)} total focus hours.`;

            const chatHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content,
            }));

            // Inject context as a hidden message for the AI
            chatHistory.unshift({ role: 'user', content: context });
            chatHistory.push({ role: 'user', content: userMessage.content });

            const response = await chatWithAI(chatHistory);

            // If response looks like an error, use fallback
            const isError = response.includes('went wrong') || response.includes('error') || !response;

            const assistantMessage = {
                role: 'assistant',
                content: isError ? getFallbackResponse(userMessage.content) : response,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            const assistantMessage = {
                role: 'assistant',
                content: getFallbackResponse(userMessage.content),
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, assistantMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Terminal Trigger */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl flex items-center justify-center border border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] transition-all bg-slate-900 overflow-hidden group hover:scale-110 active:scale-95"
                    style={{ zIndex: 99999 }}
                >
                    <div className="absolute inset-0 bg-indigo-600 opacity-20 group-hover:opacity-30 transition-opacity" />
                    <Cpu size={24} className="text-indigo-400 group-hover:text-indigo-300 transition-colors relative z-10" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-indigo-500 animate-pulse border-2 border-slate-950" />
                </button>
            )}

            {/* Neural Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        className="fixed bottom-8 right-8 w-[420px] h-[640px] surface-raised border-slate-800/80 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col backdrop-blur-3xl"
                        style={{ zIndex: 99999 }}
                    >
                        {/* Terminal Header */}
                        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <Terminal size={18} className="text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Neural Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Interface Active</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-slate-800 rounded-xl transition-all text-slate-500 hover:text-white border border-transparent hover:border-slate-700"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Message Stream */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: message.role === 'user' ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${message.role === 'user'
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10 font-medium'
                                            : 'bg-slate-800/50 text-slate-200 border border-slate-700/50'
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-slate-800/50 px-5 py-3.5 rounded-2xl flex items-center gap-3 border border-slate-700/50 shadow-lg shadow-indigo-500/5">
                                        <div className="relative">
                                            <Loader2 size={16} className="animate-spin text-indigo-400" />
                                            <div className="absolute inset-0 bg-indigo-400/20 blur-sm rounded-full animate-pulse" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{loadingMessage}</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Core */}
                        <div className="p-6 border-t border-slate-800 bg-slate-900/30">
                            <div className="relative group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Execute neural command..."
                                    disabled={isLoading}
                                    className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all disabled:opacity-50 pr-14 shadow-inner"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all disabled:opacity-50"
                                    style={{
                                        backgroundColor: input.trim() && !isLoading ? '#4f46e5' : 'transparent',
                                        color: input.trim() && !isLoading ? '#fff' : '#475569',
                                    }}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="mt-4 text-[9px] text-center font-bold text-slate-600 uppercase tracking-[0.2em]">
                                Multi-modal synthesis active
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
