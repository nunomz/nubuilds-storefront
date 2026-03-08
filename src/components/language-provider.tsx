"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/i18n";

interface LocaleContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
    locale: DEFAULT_LOCALE,
    setLocale: () => { },
});

const STORAGE_KEY = "nubuilds-locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

    // Read saved locale on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
            if (saved && ["en", "pt", "es"].includes(saved)) {
                setLocaleState(saved);
            }
        } catch {
            // localStorage unavailable (SSR / privacy mode)
        }
    }, []);

    // Update <html lang="..."> whenever locale changes
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        try {
            localStorage.setItem(STORAGE_KEY, newLocale);
        } catch {
            // ignore
        }
    }, []);

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
}

export function useLocale() {
    return useContext(LocaleContext);
}
