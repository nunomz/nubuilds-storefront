"use client";

import { useTheme, themes } from "./theme-provider";
import { Palette } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function ThemeDropdown() {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                style={{
                    color: "var(--theme-text-muted)",
                }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--theme-text)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--theme-text-muted)")
                }
            >
                <Palette className="h-4 w-4" />
                <span className="hidden md:inline">{theme.name}</span>
            </button>

            {open && (
                <div
                    className="absolute right-0 top-full mt-2 min-w-[160px] overflow-hidden rounded-xl border p-1 shadow-xl backdrop-blur-xl"
                    style={{
                        backgroundColor: "var(--theme-header-bg)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    {themes.map((t) => (
                        <button
                            key={t.name}
                            onClick={() => {
                                setTheme(t.name);
                                setOpen(false);
                            }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                            style={{
                                color:
                                    t.name === theme.name
                                        ? "var(--theme-text)"
                                        : "var(--theme-text-muted)",
                                backgroundColor:
                                    t.name === theme.name
                                        ? "var(--theme-surface)"
                                        : "transparent",
                            }}
                            onMouseEnter={(e) => {
                                if (t.name !== theme.name) {
                                    e.currentTarget.style.backgroundColor =
                                        "var(--theme-surface)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (t.name !== theme.name) {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent";
                                }
                            }}
                        >
                            <span
                                className="h-4 w-4 shrink-0 rounded-full border"
                                style={{
                                    backgroundColor: t.bg,
                                    borderColor: t.isDark
                                        ? "rgba(255,255,255,0.2)"
                                        : "rgba(0,0,0,0.15)",
                                }}
                            />
                            {t.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
