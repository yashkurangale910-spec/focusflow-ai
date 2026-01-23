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
        <header className="h-20 border-b border-white/5 backdrop-blur-2xl sticky top-0 z-40 px-6 sm:px-10 flex items-center justify-between bg-gradient-to-b from-[#020617]/90 to-[#020617]/70 shadow-lg shadow-black/20">
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

            <div className="flex-1 max-w-xl relative z-10">
                <div className="relative group">
                    {/* Animated glow ring on focus */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-300" />

                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-500 transition-all duration-300 group-focus-within:text-cyan-400 group-focus-within:scale-110" />
                    </div>
                    <input
                        type="text"
                        className="relative block w-full bg-slate-900/60 border border-white/5 rounded-xl py-3 pl-11 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-900/80 focus:border-purple-500/30 transition-all duration-300 font-medium shadow-inner"
                        placeholder="Search workspace..."
                        aria-label="Search focused workspace"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-600 bg-slate-800/60 px-2.5 py-1.5 rounded-lg border border-slate-700/50 shadow-sm">
                            <Command size={10} />
                            <span>K</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 ml-10 relative z-10">
                <div className="hidden lg:flex items-center gap-4">
                    <StreakDisplay variant="compact" />
                    <div className="h-4 w-[1px] bg-gradient-to-b from-transparent via-slate-700 to-transparent" />
                </div>

                <div className="flex items-center gap-5">
                    <button
                        className="relative text-slate-400 hover:text-white transition-all duration-300 p-2.5 hover:bg-slate-800/50 rounded-xl group"
                        aria-label="View notifications"
                    >
                        <Bell size={20} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 border-[#020617] bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/50 animate-pulse" aria-hidden="true" />
                        {/* Notification pulse ring */}
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-purple-500 animate-ping opacity-75" aria-hidden="true" />
                    </button>

                    <div className="flex items-center gap-4 cursor-pointer group pl-2 hover:bg-white/5 pr-3 py-2 rounded-xl transition-all duration-300">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">{user?.name || 'User'}</p>
                            <div className="flex items-center justify-end gap-1.5 mt-0.5">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Level {currentLevel}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-sm shadow-purple-500/50 animate-pulse" />
                            </div>
                        </div>
                        <div className="relative">
                            {/* Rotating glow ring */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-60 blur transition-opacity duration-500 animate-spin-slow" />
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-600 p-[1px] shadow-lg shadow-purple-500/20 group-hover:scale-110 group-hover:shadow-purple-500/40 transition-all duration-300">
                                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-400 font-bold text-sm">{user?.name?.charAt(0) || 'U'}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
