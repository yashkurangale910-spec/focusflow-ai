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
    // Safe local storage parser
    const getSavedTasks = () => {
        try {
            const saved = localStorage.getItem('focusflow_tasks');
            if (!saved) return [];
            const parsed = JSON.parse(saved);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('Local storage corruption detected, resetting tasks:', e);
            return [];
        }
    };

    const [tasks, setTasks] = useState(getSavedTasks);
    const [loading, setLoading] = useState(false);
    const { token, isAuthenticated } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Sync state with localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('focusflow_tasks', JSON.stringify(tasks));
    }, [tasks]);

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
                    if (data && Array.isArray(data)) {
                        setTasks(data);
                    }
                }
            } catch (error) {
                console.warn('Backend unavailable, using local tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [isAuthenticated, token, API_URL]);

    const addTask = async (taskData) => {
        console.log('Adding task:', taskData);
        const tempId = Date.now().toString();
        const newTask = { ...taskData, id: tempId, status: 'todo', createdAt: new Date() };

        // Optimistic update
        setTasks(prev => {
            if (!Array.isArray(prev)) return [newTask];
            return [...prev, newTask];
        });

        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...taskData, status: 'todo' })
            });
            if (response.ok) {
                const savedTask = await response.json();
                console.log('Task saved to backend:', savedTask);
                // Ensure the saved task has a status for the UI, fallback to 'todo'
                const finalTask = { ...savedTask, status: savedTask.status || 'todo' };
                // Replace temp task with real one from server
                setTasks(prev => prev.map(t => t.id === tempId ? finalTask : t));
            } else {
                console.error('Backend refused task creation:', response.status);
            }
        } catch (error) {
            console.error('Failed to sync added task with server:', error);
        }
    };

    const updateTask = async (id, updates) => {
        // Optimistic update
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

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
            console.error('Failed to update task on server:', error);
        }
    };

    const deleteTask = async (id) => {
        // Optimistic delete
        setTasks(prev => prev.filter(t => t.id !== id));

        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                console.error('Failed to delete task from server');
            }
        } catch (error) {
            console.error('Failed to delete task on server:', error);
        }
    };

    const moveTask = async (taskId, newStatus) => {
        // Optimistic update
        setTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, status: newStatus } : t
        ));

        try {
            // Using the generic PUT route since there is no specific /move route
            const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                console.error('Failed to move task on server');
            }
        } catch (error) {
            console.error('Failed to move task on server:', error);
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
