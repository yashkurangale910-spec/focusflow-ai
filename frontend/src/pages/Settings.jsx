import React, { useState } from 'react';
import {
    Settings as SettingsIcon, Shield, Activity, Zap, Cpu, Bell,
    User, Link2, Brain, Lock, Sliders, Upload, Check, ChevronRight,
    Slack, Calendar, Monitor, Moon, Sun, Keyboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('general');
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sound: false
    });
    const [focusMode, setFocusMode] = useState(true);
    const [theme, setTheme] = useState('dark');

    const navItems = [
        { id: 'general', icon: User, label: 'General' },
        { id: 'integrations', icon: Link2, label: 'Integrations' },
        { id: 'focus', icon: Brain, label: 'Focus' },
        { id: 'privacy', icon: Lock, label: 'Privacy' },
        { id: 'advanced', icon: Sliders, label: 'Advanced' },
    ];

    const Toggle = ({ active, onToggle }) => (
        <button
            onClick={onToggle}
            className={`toggle-switch ${active ? 'bg-cyan-500' : 'bg-slate-700'}`}
        >
            <span className={`toggle-dot ${active ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    );

    return (
        <div className="min-h-[80vh] flex bg-[#02040a] rounded-[2rem] overflow-hidden border border-slate-800/50 shadow-2xl">
            {/* Local Nav Sidebar */}
            <aside className="w-64 bg-[#0a0c10] border-r border-slate-800/50 p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        <Activity className="text-cyan-400 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Productivity</h2>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`nav-item-settings w-full ${activeSection === item.id ? 'active' : ''}`}
                        >
                            <item.icon size={18} />
                            <span className="font-semibold text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-12 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeSection === 'general' && (
                        <motion.div
                            key="general"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Content Header */}
                            <div className="mb-10">
                                <h1 className="text-3xl font-bold text-white mb-2">Settings / General</h1>
                                <p className="text-cyan-400/80 text-sm font-medium">Customize your experience</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left Column Cards */}
                                <div className="space-y-8">
                                    {/* Profile Details */}
                                    <section className="settings-card">
                                        <h3 className="text-lg font-bold text-white mb-6">Profile Details</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="settings-label">Full Name</label>
                                                <input type="text" className="settings-input" defaultValue="Alex Chen" />
                                            </div>
                                            <div>
                                                <label className="settings-label">Email Address</label>
                                                <input type="email" className="settings-input" defaultValue="alex.chen@example.com" />
                                            </div>
                                            <div>
                                                <label className="settings-label">Profile Photo</label>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                                        <User className="text-slate-500" size={32} />
                                                    </div>
                                                    <button className="px-6 py-2 rounded-lg bg-slate-800 text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors">
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Notifications */}
                                    <section className="settings-card">
                                        <h3 className="text-lg font-bold text-white mb-6">Notifications</h3>
                                        <div className="space-y-6">
                                            {[
                                                { id: 'email', label: 'Email Alerts', desc: 'Save arranged to your email alerts.' },
                                                { id: 'push', label: 'Push Notifications', desc: 'Push notifications are your messages.' },
                                                { id: 'sound', label: 'Sound Effects', desc: 'Sound effects to the sound effects.' },
                                            ].map((item) => (
                                                <div key={item.id} className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{item.label}</p>
                                                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`text-[10px] font-black uppercase tracking-tighter ${notifications[item.id] ? 'text-cyan-400' : 'text-slate-600'}`}>
                                                            {notifications[item.id] ? 'ON' : 'OFF'}
                                                        </span>
                                                        <Toggle
                                                            active={notifications[item.id]}
                                                            onToggle={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Right Column Cards */}
                                <div className="space-y-8">
                                    {/* Integrations */}
                                    <section className="settings-card">
                                        <h3 className="text-lg font-bold text-white mb-6">Integrations</h3>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                                                    <Slack className="text-[#4A154B]" size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white">Slack</p>
                                                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-tight">Connected</p>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                                                    <Calendar className="text-[#4285F4]" size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-white">Google Calendar</p>
                                                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-tight">Connected</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-[0.2em] w-full justify-center">
                                            <span>+ Add Integration</span>
                                        </button>
                                    </section>

                                    {/* Focus Mode */}
                                    <section className="settings-card">
                                        <div className="flex flex-col gap-6">
                                            <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-400/20 flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white mb-1">Enable Focus Mode</h3>
                                                    <p className="text-xs text-slate-500 max-w-[200px]">Enable focus mode ensures enable focus mode.</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-[10px] font-black uppercase tracking-tighter ${focusMode ? 'text-cyan-400' : 'text-slate-600'}`}>
                                                        {focusMode ? 'ON' : 'OFF'}
                                                    </span>
                                                    <Toggle active={focusMode} onToggle={() => setFocusMode(!focusMode)} />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Keyboard size={14} className="text-slate-500" />
                                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Keyboard Shortcuts</h4>
                                                </div>
                                                <table className="w-full text-xs">
                                                    <thead className="text-slate-500 font-medium">
                                                        <tr>
                                                            <th className="text-left py-2 border-b border-slate-800">Action</th>
                                                            <th className="text-right py-2 border-b border-slate-800">Shortcut</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-white font-bold">
                                                        <tr>
                                                            <td className="py-3 border-b border-white/5 font-medium text-slate-400">Start/Stop Focus</td>
                                                            <td className="py-3 border-b border-white/5 text-right font-display text-[10px] uppercase tracking-widest">Cmd+Shift+F</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-3 border-b border-white/5 font-medium text-slate-400">Toggle Sidebar</td>
                                                            <td className="py-3 border-b border-white/5 text-right font-display text-[10px] uppercase tracking-widest">Cmd+\</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Theme */}
                                    <section className="settings-card">
                                        <h3 className="text-lg font-bold text-white mb-6">Theme</h3>
                                        <div className="flex items-end justify-between gap-6">
                                            <div className="flex bg-slate-900 rounded-xl p-1 shrink-0">
                                                <button
                                                    onClick={() => setTheme('dark')}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-slate-800 text-cyan-400 shadow-lg border border-slate-700' : 'text-slate-500'}`}
                                                >
                                                    <Moon size={14} />
                                                    Dark
                                                </button>
                                                <button
                                                    onClick={() => setTheme('light')}
                                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-slate-800 text-cyan-400 shadow-lg border border-slate-700' : 'text-slate-500'}`}
                                                >
                                                    <Sun size={14} />
                                                    Light
                                                </button>
                                            </div>

                                            <div className="flex-1 max-w-[180px]">
                                                <div className="aspect-video rounded-lg bg-black/50 border border-cyan-500/30 relative overflow-hidden group">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
                                                    <div className="absolute top-2 left-2 w-1/2 h-1 bg-cyan-500/40 rounded-full" />
                                                    <div className="absolute top-4 left-2 w-1/3 h-1 bg-slate-700 rounded-full" />
                                                    <div className="absolute bottom-2 right-2 w-4 h-4 rounded bg-cyan-500/20" />
                                                    <div className="absolute inset-0 border-2 border-cyan-500/0 group-hover:border-cyan-500/20 transition-all pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Settings;

