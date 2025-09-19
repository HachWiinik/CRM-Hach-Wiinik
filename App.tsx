
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Lightbulb, BarChart, Bell } from 'lucide-react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Bookings from './components/views/Bookings';
import Clients from './components/views/Clients';
import Recommendations from './components/views/Recommendations';
import Analytics from './components/views/Analytics';
import Notifications from './components/views/Notifications';
import MascotHelper from './components/common/MascotHelper';

export const navItems = [
  { id: 'bookings', path: '/bookings', icon: <Calendar size={24} />, text: 'Bookings' },
  { id: 'clients', path: '/clients', icon: <Users size={24} />, text: 'Clients' },
  { id: 'recommendations', path: '/recommendations', icon: <Lightbulb size={24} />, text: 'Recommendations' },
  { id: 'analytics', path: '/analytics', icon: <BarChart size={24} />, text: 'Analytics' },
  { id: 'notifications', path: '/notifications', icon: <Bell size={24} />, text: 'Notifications' },
];

const AppContent = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const handleTabChange = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex flex-col bg-maya-light-smoke text-maya-forest-green font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isExpanded={isSidebarExpanded} 
          onToggle={() => setSidebarExpanded(prev => !prev)}
          navItems={navItems}
          activePath={currentPath}
          onTabChange={handleTabChange}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/bookings" replace />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
      </div>
      <MascotHelper />
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
