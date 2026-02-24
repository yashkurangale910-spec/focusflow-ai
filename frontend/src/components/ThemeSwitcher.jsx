import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeSwitcher = () => {
    const { currentTheme, themes, changeTheme, changeAccent, customAccent } = useTheme();

    const themePresets = [
        { id: 'dark', name: 'Dark', gradient: 'linear-gradient(135deg, #000000, #050505)' },
        { id: 'light', name: 'Light', gradient: 'linear-gradient(135deg, #f5f5f7, #ffffff)' },
        { id: 'cyberpunk', name: 'Cyberpunk', gradient: 'linear-gradient(135deg, #0a0a0a, #ff2a6d)' },
        { id: 'forest', name: 'Forest', gradient: 'linear-gradient(135deg, #000000, #52de97)' },
    ];

    const accentColors = [
        '#00d1ff', '#ff2a6d', '#52de97', '#f59e0b', '#8b5cf6', '#ef4444', '#10b981', '#3b82f6'
    ];

    return (
        <div className="glass-card border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Palette size={24} className="text-accent" />
                <h3 className="text-xl font-bold">Customize Theme</h3>
            </div>

            {/* Theme Presets */}
            <div className="space-y-4 mb-8">
                <p className="text-sm text-zinc-500 font-bold uppercase">Theme Presets</p>
                <div className="grid grid-cols-2 gap-3">
                    {themePresets.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => changeTheme(theme.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all ${currentTheme === theme.id
                                ? 'border-accent'
                                : 'border-white/10 hover:border-white/30'
                                }`}
                            style={{ background: theme.gradient }}
                        >
                            <span className="font-bold text-white relative z-10">{theme.name}</span>
                            {currentTheme === theme.id && (
                                <div className="absolute top-2 right-2">
                                    <Check size={20} className="text-accent" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-4">
                <p className="text-sm text-zinc-500 font-bold uppercase">Accent Color</p>
                <div className="grid grid-cols-8 gap-2">
                    {accentColors.map((color) => (
                        <motion.button
                            key={color}
                            onClick={() => changeAccent(color)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-10 h-10 rounded-full border-2 ${(customAccent === color) || (!customAccent && themes[currentTheme].accent === color)
                                ? 'border-white'
                                : 'border-white/20'
                                }`}
                            style={{ backgroundColor: color }}
                        >
                            {((customAccent === color) || (!customAccent && themes[currentTheme].accent === color)) && (
                                <Check size={16} color="#fff" className="mx-auto" />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ThemeSwitcher;
