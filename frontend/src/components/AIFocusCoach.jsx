import React, { useState } from 'react';
import { Brain, Lightbulb, Zap, Heart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAI } from '../services/aiService';

const AIFocusCoach = () => {
    const [coachPersonality, setCoachPersonality] = useState('supportive'); // supportive, energetic, calm, strict
    const [messages, setMessages] = useState([
        {
            type: 'coach',
            text: "Hey! I'm your AI Focus Coach. I'm here to help you stay on track and crush your goals. What are you working on today?",
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const personalities = {
        supportive: {
            icon: '🤗',
            name: 'Supportive',
            color: '#10b981',
            systemPrompt: 'You are a warm, encouraging coach who celebrates every small win and provides gentle motivation.'
        },
        energetic: {
            icon: '⚡',
            name: 'Energetic',
            color: '#f59e0b',
            systemPrompt: 'You are a high-energy, enthusiastic coach who pumps people up and uses lots of exclamation points!'
        },
        calm: {
            icon: '🧘',
            name: 'Calm',
            color: '#3b82f6',
            systemPrompt: 'You are a zen, mindful coach who speaks slowly and focuses on breathing and presence.'
        },
        strict: {
            icon: '💪',
            name: 'Strict',
            color: '#ef4444',
            systemPrompt: 'You are a no-nonsense coach who holds people accountable and pushes them to do better.'
        }
    };

    const quickActions = [
        { icon: '🎯', text: 'Help me prioritize', prompt: 'I have multiple tasks. Help me prioritize what to do first.' },
        { icon: '😰', text: 'Feeling overwhelmed', prompt: 'I\'m feeling overwhelmed with everything I need to do.' },
        { icon: '🚀', text: 'Need motivation', prompt: 'I need some motivation to get started on my work.' },
        { icon: '🧠', text: 'Break down task', prompt: 'Can you help me break down my current task into smaller steps?' },
    ];

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
        <div className="glass-card border-white/10 p-6 rounded-2xl flex flex-col h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Brain size={24} className="text-purple-500" />
                    <div>
                        <h3 className="font-bold">AI Focus Coach</h3>
                        <p className="text-xs text-zinc-500">Your personal productivity mentor</p>
                    </div>
                </div>
                
                {/* Personality Selector */}
                <div className="flex gap-2">
                    {Object.entries(personalities).map(([key, personality]) => (
                        <button
                            key={key}
                            onClick={() => setCoachPersonality(key)}
                            className={`p-2 rounded-lg transition-all ${
                                coachPersonality === key
                                    ? 'bg-white/20 scale-110'
                                    : 'bg-white/5 hover:bg-white/10'
                            }`}
                            title={personality.name}
                        >
                            <span className="text-xl">{personality.icon}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
                {messages.map((message, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl ${
                                message.type === 'user'
                                    ? 'bg-accent text-black'
                                    : 'bg-white/10'
                            }`}
                        >
                            {message.type === 'coach' && (
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">{personalities[coachPersonality].icon}</span>
                                    <span className="text-xs font-bold" style={{ color: personalities[coachPersonality].color }}>
                                        {personalities[coachPersonality].name} Coach
                                    </span>
                                </div>
                            )}
                            <p className="text-sm leading-relaxed">{message.text}</p>
                        </div>
                    </motion.div>
                ))}
                
                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                    >
                        <div className="bg-white/10 p-3 rounded-2xl">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={() => sendMessage(action.prompt)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-left text-xs"
                    >
                        <span className="mr-1">{action.icon}</span>
                        {action.text}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                    placeholder="Ask your coach anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
                <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="px-6 py-3 rounded-xl bg-accent text-black font-bold hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default AIFocusCoach;
