"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface Theme {
    name: string;
    /** Main page background */
    bg: string;
    /** Surface / card / secondary background */
    surface: string;
    /** Primary text color */
    text: string;
    /** Secondary / muted text */
    textMuted: string;
    /** Border color */
    border: string;
    /** Header background */
    headerBg: string;
    /** Whether this is a dark theme (controls text auto-adapt) */
    isDark: boolean;
}

export const themes: Theme[] = [
    {
        name: "Grey",
        bg: "#1a1a1a",
        surface: "rgba(255,255,255,0.06)",
        text: "#f5f5f5",
        textMuted: "#a0a0a0",
        border: "rgba(255,255,255,0.12)",
        headerBg: "rgba(0,0,0,0.55)",
        isDark: true,
    },
    {
        name: "Navy",
        bg: "#0f172a",
        surface: "rgba(255,255,255,0.05)",
        text: "#f1f5f9",
        textMuted: "#94a3b8",
        border: "rgba(255,255,255,0.10)",
        headerBg: "rgba(0,0,0,0.55)",
        isDark: true,
    },
    {
        name: "Light",
        bg: "#f5f5f5",
        surface: "rgba(0,0,0,0.04)",
        text: "#171717",
        textMuted: "#525252",
        border: "rgba(0,0,0,0.10)",
        headerBg: "rgba(255,255,255,0.75)",
        isDark: false,
    },
    {
        name: "Midnight (OLED)",
        bg: "#000000",
        surface: "rgba(255,255,255,0.04)",
        text: "#ffffff",
        textMuted: "#737373",
        border: "rgba(255,255,255,0.08)",
        headerBg: "rgba(0,0,0,0.80)",
        isDark: true,
    },
];

interface ThemeContextValue {
    theme: Theme;
    setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: themes[0],
    setTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

function applyThemeVars(theme: Theme) {
    const root = document.documentElement;
    root.style.setProperty("--theme-bg", theme.bg);
    root.style.setProperty("--theme-surface", theme.surface);
    root.style.setProperty("--theme-text", theme.text);
    root.style.setProperty("--theme-text-muted", theme.textMuted);
    root.style.setProperty("--theme-border", theme.border);
    root.style.setProperty("--theme-header-bg", theme.headerBg);
}

const STORAGE_KEY = "nubuilds-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(themes[0]);

    // Load saved theme on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        const found = themes.find((t) => t.name === saved);
        if (found) {
            setThemeState(found);
            applyThemeVars(found);
        } else {
            applyThemeVars(themes[0]);
        }
    }, []);

    const setTheme = useCallback((name: string) => {
        const found = themes.find((t) => t.name === name);
        if (!found) return;
        setThemeState(found);
        applyThemeVars(found);
        localStorage.setItem(STORAGE_KEY, name);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
