import type { UserRole } from '@/types';

type RoleConfig = {
  permissions: string[];
  defaultView: string;
};

export const roleConfig: Record<UserRole, RoleConfig> = {
  'super-admin': {
    permissions: ['analytics', 'bookings', 'clients', 'tasks', 'catalog', 'promotions', 'recommendations', 'chat', 'notifications'],
    defaultView: 'analytics',
  },
  'admin': {
    permissions: ['analytics', 'bookings', 'clients', 'tasks', 'catalog', 'promotions', 'recommendations', 'chat', 'notifications'],
    defaultView: 'analytics',
  },
  'manager': {
    permissions: ['analytics', 'bookings', 'clients', 'tasks', 'catalog', 'recommendations', 'chat', 'notifications'],
    defaultView: 'analytics',
  },
  'sales-rep': {
    permissions: ['bookings', 'clients', 'catalog', 'chat'],
    defaultView: 'bookings',
  },
};