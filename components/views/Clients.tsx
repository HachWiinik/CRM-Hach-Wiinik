// Fix: Populating file with the Clients view component, including Gemini API integration.
import React, { useState } from 'react';
import Panel from '../common/Panel';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { mockClients, mockServices } from '../../data/mockData';
import { useTranslation } from '../../contexts/LanguageContext';
import { generateClientRecommendations } from '../../services/geminiService';
import { Client } from '../../types';

const Clients: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [recommendations, setRecommendations] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetRecommendations = async (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
    setIsLoading(true);
    setRecommendations('');
    const result = await generateClientRecommendations(client, mockServices);
    setRecommendations(result);
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('clients.title')}</h1>
      <Panel title={t('clients.list')}>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockClients.map(client => (
            <li key={client.id} className="py-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-medium">{client.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{client.email}</p>
              </div>
              <Button onClick={() => handleGetRecommendations(client)} disabled={isLoading}>
                {t('clients.getRecommendations')}
              </Button>
            </li>
          ))}
        </ul>
      </Panel>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${t('clients.recommendationsFor')} ${selectedClient?.name}`}>
        {isLoading ? (
          <p>{t('common.loading')}</p>
        ) : (
          <div className="whitespace-pre-wrap">{recommendations}</div>
        )}
      </Modal>
    </div>
  );
};

export default Clients;
