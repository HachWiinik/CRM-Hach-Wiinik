import React from 'react';
import Panel from '../common/Panel';
import { mockNotifications } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';
import { Info, AlertTriangle } from 'lucide-react';

const Notifications: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>{t('notifications.title')}</h1>
      <Panel title={t('notifications.recent')}>
        <ul className='space-y-4'>
          {mockNotifications.map(notif => (
            <li
                key={notif.id}
                className='p-4 rounded-lg flex items-start'
                style={{ backgroundColor: notif.type === 'info' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}
            >
              {notif.type === 'info' ? <Info className='h-5 w-5 mr-3 text-blue-500' /> : <AlertTriangle className='h-5 w-5 mr-3 text-red-500' />}
              <div>
                <p>{notif.message}</p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{notif.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
};

export default Notifications;