// Fix: Populating file with the Recommendations view component.
import React from 'react';
import Panel from '../common/Panel';
import { mockRecommendations } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';
import { Lightbulb } from 'lucide-react';

const Recommendations: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('recommendations.title')}</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">{t('recommendations.subtitle')}</p>

      <div className="space-y-6">
        {mockRecommendations.map(rec => (
          <Panel key={rec.id} title={rec.title}>
            <div className="flex items-start">
              <Lightbulb className="h-6 w-6 mr-4 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <p className="mb-2">{rec.description}</p>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-maya-soft-terracotta bg-red-200">
                  {rec.category}
                </span>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
