import { mockClients, mockBookings } from '@/data/mockData';

// Fix: Added missing crmService implementation with mock data functions.
// In a real app, these would be API calls.

export const getClients = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockClients;
};

export const getBookings = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBookings;
};

export const addClient = async (client: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newClient = { ...client, id: `${mockClients.length + 1}` };
    mockClients.push(newClient);
    return newClient;
};
