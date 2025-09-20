// Fix: Added missing type definitions for the application.
export type Language = 'en' | 'es';

export type UserRole = 'super-admin' | 'admin' | 'manager' | 'sales-rep';

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}

export type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  dueDate: Date;
  status: TaskStatus;
}
