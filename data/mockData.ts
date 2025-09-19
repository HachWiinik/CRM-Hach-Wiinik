// Fix: Populating file with mock data for the application.
import { Client, Service, Booking, Promotion, Notification, AnalyticsData, Recommendation } from '../types';

export const mockClients: Client[] = [
  { id: '1', name: 'Elena Rodriguez', email: 'elena@example.com', phone: '555-0101', lastVisit: '2023-10-15', preferences: ['Manicure', 'Bright Colors'] },
  { id: '2', name: 'Liam Chen', email: 'liam@example.com', phone: '555-0102', lastVisit: '2023-10-20', preferences: ['Pedicure', 'Massage'] },
  { id: '3', name: 'Aisha Khan', email: 'aisha@example.com', phone: '555-0103', lastVisit: '2023-09-05', preferences: ['Facial', 'Organic Products'] },
];

export const mockServices: Service[] = [
  { id: 's1', name: 'Classic Manicure', description: 'Shape, buff, and polish.', duration: 45, price: 25 },
  { id: 's2', name: 'Gel Pedicure', description: 'Long-lasting gel polish pedicure.', duration: 60, price: 45 },
  { id: 's3', name: 'Relaxing Facial', description: 'Deep cleansing and relaxing facial.', duration: 75, price: 80 },
  { id: 's4', name: 'Swedish Massage', description: 'Full body massage for relaxation.', duration: 60, price: 70 },
];

export const mockBookings: Booking[] = [
  { id: 'b1', clientId: '1', clientName: 'Elena Rodriguez', serviceId: 's1', serviceName: 'Classic Manicure', startTime: new Date(new Date().setDate(new Date().getDate() + 1)), endTime: new Date(new Date().setDate(new Date().getDate() + 1)), status: 'confirmed' },
  { id: 'b2', clientId: '2', clientName: 'Liam Chen', serviceId: 's4', serviceName: 'Swedish Massage', startTime: new Date(new Date().setDate(new Date().getDate() + 2)), endTime: new Date(new Date().setDate(new Date().getDate() + 2)), status: 'pending' },
  { id: 'b3', clientId: '3', clientName: 'Aisha Khan', serviceId: 's3', serviceName: 'Relaxing Facial', startTime: new Date(new Date().setDate(new Date().getDate() + 3)), endTime: new Date(new Date().setDate(new Date().getDate() + 3)), status: 'completed' },
];

export const mockPromotions: Promotion[] = [
    { id: 'p1', title: 'Autumn Special', description: '20% off all facials.', discount: '20%', validUntil: '2023-11-30' },
    { id: 'p2', title: 'Refer a Friend', description: 'Get $10 off when you refer a friend.', discount: '$10', validUntil: '2023-12-31' },
];

export const mockRecommendations: Recommendation[] = [
    {id: 'r1', title: 'Upsell to Aisha Khan', description: 'Aisha loves organic products. Recommend our new organic serum during her next facial.', category: 'Client'},
    {id: 'r2', title: 'Weekend Promotion Idea', description: 'Create a "Weekend Relaxation" package combining a massage and a pedicure at a discounted rate.', category: 'Marketing'},
];

export const mockNotifications: Notification[] = [
    { id: 'n1', message: 'New booking from Elena Rodriguez.', type: 'info', timestamp: '2 hours ago' },
    { id: 'n2', message: 'Low stock on organic facial cream.', type: 'warning', timestamp: '1 day ago' },
];

export const mockAnalyticsData: AnalyticsData = {
    totalRevenue: 12540,
    totalBookings: 180,
    newClients: 25,
    topServices: [
        { name: 'Gel Pedicure', bookings: 60 },
        { name: 'Swedish Massage', bookings: 45 },
        { name: 'Classic Manicure', bookings: 35 },
    ],
};
