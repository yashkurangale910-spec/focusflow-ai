import React, { useState, useEffect } from 'react';
import { Users, Video, Mic, MicOff, VideoOff, LogOut, MessageCircle, Zap, Shield, Activity, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CoWorkingRoom = () => {
    const [isInRoom, setIsInRoom] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [participants, setParticipants] = useState([
        { id: 1, name: 'Sarah.vortex', avatar: '👩‍💻', status: 'focusing', timer: '24:15' },
        { id: 2, name: 'Alex.node', avatar: '👨‍💼', status: 'break', timer: '05:00' },
        { id: 3, name: 'Jordan_sync', avatar: '🧑‍🎨', status: 'focusing', timer: '18:42' },
    ]);

    const [messages, setMessages] = useState([
        { id: 1, user: 'Sarah.vortex', text: 'Neural alignment confirmed. 💪', time: '10:23' },
        { id: 2, user: 'Alex.node', text: 'Maintaining throughput. Let\'s go.', time: '10:25' },
    ]);

    const joinRoom = () => {
        setIsInRoom(true);
    };

    const leaveRoom = () => {
        setIsInRoom(false);
    };

    if (!isInRoom) {
        return (
            <div className="surface-raised p-10 rounded-[2.5rem] border-slate-800/80 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-40 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-indigo-500/10 transition-colors" />

                <div className="text-center py-12 relative z-10">
                    <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <Users size={32} className="text-indigo-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold font-display text-white mb-3 tracking-tight">Neural Sync Hub</h2>
                    <p className="text-sm font-medium text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                        Synchronize with high-performance nodes in real-time. Shared presence increases cognitive throughput.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        {[
                            { title: 'Zenith Protocol', activeTitle: '5 active nodes', desc: 'Silent execution zone. No uplink required.', color: 'indigo' },
                            { title: 'Collective Sync', activeTitle: '12 active nodes', desc: 'Active collaboration. Collaborative neural link.', color: 'emerald' },
                        ].map((room, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-slate-950/40 border border-slate-900 group/room hover:border-indigo-500/30 transition-all shadow-inner">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-black text-white uppercase tracking-tight">{room.title}</h3>
                                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-${room.color}-500/10 border border-${room.color}-500/20`}>
                                        <div className={`w-1 h-1 rounded-full bg-${room.color}-500 animate-pulse`} />
                                        <span className={`text-[10px] font-black text-${room.color}-400 uppercase tracking-widest`}>{room.activeTitle}</span>
                                    </div>
                                </div>
                                <p className="text-[11px] font-medium text-slate-500 mb-6 leading-relaxed">{room.desc}</p>
                                <button
                                    onClick={joinRoom}
                                    className="w-full h-11 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
                                >
                                    Establish Link
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="surface-raised p-8 rounded-[2.5rem] border-slate-800/80 group relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 p-40 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <Activity size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Zenith Protocol Active</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{participants.length + 1} Sychronized Nodes</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={leaveRoom}
                    className="px-4 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-black text-[10px] uppercase tracking-widest hover:bg-rose-500/20 transition-all flex items-center gap-2"
                >
                    <LogOut size={16} />
                    Disconnect
                </button>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
                {participants.map((participant) => (
                    <motion.div
                        key={participant.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-3xl bg-slate-950/60 border border-slate-900 flex flex-col items-center justify-center p-6 group/node overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity" />
                        <div className="text-4xl mb-3 relative z-10 group-hover:scale-110 transition-transform">{participant.avatar}</div>
                        <p className="text-[11px] font-black text-white uppercase tracking-tight relative z-10">{participant.name}</p>

                        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${participant.status === 'focusing'
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                            }`}>
                            {participant.timer}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Controls Terminal */}
            <div className="flex items-center justify-center gap-4 mb-8 relative z-10">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all shadow-xl ${isMuted
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                >
                    {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all shadow-xl ${isVideoOff
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                >
                    {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                </button>
            </div>

            {/* Matrix Chat */}
            <div className="mt-auto p-6 rounded-3xl bg-slate-950/50 border border-slate-900 relative z-10 shadow-inner">
                <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                        <MessageCircle size={14} className="text-indigo-400" />
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Protocol Uplink</h4>
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Temporal Log: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
                </div>

                <div className="space-y-3 max-h-40 overflow-y-auto mb-6 custom-scrollbar pr-2">
                    {messages.map((msg) => (
                        <div key={msg.id} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tight">{msg.user}</span>
                                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">{msg.time}</span>
                            </div>
                            <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[90%]">{msg.text}</p>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 p-1 rounded-2xl bg-slate-950 border border-slate-800 focus-within:border-indigo-500/30 transition-all">
                    <input
                        type="text"
                        placeholder="Transmit message..."
                        className="flex-1 bg-transparent px-4 py-3 text-[11px] font-medium text-white placeholder-slate-700 focus:outline-none"
                    />
                    <button className="h-10 w-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition-all">
                        <Send size={16} />
                    </button>
                </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-3">
                <Shield size={16} className="text-indigo-400" />
                <p className="text-[9px] font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                    <strong className="text-indigo-400">Security Note:</strong> All shared telemetry is encrypted. Node presence is confirmed via 256-bit handshake.
                </p>
            </div>
        </div>
    );
};

export default CoWorkingRoom;
