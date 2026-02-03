import React from 'react';
import {
    LayoutDashboard, Brain, Users, BarChart3, ListChecks, Settings,
    HelpCircle, Heart, Sparkles, Zap, Gamepad2, History, Shield, Info,
    Share2, Activity, Play
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    // ... (links arrays remain the same, I will re-declare them for completeness or just use the render part if I can match lines)
    // Actually, to do a full redesign, replacing the whole component might be safer to ensure consistency.

    const mainLinks = [
        { id: 'home', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'focus', icon: Brain, label: 'Neural Focus' },
        { id: 'tasks', icon: ListChecks, label: 'Directives' },
    ];

    const analyticLinks = [
        { id: 'insights', icon: BarChart3, label: 'Performance' },
        { id: 'history', icon: History, label: 'Session Log' },
        { id: 'productivity', icon: Zap, label: 'Efficiency' },
    ];

    const toolLinks = [
        { id: 'zenith', icon: Sparkles, label: 'Zenith Path' }, // Changed Icon
        { id: 'wellness', icon: Heart, label: 'Vitality' },
        { id: 'social', icon: Share2, label: 'Collective' },
        { id: 'compete', icon: Activity, label: 'Labs' },
        { id: 'community', icon: Users, label: 'Community' },
    ];

    const systemLinks = [
        { id: 'admin', icon: Shield, label: 'Admin' },
        { id: 'about', icon: Info, label: 'About' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const Section = ({ title, items }) => (
        <div className="mb-8">
            {title && (
                <h3 className="px-6 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 flex items-center gap-2">
                    <div className="w-3 h-[1px] bg-gradient-to-r from-slate-700 to-transparent" />
                    {title}
                </h3>
            )}
            <nav className="px-3 space-y-1">
                {items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'text-white'
                                : 'text-slate-500 hover:text-slate-200'
                                }`}
                        >
                            {/* Active Backdrop - Enhanced Glassmorphism */}
                            {isActive && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-transparent rounded-xl" />
                                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-lg shadow-purple-500/10 backdrop-blur-sm" />
                                </>
                            )}

                            {/* Hover State */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all duration-300" />
                            )}

                            {/* Active Glow Indicator - Enhanced */}
                            {isActive && (
                                <>
                                    <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-purple-500 via-cyan-400 to-purple-500 rounded-r-full shadow-lg shadow-cyan-500/50" />
                                    <div className="absolute left-2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse" />
                                </>
                            )}

                            <item.icon className={`w-4 h-4 transition-all duration-300 relative z-10 ${isActive
                                ? 'text-cyan-400 translate-x-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                                : 'group-hover:text-purple-300 group-hover:translate-x-1 group-hover:scale-110'
                                }`} />
                            <span className={`text-sm font-medium hidden lg:block transition-all duration-300 relative z-10 ${isActive
                                ? 'translate-x-2 font-semibold'
                                : 'group-hover:translate-x-0.5'
                                }`}>
                                {item.label}
                            </span>

                            {/* Shimmer effect on hover */}
                            {!isActive && (
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 border-r border-white/5 flex flex-col justify-between py-6 transition-all duration-300 z-50 bg-[#02040a] overflow-hidden">
            {/* Cosmic aurora background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 w-full h-64 bg-gradient-to-r from-purple-600/10 via-cyan-600/10 to-purple-600/10 blur-3xl aurora-wave" />
                <div className="absolute bottom-1/4 left-1/2 w-full h-64 bg-gradient-to-r from-cyan-600/10 via-purple-600/10 to-cyan-600/10 blur-3xl aurora-wave" style={{ animationDelay: '4s' }} />
            </div>

            {/* Subtle starfield */}
            <div className="absolute inset-0 opacity-30">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-px h-px bg-white rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="overflow-y-auto custom-scrollbar relative z-10">
                {/* Enhanced Geometric Logo */}
                <div className="px-6 mb-12 flex items-center gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 border border-slate-700/50 rounded-lg transform rotate-45 animate-pulse" />
                        <div className="absolute inset-0 border border-cyan-500/20 rounded-lg transform rotate-45 animate-spin-slow" />
                        {/* Liquid morph decoration */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 liquid-shape blur-md" />
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-md flex items-center justify-center transform group hover:rotate-180 transition-transform duration-700 shadow-[0_0_20px_rgba(99,102,241,0.5)] relative z-10">
                            <Brain className="text-white w-4 h-4" />
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <h1 className="font-display font-bold text-xl tracking-tight leading-none text-white">
                            NEURO<span className="font-light text-cyan-400 neon-text">FLOW</span>
                        </h1>
                        <p className="text-[9px] text-slate-500 font-medium tracking-[0.2em] mt-1 pl-0.5">
                            COGNITIVE OS
                        </p>
                    </div>
                </div>

                <Section items={mainLinks} />
                <Section title="Analytics" items={analyticLinks} />
                <Section title="System" items={toolLinks} />
                <Section title="Settings" items={systemLinks} />
            </div>

            <div className="px-4 space-y-4 border-t border-white/5 pt-6 relative z-10">
                <button
                    onClick={() => setActiveTab('focus')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <Play className="w-4 h-4 relative z-10 fill-current" />
                    <span className="relative z-10 uppercase tracking-widest">Start Focus</span>
                </button>
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-all duration-200">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">Help & Support</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
