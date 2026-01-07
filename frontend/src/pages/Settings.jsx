import React from 'react';
import SpotifyPlayer from '../components/SpotifyPlayer';
import CalendarIntegration from '../components/CalendarIntegration';
import BackgroundCustomizer from '../components/BackgroundCustomizer';
import WidgetSystem from '../components/WidgetSystem';
import PWASettings from '../components/PWASettings';

const Settings = () => {
    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-700">
            <div>
                <h1 className="text-4xl font-black mb-2">Settings & Integrations_</h1>
                <p className="text-zinc-500">Customize your experience and connect your favorite tools.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <SpotifyPlayer />
                    <CalendarIntegration />
                    <PWASettings />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <BackgroundCustomizer />
                    <WidgetSystem />
                </div>
            </div>
        </div>
    );
};

export default Settings;
