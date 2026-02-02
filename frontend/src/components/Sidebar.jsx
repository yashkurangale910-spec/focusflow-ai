import React from 'react';
import {
    Brain, Shield, Sparkles, Calendar,
    Music, RefreshCw, Play, HelpCircle,
    LogOut, Activity, LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const mainLinks = [
        { id: 'home', icon: LayoutDashboard, label: 'Neural Nexus' },
        { id: 'coach', icon: Sparkles, label: 'Neural Coach' },
        { id: 'scheduler', icon: Calendar, label: 'Scheduler' },
        { id: 'soundscapes', icon: Music, label: 'Soundscapes' },
        { id: 'sync', icon: RefreshCw, label: 'Sync Hub' },
    ];

    const bottomLinks = [
        { id: 'help', icon: HelpCircle, label: 'Help Center' },
        { id: 'logout', icon: LogOut, label: 'Terminate Session' },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-[#030712] border-r border-white/5 flex flex-col justify-between py-8 px-4 z-50">
            <div>
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-4 mb-12">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white leading-none">FocusFlow AI</h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Neural OS v1.0</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {mainLinks.map((link) => {
                        const isActive = activeTab === link.id;
                        return (
                            <button
                                key={link.id}
                                onClick={() => setActiveTab(link.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-blue-600 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <link.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : 'group-hover:text-white transition-colors'}`} />
                                <span className="text-sm font-bold relative z-10 tracking-wide">{link.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="space-y-6">
                {/* CTA Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-900/40 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-white" />
                    Start Focus Session
                </button>

                {/* Bottom Navigation */}
                <nav className="space-y-2">
                    {bottomLinks.map((link) => (
                        <button
                            key={link.id}
                            className="w-full flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-white transition-colors group"
                        >
                            <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold tracking-wide">{link.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
