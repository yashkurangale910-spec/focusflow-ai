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
        <header className="h-20 border-b border-white/5 backdrop-blur-3xl sticky top-0 z-40 px-6 sm:px-12 flex items-center justify-between bg-black/80 shadow-2xl">
            {/* Neural Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />

            {/* Subtle Telemetry Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

            <div className="flex-1 max-w-xl relative z-10">
                <div className="relative group">
                    {/* High-Precision Focus Border */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-2xl opacity-0 group-focus-within:opacity-30 blur-sm transition-opacity duration-500" />

                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-600 transition-all duration-300 group-focus-within:text-cyan-400 group-focus-within:scale-110" />
                    </div>
                    <input
                        type="text"
                        className="relative block w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3.5 pl-12 pr-14 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:bg-black/40 focus:border-cyan-500/30 transition-all duration-500 font-black uppercase tracking-widest"
                        placeholder="Scan focus grid..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-600 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 shadow-inner">
                            <Command size={10} className="text-cyan-500/50" />
                            <span className="opacity-60">K</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-8 ml-12 relative z-10">
                <div className="hidden xl:flex items-center gap-6">
                    <StreakDisplay variant="compact" />
                    <div className="h-6 w-[1px] bg-white/5" />
                    <div className="flex flex-col items-end">
                        <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-1">System Health</p>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`h-1 w-3 rounded-full ${i < 5 ? 'bg-cyan-500/50' : 'bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        className="relative text-slate-500 hover:text-white transition-all duration-500 p-3 hover:bg-white/5 rounded-2xl group border border-transparent hover:border-white/10"
                        aria-label="View notifications"
                    >
                        <Bell size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                        <span className="absolute top-3 right-3 w-2 h-2 rounded-full border-2 border-black bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                    </button>

                    <div className="flex items-center gap-4 cursor-pointer group pl-2 hover:bg-white/5 pr-4 py-2 rounded-2xl transition-all duration-500 border border-transparent hover:border-white/5">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-widest italic">{user?.name || 'Pioneer_01'}</p>
                            <div className="flex items-center justify-end gap-2 mt-0.5">
                                <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Rank V</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_rgba(34,211,238,0.5)] animate-pulse" />
                            </div>
                        </div>
                        <div className="relative">
                            {/* Orbital Ring Effects */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/20 via-indigo-600/20 to-cyan-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-700 animate-spin-slow" />
                            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-[1px] shadow-2xl transition-all duration-500 group-hover:scale-105">
                                <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden border border-white/5">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <span className="text-white font-black text-sm italic">{user?.name?.charAt(0) || 'P'}</span>
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
