import React from 'react';
import {
    LayoutDashboard, Brain, Users, BarChart3, ListChecks, Settings,
    HelpCircle, Heart, Sparkles, Zap, Gamepad2, History, Shield, Info,
    Share2, Activity
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
                <h3 className="px-6 mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-900/40 dark:text-slate-600">
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
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${isActive
                                ? 'text-white'
                                : 'text-slate-500 hover:text-slate-200'
                                }`}
                        >
                            {/* Active Backdrop - Subtle Glass */}
                            {isActive && (
                                <div className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl shadow-lg backdrop-blur-sm" />
                            )}

                            {/* Active Glow Indicator */}
                            {isActive && (
                                <div className="absolute left-2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                            )}

                            <item.icon className={`w-4 h-4 transition-all duration-300 relative z-10 ${isActive ? 'text-cyan-400 translate-x-2' : 'group-hover:text-cyan-200'}`} />
                            <span className={`text-sm font-medium hidden lg:block transition-all duration-300 relative z-10 ${isActive ? 'translate-x-2' : ''}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 border-r border-white/5 flex flex-col justify-between py-6 transition-all duration-300 z-50 bg-[#02040a]">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-64 bg-indigo-500/10 blur-[100px] pointer-events-none" />

            <div className="overflow-y-auto custom-scrollbar relative z-10">
                {/* New Geometric Logo */}
                <div className="px-6 mb-12 flex items-center gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        <div className="absolute inset-0 border border-slate-700/50 rounded-lg transform rotate-45" />
                        <div className="absolute inset-0 border border-cyan-500/20 rounded-lg transform rotate-45 animate-pulse" />
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-md flex items-center justify-center transform group hover:rotate-180 transition-transform duration-700 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                            <Brain className="text-white w-4 h-4" />
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <h1 className="font-display font-bold text-xl tracking-tight leading-none text-white">
                            NEURO<span className="font-light text-cyan-400">FLOW</span>
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

            <div className="px-4 border-t border-white/5 pt-6 relative z-10">
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:border-white/10 transition-all duration-200">
                    <HelpCircle className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">Help & Support</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
