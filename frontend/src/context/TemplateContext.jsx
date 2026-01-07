import React, { createContext, useContext, useState, useEffect } from 'react';

const TemplateContext = createContext();

export const useTemplates = () => {
    const context = useContext(TemplateContext);
    if (!context) {
        throw new Error('useTemplates must be used within a TemplateProvider');
    }
    return context;
};

const defaultTemplates = [
    {
        id: 'deep-work',
        name: 'Deep Work',
        description: 'Intense focused work on complex tasks',
        duration: 90,
        mode: 'deep-focus',
        breakDuration: 15,
        soundscape: 'rain',
        icon: '🧠',
    },
    {
        id: 'pomodoro-study',
        name: 'Pomodoro Study',
        description: '25-min focus with 5-min breaks',
        duration: 25,
        mode: 'pomodoro',
        breakDuration: 5,
        soundscape: 'cafe',
        icon: '📚',
    },
    {
        id: 'creative-flow',
        name: 'Creative Flow',
        description: 'Long sessions for creative work',
        duration: 60,
        mode: 'custom',
        breakDuration: 10,
        soundscape: 'forest',
        icon: '🎨',
    },
    {
        id: 'quick-sprint',
        name: 'Quick Sprint',
        description: 'Short bursts of productivity',
        duration: 15,
        mode: 'custom',
        breakDuration: 3,
        soundscape: 'white-noise',
        icon: '⚡',
    },
];

export const TemplateProvider = ({ children }) => {
    const [templates, setTemplates] = useState(() => {
        const saved = localStorage.getItem('focusflow_templates');
        return saved ? JSON.parse(saved) : defaultTemplates;
    });

    useEffect(() => {
        localStorage.setItem('focusflow_templates', JSON.stringify(templates));
    }, [templates]);

    const addTemplate = (template) => {
        const newTemplate = {
            ...template,
            id: Date.now().toString(),
        };
        setTemplates(prev => [...prev, newTemplate]);
    };

    const deleteTemplate = (id) => {
        setTemplates(prev => prev.filter(t => t.id !== id));
    };

    const value = {
        templates,
        addTemplate,
        deleteTemplate,
    };

    return <TemplateContext.Provider value={value}>{children}</TemplateContext.Provider>;
};
