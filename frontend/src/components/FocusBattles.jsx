import React, { useState, useEffect } from 'react';
import { Swords, Users, Trophy, Clock, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const FocusBattles = () => {
    const [activeBattle, setActiveBattle] = useState(null);
    const [availableBattles] = useState([
        {
            id: 1,
            name: '1v1 Focus Duel',
            duration: 25,
            players: 2,
            prize: '50 XP',
            difficulty: 'Easy',
            participants: 1,
        },
        {
            id: 2,
            name: 'Team Sprint',
            duration: 50,
            players: 4,
            prize: '200 XP',
            difficulty: 'Medium',
            participants: 3,
        },
        {
            id: 3,
            name: 'Marathon Challenge',
            duration: 120,
            players: 10,
            prize: '500 XP + Badge',
            difficulty: 'Hard',
            participants: 7,
        },
    ]);

    const [battleHistory] = useState([
        { opponent: 'Sarah Chen', result: 'won', score: '25:23', xp: '+50' },
        { opponent: 'Alex Kumar', result: 'lost', score: '22:25', xp: '+25' },
        { opponent: 'Jordan Lee', result: 'won', score: '25:20', xp: '+50' },
    ]);

    const joinBattle = (battle) => {
        setActiveBattle({
            ...battle,
            timeLeft: battle.duration * 60,
            myScore: 0,
            opponentScore: 0,
        });
    };

    return (
        <div className="glass-card border-white/10 p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Swords size={28} className="text-red-500" />
                <div>
                    <h2 className="text-2xl font-bold">Focus Battles</h2>
                    <p className="text-sm text-zinc-500">Compete in real-time focus challenges</p>
                </div>
            </div>

            {!activeBattle ? (
                <>
                    {/* Available Battles */}
                    <div className="space-y-3 mb-6">
                        <h3 className="text-sm font-bold text-zinc-400">Join a Battle</h3>
                        {availableBattles.map((battle) => (
                            <motion.div
                                key={battle.id}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 cursor-pointer"
                                onClick={() => joinBattle(battle)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold">{battle.name}</h4>
                                    <span className={`text-xs px-2 py-1 rounded ${battle.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                                            battle.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                        }`}>
                                        {battle.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-zinc-400">
                                    <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {battle.duration}min
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users size={14} />
                                        {battle.participants}/{battle.players}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Trophy size={14} />
                                        {battle.prize}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Battle History */}
                    <div className="p-4 rounded-xl bg-white/5">
                        <h3 className="text-sm font-bold mb-3">Recent Battles</h3>
                        <div className="space-y-2">
                            {battleHistory.map((battle, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${battle.result === 'won' ? 'bg-green-500' : 'bg-red-500'
                                            }`} />
                                        <span className="text-sm">vs {battle.opponent}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className="text-zinc-500">{battle.score}</span>
                                        <span className="text-green-400">{battle.xp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                /* Active Battle View */
                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">{activeBattle.name}</h3>
                        <div className="text-4xl font-black text-red-500">
                            {Math.floor(activeBattle.timeLeft / 60)}:{(activeBattle.timeLeft % 60).toString().padStart(2, '0')}
                        </div>
                    </div>

                    {/* Score Display */}
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="text-center p-4 rounded-xl bg-blue-500/20 border border-blue-500/30">
                            <p className="text-sm text-zinc-400 mb-1">You</p>
                            <p className="text-3xl font-black text-blue-400">{activeBattle.myScore}</p>
                        </div>
                        <div className="text-center">
                            <Swords size={32} className="mx-auto text-red-500" />
                        </div>
                        <div className="text-center p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                            <p className="text-sm text-zinc-400 mb-1">Opponent</p>
                            <p className="text-3xl font-black text-red-400">{activeBattle.opponentScore}</p>
                        </div>
                    </div>

                    {/* Battle Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveBattle(null)}
                            className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold transition-all"
                        >
                            Forfeit
                        </button>
                        <button className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-all">
                            Complete Task (+1)
                        </button>
                    </div>

                    <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-xs text-center">
                        💡 Complete tasks to score points. Most points wins!
                    </div>
                </div>
            )}
        </div>
    );
};

export default FocusBattles;
