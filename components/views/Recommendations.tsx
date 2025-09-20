import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockRecommendations } from '@/data/mockData';
import Panel from '@/components/common/Panel';
import MascotHelper from '@/components/common/MascotHelper';
import { Lightbulb, User, BarChart } from 'lucide-react';

const iconMap = {
    Client: <User className='text-blue-500' />,
    Marketing: <BarChart className='text-green-500' />,
};

// Fix: Added missing Recommendations component implementation.
const Recommendations: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{t('recommendations.title')}</h1>
            <Panel title={t('recommendations.actionableInsights')}>
                <div className='space-y-4'>
                    {mockRecommendations.map(rec => (
                        <div key={rec.id} className='p-4 bg-brand-light-bg dark:bg-brand-dark rounded-lg flex items-start'>
                             <div className='mr-4 flex-shrink-0 bg-gray-200 dark:bg-gray-700 p-2 rounded-full'>
                                {iconMap[rec.category as keyof typeof iconMap] || <Lightbulb />}
                            </div>
                            <div>
                                <h3 className='font-semibold'>{rec.title}</h3>
                                <p className='text-gray-600 dark:text-gray-300'>{rec.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
             <MascotHelper initialMessage={t('mascot.recommendations')} />
        </div>
    );
};

export default Recommendations;
