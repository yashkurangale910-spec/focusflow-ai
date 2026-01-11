import React, { useState } from 'react';
import { Smartphone, Bell, Download, Wifi, WifiOff, Shield, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const PWASettings = () => {
    const [pushEnabled, setPushEnabled] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [isInstalled, setIsInstalled] = useState(false);

    const requestNotifications = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            setPushEnabled(permission === 'granted');
        }
    };

    const installPWA = () => {
        setIsInstalled(true);
    };

    return (
        <div className="surface-raised p-8 rounded-[2rem] border-slate-800/80 group">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Smartphone size={20} className="text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Platform Architecture</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cross-device synchronization enabled</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Deployment Status */}
                {!isInstalled && (
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/10 border border-indigo-500/30 relative overflow-hidden group/install">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover/install:scale-110 transition-transform">
                                <Download size={22} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Native Expansion</h4>
                                <p className="text-[11px] font-medium text-slate-400 mb-4 leading-relaxed">
                                    Initialize local deployment for optimized offline persistence and lower latency.
                                </p>
                                <button
                                    onClick={installPWA}
                                    className="px-5 py-2.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl shadow-white/5"
                                >
                                    Deploy Locally
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Control Hub */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80 hover:border-indigo-500/20 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                <Bell size={16} className="text-yellow-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">Push Uplink</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Interrupt notification</p>
                            </div>
                        </div>
                        <button
                            onClick={requestNotifications}
                            className={`w-10 h-6 rounded-full transition-all relative ${pushEnabled ? 'bg-indigo-600' : 'bg-slate-800'}`}
                        >
                            <motion.div
                                animate={{ x: pushEnabled ? 18 : 3 }}
                                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/50 border border-slate-800/80 hover:border-indigo-500/20 transition-all">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isOnline ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                                {isOnline ? (
                                    <Wifi size={16} className="text-emerald-500" />
                                ) : (
                                    <WifiOff size={16} className="text-rose-500" />
                                )}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">Logic Persistence</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                                    {isOnline ? 'Network synchronized' : 'Local cached data'}
                                </p>
                            </div>
                        </div>
                        <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${isOnline ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                            {isOnline ? 'Live' : 'Cached'}
                        </div>
                    </div>
                </div>

                {/* Capability Matrix */}
                <div className="p-6 rounded-3xl bg-slate-950/30 border border-slate-800/50">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Core Capabilities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { icon: <Globe size={12} />, text: 'Global Accessibility' },
                            { icon: <Zap size={12} />, text: 'Zero-Latency Loading' },
                            { icon: <Shield size={12} />, text: 'Encrypted Local Storage' },
                            { icon: <Bell size={12} />, text: 'Background Persistence' },
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900/30 p-2.5 rounded-xl border border-slate-800/30">
                                <span className="text-indigo-400">{feature.icon}</span>
                                {feature.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWASettings;
