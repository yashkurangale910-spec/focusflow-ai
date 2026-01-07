import React from 'react';
import HabitStreaks from '../components/HabitStreaks';
import TimeBlindnessHelper from '../components/TimeBlindnessHelper';
import BodyDoubling from '../components/BodyDoubling';
import AIFocusCoach from '../components/AIFocusCoach';

const Compete = () => {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700">
            <div>
                <h1 className="text-4xl font-black mb-2">ADHD-Friendly Tools_</h1>
                <p className="text-zinc-500">Specialized features designed for neurodivergent productivity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <TimeBlindnessHelper />
                    <BodyDoubling />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <AIFocusCoach />
                    <HabitStreaks />
                </div>
            </div>
        </div>
    );
};

export default Compete;
