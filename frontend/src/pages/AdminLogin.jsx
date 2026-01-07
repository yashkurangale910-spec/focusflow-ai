import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, ChevronRight, AlertCircle, Terminal, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Access Denied: Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white flex items-center justify-center font-outfit overflow-hidden relative">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        backgroundPosition: ['0px 0px', '40px 40px'],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
                />

                {/* Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-3xl" />

                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />
            </div>

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-500/30 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    }}
                    animate={{
                        y: [null, Math.random() * window.innerHeight],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10 px-6"
            >
                {/* Outer Glow Container */}
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-3xl blur-2xl opacity-20 animate-pulse" />

                    <div className="relative bg-zinc-950/90 backdrop-blur-2xl border border-red-500/20 p-8 rounded-3xl shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                        {/* Animated Top Border */}
                        <motion.div
                            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
                            animate={{
                                width: ['0%', '100%', '0%'],
                                left: ['0%', '0%', '100%'],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Header */}
                        <div className="mb-8 text-center relative">
                            <motion.div
                                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 via-red-600/10 to-transparent border border-red-500/30 mb-6 relative overflow-hidden group"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Shield size={40} className="text-red-500 relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                <motion.div
                                    className="absolute inset-0 border-2 border-red-500/50 rounded-2xl"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                />
                            </motion.div>

                            <motion.h1
                                className="text-4xl font-black tracking-tight mb-3 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                ADMIN ACCESS
                            </motion.h1>

                            <div className="flex items-center justify-center gap-2 text-xs text-red-400 font-mono">
                                <Terminal size={12} />
                                <span className="tracking-[0.2em] uppercase">Authorized Personnel Only</span>
                                <Zap size={12} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm backdrop-blur-sm"
                                    >
                                        <AlertCircle size={18} className="flex-shrink-0" />
                                        <span className="font-medium">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm" />
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                        <Shield size={18} className="text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="relative w-full bg-zinc-900/70 border border-zinc-800 group-focus-within:border-red-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-600 outline-none transition-all font-mono text-sm"
                                        placeholder="admin@focusflow.ai"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-400 uppercase tracking-[0.15em] ml-1 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-red-500 rounded-full" />
                                    Security Key
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm" />
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                                        <Lock size={18} className="text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="relative w-full bg-zinc-900/70 border border-zinc-800 group-focus-within:border-red-500/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-600 outline-none transition-all font-mono text-sm"
                                        placeholder="••••••••••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className="w-full group mt-6 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold py-4 rounded-xl hover:from-red-500 hover:to-red-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="tracking-wider">AUTHENTICATE</span>
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center space-y-2">
                            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span>ENCRYPTED CONNECTION ACTIVE</span>
                            </div>
                            <p className="text-[10px] text-zinc-700 font-mono">
                                SESSION ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
