// Fix: No changes to this file's content were needed. The error was resolved by creating the 'types.ts' file it imports from.
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import type { Language, LanguageContextType, ToastState } from '../types';

import en from '../locales/en.json';
import es from '../locales/es.json';

const translations = { en, es };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    // Could add logic here to detect browser language or load from localStorage
  }, []);

  const t = useCallback((key: string, options?: Record<string, string | number>): string => {
    const keyParts = key.split('.');
    let translation: any = translations[language];
    
    for (const part of keyParts) {
      if (translation && typeof translation === 'object' && part in translation) {
        translation = translation[part];
      } else {
        return key; // Return key if not found
      }
    }

    let result = String(translation);

    if (options) {
        Object.keys(options).forEach(placeholder => {
            result = result.replace(`{${placeholder}}`, String(options[placeholder]));
        });
    }

    return result;
  }, [language]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      const id = Date.now();
      setToast({ message, type, id });
  };


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toast, showToast }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
