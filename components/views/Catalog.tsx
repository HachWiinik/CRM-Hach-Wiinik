import React from 'react';
import { mockServices } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';

const Catalog: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>{t('catalog.title')}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
        {mockServices.map(service => (
          <div key={service.id} className="bg-brand-light-card dark:bg-brand-dark-card rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img src={service.imageUrl} alt={service.name} className="w-full h-56 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className='text-gray-600 dark:text-gray-300 mb-4 min-h-[6rem]'>{service.description}</p>
                <div className='flex justify-between items-center text-sm pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <span>{t('catalog.duration', { minutes: service.duration })}</span>
                    <span className='font-bold text-lg text-brand-pink'>{`$${service.price.toLocaleString()} MXN`}</span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;