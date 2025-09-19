// Fix: Populating file with the Analytics view component.
import React from 'react';
import Panel from '../common/Panel';
import { mockAnalyticsData } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';
import { DollarSign, Users, Calendar } from 'lucide-react';

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number, color: string }> = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center">
    <div className={`p-3 rounded-full mr-4 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);


const Analytics: React.FC = () => {
  const { t } = useTranslation();
  const data = mockAnalyticsData;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('analytics.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard icon={DollarSign} title={t('analytics.revenue')} value={`$${data.totalRevenue.toLocaleString()}`} color="bg-green-500" />
        <StatCard icon={Calendar} title={t('analytics.bookings')} value={data.totalBookings} color="bg-blue-500" />
        <StatCard icon={Users} title={t('analytics.newClients')} value={data.newClients} color="bg-purple-500" />
      </div>

      <Panel title={t('analytics.topServices')}>
        <ul className="space-y-4">
          {data.topServices.map((service, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{index + 1}. {service.name}</span>
              <span className="font-semibold">{service.bookings} {t('analytics.bookings')}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
};

export default Analytics;
