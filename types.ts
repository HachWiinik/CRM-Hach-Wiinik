// Fix: Populating file with all necessary TypeScript type definitions for the application.
export type Language = 'en' | 'es';

export interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  preferences: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
}

export interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  startTime: Date;
  endTime: Date;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
}

export interface Recommendation {
    id: string;
    title: string;
    description: string;
    category: 'Client' | 'Service' | 'Marketing';
}

export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'alert';
    timestamp: string;
}

export interface AnalyticsData {
    totalRevenue: number;
    totalBookings: number;
    newClients: number;
    topServices: { name: string; bookings: number }[];
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export type UserRole = 'super-admin' | 'admin';

export interface User {
    name: string;
    email: string;
    avatarUrl: string;
    role: UserRole;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    setCurrentRole: (role: UserRole) => void;
}
