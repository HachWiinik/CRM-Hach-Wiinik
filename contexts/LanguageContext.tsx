import React, { createContext, useState, useContext, useCallback, ReactNode, useEffect } from 'react';
import type { Language, LanguageContextType, Toast } from '../types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');
  const [toast, setToast] = useState<Toast | null>(null);
  const [translations, setTranslations] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enResponse, esResponse] = await Promise.all([
          fetch('/locales/en.json'),
          fetch('/locales/es.json')
        ]);
        if (!enResponse.ok || !esResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const enData = await enResponse.json();
        const esData = await esResponse.json();
        setTranslations({ en: enData, es: esData });
      } catch (error) {
        console.error("Failed to fetch translation files:", error);
        setTranslations({ en: {}, es: {} }); // Fallback to prevent app crash
      }
    };

    fetchTranslations();
  }, []);

  const t = useCallback((key: string, options?: Record<string, string | number>) => {
    if (!translations) {
        return key; // Translations are not loaded yet
    }
      
    const langKey = language as keyof typeof translations;
    const keyParts = key.split('.');
    let translation = translations[langKey];
    
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
  }, [language, translations]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      const id = Date.now();
      setToast({ message, type, id });
      setTimeout(() => setToast(null), 5100); // Clear toast after animation
  };

  const value = { language, setLanguage, t, toast, showToast };

  if (!translations) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
