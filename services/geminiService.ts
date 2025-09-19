import { GoogleGenAI, Type } from "@google/genai";
import { Recommendation, Booking } from '../types';
import { mockBookings } from '../data/mockData';

// Fix: Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const recommendationSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: {
            type: Type.STRING,
            description: 'A unique identifier for the recommendation, can be a short slug-like string.'
        },
        title: {
          type: Type.STRING,
          description: 'The name of the new tour package.',
        },
        description: {
          type: Type.STRING,
          description: 'A brief, engaging description of the tour package.',
        },
        category: {
          type: Type.STRING,
          description: "Category of the tour. Must be one of: 'Eco-tourism', 'Adventure', 'Cultural', 'Gastronomy'.",
        },
        targetAudience: {
            type: Type.STRING,
            description: 'The ideal customer for this package (e.g., Families, Couples, Solo Travelers).'
        },
        suggestedPrice: {
            type: Type.NUMBER,
            description: 'A suggested price for the tour package per person.'
        }
      },
      required: ["id", "title", "description", "category", "targetAudience", "suggestedPrice"]
    },
};


export const generateRecommendations = async (clientProfile: string): Promise<Recommendation[]> => {
    try {
        // Fix: Use the correct model 'gemini-2.5-flash' and structure for generateContent call.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the following client profile, generate 3 new, creative, and appealing tour package ideas suitable for the Mayan region of Mexico. Client Profile: "${clientProfile}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema,
                temperature: 0.8,
            },
        });

        // Fix: Correctly extract the text response and parse it as JSON.
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);

        if (!Array.isArray(result)) {
            throw new Error('AI response is not an array.');
        }
        
        return result.map((rec: any) => ({
            id: rec.id || `rec-${Date.now()}-${Math.random()}`,
            title: rec.title,
            description: rec.description,
            category: rec.category,
            targetAudience: rec.targetAudience,
            suggestedPrice: rec.suggestedPrice
        })) as Recommendation[];
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate recommendations from AI service.");
    }
};

// --- Booking Service ---

const BOOKINGS_STORAGE_KEY = 'hach-wiinik-bookings';

const initializeBookings = (): void => {
    const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!storedBookings) {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(mockBookings));
    }
};

initializeBookings();

export const getBookings = (): Booking[] => {
    const bookingsRaw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!bookingsRaw) return [];
    const bookings: Booking[] = JSON.parse(bookingsRaw);
    return bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const addBooking = (bookingDetails: Omit<Booking, 'id' | 'clientId' | 'status'>): Booking => {
    const bookings = getBookings();
    const newBooking: Booking = {
        ...bookingDetails,
        id: `book-${Date.now()}`,
        clientId: `cli-${Date.now()}`,
        status: 'pending',
    };
    const updatedBookings = [newBooking, ...bookings];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
    return newBooking;
};

export const deleteBooking = (bookingId: string): void => {
    const bookings = getBookings();
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
};
