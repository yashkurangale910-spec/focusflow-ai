import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAI } from '../services/aiService';
import { useAnalytics } from '../context/AnalyticsContext';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { sendNotification } from '../services/notificationService';
import {
    Terminal, Send, X, Cpu, Loader2, Sparkles, Zap, Brain, Rocket,
    Coffee, Target, Clock, MessageSquare
} from 'lucide-react';

const AIChatbot = ({ setActiveTab, setFocusTask }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(() => {
        const saved = localStorage.getItem('neural_chat_history');
        return saved ? JSON.parse(saved) : [
            {
                role: 'assistant',
                content: "Neural Link Active. I am your Neural Coach. How can I optimize your performance today?",
                timestamp: Date.now(),
            }
        ];
    });
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Processing Query...');
    const { getTotalStats, mood, sessions, getProductivityInsights } = useAnalytics();
    const { user } = useAuth();
    const { addTask } = useTasks();
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Neural Nudge State
    const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
    const nudgeCooldown = 15 * 60 * 1000; // 15 minutes

    // Idle Detection for Neural Nudges
    useEffect(() => {
        const checkIdle = setInterval(() => {
            const idleTime = Date.now() - lastInteractionTime;

            if (idleTime > 10 * 60 * 1000 && idleTime < nudgeCooldown) {
                // Proactive Nudge
                const nudges = [
                    "Neural activity detected as stagnant. Ready for a quick Focus Sprint?",
                    "Cognitive baseline reached. Should we break down your next big task?",
                    "Your brain is in idle mode. High-performance protocols are ready for launch."
                ];

                const randomNudge = nudges[Math.floor(Math.random() * nudges.length)];

                // Only nudge if most recent message is not already a nudge
                setMessages(prev => {
                    if (prev[prev.length - 1].content === randomNudge) return prev;
                    return [...prev, {
                        role: 'assistant',
                        content: randomNudge,
                        timestamp: Date.now(),
                        isNudge: true
                    }];
                });
                setLastInteractionTime(Date.now() + nudgeCooldown); // Reset timer with cooldown
                playSFX('message');
            }
        }, 60000); // Check every minute

        return () => clearInterval(checkIdle);
    }, [lastInteractionTime]);

    // Persist messages
    useEffect(() => {
        localStorage.setItem('neural_chat_history', JSON.stringify(messages));
    }, [messages]);

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

    const quickActions = [
        { id: 'plan', label: 'Plan My Day', icon: <Sparkles size={14} />, prompt: 'I want to plan my day. Can you help me prioritize my tasks based on my energy levels?' },
        { id: 'train', label: 'Train Focus', icon: <Sparkles size={14} />, prompt: 'I want to train my focus. What focus technique should I use for a high-intensity coding session?' },
        { id: 'breakdown', label: 'Break Down Task', icon: <Sparkles size={14} />, prompt: 'Help me break down a complex task into tiny, manageable micro-steps.' },
        { id: 'reset', label: 'Rapid Reset', icon: <Sparkles size={14} />, prompt: 'I feel scattered. Can you lead me through a 5-minute Rapid Re-Alignment protocol to reset my focus?' }
    ];

    const handleSend = async (customInput = null) => {
        const messageText = customInput || input.trim();
        if (!messageText || isLoading) return;

        const userMessage = {
            role: 'user',
            content: messageText,
            timestamp: Date.now(),
        };

        setMessages(prev => [...prev, userMessage]);
        if (!customInput) setInput('');
        setIsLoading(true);
        setLastInteractionTime(Date.now()); // Reset idle timer

        try {
            const stats = getTotalStats();
            const insights = getProductivityInsights();

            // Streamlined Training Packet (Developer/System view)
            const sessionSummary = sessions?.slice(0, 3).map(s =>
                `${s.duration}m(${s.quality}/10)`
            ).join(', ') || 'None';

            const trainingPacket = `[CURRENT_COGNITIVE_SNAPSHOT] Mood:${mood}, Streak:${stats.currentStreak}d, Hrs:${stats.totalHours.toFixed(1)}, Analysis:${insights}, History:[${sessionSummary}]`;

            const chatHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content,
            }));

            // Optimization: Add the training context just before the newest user query
            // for maximum influence on the model's next response.
            chatHistory.splice(chatHistory.length - 1, 0, { role: 'system', content: trainingPacket });

            // Note: userMessage.content is already in chatHistory as the last element 
            // from the initial messages.map if messages included it, but wait...
            // messages state isn't updated with userMessage yet!
            // Let's check handleSend line 107: setMessages(prev => [...prev, userMessage]);
            // So messages does NOT include userMessage yet.
            chatHistory.push({ role: 'user', content: userMessage.content });

            const response = await chatWithAI(chatHistory);

            // Robust error/fallback handling
            const isError = !response || response.includes('went wrong') || response.includes('error');

            const assistantMessage = {
                role: 'assistant',
                content: isError ? getFallbackResponse(userMessage.content) : response,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, assistantMessage]);
            playSFX('message');

            // Background notification
            if (document.hidden) {
                sendNotification('Neural Link Update', {
                    body: assistantMessage.content.slice(0, 100) + '...',
                    tag: 'ai-response'
                });
            }
        } catch (error) {
            console.error('Neural Bridge Error:', error);
            const fallback = {
                role: 'assistant',
                content: getFallbackResponse(userMessage.content),
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, fallback]);
            playSFX('message');
        } finally {
            setIsLoading(false);
        }
    };

    const parseTasksFromMessage = (text) => {
        const lines = text.split('\n');
        const discoveredTasks = [];
        // Match numbered lists (1. task) or bullet points (-, *, •)
        const taskRegex = /^(\d+\.|\*|-|•)\s*(.+)$/;

        lines.forEach(line => {
            const match = line.trim().match(taskRegex);
            if (match) {
                const taskText = match[2].trim();
                // Avoid tiny fragments or single words
                if (taskText && taskText.length > 3) {
                    discoveredTasks.push(taskText);
                }
            }
        });
        return discoveredTasks;
    };

    const parseProtocolFromMessage = (text) => {
        const lowerText = text.toLowerCase();
        const protocols = [
            { name: 'Pomodoro Sprint', keywords: ['pomodoro', 'sprint'], type: 'focus', duration: 25 },
            { name: 'Deep Work Protocol', keywords: ['deep work'], type: 'focus', duration: 60 },
            { name: 'Rapid Re-Alignment', keywords: ['realignment', 're-alignment', 'reset'], type: 'shortBreak', duration: 5 },
            { name: 'Neural Recovery', keywords: ['recovery', 'theta'], type: 'longBreak', duration: 20 }
        ];

        return protocols.find(p => p.keywords.some(k => lowerText.includes(k)));
    };

    const playSFX = (type) => {
        const sfx = {
            message: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3', // Subtle chirp
            sync: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3' // Digital success
        };
        const audio = new Audio(sfx[type]);
        audio.volume = 0.2;
        audio.play().catch(() => { }); // Ignore autoplay blocks
    };

    const handleSyncToTasks = async (messageContent) => {
        const discovered = parseTasksFromMessage(messageContent);
        if (discovered.length === 0) return;

        setIsLoading(true);
        setLoadingMessage('Syncing to Neural Board...');

        try {
            for (const taskName of discovered) {
                await addTask({
                    title: taskName,
                    description: 'Suggested by Neural Coach',
                    priority: 'medium'
                });
            }
            // Add a confirmation message
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `✅ Successfully synced ${discovered.length} micro-steps to your Task Board!`,
                timestamp: Date.now()
            }]);
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            setIsLoading(false);
            playSFX('sync');
        }
    };

    const handleLaunchProtocol = (protocol) => {
        if (setFocusTask) setFocusTask({ title: protocol.name, description: 'AI-Guided Session' });
        if (setActiveTab) setActiveTab('focus');
        playSFX('message');
    };

    const handleQuickAction = (prompt) => {
        handleSend(prompt);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Terminal Trigger - Enhanced */}
            {!isOpen && (
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl flex items-center justify-center border border-purple-500/30 shadow-2xl shadow-purple-500/20 transition-all bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden group z-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ zIndex: 99999 }}
                >
                    {/* Rotating glow ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 rounded-2xl opacity-60 group-hover:opacity-100 blur-lg transition-opacity animate-spin-slow" />

                    {/* Inner background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Icon */}
                    <Cpu size={28} className="text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 relative z-10 group-hover:rotate-12" />

                    {/* Active indicator */}
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 animate-pulse border-2 border-slate-950 shadow-lg shadow-purple-500/50" />
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-purple-500 animate-ping opacity-75" />
                </motion.button>
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
                        {/* Terminal Header - Enhanced */}
                        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-gradient-to-b from-slate-900/80 to-slate-900/50 backdrop-blur-xl relative">
                            {/* Ambient glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="relative">
                                    {/* Icon glow */}
                                    <div className="absolute inset-0 bg-purple-500/20 rounded-xl blur-md" />
                                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center">
                                        <Terminal size={18} className="text-purple-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase tracking-tight">Neural Assistant</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse shadow-sm shadow-emerald-400/30" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40 animate-pulse shadow-sm shadow-emerald-400/20" style={{ animationDelay: '0.4s' }} />
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Online</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="relative z-10 p-2 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-white border border-transparent hover:border-white/10 group"
                            >
                                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Message Stream */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
                            {/* Neural Quick Actions Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {quickActions.map((action) => (
                                    <motion.button
                                        key={action.id}
                                        onClick={() => handleQuickAction(action.prompt)}
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(99, 102, 241, 0.15)' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all text-left group"
                                    >
                                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                                            {action.icon}
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-200 tracking-wide uppercase">{action.label}</span>
                                    </motion.button>
                                ))}
                            </div>

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

                                        {message.role === 'assistant' && parseTasksFromMessage(message.content).length > 0 && !message.content.includes('Successfully synced') && (
                                            <motion.button
                                                onClick={() => handleSyncToTasks(message.content)}
                                                className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all uppercase tracking-wider group"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Sparkles size={12} className="group-hover:rotate-12 transition-transform" />
                                                Sync to Board
                                            </motion.button>
                                        )}

                                        {message.role === 'assistant' && parseProtocolFromMessage(message.content) && (
                                            <motion.button
                                                onClick={() => handleLaunchProtocol(parseProtocolFromMessage(message.content))}
                                                className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-400 hover:bg-purple-500/20 transition-all uppercase tracking-wider group w-full justify-center"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Zap size={12} className="group-hover:animate-pulse" />
                                                Launch {parseProtocolFromMessage(message.content).name}
                                            </motion.button>
                                        )}
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

                        {/* Input Core - Enhanced */}
                        <div className="p-6 border-t border-white/5 bg-gradient-to-t from-slate-900/80 to-slate-900/50 backdrop-blur-xl relative">
                            {/* Ambient glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent pointer-events-none" />

                            <div className="relative group">
                                {/* Glow on focus */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Execute neural command..."
                                    disabled={isLoading}
                                    className="relative w-full bg-slate-950/80 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:bg-slate-950 focus:border-purple-500/30 transition-all disabled:opacity-50 pr-14 shadow-inner"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 group/send ${input.trim() && !isLoading
                                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50'
                                        : 'bg-transparent'
                                        }`}
                                >
                                    <Send size={18} className={input.trim() && !isLoading ? 'text-white group-hover/send:translate-x-0.5 transition-transform' : 'text-slate-600'} />
                                </button>
                            </div>
                            <p className="mt-4 text-[9px] text-center font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                                <Sparkles size={10} className="animate-pulse text-purple-500/50" />
                                Multi-modal synthesis active
                                <Sparkles size={10} className="animate-pulse text-cyan-500/50" style={{ animationDelay: '0.5s' }} />
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChatbot;
