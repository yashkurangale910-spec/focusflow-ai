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
        { id: 'insights', icon: BarChart3, label: 'Performance Monitor' },
        { id: 'history', icon: History, label: 'Temporal Log' },
        { id: 'productivity', icon: Zap, label: 'Efficiency Stream' },
    ];

    const toolLinks = [
        { id: 'zenith', icon: Sparkles, label: 'Zenith Path' },
        { id: 'wellness', icon: Heart, label: 'Vitality Matrix' },
        { id: 'social', icon: Share2, label: 'Neural Web' },
        { id: 'compete', icon: Activity, label: 'Labs' },
        { id: 'community', icon: Users, label: 'Community' },
    ];

    const systemLinks = [
        { id: 'admin', icon: Shield, label: 'Admin Terminal' },
        { id: 'settings', icon: Settings, label: 'OS Config' },
    ];

    const Section = ({ title, items }) => (
        <div className="mb-10">
            {title && (
                <div className="flex items-center gap-4 px-6 mb-4 opacity-40">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400 whitespace-nowrap italic">{title}</span>
                    <div className="w-full h-[1px] bg-gradient-to-r from-cyan-400/30 to-transparent" />
                </div>
            )}
            <nav className="px-4 space-y-1.5">
                {items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${isActive
                                ? 'text-white'
                                : 'text-slate-500 hover:text-slate-200'
                                }`}
                        >
                            {/* Neural Interface Backdrop */}
                            {isActive && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                    <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl" />
                                </>
                            )}

                            {!isActive && (
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] rounded-2xl transition-all duration-300" />
                            )}

                            {/* Active Data Stream Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                                />
                            )}

                            <item.icon className={`w-4 h-4 transition-all duration-500 relative z-10 ${isActive
                                ? 'text-cyan-400 scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                                : 'group-hover:text-cyan-300 group-hover:scale-110'
                                }`} />

                            <span className={`text-[10px] font-black hidden lg:block uppercase tracking-[0.2em] transition-all duration-500 relative z-10 italic ${isActive
                                ? 'translate-x-1 opacity-100'
                                : 'opacity-60 group-hover:opacity-100'
                                }`}>
                                {item.label}
                            </span>

                            {/* Telemetry Dots */}
                            {isActive && (
                                <div className="ml-auto hidden lg:flex gap-1 relative z-10">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                                    <div className="w-1 h-1 bg-cyan-400/40 rounded-full" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <aside className="w-20 lg:w-72 h-screen fixed left-0 top-0 border-r border-white/5 flex flex-col justify-between py-8 transition-all duration-500 z-50 bg-black">
            <div className="overflow-y-auto custom-scrollbar no-scrollbar">
                {/* Rebranded OS Logo */}
                <div className="px-8 mb-16 flex items-center gap-5 group cursor-pointer" onClick={() => setActiveTab('home')}>
                    <div className="relative w-12 h-12 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-cyan-500/10 rounded-2xl rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                        <div className="absolute inset-0 border border-indigo-500/20 rounded-2xl -rotate-45 group-hover:-rotate-90 transition-transform duration-700" />
                        <div className="absolute inset-1 bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 rounded-xl blur-sm" />
                        <div className="w-10 h-10 bg-black border border-white/10 rounded-xl flex items-center justify-center relative z-10 group-hover:border-cyan-500/50 transition-colors duration-500">
                            <Brain className="text-cyan-400 w-5 h-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <h1 className="font-black text-xl tracking-tighter text-white uppercase italic">
                            FocusFlow <span className="text-cyan-400 not-italic">OS</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.3em] italic">Link: v1.02.4 Stable</p>
                        </div>
                    </div>
                </div>

                {/* Command Palette Tooltip - Strategic Command Link */}
                <div className="px-6 mb-8 hidden lg:block">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between group/cmd cursor-help hover:border-cyan-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Directive Terminal</span>
                        </div>
                        <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded text-[10px] font-black text-cyan-400 italic">
                            <span className="opacity-50">⌘</span>K
                        </div>
                    </div>
                </div>

                <Section items={mainLinks} />
                <Section title="Intelligence" items={analyticLinks} />
                <Section title="Collective" items={toolLinks} />
                <Section title="Core System" items={systemLinks} />
            </div>

            <div className="px-6 space-y-4 border-t border-white/5 pt-8">
                <button
                    onClick={() => setActiveTab('focus')}
                    className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white font-black text-xs shadow-2xl shadow-cyan-900/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden relative italic uppercase tracking-widest"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <Zap className="w-4 h-4 relative z-10 fill-current" />
                    <span className="relative z-10">Uplink Focus</span>
                </button>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.01] text-slate-600 hover:text-slate-400 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden lg:block italic">Secure Transmission Link</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
