import React from 'react';
import { LayoutDashboard, Brain, Users, BarChart3, ListChecks, Settings, HelpCircle, Heart, Sparkles, Zap, Gamepad2, History, Shield, Info } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'home', icon: LayoutDashboard, label: 'Home' },
        { id: 'focus', icon: Brain, label: 'Focus' },
        { id: 'tasks', icon: ListChecks, label: 'Tasks' },
        { id: 'productivity', icon: Zap, label: 'Productivity' },
        { id: 'insights', icon: BarChart3, label: 'Insights' },
        { id: 'history', icon: History, label: 'History' },
        { id: 'wellness', icon: Heart, label: 'Wellness' },
        { id: 'social', icon: Sparkles, label: 'Social' },
        { id: 'compete', icon: Gamepad2, label: 'ADHD Tools' },
        { id: 'community', icon: Users, label: 'Community' },
        { id: 'admin', icon: Shield, label: 'Admin' },
        { id: 'about', icon: Info, label: 'About' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <aside className="w-20 lg:w-64 h-screen fixed left-0 top-0 border-r border-white/5 flex flex-col justify-between py-6 transition-all duration-300 z-50" style={{ backgroundColor: 'var(--color-background)' }}>
            <div>
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,209,255,0.4)]" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <Brain className="text-black w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg hidden lg:block tracking-tight">FocusFlow AI</span>
                </div>

                <nav className="px-3 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                    ? ''
                                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                                    }`}
                                style={isActive ? { backgroundColor: 'rgba(0,209,255,0.1)', color: '#00d1ff' } : {}}
                            >
                                <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className={`font-medium hidden lg:block ${isActive ? 'text-white' : ''}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div
                                        className="absolute right-0 w-1 h-6 rounded-l-full shadow-[0_0_10px_rgba(0,209,255,0.6)] hidden lg:block"
                                        style={{ backgroundColor: '#00d1ff' }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="px-3">
                <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all duration-200">
                    <HelpCircle className="w-5 h-5" />
                    <span className="font-medium hidden lg:block">Help Center</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
