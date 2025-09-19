import React, { useState } from 'react';
import Panel from '../common/Panel';
import Button from '../common/Button';
import { mockRecommendations } from '../../data/mockData';
import { generateRecommendations } from '../../services/geminiService';
import type { Recommendation } from '../../types';
import { Lightbulb, DollarSign, Users, Sparkles } from 'lucide-react';

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clientProfile, setClientProfile] = useState('');

    const placeholderImage = 'https://images.unsplash.com/photo-1528159339923-7a9d94ab695b?q=80&w=1974&auto=format&fit=crop';

    const handleGenerate = async () => {
        if (!clientProfile.trim()) {
            setError("Please describe the client profile.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const newRecs = await generateRecommendations(clientProfile);
            setRecommendations(prev => [...newRecs, ...prev]);
        } catch (err) {
            setError('Failed to generate recommendations. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">Tour Packages</h2>
            <Panel>
                <h3 className="text-xl font-semibold mb-4">Generate New Package Ideas</h3>
                <div className="space-y-4">
                    <textarea
                        value={clientProfile}
                        onChange={(e) => setClientProfile(e.target.value)}
                        placeholder="Describe a client profile to generate recommendations for (e.g., 'A family with young children interested in nature and easy activities' or 'A couple looking for a romantic and adventurous getaway')."
                        rows={4}
                        className="w-full p-2 border rounded-md focus:ring-maya-caribbean-turquoise focus:border-maya-caribbean-turquoise"
                        disabled={isLoading}
                    />
                    <div className="flex justify-end">
                        <Button onClick={handleGenerate} isLoading={isLoading}>
                            <Sparkles size={16} className="inline-block mr-2"/>
                            Generate Recommendations
                        </Button>
                    </div>
                     {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </Panel>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendations.map((rec) => (
                    <Panel key={rec.id} className="flex flex-col p-0 overflow-hidden">
                        <img src={rec.image || placeholderImage} alt={rec.title} className="w-full h-48 object-cover"/>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-4">
                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-maya-caribbean-turquoise/10 text-maya-caribbean-turquoise`}>
                                    <Lightbulb size={16} className="mr-2" />
                                    {rec.category}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">{rec.title}</h3>
                            <p className="text-sm text-gray-600 flex-grow mb-4">{rec.description}</p>
                            <div className="text-sm space-y-2 pt-4 border-t">
                                <div className="flex items-center">
                                    <Users size={14} className="mr-2 text-gray-500" />
                                    <strong>Target:</strong><span className="ml-2">{rec.targetAudience}</span>
                                </div>
                                 <div className="flex items-center">
                                    <DollarSign size={14} className="mr-2 text-gray-500" />
                                    <strong>Price:</strong><span className="ml-2">${rec.suggestedPrice} / person</span>
                                </div>
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;