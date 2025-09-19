// Fix: Populating file with the Promotions view component, including Gemini API integration.
import React, { useState } from 'react';
import Panel from '../common/Panel';
import Button from '../common/Button';
import { mockPromotions } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';
import { generatePromotionIdeas } from '../../services/geminiService';
import MascotHelper from '../common/MascotHelper';

const Promotions: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [newIdeas, setNewIdeas] = useState<{title: string, description: string}[]>([]);

  const handleGenerateIdeas = async () => {
    setIsLoading(true);
    setNewIdeas([]);
    const ideas = await generatePromotionIdeas('upcoming');
    setNewIdeas(ideas);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('promotions.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel title={t('promotions.active')}>
          {mockPromotions.map(promo => (
            <div key={promo.id} className="mb-4 p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-bold">{promo.title} - <span className="text-green-500">{promo.discount}</span></h3>
              <p className="text-sm">{promo.description}</p>
              <p className="text-xs text-gray-500">{t('promotions.validUntil', { date: promo.validUntil })}</p>
            </div>
          ))}
        </Panel>

        <Panel title={t('promotions.generateNew')}>
            <p className="mb-4">{t('promotions.generateDescription')}</p>
          <Button onClick={handleGenerateIdeas} isLoading={isLoading}>
            {t('promotions.generateButton')}
          </Button>

          {newIdeas.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">{t('promotions.newIdeas')}</h3>
              <ul className="list-disc pl-5 space-y-2">
                {newIdeas.map((idea, index) => (
                    <li key={index}>
                        <strong>{idea.title}:</strong> {idea.description}
                    </li>
                ))}
              </ul>
            </div>
          )}
        </Panel>
      </div>
      <MascotHelper initialMessage={t('mascot.promotions')} />
    </div>
  );
};

export default Promotions;
