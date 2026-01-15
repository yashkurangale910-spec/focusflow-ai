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
        <header className="h-20 border-b border-slate-800/50 backdrop-blur-xl sticky top-0 z-40 px-6 sm:px-10 flex items-center justify-between bg-[#020617]/50">
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-500 transition-colors group-focus-within:text-indigo-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-11 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all font-medium"
                        placeholder="Search workspace..."
                        aria-label="Search focused workspace"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-600 bg-slate-800/50 px-2 py-1 rounded-md border border-slate-700">
                            <Command size={10} />
                            <span>K</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 ml-10">
                <div className="hidden lg:flex items-center gap-4">
                    <StreakDisplay variant="compact" />
                    <div className="h-4 w-[1px] bg-slate-800" />
                </div>

                <div className="flex items-center gap-5">
                    <button
                        className="relative text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                        aria-label="View notifications"
                    >
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 border-[#020617] bg-indigo-500" aria-hidden="true" />
                    </button>

                    <div className="flex items-center gap-4 cursor-pointer group pl-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{user?.name || 'User'}</p>
                            <div className="flex items-center justify-end gap-1.5 mt-0.5">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Level {currentLevel}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" />
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 p-[1px] shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform">
                            <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-indigo-400 font-bold text-xs">{user?.name?.charAt(0) || 'U'}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
