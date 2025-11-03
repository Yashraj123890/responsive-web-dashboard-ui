import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import HospitalPortal from './components/HospitalPortal';
import AgentDashboard from './components/AgentDashboard';
import DashboardOverview from './components/DashboardOverview';
import ContactSupport from './components/ContactSupport';
import { useAuth } from './context/AuthContext';
import { signOut } from './services/authService';

export type UserRole = 'user' | 'hospital' | 'agent' | null;
export type CurrentView = 'landing' | 'dashboard' | 'contact' | 'overview';

export default function App() {
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentView, setCurrentView] = useState<CurrentView>('landing');

  useEffect(() => {
    if (!currentUser) {
      setUserRole(null);
      setCurrentView('landing');
    }
  }, [currentUser]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = async () => {
    await signOut();
    setUserRole(null);
    setCurrentView('landing');
  };

  const handleNavigate = (view: CurrentView) => {
    setCurrentView(view);
  };

  if (!currentUser) {
    return <LandingPage onLogin={handleLogin} />;
  }

  if (currentView === 'contact') {
    return <ContactSupport onBack={() => handleNavigate('dashboard')} />;
  }

  if (currentView === 'overview' && userRole === 'agent') {
    return <DashboardOverview onBack={() => handleNavigate('dashboard')} onLogout={handleLogout} />;
  }

  return (
    <div>
      {userRole === 'user' && (
        <UserDashboard 
          onLogout={handleLogout} 
          onNavigate={handleNavigate}
        />
      )}
      {userRole === 'hospital' && (
        <HospitalPortal 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
      {userRole === 'agent' && (
        <AgentDashboard 
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
