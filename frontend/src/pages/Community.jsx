import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Flame, Users, Zap, Search,
    Bell, Shield, Target, Plus, ChevronRight,
    Star, Award, CheckCircle, Waves, Medal,
    MessageSquare, Play, Calendar, UserPlus, Palette, Layout
} from 'lucide-react';
import socketService from '../services/socketService';
import CollaborativeWhiteboard from '../components/CollaborativeWhiteboard';
import GoalsSystem from '../components/GoalsSystem';

const Community = () => {
    const [activeTab, setActiveTab] = useState('global');
    const [subTab, setSubTab] = useState('hub'); // New state for main community navigation
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [connected, setConnected] = useState(false);
    const [currentSquad, setCurrentSquad] = useState(null);
    const [pioneerCount, setPioneerCount] = useState(0);
    const [squadTimer, setSquadTimer] = useState({ timeLeft: 0, status: 'idle' });
    const [isTimerMaster, setIsTimerMaster] = useState(false);
    const [showWhiteboard, setShowWhiteboard] = useState(false);
    const [remoteTyping, setRemoteTyping] = useState(null);
    const [remoteDrawing, setRemoteDrawing] = useState(null);

    // Chat Auto-scroll logic
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        socketService.connect();
        setConnected(true);

        socketService.onSquadStateSync((data) => {
            setSquadTimer(data.timer);
            setPioneerCount(data.pioneerCount);
        });

        socketService.onPioneerJoined((data) => {
            setPioneerCount(data.count);
            setMessages(prev => [...prev, {
                system: true,
                text: `A new pioneer has linked to the grid.`
            }]);
        });

        socketService.onPioneerLeft((data) => {
            setPioneerCount(data.count);
        });

        socketService.onNewMessage((data) => {
            setMessages(prev => [...prev, data]);
        });

        socketService.onPioneerStatusChanged((data) => {
            if (data.status === 'typing') {
                setRemoteTyping(data.user);
            } else if (data.status === 'drawing') {
                setRemoteDrawing(data.user);
            } else if (data.status === 'idle') {
                setRemoteTyping(null);
                setRemoteDrawing(null);
            }
        });

        socketService.onTimerUpdated((data) => {
            setSquadTimer(data);
        });

        socketService.onTimerSyncTick((data) => {
            // Using a ref-like approach or checking local state is better than effect dependency
            setSquadTimer(prev => {
                // If we are master, we ignore sync ticks from others
                // But since we aren't using a ref here, we'll check a window variable or just handle it
                if (window.isTimerMaster) return prev;
                return { ...prev, timeLeft: data.timeLeft };
            });
        });

        return () => {
            socketService.disconnect();
        };
    }, []); // Run once on mount

    // Timer Master Heartbeat
    useEffect(() => {
        let interval;
        if (isTimerMaster && squadTimer.status === 'running' && squadTimer.timeLeft > 0) {
            interval = setInterval(() => {
                setSquadTimer(prev => {
                    const newTime = prev.timeLeft - 1;
                    socketService.sendTimerTick(currentSquad, newTime);
                    return { ...prev, timeLeft: newTime };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerMaster, squadTimer.status, squadTimer.timeLeft, currentSquad]);

    const handleJoinSquad = (squadId) => {
        setMessages([]); // Clear chat history for new squad context
        socketService.joinSquad(squadId);
        setCurrentSquad(squadId);
        setSubTab('squads'); // Auto-switch to squads view when joining
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (chatInput.trim() && currentSquad) {
            socketService.sendChatMessage(currentSquad, chatInput, 'Alex_Pioneer');
            setChatInput('');
        }
    };

    const handleTimerAction = (action) => {
        if (currentSquad) {
            const isStarting = action === 'start';
            setIsTimerMaster(isStarting);
            window.isTimerMaster = isStarting; // Global flag for socket listener
            socketService.sendTimerAction(currentSquad, action, 25 * 60);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const leaderboardData = [
        { rank: '01', name: 'Neural_Ghost_99', tier: 'Vanguard Elite', level: '88', xp: 95, streak: 42, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost' },
        { rank: '02', name: 'SyncMaster_Pro', tier: 'Alpha Focus', level: '82', xp: 42, streak: 28, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sync' },
        { rank: '03', name: 'Void_Seeker', tier: 'Deep Vanguard', level: '75', xp: 68, streak: 15, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Void' },
    ];

    const squadSessions = [
        { id: 1, title: 'Deep Work Sprint', users: ['A', 'B', 'C'], slots: '4/5', status: 'LIVE' },
        { id: 2, title: 'Indie Hacker Flow', users: ['D', 'E'], slots: '2 Pioneers', time: '12:30 PM' },
    ];

    const badges = [
        { icon: CheckCircle, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
        { icon: Waves, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { icon: Medal, color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-6 font-sans">
            {/* Main Header */}
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">FocusFlow <span className="text-cyan-400">AI</span></h1>
                    <nav className="flex items-center gap-8">
                        <button
                            onClick={() => setSubTab('hub')}
                            className={`text-sm font-bold transition-all ${subTab === 'hub' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-slate-400 hover:text-white'}`}
                        >
                            Hub
                        </button>
                        <button
                            onClick={() => setSubTab('leaderboard')}
                            className={`text-sm font-bold transition-all ${subTab === 'leaderboard' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-slate-400 hover:text-white'}`}
                        >
                            Leaderboard
                        </button>
                        <button
                            onClick={() => setSubTab('missions')}
                            className={`text-sm font-bold transition-all ${subTab === 'missions' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-slate-400 hover:text-white'}`}
                        >
                            Missions
                        </button>
                        <button
                            onClick={() => setSubTab('squads')}
                            className={`text-sm font-bold transition-all ${subTab === 'squads' ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1' : 'text-slate-400 hover:text-white'}`}
                        >
                            Squads
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find Pioneers..."
                            className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 text-sm w-64 outline-none focus:border-cyan-500/50 transition-all"
                        />
                    </div>
                    <button className="relative">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-black" />
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div className="text-right">
                            <p className="text-xs font-bold text-white uppercase tracking-tight">Vanguard Elite</p>
                            <p className="text-[10px] text-slate-500 font-bold tracking-widest text-right">@alex_pioneer</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-cyan-500/50 p-0.5">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="avatar" className="w-full h-full rounded-full" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Left Panel: Personal Pulse - Only in Hub or Squads */}
                {(subTab === 'hub' || subTab === 'squads') && (
                    <div className={`col-span-12 ${subTab === 'hub' ? 'lg:col-span-3' : 'lg:col-span-4'} space-y-8`}>
                        <div className="bg-black border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Personal Pulse</h3>
                                <span className="text-3xl font-black text-cyan-400">#14</span>
                            </div>

                            <div className="mb-8">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Rank</p>
                                <div className="relative h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '75%' }}
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                    />
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">240 XP to next level: <span className="text-white">Neural Master</span></p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Focus Streak</p>
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="text-xl font-bold">12</span>
                                        <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                    <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center">Focus Hours</p>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-xl font-bold">142h</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Active Badges</h3>
                                <ChevronRight className="w-4 h-4 text-slate-500" />
                            </div>
                            <div className="flex gap-4">
                                {badges.map((badge, i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center`}>
                                        <badge.icon className={`w-5 h-5 ${badge.color}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Center Panel: Leaderboard / Missions */}
                {(subTab === 'hub' || subTab === 'leaderboard' || subTab === 'missions') && (
                    <div className={`col-span-12 ${subTab === 'hub' ? 'lg:col-span-6' : subTab === 'missions' ? 'lg:col-span-9' : 'lg:col-span-12'}`}>
                        {subTab === 'missions' ? (
                            <div className="space-y-12">
                                <div className="text-center mb-12">
                                    <h2 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">Neural <span className="text-cyan-400">Missions</span></h2>
                                    <p className="text-slate-400 text-sm font-medium">Complete daily protocols to earn XP and rank up in the collective.</p>
                                </div>
                                <div className="max-w-3xl mx-auto">
                                    <GoalsSystem />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                    <div className="surface-glass p-8 rounded-[2rem] border-white/5">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                                                <Target size={24} />
                                            </div>
                                            <h4 className="text-lg font-black text-white uppercase tracking-tight">Prime Objective</h4>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">Complete 5 Pomodoro sessions with 100% focus purity to unlock the 'Zenith' badge.</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reward: 500 XP</span>
                                            <button className="px-6 py-2 rounded-xl bg-cyan-600 text-[10px] font-black uppercase tracking-widest text-white">Active</button>
                                        </div>
                                    </div>
                                    <div className="surface-glass p-8 rounded-[2rem] border-white/5 opacity-50">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                                                <Users size={24} />
                                            </div>
                                            <h4 className="text-lg font-black text-white uppercase tracking-tight">Squad Linkup</h4>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">Join a 4+ person co-working room for at least 60 minutes.</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reward: 1000 XP</span>
                                            <button className="px-6 py-2 rounded-xl bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">Locked</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-12">
                                    <h2 className="text-5xl font-black tracking-tight text-white mb-4 uppercase">Vanguard <span className="text-cyan-400">Leaderboard</span></h2>
                                    <p className="text-slate-400 text-sm font-medium">Real-time neural activity from across the flow collective.</p>
                                </div>

                                <div className="flex justify-center gap-4 mb-10">
                                    {['global', 'squad', 'monthly'].map((tab) => (
                                        <button
                                            key={tab}
                                            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)} Rank
                                        </button>
                                    ))}
                                </div>

                                <div className="bg-black/50 border border-white/5 rounded-[2.5rem] p-8 shadow-inner">
                                    <div className="grid grid-cols-12 px-6 mb-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                        <div className="col-span-1">#</div>
                                        <div className="col-span-6">Pioneer</div>
                                        <div className="col-span-3">Neural XP</div>
                                        <div className="col-span-2 text-right">Streak</div>
                                    </div>

                                    <div className="space-y-4">
                                        {leaderboardData.map((node, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                whileHover={{ scale: 1.02, y: -2 }}
                                                className={`grid grid-cols-12 items-center px-6 py-6 rounded-3xl border border-white/[0.03] transition-all hover:bg-white/[0.02] hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer ${i === 0 ? 'bg-cyan-500/5' : ''}`}
                                            >
                                                <div className="col-span-1 text-xl font-black text-cyan-500/50">{node.rank}</div>
                                                <div className="col-span-6 flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="w-12 h-12 rounded-2xl bg-slate-900 overflow-hidden border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                                                            <img src={node.avatar} alt="avatar" className="w-full h-full object-cover" />
                                                        </div>
                                                        {i === 0 && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center">
                                                            <Zap className="w-2 h-2 text-white fill-current" />
                                                        </div>}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white uppercase tracking-tight">{node.name}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded uppercase tracking-tighter">{node.tier}</span>
                                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-span-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">LVL {node.level}</span>
                                                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-[100px]">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${node.xp}%` }}
                                                                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                                                            />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-500">{node.xp}%</span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <span className="text-xl font-black text-white">{node.streak}</span>
                                                        <Flame className={`w-4 h-4 ${i < 2 ? 'text-orange-500 fill-orange-500' : 'text-slate-600'}`} />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <button className="w-full mt-10 py-6 text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] hover:text-white transition-colors border-t border-white/5">
                                        Load Full Rankings (Top 100)
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Right Panel: Squad Sync & Global Pulse */}
                {(subTab === 'hub' || subTab === 'squads') && (
                    <div className={`col-span-12 ${subTab === 'hub' ? 'lg:col-span-3' : 'lg:col-span-8'} space-y-8`}>
                        <div className="bg-[#0a0f1d] border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Users className="w-4 h-4 text-cyan-400" /> Squad Sync
                                    {currentSquad && <span className="ml-2 text-[10px] text-emerald-400 font-black animate-pulse">● {pioneerCount}</span>}
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {squadSessions.map((session) => (
                                    <motion.div
                                        key={session.id}
                                        whileHover={{ scale: 1.03, y: -4 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`relative p-6 rounded-[1.5rem] bg-white/[0.02] border transition-all ${currentSquad === session.id ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : 'border-white/[0.05] hover:bg-white/[0.04] hover:border-cyan-500/20'} group cursor-pointer shadow-xl hover:shadow-cyan-500/10`}
                                    >
                                        {currentSquad === session.id && (
                                            <div className="absolute inset-0 rounded-[1.5rem] border-2 border-cyan-400/50 animate-pulse pointer-events-none" />
                                        )}
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-xs font-bold uppercase tracking-tight">{session.title}</h4>
                                            {currentSquad === session.id && squadTimer.status === 'running' ? (
                                                <span className="text-xl font-black text-cyan-400 font-mono tracking-widest">{formatTime(squadTimer.timeLeft)}</span>
                                            ) : (
                                                session.status === 'LIVE' && <span className="text-[8px] font-black bg-rose-500/20 text-rose-500 px-2 py-0.5 rounded animate-pulse uppercase tracking-widest">Live</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-2">
                                                {session.users.map((u, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 overflow-hidden">
                                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u}`} alt="user" className="w-full h-full" />
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{currentSquad === session.id ? pioneerCount : session.slots} Pioneers</p>
                                        </div>

                                        {currentSquad === session.id ? (
                                            <div className="space-y-2 mt-6">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <button
                                                        onClick={() => handleTimerAction(squadTimer.status === 'running' ? 'pause' : 'start')}
                                                        className="py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg"
                                                    >
                                                        {squadTimer.status === 'running' ? 'Pause Sync' : 'Start Sync'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleTimerAction('reset')}
                                                        className="py-3 bg-white/5 hover:bg-white/10 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all"
                                                    >
                                                        Reset
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => setShowWhiteboard(!showWhiteboard)}
                                                    className={`w-full py-3 ${showWhiteboard ? 'bg-indigo-600' : 'bg-white/5 hover:bg-white/10'} text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5`}
                                                >
                                                    <Palette size={12} className={showWhiteboard ? 'animate-bounce' : ''} />
                                                    {showWhiteboard ? 'Close Blueprint' : 'Project Blueprint'}
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleJoinSquad(session.id)}
                                                className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-cyan-900/40"
                                            >
                                                {session.status === 'LIVE' ? 'Join Party' : 'Reserve Slot'}
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <AnimatePresence>
                            {showWhiteboard && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0, scale: 0.95, y: 20 }}
                                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden"
                                >
                                    <CollaborativeWhiteboard squadId={currentSquad} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="bg-black border border-white/5 rounded-[2rem] p-8 shadow-2xl flex flex-col h-[400px]">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Squad Chat</h3>

                            <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                                {messages.length === 0 && (
                                    <p className="text-[10px] text-slate-600 text-center italic mt-10">No messages yet. Start the conversation.</p>
                                )}
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex flex-col ${msg.system ? 'items-center' : 'items-start'}`}>
                                        {msg.system ? (
                                            <span className="text-[8px] bg-white/5 text-slate-500 px-3 py-1 rounded-full uppercase tracking-widest italic">{msg.text}</span>
                                        ) : (
                                            <>
                                                <span className="text-[9px] font-bold text-cyan-500 mb-1">{msg.user}</span>
                                                <div className="bg-white/5 rounded-2xl rounded-tl-none p-3 border border-white/5">
                                                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium">{msg.message}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {(remoteTyping || remoteDrawing) && (
                                <div className="flex items-center gap-2 mb-2 ml-1">
                                    <span className="text-[8px] font-bold text-slate-500 uppercase animate-pulse">
                                        {remoteDrawing ? `${remoteDrawing} is sketching details...` : `${remoteTyping} is transmitting...`}
                                    </span>
                                </div>
                            )}

                            <form onSubmit={handleSendMessage} className="relative">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => {
                                        setChatInput(e.target.value);
                                        if (currentSquad) {
                                            socketService.sendPioneerStatus(currentSquad, 'typing', 'Alex_Pioneer');
                                            // Simple timeout to reset typing status
                                            clearTimeout(window.typingTimeout);
                                            window.typingTimeout = setTimeout(() => {
                                                socketService.sendPioneerStatus(currentSquad, 'idle', 'Alex_Pioneer');
                                            }, 2000);
                                        }
                                    }}
                                    disabled={!currentSquad}
                                    placeholder={currentSquad ? "Transmit data..." : "Join a squad to chat"}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 py-3 text-xs outline-none focus:border-cyan-500/50 transition-all disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!currentSquad || !chatInput.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-600 rounded-xl flex items-center justify-center hover:bg-cyan-500 transition-all disabled:opacity-50"
                                >
                                    <Zap className="w-3 h-3 text-white fill-current" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Community;
