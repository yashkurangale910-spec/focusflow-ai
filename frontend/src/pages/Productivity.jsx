import React from 'react';
import SmartSuggestions from '../components/SmartSuggestions';
import FocusScore from '../components/FocusScore';
import EnergyOptimizer from '../components/EnergyOptimizer';
import QuickCapture from '../components/QuickCapture';
import SessionReplay from '../components/SessionReplay';

const Productivity = () => {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700">
            <div>
                <h1 className="text-4xl font-black mb-2">Productivity Tools_</h1>
                <p className="text-zinc-500">AI-powered insights and smart workflow optimization.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <QuickCapture />
                    <SmartSuggestions />
                    <SessionReplay />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <FocusScore />
                    <EnergyOptimizer />
                </div>
            </div>
        </div>
    );
};

export default Productivity;
