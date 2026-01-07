import React, { useState, useEffect } from 'react';
import { Users, Video, Mic, MicOff, VideoOff, LogOut, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CoWorkingRoom = () => {
    const [isInRoom, setIsInRoom] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoOff, setIsVideoOff] = useState(true);
    const [participants, setParticipants] = useState([
        { id: 1, name: 'Sarah', avatar: '👩‍💻', status: 'focusing', timer: '24:15' },
        { id: 2, name: 'Alex', avatar: '👨‍💼', status: 'break', timer: '05:00' },
        { id: 3, name: 'Jordan', avatar: '🧑‍🎨', status: 'focusing', timer: '18:42' },
    ]);

    const [messages, setMessages] = useState([
        { id: 1, user: 'Sarah', text: 'Good luck everyone! 💪', time: '10:23' },
        { id: 2, user: 'Alex', text: 'Let\'s crush it today!', time: '10:25' },
    ]);

    const joinRoom = () => {
        setIsInRoom(true);
        // In real app: WebSocket connection
    };

    const leaveRoom = () => {
        setIsInRoom(false);
    };

    if (!isInRoom) {
        return (
            <div className="glass-card border-white/10 p-8 rounded-2xl">
                <div className="text-center py-12">
                    <Users size={64} className="mx-auto text-accent mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Co-Working Rooms</h2>
                    <p className="text-zinc-500 mb-6">
                        Join a live focus session with others around the world
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold">Deep Work Session</h3>
                                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                                    3 active
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 mb-3">Silent focus, no distractions</p>
                            <button
                                onClick={joinRoom}
                                className="w-full py-2 rounded-lg bg-accent text-black font-bold hover:scale-105 transition-all"
                            >
                                Join Room
                            </button>
                        </div>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold">Study Together</h3>
                                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                                    7 active
                                </span>
                            </div>
                            <p className="text-xs text-zinc-500 mb-3">Collaborative learning</p>
                            <button
                                onClick={joinRoom}
                                className="w-full py-2 rounded-lg bg-accent text-black font-bold hover:scale-105 transition-all"
                            >
                                Join Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Video size={24} className="text-accent" />
                    <div>
                        <h3 className="font-bold">Deep Work Session</h3>
                        <p className="text-xs text-zinc-500">{participants.length + 1} participants</p>
                    </div>
                </div>
                <button
                    onClick={leaveRoom}
                    className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold transition-all flex items-center gap-2"
                >
                    <LogOut size={16} />
                    Leave
                </button>
            </div>

            {/* Participants Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {participants.map((participant) => (
                    <motion.div
                        key={participant.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex flex-col items-center justify-center p-4"
                    >
                        <div className="text-4xl mb-2">{participant.avatar}</div>
                        <p className="text-xs font-bold">{participant.name}</p>
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold ${participant.status === 'focusing'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {participant.timer}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-4 rounded-xl transition-all ${isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 hover:bg-white/20'
                        }`}
                >
                    {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-4 rounded-xl transition-all ${isVideoOff ? 'bg-red-500/20 text-red-400' : 'bg-white/10 hover:bg-white/20'
                        }`}
                >
                    {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
                </button>
            </div>

            {/* Chat */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                    <MessageCircle size={16} className="text-accent" />
                    <h4 className="text-sm font-bold">Room Chat</h4>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto mb-3">
                    {messages.map((msg) => (
                        <div key={msg.id} className="text-xs">
                            <span className="font-bold text-accent">{msg.user}:</span>
                            <span className="text-zinc-300 ml-2">{msg.text}</span>
                            <span className="text-zinc-600 ml-2">{msg.time}</span>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Send a message..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
                />
            </div>

            <div className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/30 text-xs text-center">
                💡 <strong>Tip:</strong> Real-time features require WebSocket connection (coming soon!)
            </div>
        </div>
    );
};

export default CoWorkingRoom;
