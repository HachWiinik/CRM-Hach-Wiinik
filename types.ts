export type Language = 'en' | 'es';

export type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error';
};

export type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'error') => void;
};

export type User = {
    name: string;
    email: string;
    avatarUrl: string;
    role: string;
};

export type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    setCurrentRole: (role: string) => void;
};
