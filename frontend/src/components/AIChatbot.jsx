import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAI, getFallbackResponse } from '../services/aiService';
import { useAnalytics } from '../context/AnalyticsContext';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { sendNotification } from '../services/notificationService';
import {
    Terminal, Send, X, Cpu, Loader2, Sparkles, Zap, Brain, Rocket,
    Coffee, Target, Clock, MessageSquare, Mic, MicOff, Volume2, VolumeX,
    Play
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

    // Use centralized fallback intelligence from aiService.js

    const quickActions = [
        { id: 'plan', label: 'Plan My Day', icon: <Sparkles size={14} />, prompt: 'I want to plan my day. Can you help me prioritize my tasks based on my energy levels?' },
        { id: 'train', label: 'Train Focus', icon: <Sparkles size={14} />, prompt: 'I want to train my focus. What focus technique should I use for a high-intensity coding session?' },
        { id: 'breakdown', label: 'Break Down Task', icon: <Sparkles size={14} />, prompt: 'Help me break down a complex task into tiny, manageable micro-steps.' },
        { id: 'reset', label: 'Rapid Reset', icon: <Sparkles size={14} />, prompt: 'I feel scattered. Can you lead me through a 5-minute Rapid Re-Alignment protocol to reset my focus?' }
    ];

    // Neural Calibration / Training State
    const [brainProfile, setBrainProfile] = useState(() => {
        const saved = localStorage.getItem('neural_brain_profile');
        return saved ? JSON.parse(saved) : {
            archetype: 'Unaligned',
            focusStyle: 'Variable',
            energyPeak: 'Unknown'
        };
    });
    const [isTrainingMode, setIsTrainingMode] = useState(false);

    const archetypes = [
        { id: 'ADHD_EXPLORER', name: 'ADHD Explorer', icon: '🎨', desc: 'Distraction prone, high creativity, rapid context switch.' },
        { id: 'DEEP_DIVER', name: 'Deep Diver', icon: '🌊', desc: 'Slow start, massive hyperfocus, hard to break out.' },
        { id: 'CREATIVE_CHAOTIC', name: 'Creative Chaotic', icon: '⚡', desc: 'Idea-driven, messy execution, momentum dependent.' },
        { id: 'THE_ARCHITECT', name: 'The Architect', icon: '🏛️', desc: 'Process-driven, needs structure, low tolerance for clutter.' }
    ];

    useEffect(() => {
        localStorage.setItem('neural_brain_profile', JSON.stringify(brainProfile));
    }, [brainProfile]);

    // Neural Audio (Voice Link) State
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(() => localStorage.getItem('neural_voice_enabled') === 'true');
    const [isVoiceActive, setIsVoiceActive] = useState(false); // New state for visual feedback
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                playSFX('sync');
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setIsListening(true);
            recognitionRef.current?.start();
            playSFX('open');
        }
    };

    const speak = (text) => {
        if (!isSpeaking) return;
        window.speechSynthesis.cancel();

        // Remove markdown and special characters from text for cleaner speech
        const cleanText = text.replace(/[*#_\\`]/g, '').replace(/\[|\]/g, '');

        const utterance = new window.SpeechSynthesisUtterance(cleanText);
        utterance.rate = 0.92; // Slightly slower for better cognitive processing and clarity
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        // Priority: Natural > Premium > Female (usually clearer for coaching)
        const neuralVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Premium'))
            || voices.find(v => v.name.includes('Google') && v.lang.startsWith('en'))
            || voices[0];

        utterance.voice = neuralVoice;

        utterance.onstart = () => setIsVoiceActive(true);
        utterance.onend = () => setIsVoiceActive(false);
        utterance.onerror = () => setIsVoiceActive(false);

        window.speechSynthesis.speak(utterance);
    };

    // Auto-stop speech when closing terminal
    useEffect(() => {
        if (!isOpen) {
            window.speechSynthesis.cancel();
            setIsVoiceActive(false);
        }
    }, [isOpen]);

    // Direct Neural Control (Command Parser)
    const executeSystemCommand = (text) => {
        const cmd = text.toLowerCase();

        // 1. Focus Session Initiation
        if ((cmd.includes('start') || cmd.includes('launch')) && (cmd.includes('timer') || cmd.includes('focus') || cmd.includes('sprint') || cmd.includes('pomodoro'))) {
            handleLaunchProtocol({ name: 'Direct AI Sprint', duration: 25 });
            return "Launching specialized focus sprint now. Neural Grid engaged. 🚀";
        }

        // 2. Tab Navigation & Social Actions
        if (cmd.includes('go to') || cmd.includes('open page') || cmd.includes('find') || cmd.includes('join')) {
            if (cmd.includes('efficiency') || cmd.includes('analytics') || cmd.includes('stats')) {
                setActiveTab('productivity');
                return "Redirecting to Neural Analytics stream... Done. 📊";
            }
            if (cmd.includes('community') || cmd.includes('squad') || cmd.includes('room') || cmd.includes('battle')) {
                setActiveTab('community');
                if (cmd.includes('battle')) return "Entering the Neural Arena... Linking you to active Focus Battles. ⚔️";
                if (cmd.includes('squad') || cmd.includes('room')) return "Synchronizing with your Squad... Accessing Co-Working rooms. 👥";
                return "Linking to Global Study Grid... Done. 🌏";
            }
        }

        return null; // No system command detected
    };

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

        try {
            const stats = getTotalStats();
            const insights = getProductivityInsights();

            // Streamlined Training Packet + BRAIN PROFILE
            const sessionSummary = sessions?.slice(0, 3).map(s =>
                `${s.duration}m(${s.quality}/10)`
            ).join(', ') || 'None';

            const trainingPacket = `[COGNITIVE_CALIBRATION] Archetype:${brainProfile.archetype}, Style:${brainProfile.focusStyle}
[PERFORMANCE_SNAPSHOT] Mood:${mood}, Streak:${stats.currentStreak}d, Analysis:${insights}, History:[${sessionSummary}]`;

            const chatHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content,
            }));

            chatHistory.splice(chatHistory.length - 1, 0, { role: 'system', content: trainingPacket });
            chatHistory.push({ role: 'user', content: userMessage.content });

            const systemCmdResponse = executeSystemCommand(userMessage.content);

            if (systemCmdResponse) {
                const assistantMessage = {
                    role: 'assistant',
                    content: systemCmdResponse,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, assistantMessage]);
                speak(systemCmdResponse);
                setIsLoading(false);
                return;
            }

            const response = await chatWithAI(chatHistory);

            const isError = !response || response === '';

            const assistantMessage = {
                role: 'assistant',
                content: isError ? getFallbackResponse(userMessage.content) : response,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, assistantMessage]);
            speak(assistantMessage.content);
            playSFX('message');

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
                                onClick={() => {
                                    const newState = !isSpeaking;
                                    setIsSpeaking(newState);
                                    localStorage.setItem('neural_voice_enabled', newState);
                                    if (!newState) {
                                        window.speechSynthesis.cancel();
                                        setIsVoiceActive(false);
                                    }
                                }}
                                className={`relative z-10 p-2 rounded-xl transition-all border ${isSpeaking ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'hover:bg-white/5 text-slate-500 hover:text-white border-transparent hover:border-white/10'}`}
                                title="Voice Feedback"
                            >
                                {isSpeaking ? (
                                    <div className="relative">
                                        <Volume2 size={18} className={isVoiceActive ? 'animate-pulse' : ''} />
                                        {isVoiceActive && (
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                                className="absolute inset-0 bg-indigo-500 rounded-full blur-md"
                                            />
                                        )}
                                    </div>
                                ) : <VolumeX size={18} />}
                            </button>
                            <button
                                onClick={() => setIsTrainingMode(!isTrainingMode)}
                                className={`relative z-10 p-2 rounded-xl transition-all border ${isTrainingMode ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' : 'hover:bg-white/5 text-slate-500 hover:text-white border-transparent hover:border-white/10'}`}
                                title="Neural Calibration"
                            >
                                <Brain size={18} className={isTrainingMode ? 'animate-pulse' : ''} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="relative z-10 p-2 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-white border border-transparent hover:border-white/10 group"
                            >
                                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Message Stream or Training Mode */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
                            {isTrainingMode ? (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                                        <h4 className="text-sm font-bold text-indigo-400 mb-1 flex items-center gap-2">
                                            <Zap size={14} /> Cognitive Calibration
                                        </h4>
                                        <p className="text-xs text-slate-400 leading-relaxed">
                                            Train your Neural Assistant to understand your unique brain patterns. Your archetype determines the complexity and style of focus coaching you receive.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {archetypes.map((arch) => (
                                            <button
                                                key={arch.id}
                                                onClick={() => {
                                                    setBrainProfile(prev => ({ ...prev, archetype: arch.id }));
                                                    setIsTrainingMode(false);
                                                    handleSend(`Neural Link Updated: Archetype set to ${arch.name}. Please re-calibrate my focus protocols.`);
                                                }}
                                                className={`p-4 rounded-2xl border transition-all text-left flex gap-4 ${brainProfile.archetype === arch.id
                                                    ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                                                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                <div className="text-3xl">{arch.icon}</div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-bold text-slate-200">{arch.name}</span>
                                                        {brainProfile.archetype === arch.id && (
                                                            <span className="text-[9px] font-black text-purple-400 border border-purple-400/30 px-1.5 py-0.5 rounded uppercase">Active</span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 leading-snug mt-1">{arch.desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-500 italic text-[11px]">
                                        <Rocket size={14} className="flex-shrink-0" />
                                        Your neural data is stored locally and hashed before transmission for maximum privacy.
                                    </div>
                                </div>
                            ) : (
                                <>
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

                                                {message.role === 'assistant' && (
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {parseTasksFromMessage(message.content).length > 0 && !message.content.includes('Successfully synced') && (
                                                            <motion.button
                                                                onClick={() => handleSyncToTasks(message.content)}
                                                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-bold text-indigo-400 hover:bg-indigo-500/20 transition-all uppercase tracking-wider group"
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                <Sparkles size={12} className="group-hover:rotate-12 transition-transform" />
                                                                Sync to Board
                                                            </motion.button>
                                                        )}

                                                        <motion.button
                                                            onClick={async () => {
                                                                try {
                                                                    await fetch('http://localhost:5000/api/ai/memory', {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ context: message.content, userId: 'mock-123' })
                                                                    });
                                                                    playSFX('sync');
                                                                } catch (e) { console.error(e); }
                                                            }}
                                                            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-400 hover:bg-purple-500/20 transition-all uppercase tracking-wider group"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            title="Archive to Cognitive Memory"
                                                        >
                                                            <Brain size={12} className="group-hover:animate-pulse" />
                                                            Archive
                                                        </motion.button>
                                                    </div>
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
                                </>
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
                                    className="relative w-full bg-slate-950/80 border border-white/5 rounded-2xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:bg-slate-950 focus:border-purple-500/30 transition-all disabled:opacity-50 pr-24 shadow-inner"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <button
                                        onClick={toggleListening}
                                        disabled={isLoading}
                                        className={`p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                                    >
                                        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className={`p-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 group/send ${input.trim() && !isLoading
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50'
                                            : 'bg-transparent'
                                            }`}
                                    >
                                        <Send size={18} className={input.trim() && !isLoading ? 'text-white group-hover/send:translate-x-0.5 transition-transform' : 'text-slate-600'} />
                                    </button>
                                </div>
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
