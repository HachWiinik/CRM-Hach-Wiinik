import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockServices } from '@/data/mockData';
import Panel from '@/components/common/Panel';
import MascotHelper from '@/components/common/MascotHelper';
import { DollarSign, Clock } from 'lucide-react';

// Fix: Added missing Catalog component implementation.
const Catalog: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{t('catalog.title')}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {mockServices.map(service => (
                    <Panel key={service.id} title={service.name} className='flex flex-col'>
                        <img src={service.imageUrl} alt={service.name} className='rounded-lg h-40 w-full object-cover mb-4' />
                        <p className='text-gray-600 dark:text-gray-300 flex-grow mb-4'>{service.description}</p>
                        <div className='flex justify-between items-center text-sm mt-auto border-t pt-4 dark:border-gray-700'>
                            <div className='flex items-center'>
                                <DollarSign size={16} className='mr-2' />
                                <span>${service.price} MXN</span>
                            </div>
                            <div className='flex items-center'>
                                <Clock size={16} className='mr-2' />
                                <span>{service.duration / 60} {t('catalog.hours')}</span>
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
            <MascotHelper initialMessage={t('mascot.catalog')} />
        </div>
    );
};

export default Catalog;
