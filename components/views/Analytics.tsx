import React from 'react';
import { DollarSign, ListChecks, UserPlus } from 'lucide-react';
import StatCard from '@/components/common/StatCard';
import Panel from '@/components/common/Panel';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockAnalyticsData } from '@/data/mockData';
import MascotHelper from '@/components/common/MascotHelper';

// Fix: Added missing Analytics component implementation.
const Analytics: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{t('analytics.title')}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
                <StatCard 
                    icon={DollarSign} 
                    label={t('analytics.totalRevenue')} 
                    value={`$${mockAnalyticsData.totalRevenue.toLocaleString()}`} 
                    change='+5.2%' 
                />
                <StatCard 
                    icon={ListChecks} 
                    label={t('analytics.totalBookings')} 
                    value={mockAnalyticsData.totalBookings.toString()} 
                    change='+2.1%' 
                />
                <StatCard 
                    icon={UserPlus} 
                    label={t('analytics.newClients')} 
                    value={mockAnalyticsData.newClients.toString()} 
                    change='+10%' 
                />
            </div>
            <Panel title={t('analytics.topServices.title')}>
                <ul>
                    {mockAnalyticsData.topServices.map(service => (
                        <li key={service.name} className='flex justify-between items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md'>
                            <span>{service.name}</span>
                            <span className='font-semibold'>{service.bookings} {t('analytics.topServices.bookings')}</span>
                        </li>
                    ))}
                </ul>
            </Panel>
            <MascotHelper initialMessage={t('mascot.analytics')} />
        </div>
    );
};

export default Analytics;
