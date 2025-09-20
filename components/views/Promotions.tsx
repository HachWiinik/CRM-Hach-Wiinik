import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockPromotions } from '@/data/mockData';
import { generatePromotionIdeas } from '@/services/geminiService';
import Panel from '@/components/common/Panel';
import Button from '@/components/common/Button';
import MascotHelper from '@/components/common/MascotHelper';
import { Tag, Calendar } from 'lucide-react';
import { formatDate } from '@/utils/date';

type Promotion = {
    title: string;
    description: string;
}

// Fix: Added missing Promotions component implementation.
const Promotions: React.FC = () => {
    const { t, language } = useTranslation();
    const [newPromotions, setNewPromotions] = useState<Promotion[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePromotions = async () => {
        setIsLoading(true);
        const ideas = await generatePromotionIdeas('summer');
        setNewPromotions(ideas);
        setIsLoading(false);
    };

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{t('promotions.title')}</h1>
            
            <Panel title={t('promotions.generate.title')} className='mb-6'>
                <p className='mb-4'>{t('promotions.generate.description')}</p>
                <Button onClick={handleGeneratePromotions} isLoading={isLoading}>
                    {t('promotions.generate.button')}
                </Button>

                {newPromotions.length > 0 && (
                    <div className='mt-6 space-y-3'>
                        <h3 className='text-lg font-semibold'>{t('promotions.generate.resultsTitle')}</h3>
                        {newPromotions.map((promo, index) => (
                            <div key={index} className='p-3 bg-brand-light-bg dark:bg-brand-dark rounded-md'>
                                <p className='font-bold'>{promo.title}</p>
                                <p className='text-sm'>{promo.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Panel>

            <Panel title={t('promotions.current')}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {mockPromotions.map(promo => (
                        <div key={promo.id} className='p-4 bg-brand-light-bg dark:bg-brand-dark rounded-lg shadow-sm'>
                            <div className='flex items-center mb-2'>
                                <Tag className='mr-2 text-brand-pink' />
                                <h3 className='font-semibold text-lg'>{promo.title}</h3>
                            </div>
                            <p className='text-gray-600 dark:text-gray-300 mb-3'>{promo.description}</p>
                            <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                                <Calendar className='mr-2' />
                                <span>{t('promotions.validUntil')} {formatDate(promo.validUntil, language)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
            <MascotHelper initialMessage={t('mascot.promotions')} />
        </div>
    );
};

export default Promotions;
