import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockNotifications } from '@/data/mockData';
import { Bell, AlertTriangle } from 'lucide-react';
import Panel from '@/components/common/Panel';
import MascotHelper from '@/components/common/MascotHelper';

const iconMap = {
    info: <Bell className='text-blue-500' />,
    warning: <AlertTriangle className='text-yellow-500' />,
};

// Fix: Added missing Notifications component implementation.
const Notifications: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{t('notifications.title')}</h1>
            <Panel title={t('notifications.recent')}>
                <ul className='space-y-3'>
                    {mockNotifications.map(notification => (
                        <li key={notification.id} className='flex items-start p-4 bg-brand-light-bg dark:bg-brand-dark rounded-lg'>
                            <div className='mr-4 flex-shrink-0'>
                                {iconMap[notification.type as keyof typeof iconMap]}
                            </div>
                            <div>
                                <p>{notification.message}</p>
                                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{notification.timestamp}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Panel>
            <MascotHelper initialMessage={t('mascot.notifications')} />
        </div>
    );
};

export default Notifications;
