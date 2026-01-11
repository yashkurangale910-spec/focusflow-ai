import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login, register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = isLogin
            ? await login(formData.email, formData.password)
            : await register(formData.name, formData.email, formData.password);

        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            {/* Ambient Background System */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Decorative Grid/Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[480px] relative z-10"
            >
                {/* Header Section */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 bg-slate-900 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(99,102,241,0.15)]"
                    >
                        <ShieldCheck size={32} className="text-indigo-400" />
                    </motion.div>

                    <h1 className="text-4xl font-extrabold font-display text-white tracking-tight mb-3">
                        {isLogin ? 'Neural Gateway' : 'Initialize Identity'}
                    </h1>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">
                        {isLogin ? 'Synchronization Protocol Required' : 'Establish unique neural signature'}
                    </p>
                </div>

                <div className="surface-raised p-10 rounded-[2.5rem] border-slate-800/80 shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden group">
                    {/* Subtle Internal Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700" />

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    key="name"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="relative"
                                >
                                    <div className="flex items-center gap-2 mb-2 px-1">
                                        <User size={12} className="text-indigo-500" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Legal Identity</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        required
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-inner"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-2 px-1">
                                <Mail size={12} className="text-indigo-500" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Communication Uplink</span>
                            </div>
                            <input
                                type="email"
                                placeholder="name@domain.com"
                                required
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-inner"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-2 px-1">
                                <Lock size={12} className="text-indigo-500" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Access Key</span>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl py-4 px-5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-inner"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full h-14 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-500 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-10 shadow-lg shadow-indigo-600/20 group/btn relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                            <span className="relative z-10 uppercase tracking-widest text-[11px] font-black">
                                {isLogin ? 'Establish Link' : 'Secure Protocol'}
                            </span>
                            <ArrowRight size={16} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <div className="text-center mt-10">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="group text-slate-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.25em]"
                    >
                        {isLogin ? (
                            <>
                                Identity unknown? <span className="text-indigo-400 group-hover:underline underline-offset-4">Register signature</span>
                            </>
                        ) : (
                            <>
                                Already recognized? <span className="text-indigo-400 group-hover:underline underline-offset-4">Initialize Sync</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="mt-12 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2">
                        <Cpu size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">End-to-end Encrypted</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-800" />
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ver 2.4.0</div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
