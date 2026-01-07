import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import Home from './pages/Home';
import Insights from './pages/Insights';
import Tasks from './pages/Tasks';
import Focus from './pages/Focus';
import Community from './pages/Community';
import Wellness from './pages/Wellness';
import Social from './pages/Social';
import Productivity from './pages/Productivity';
import Compete from './pages/Compete';
import Settings from './pages/Settings';
import SessionHistory from './pages/SessionHistory';
import AdminDashboard from './pages/AdminDashboard';
import Auth from './pages/Auth';
import AIChatbot from './components/AIChatbot';
import ThemeSwitcher from './components/ThemeSwitcher';
import SoundscapePlayer from './components/SoundscapePlayer';
import DataManager from './components/DataManager';
import WellnessBreak from './components/WellnessBreak';
import Gamification from './components/Gamification';
import SessionTemplates from './components/SessionTemplates';
import { TaskProvider } from './context/TaskContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { ThemeProvider } from './context/ThemeContext';
import { TemplateProvider } from './context/TemplateContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/mobile.css';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen text-white bg-zinc-950 font-outfit relative">
        <Scene3D />
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen p-6">
          <Auth />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white transition-colors duration-300" style={{ backgroundColor: 'var(--color-background)' }}>
      <Scene3D />

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="lg:ml-64 min-h-screen transition-all duration-300 relative z-10">
        <Navbar />

        <div className="p-6 sm:p-10 max-w-7xl mx-auto">
          {activeTab === 'home' && (
            <div className="space-y-8">
              <Home />
              <SessionTemplates />
              <Gamification />
            </div>
          )}
          {activeTab === 'insights' && (
            <div className="space-y-8">
              <Insights />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ThemeSwitcher />
                <DataManager />
              </div>
            </div>
          )}
          {activeTab === 'tasks' && <Tasks />}
          {activeTab === 'productivity' && <Productivity />}
          {activeTab === 'focus' && (
            <div className="space-y-8">
              <Focus />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SoundscapePlayer />
                <WellnessBreak />
              </div>
            </div>
          )}
          {activeTab === 'community' && <Community />}
          {activeTab === 'wellness' && <Wellness />}
          {activeTab === 'social' && <Social />}
          {activeTab === 'compete' && <Compete />}
          {activeTab === 'history' && <SessionHistory />}
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </main>

      <AIChatbot />

      {/* Accessibility Features */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Current page: {activeTab}
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <AnalyticsProvider>
            <TemplateProvider>
              <AppContent />
            </TemplateProvider>
          </AnalyticsProvider>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
