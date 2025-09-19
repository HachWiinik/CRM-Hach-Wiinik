// Fix: Populating file with Gemini API service functions, adhering to provided coding guidelines.
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Client, Service } from '../types';

// Per guidelines, initialize with a named apiKey parameter from process.env.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates personalized marketing recommendations for a specific client.
 */
export const generateClientRecommendations = async (client: Client, services: Service[]): Promise<string> => {
  const prompt = `
    Based on the following client profile and our list of services, generate 2-3 personalized recommendations for them.
    The recommendations should be actionable and aim to enhance their experience or introduce them to new services they might like.

    Client Profile:
    - Name: ${client.name}
    - Last Visit: ${client.lastVisit}
    - Preferences/History: ${client.preferences.join(', ')}

    Our Services:
    ${services.map(s => `- ${s.name}: ${s.description}`).join('\n')}

    Generate a short, friendly message with the recommendations.
  `;

  try {
    // Use ai.models.generateContent with the correct model.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Access text directly from response.text.
    return response.text;
  } catch (error) {
    console.error("Error generating client recommendations:", error);
    return "Sorry, we couldn't generate recommendations at this time.";
  }
};


/**
 * Generates ideas for new promotional campaigns.
 */
export const generatePromotionIdeas = async (season: string): Promise<{title: string, description: string}[]> => {
    const prompt = `
        Generate 3 creative and appealing promotion ideas for a modern beauty and wellness salon for the upcoming ${season} season.
        For each idea, provide a catchy title and a brief description.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        promotions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                },
                                required: ["title", "description"]
                            }
                        }
                    },
                    required: ["promotions"]
                }
            }
        });
        
        // Access text directly and parse.
        const jsonText = response.text;
        const result = JSON.parse(jsonText);
        return result.promotions || [];

    } catch(error) {
        console.error("Error generating promotion ideas:", error);
        return [];
    }
};
