export const mockClients = [
  { id: '1', name: 'Sophia Miller', email: 'sophia@example.com', phone: '555-0101', lastVisit: new Date('2023-10-15'), preferences: ['Snorkeling', 'Cenotes', 'Nature'], avatarUrl: 'https://i.pravatar.cc/150?u=sophia' },
  { id: '2', name: 'Jackson Moore', email: 'jackson@example.com', phone: '555-0102', lastVisit: new Date('2023-10-20'), preferences: ['Adventure', 'Marine Life', 'Photography'], avatarUrl: 'https://i.pravatar.cc/150?u=jackson' },
  { id: '3', name: 'Isabella Garcia', email: 'isabella@example.com', phone: '555-0103', lastVisit: new Date('2023-09-05'), preferences: ['History', 'Culture', 'Archaeology'], avatarUrl: 'https://i.pravatar.cc/150?u=isabella' },
];

export const mockServices = [
  { id: 's1', name: 'Cavernas Subacuáticas y Nado con Tortugas', description: 'Explore ancient underground river systems and swim with sea turtles in their natural habitat.', duration: 300, price: 2200, imageUrl: 'https://res.cloudinary.com/dy08afhuz/image/upload/v1758235474/1000607861_wywnnw.png' },
  { id: 's2', name: 'Nado con el Tiburón Ballena', description: 'An awe-inspiring encounter with the gentle giants of the ocean. A seasonal, once-in-a-lifetime experience.', duration: 360, price: 3950, imageUrl: 'https://res.cloudinary.com/dy08afhuz/image/upload/v1758235396/1000592474_j9tty1.jpg' },
  { id: 's3', name: 'Expedición a Ruinas Mayas', description: 'A guided tour through a historic Mayan city, uncovering the secrets of an ancient civilization.', duration: 480, price: 2800, imageUrl: 'https://res.cloudinary.com/dy08afhuz/image/upload/v1758235400/1000588882_hr4ekr.jpg' },
  { id: 's4', name: 'Aventura en la Selva y Tirolesas', description: 'Experience the thrill of zip-lining over the jungle canopy and explore hidden trails.', duration: 240, price: 1900, imageUrl: 'https://res.cloudinary.com/dy08afhuz/image/upload/v1758235392/1000543745_gxtqwd.jpg' },
];

export const mockBookings = [
  { id: 'b1', clientId: '1', clientName: 'Sophia Miller', serviceId: 's1', serviceName: 'Cavernas Subacuáticas', startTime: new Date(new Date().setDate(new Date().getDate() + 5)), endTime: new Date(new Date().setDate(new Date().getDate() + 5)), status: 'confirmed' },
  { id: 'b2', clientId: '2', clientName: 'Jackson Moore', serviceId: 's2', serviceName: 'Nado con el Tiburón Ballena', startTime: new Date(new Date().setDate(new Date().getDate() + 10)), endTime: new Date(new Date().setDate(new Date().getDate() + 10)), status: 'pending' },
  { id: 'b3', clientId: '3', clientName: 'Isabella Garcia', serviceId: 's3', serviceName: 'Expedición a Ruinas Mayas', startTime: new Date(new Date().setDate(new Date().getDate() + 12)), endTime: new Date(new Date().setDate(new Date().getDate() + 12)), status: 'completed' },
];

export const mockPromotions = [
    { id: 'p1', title: 'Aventura de Verano', description: '15% off on all jungle and cenote tours.', discount: '15%', validUntil: new Date('2024-08-31') },
    { id: 'p2', title: 'Reserva en Grupo', description: 'Book for 4 or more people and get a 20% discount.', discount: '20%', validUntil: new Date('2024-12-31') },
];

export const mockRecommendations = [
    {id: 'r1', title: 'Upsell para Jackson Moore', description: 'Jackson loves marine life. Offer him a private photography session add-on for his Whale Shark tour.', category: 'Client'},
    {id: 'r2', title: 'Paquete Cultural', description: 'Create a "Mayan Explorer" package combining the ruins expedition with a local cuisine experience.', category: 'Marketing'},
];

export const mockNotifications = [
    { id: 'n1', message: 'Nueva reserva de Sophia Miller para Cavernas.', type: 'info', timestamp: '3 horas atrás' },
    { id: 'n2', message: 'La temporada de Tiburón Ballena termina en 2 semanas.', type: 'warning', timestamp: '1 día atrás' },
];

export const mockAnalyticsData = {
    totalRevenue: 375800,
    totalBookings: 150,
    newClients: 22,
    topServices: [
        { name: 'Nado con el Tiburón Ballena', bookings: 55 },
        { name: 'Cavernas Subacuáticas', bookings: 40 },
        { name: 'Expedición a Ruinas Mayas', bookings: 30 },
    ],
};

export const mockTeamMembers = [
  { id: 'u1', name: 'Alex Ray', avatarUrl: 'https://i.pravatar.cc/150?u=alex' },
  { id: 'u2', name: 'Jordan Lee', avatarUrl: 'https://i.pravatar.cc/150?u=jordan' },
  { id: 'u3', name: 'Taylor Kim', avatarUrl: 'https://i.pravatar.cc/150?u=taylor' },
];

export const mockTasks = [
  { id: 't1', title: 'Plan Summer Solstice Festival', description: 'Coordinate with local vendors and performers.', assigneeId: 'u1', dueDate: new Date('2024-08-20'), status: 'In Progress' as const },
  { id: 't2', title: 'Update Website with New Tour Photos', description: 'Get latest photos from photography team.', assigneeId: 'u2', dueDate: new Date('2024-08-25'), status: 'To Do' as const },
  { id: 't3', title: 'Finalize Q3 Marketing Budget', description: 'Review ad spend and campaign performance.', assigneeId: 'u1', dueDate: new Date('2024-09-01'), status: 'To Do' as const },
  { id: 't4', title: 'Research New Cenote Locations', description: 'Scout potential new tour sites near Tulum.', assigneeId: 'u3', dueDate: new Date('2024-09-10'), status: 'In Progress' as const },
  { id: 't5', title: 'Conduct Staff Training on Safety Protocols', description: 'Refresh training for all tour guides.', assigneeId: 'u2', dueDate: new Date('2024-08-18'), status: 'Completed' as const },
  { id: 't6', title: 'Follow up with client Isabella Garcia', description: 'Offer a loyalty discount for her next booking.', assigneeId: 'u3', dueDate: new Date('2024-08-22'), status: 'To Do' as const },
];