import React from 'react';
import { useState, useEffect } from 'react';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Analytics from '@/components/views/Analytics';
import Bookings from '@/components/views/Bookings';
import Catalog from '@/components/views/Catalog';
import Clients from '@/components/views/Clients';
import Tasks from '@/components/views/Tasks';
import Notifications from '@/components/views/Notifications';
import Promotions from '@/components/views/Promotions';
import Recommendations from '@/components/views/Recommendations';
import Chat from '@/components/views/Chat';
import Toast from '@/components/common/Toast';
import { useTranslation } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { roleConfig } from '@/config/permissions';

const App: React.FC = () => {
    const { user } = useAuth();
    const [currentView, setCurrentView] = useState(roleConfig[user!.role].defaultView);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { toast } = useTranslation();

    useEffect(() => {
        if (user) {
            const roleSettings = roleConfig[user.role];
            if (!roleSettings.permissions.includes(currentView)) {
                setCurrentView(roleSettings.defaultView);
            }
        }
    }, [user, currentView]);
    

    const renderView = () => {
        if (!user || !roleConfig[user.role].permissions.includes(currentView)) {
             return <div className='p-6'>Access Denied</div>;
        }
        switch (currentView) {
            case 'analytics':
                return <Analytics />;
            case 'bookings':
                return <Bookings />;
            case 'catalog':
                return <Catalog />;
            case 'clients':
                return <Clients />;
            case 'tasks':
                return <Tasks />;
            case 'notifications':
                return <Notifications />;
            case 'promotions':
                return <Promotions />;
            case 'recommendations':
                return <Recommendations />;
            case 'chat':
                return <Chat />;
            default:
                return <Analytics />;
        }
    };
    
    const handleNavigate = (view: string) => {
        setCurrentView(view);
        if (window.innerWidth < 1024) { // lg breakpoint in tailwind
            setSidebarOpen(false);
        }
    };

    return (
        <div className='flex h-screen bg-brand-light-bg dark:bg-brand-dark text-brand-light dark:text-brand-dark'>
            <Sidebar 
                currentView={currentView}
                onNavigate={handleNavigate}
                isOpen={isSidebarOpen}
            />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <main className='flex-1 overflow-x-hidden overflow-y-auto p-6 animate-fade-in'>
                    {renderView()}
                </main>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} />}
        </div>
    );
};

export default App;