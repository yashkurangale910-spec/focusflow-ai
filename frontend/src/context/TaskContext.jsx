import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token, isAuthenticated } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            if (!isAuthenticated) return;
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/tasks`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data);
                }
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [isAuthenticated, token, API_URL]);

    const addTask = async (taskData) => {
        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(taskData)
            });
            if (response.ok) {
                const newTask = await response.json();
                setTasks(prev => [...prev, newTask]);
            }
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const updateTask = async (id, updates) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            if (response.ok) {
                const updatedTask = await response.json();
                setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
            }
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setTasks(prev => prev.filter(t => t.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const moveTask = async (taskId, newStatus) => {
        // Optimistic update
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, status: newStatus } : t
        ));

        try {
            const response = await fetch(`${API_URL}/tasks/${taskId}/move`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                // Revert if failed
                const failedTask = tasks.find(t => t.id === taskId);
                if (failedTask) {
                    setTasks(prev => prev.map(t =>
                        t.id === taskId ? failedTask : t
                    ));
                }
            }
        } catch (error) {
            console.error('Failed to move task:', error);
            // Revert on error as well
            const failedTask = tasks.find(t => t.id === taskId);
            if (failedTask) {
                setTasks(prev => prev.map(t =>
                    t.id === taskId ? failedTask : t
                ));
            }
        }
    };

    const getTasksByStatus = (status) => {
        return tasks.filter(t => t.status === status);
    };

    const value = {
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        getTasksByStatus,
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};
