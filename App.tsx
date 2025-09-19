// Fix: Populating file with the main App component structure, including layout and routing.
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Bookings from './components/views/Bookings';
import Clients from './components/views/Clients';
import Catalog from './components/views/Catalog';
import Promotions from './components/views/Promotions';
import Recommendations from './components/views/Recommendations';
import Analytics from './components/views/Analytics';
import Notifications from './components/views/Notifications';
import Toast from './components/common/Toast';
import { useTranslation } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useTranslation();
  const { user } = useAuth();

  return (
    <ReactRouterDOM.BrowserRouter>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
            <ReactRouterDOM.Routes>
              <ReactRouterDOM.Route path="/" element={<ReactRouterDOM.Navigate to="/bookings" replace />} />
              <ReactRouterDOM.Route path="/bookings" element={<Bookings />} />
              <ReactRouterDOM.Route path="/clients" element={<Clients />} />
              <ReactRouterDOM.Route path="/catalog" element={<Catalog />} />
              <ReactRouterDOM.Route path="/promotions" element={<Promotions />} />
              <ReactRouterDOM.Route path="/recommendations" element={<Recommendations />} />
              
              {/* Protected Routes */}
              <ReactRouterDOM.Route path="/analytics" element={user?.role === 'super-admin' ? <Analytics /> : <ReactRouterDOM.Navigate to="/bookings" replace />} />
              <ReactRouterDOM.Route path="/notifications" element={user?.role === 'super-admin' ? <Notifications /> : <ReactRouterDOM.Navigate to="/bookings" replace />} />
            </ReactRouterDOM.Routes>
          </main>
        </div>
        {toast && <Toast message={toast.message} type={toast.type} key={toast.id} />}
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
};

export default App;
