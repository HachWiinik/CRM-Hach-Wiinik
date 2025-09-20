import React from 'react';
import { Calendar, User } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockBookings } from '@/data/mockData';
import { formatDate } from '@/utils/date';
import Panel from '@/components/common/Panel';
import MascotHelper from '@/components/common/MascotHelper';

const statusClasses = {
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

// Fix: Added missing Bookings component implementation.
const Bookings: React.FC = () => {
    const { t, language } = useTranslation();

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{t('bookings.title')}</h1>
            <Panel title={t('bookings.upcoming')}>
                <div className='space-y-4'>
                    {mockBookings.map(booking => (
                        <div key={booking.id} className='bg-brand-light-bg dark:bg-brand-dark rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm'>
                            <div className='mb-3 md:mb-0'>
                                <h3 className='font-semibold text-lg'>{booking.serviceName}</h3>
                                <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1'>
                                    <User size={14} className='mr-2' />
                                    <span>{booking.clientName}</span>
                                </div>
                                <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1'>
                                    <Calendar size={14} className='mr-2' />
                                    <span>{formatDate(booking.startTime, language)}</span>
                                </div>
                            </div>
                            <div className='flex items-center space-x-4'>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusClasses[booking.status as keyof typeof statusClasses]}`}>
                                    {t(`bookings.status.${booking.status}`)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
            <MascotHelper initialMessage={t('mascot.bookings')} />
        </div>
    );
};

export default Bookings;
