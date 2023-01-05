import React, { createContext, ReactNode, useContext, useState } from "react";

export type LanguageCode = 'ru' | 'en';

interface Theme {
    lang: LanguageCode,
    switchLang: (lang: LanguageCode) => void 
}

const LanguageContext = createContext<Theme>({ lang: 'ru', switchLang: (x: LanguageCode) => {} });

export const LanguageProvider : React.FC<{ children: ReactNode }> = ({ children }) => { 
    const [lang, setLang] = useState<LanguageCode>('ru');
    return <LanguageContext.Provider value={{ lang, switchLang: (langCode: string) => { setLang(langCode as LanguageCode) }}}>
        {children}
    </LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext);