// Fix: Populating file with the Bookings view component.
import React from 'react';
import Panel from '../common/Panel';
import { mockBookings } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';

const Bookings: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('bookings.title')}</h1>
      <Panel title={t('bookings.upcoming')}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('bookings.table.client')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('bookings.table.service')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('bookings.table.time')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('bookings.table.status')}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockBookings.map(booking => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.serviceName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.startTime.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
};

export default Bookings;
