import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
// Scene3D import removed - using static design
import NexusDashboard from './pages/NexusDashboard';
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
import About from './pages/About';
import Auth from './pages/Auth';
import ZenithPath from './pages/ZenithPath';
import LandingPage from './pages/LandingPage';
import AIChatbot from './components/AIChatbot';
import DataManager from './components/DataManager';
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
  const [focusTask, setFocusTask] = useState(null);
  const [isLandingView, setIsLandingView] = useState(true);

  const handleStartFocus = (task) => {
    setFocusTask(task);
    setActiveTab('focus');
  };

  const handleEnterApp = () => {
    setIsLandingView(false);
  };

  if (isLandingView) {
    return <LandingPage onGetStarted={handleEnterApp} onLogin={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen text-white transition-colors duration-300 relative selection:bg-cyan-500/30 selection:text-cyan-200" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="noise-overlay" />
      {/* Scene3D removed for static design */}

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="lg:ml-64 min-h-screen transition-all duration-300 relative z-10">
        <Navbar />

        <div className="p-6 sm:p-10 max-w-7xl mx-auto animate-soft-entry">
          {activeTab === 'home' && (
            <div className="space-y-8">
              <NexusDashboard />
              <SessionTemplates />
              <Gamification />
            </div>
          )}
          {activeTab === 'insights' && (
            <div className="space-y-8">
              <Insights />
              <DataManager />
            </div>
          )}
          {activeTab === 'tasks' && <Tasks onStartFocus={handleStartFocus} />}
          {activeTab === 'productivity' && <Productivity />}
          {activeTab === 'focus' && <Focus activeTask={focusTask} />}
          {activeTab === 'community' && <Community />}
          {activeTab === 'wellness' && <Wellness />}
          {activeTab === 'social' && <Social />}
          {activeTab === 'compete' && <Compete />}
          {activeTab === 'zenith' && <ZenithPath />}
          {activeTab === 'history' && <SessionHistory />}
          {activeTab === 'admin' && <AdminDashboard />}
          {activeTab === 'about' && <About />}
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
