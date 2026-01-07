import React from 'react';
import AIDailyPlanner from '../components/AIDailyPlanner';
import Leaderboard from '../components/Leaderboard';
import CoWorkingRoom from '../components/CoWorkingRoom';

const Social = () => {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700">
            <div>
                <h1 className="text-4xl font-black mb-2">Social & AI Features_</h1>
                <p className="text-zinc-500">Connect with others and let AI optimize your productivity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <AIDailyPlanner />
                    <CoWorkingRoom />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
};

export default Social;
