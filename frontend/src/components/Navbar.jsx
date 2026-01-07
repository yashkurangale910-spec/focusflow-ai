import React from 'react';
import { Bell, Search, Command } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAnalytics } from '../context/AnalyticsContext';
import StreakDisplay from './StreakDisplay';

const Navbar = () => {
    const { user } = useAuth();
    const { getTotalStats } = useAnalytics();
    const stats = getTotalStats();
    const currentLevel = Math.floor(stats.totalHours / 10) + 1;

    return (
        <header className="h-20 border-b border-white/5 backdrop-blur-xl sticky top-0 z-40 px-6 sm:px-10 flex items-center justify-between" style={{ backgroundColor: 'rgba(10,10,11,0.5)' }}>
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-zinc-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-12 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 transition-all"
                        placeholder="Search cognitive deconstruction..."
                        style={{ focusRingColor: '#00d1ff' }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-600 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                            <Command size={10} />
                            <span>K</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 ml-6">
                <StreakDisplay variant="compact" />

                <button className="relative text-zinc-400 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full shadow-[0_0_5px_rgba(0,209,255,0.8)]" style={{ backgroundColor: 'var(--color-accent)' }} />
                </button>

                <div className="h-8 w-[1px] bg-white/10" />

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-zinc-200 group-hover:text-accent transition-colors">{user?.name || 'User'}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Neural Rank: {currentLevel}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white/10 p-[2px] group-hover:border-accent/40 transition-all">
                        <div className="w-full h-full rounded-full" style={{ background: 'linear-gradient(to bottom right, #00d1ff, #9333ea)' }} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
