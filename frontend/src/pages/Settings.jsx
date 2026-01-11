import React from 'react';
import { Settings as SettingsIcon, Shield, Activity, Zap, Cpu, Bell } from 'lucide-react';
import SpotifyPlayer from '../components/SpotifyPlayer';
import CalendarIntegration from '../components/CalendarIntegration';
import BackgroundCustomizer from '../components/BackgroundCustomizer';
import WidgetSystem from '../components/WidgetSystem';
import PWASettings from '../components/PWASettings';
import { motion } from 'framer-motion';

const Settings = () => {
    return (
        <div className="space-y-10 animate-soft-entry">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <SettingsIcon size={14} className="text-indigo-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Platform Configuration</span>
                    </div>
                    <h1 className="text-4xl font-extrabold font-display text-white tracking-tight">System Environment</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="surface-flat px-4 py-2.5 rounded-xl border-slate-800/50 flex items-center gap-3">
                        <div className="relative">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Neural Status</p>
                            <p className="text-xs font-bold text-white uppercase tracking-tight">Synchronized</p>
                        </div>
                    </div>
                    <div className="surface-flat p-2.5 rounded-xl border-slate-800/50 text-slate-400 hover:text-white transition-colors cursor-pointer">
                        <Bell size={18} />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Column - Core Integrations */}
                <div className="xl:col-span-7 space-y-8">
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Zap size={16} className="text-indigo-400" />
                            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Neural Uplinks</h2>
                        </div>
                        <div className="space-y-6">
                            <SpotifyPlayer />
                            <CalendarIntegration />
                            <PWASettings />
                        </div>
                    </section>
                </div>

                {/* Right Column - System Aesthetic */}
                <div className="xl:col-span-5 space-y-8">
                    <section>
                        <div className="flex items-center gap-2 mb-6">
                            <Cpu size={16} className="text-indigo-400" />
                            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Environment Tuning</h2>
                        </div>
                        <div className="space-y-6">
                            <BackgroundCustomizer />
                            <WidgetSystem />
                        </div>
                    </section>

                    {/* Security Badge */}
                    <div className="surface-raised p-6 rounded-3xl border-slate-800/80 bg-gradient-to-br from-slate-900 to-indigo-950/20">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <Shield size={24} className="text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Security Core</h3>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End-to-end encryption active</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
