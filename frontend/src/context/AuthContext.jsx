import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ id: 'mock-123', name: 'Elite Operative', email: 'operative@focusflow.ai' });
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('mock-token');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Disable checkUser for local direct access
    useEffect(() => {
        // checkUser logic bypassed
    }, [token]);

    const login = async (email, password) => {
        return { success: true };
    };

    const register = async (name, email, password) => {
        return { success: true };
    };

    const logout = () => {
        // Logout disabled for bypass mode
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: true
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
