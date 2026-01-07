import React, { useState } from 'react';
import { Smartphone, Bell, Download, Wifi, WifiOff } from 'lucide-react';
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
        // In real app: prompt install event
        setIsInstalled(true);
    };

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Smartphone size={24} className="text-accent" />
                <h3 className="text-xl font-bold">Mobile & PWA</h3>
            </div>

            <div className="space-y-4">
                {/* Install App */}
                {!isInstalled && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                        <div className="flex items-start gap-3">
                            <Download size={24} className="text-blue-400 mt-1" />
                            <div className="flex-1">
                                <h4 className="font-bold mb-1">Install FocusFlow</h4>
                                <p className="text-sm text-zinc-400 mb-3">
                                    Add to home screen for quick access and offline support
                                </p>
                                <button
                                    onClick={installPWA}
                                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all"
                                >
                                    Install App
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Push Notifications */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                        <Bell size={20} className="text-yellow-500" />
                        <div>
                            <p className="font-bold text-sm">Push Notifications</p>
                            <p className="text-xs text-zinc-500">Get reminders even when app is closed</p>
                        </div>
                    </div>
                    <button
                        onClick={requestNotifications}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${pushEnabled
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-white/10 hover:bg-white/20'
                            }`}
                    >
                        {pushEnabled ? 'Enabled' : 'Enable'}
                    </button>
                </div>

                {/* Offline Mode */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div className="flex items-center gap-3">
                        {isOnline ? (
                            <Wifi size={20} className="text-green-500" />
                        ) : (
                            <WifiOff size={20} className="text-red-500" />
                        )}
                        <div>
                            <p className="font-bold text-sm">Offline Mode</p>
                            <p className="text-xs text-zinc-500">
                                {isOnline ? 'Connected - data syncing' : 'Offline - changes saved locally'}
                            </p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </div>
                </div>

                {/* Features */}
                <div className="p-4 rounded-xl bg-white/5">
                    <h4 className="font-bold text-sm mb-3">PWA Features</h4>
                    <div className="space-y-2">
                        {[
                            { icon: '📱', text: 'Home screen icon' },
                            { icon: '⚡', text: 'Lightning-fast loading' },
                            { icon: '💾', text: 'Offline data access' },
                            { icon: '🔔', text: 'Background notifications' },
                            { icon: '📊', text: 'Local data storage' },
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                                <span>{feature.icon}</span>
                                <span className="text-zinc-400">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PWASettings;
