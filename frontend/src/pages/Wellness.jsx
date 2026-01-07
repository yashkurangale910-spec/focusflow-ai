import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import GoalsSystem from '../components/GoalsSystem';
import MoodTracker from '../components/MoodTracker';
import ProductivityHeatmap from '../components/ProductivityHeatmap';
import { useAnalytics } from '../context/AnalyticsContext';

const Wellness = () => {
    const { addSession } = useAnalytics();

    const handleSessionComplete = (sessionData) => {
        addSession(sessionData);
    };

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700">
            <div>
                <h1 className="text-4xl font-black mb-2">Wellness & Productivity_</h1>
                <p className="text-zinc-500">Track your mood, set goals, and optimize your focus patterns.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Pomodoro & Goals */}
                <div className="lg:col-span-2 space-y-6">
                    <PomodoroTimer onSessionComplete={handleSessionComplete} />
                    <ProductivityHeatmap />
                </div>

                {/* Right Column - Goals & Mood */}
                <div className="space-y-6">
                    <GoalsSystem />
                    <MoodTracker />
                </div>
            </div>
        </div>
    );
};

export default Wellness;
