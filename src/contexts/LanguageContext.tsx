
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from '../locales/en.js';
import idTranslations from '../locales/id.js';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, any>;
  t: (key: string, options?: Record<string, string | number>) => string;
}

const translationsMap = {
  en: enTranslations,
  id: idTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Optionally, load saved language from localStorage
    const savedLanguage = localStorage.getItem('hegra-lang') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('hegra-lang', lang);
  };

  const t = (key: string, options?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let current: any = translationsMap[language];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to English if translation not found or key is incorrect
        current = enTranslations; // Use the imported enTranslations (JS module)
        for (const k_fb of keys) {
             if (current && typeof current === 'object' && k_fb in current) {
                current = current[k_fb];
             } else {
                return key; // Return the key itself if not found even in fallback
             }
        }
        break;
      }
    }
    
    if (typeof current === 'string' && options) {
      let resultString = current;
      for (const [optKey, optValue] of Object.entries(options)) {
        resultString = resultString.replace(new RegExp(`{{${optKey}}}`, 'g'), String(optValue));
      }
      return resultString;
    }
    return typeof current === 'string' ? current : key;
  };


  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations: translationsMap[language], t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
