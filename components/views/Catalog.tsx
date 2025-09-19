// Fix: Populating file with the Catalog view component.
import React from 'react';
import Panel from '../common/Panel';
import { mockServices } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';

const Catalog: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('catalog.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServices.map(service => (
          <Panel key={service.id} title={service.name}>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span>{t('catalog.duration', { minutes: service.duration })}</span>
              <span className="font-bold text-lg text-maya-caribbean-turquoise">${service.price}</span>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
