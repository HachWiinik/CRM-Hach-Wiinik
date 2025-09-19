import { GoogleGenAI, Type, Chat } from "@google/genai";

// Fix: Per coding guidelines, initialize GoogleGenAI directly with process.env.API_KEY.
// This resolves the error "Property 'env' does not exist on type 'ImportMeta'".
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


const systemInstruction = `
You are a helpful CRM assistant for Hach Wíinik, an eco-tour company in the Mayan Riviera.
You can answer questions about client data, booking trends, marketing strategies, and help manage the CRM.
Use the provided data context when available, but do not make up data if you don't have it.
Be friendly, professional, and concise. Your goal is to provide actionable insights.
Today's date is ${new Date().toLocaleDateString()}.
`;

// Create a single chat instance to maintain conversation history
const chat: Chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: systemInstruction,
    },
});

/**
 * Continues an ongoing chat conversation.
 * @param message The user's message.
 * @returns The model's response text.
 */
export const continueConversation = async (message: string) => {
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error in chat conversation:", error);
        return "Sorry, an error occurred while processing your request.";
    }
};


/**
 * Generates personalized marketing recommendations for a specific client.
 */
export const generateClientRecommendations = async (client: any, services: any[]) => {
  const prompt = `
    Based on the following client profile and our list of eco-tours and cultural experiences, generate 2-3 personalized recommendations for them.
    The recommendations should be actionable and aim to enhance their experience or introduce them to new tours they might like.

    Client Profile:
    - Name: ${client.name}
    - Last Visit: ${client.lastVisit}
    - Preferences/History: ${client.preferences.join(', ')}

    Our Tours & Experiences:
    ${services.map(s => `- ${s.name}: ${s.description}`).join('\n')}

    Generate a short, friendly message with the recommendations, written in a tone that is adventurous and respectful of nature and culture.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating client recommendations:", error);
    return "Sorry, we couldn't generate recommendations at this time.";
  }
};


/**
 * Generates ideas for new promotional campaigns.
 */
export const generatePromotionIdeas = async (season: string) => {
    const prompt = `
        Generate 3 creative and appealing promotion ideas for an eco-tour and cultural experience provider named "Hach Wíinik" for the upcoming ${season} season.
        For each idea, provide a catchy title and a brief description. The tone should be exciting and aligned with sustainable tourism.
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
                                propertyOrdering: ["title", "description"]
                            }
                        }
                    },
                    propertyOrdering: ["promotions"]
                }
            }
        });
        
        // Fix: Added trim() to safely parse JSON from the response text.
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result.promotions || [];

    } catch(error) {
        console.error("Error generating promotion ideas:", error);
        return [{ title: "Error", description: "Could not generate promotion ideas." }];
    }
};