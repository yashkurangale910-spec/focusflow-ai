import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

const themes = {
    dark: {
        background: '#0a0a0f',
        accent: '#00d1ff',
        text: '#ffffff',
    },
    light: {
        background: '#f5f5f7',
        accent: '#007aff',
        text: '#1d1d1f',
    },
    cyberpunk: {
        background: '#0f0f23',
        accent: '#ff2a6d',
        text: '#d1f7ff',
    },
    forest: {
        background: '#0d1b0e',
        accent: '#52de97',
        text: '#e8f5e9',
    },
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('focusflow_theme') || 'dark';
    });

    const [customAccent, setCustomAccent] = useState(() => {
        return localStorage.getItem('focusflow_accent') || null;
    });

    useEffect(() => {
        const theme = themes[currentTheme];
        const accentColor = customAccent || theme.accent;

        document.documentElement.style.setProperty('--color-background', theme.background);
        document.documentElement.style.setProperty('--color-accent', accentColor);
        document.documentElement.style.setProperty('--color-text', theme.text);

        localStorage.setItem('focusflow_theme', currentTheme);
        if (customAccent) {
            localStorage.setItem('focusflow_accent', customAccent);
        }
    }, [currentTheme, customAccent]);

    const changeTheme = (themeName) => {
        setCurrentTheme(themeName);
    };

    const changeAccent = (color) => {
        setCustomAccent(color);
    };

    const value = {
        currentTheme,
        themes,
        changeTheme,
        changeAccent,
        customAccent,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
