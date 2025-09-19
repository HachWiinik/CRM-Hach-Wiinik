import React from 'react';

export interface NavItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  text: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalBookings: number;
  tags: string[];
  avatar: string;
}

export interface Booking {
  id: string;
  clientName: string;
  clientId: string;
  tourPackage: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  participants: number;
  totalPrice: number;
}

export interface Recommendation {
    id: string;
    title: string;
    description: string;
    category: 'Eco-tourism' | 'Adventure' | 'Cultural' | 'Gastronomy';
    targetAudience: string;
    suggestedPrice: number; // in USD
    image?: string;
}

export interface QuickImpactImprovement {
  experience: string;
  correctedPrice: string;
  keyImages: string;
  visualImprovement: string;
}

export interface AnalyticsData {
    bookingsOverTime: { month: string; bookings: number }[];
    revenueByPackage: { package: string; revenue: number }[];
    clientGrowth: { month: string; newClients: number }[];
    popularPackages: { name: string; bookings: number }[];
    quickImpactImprovements: QuickImpactImprovement[];
}