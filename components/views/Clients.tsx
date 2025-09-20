import React, { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { mockClients, mockServices } from '@/data/mockData';
import Panel from '@/components/common/Panel';
import { Mail, Phone } from 'lucide-react';
import Button from '@/components/common/Button';
import MascotHelper from '@/components/common/MascotHelper';
import { generateClientRecommendations } from '@/services/geminiService';
import Modal from '@/components/common/Modal';

// Fix: Added missing Clients component implementation.
const Clients: React.FC = () => {
    const { t } = useTranslation();
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [recommendations, setRecommendations] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGetRecommendations = async (client: any) => {
        setSelectedClient(client);
        setIsLoading(true);
        const result = await generateClientRecommendations(client, mockServices);
        setRecommendations(result);
        setIsLoading(false);
    }
    
    const closeModal = () => {
        setSelectedClient(null);
        setRecommendations('');
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mb-6'>{t('clients.title')}</h1>
            <Panel title={t('clients.list')}>
                <div className='space-y-4'>
                    {mockClients.map(client => (
                        <div key={client.id} className='bg-brand-light-bg dark:bg-brand-dark p-4 rounded-lg flex items-center justify-between shadow-sm'>
                            <div className='flex items-center'>
                                <img src={client.avatarUrl} alt={client.name} className='h-12 w-12 rounded-full object-cover mr-4' />
                                <div>
                                    <p className='font-semibold'>{client.name}</p>
                                    <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                                        <Mail size={14} className='mr-2' /> {client.email}
                                    </div>
                                     <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                                        <Phone size={14} className='mr-2' /> {client.phone}
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => handleGetRecommendations(client)}>
                                {t('clients.getRecommendations')}
                            </Button>
                        </div>
                    ))}
                </div>
            </Panel>
            <MascotHelper initialMessage={t('mascot.clients')} />

            {selectedClient && (
                 <Modal isOpen={!!selectedClient} onClose={closeModal} title={`${t('clients.recommendationsFor')} ${selectedClient.name}`}>
                    {isLoading ? (
                         <div className='flex items-center justify-center h-24'>
                            <div className='flex items-center space-x-2'>
                                <span className="block w-3 h-3 bg-brand-purple rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                                <span className="block w-3 h-3 bg-brand-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                                <span className="block w-3 h-3 bg-brand-pink rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    ) : (
                        <div className='whitespace-pre-wrap'>{recommendations}</div>
                    )}
                 </Modal>
            )}

        </div>
    );
};

export default Clients;
