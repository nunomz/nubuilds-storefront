"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { LOCALES } from "@/lib/i18n";
import { useLocale } from "./language-provider";

export function LanguageDropdown() {
    const { locale, setLocale } = useLocale();
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

    const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors"
                style={{ color: "var(--theme-text-muted)" }}
                onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--theme-text)")
                }
                onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--theme-text-muted)")
                }
                aria-label="Change language"
            >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
            </button>

            {open && (
                <div
                    className="absolute left-1/2 top-full mt-2 min-w-[160px] -translate-x-1/2 overflow-hidden rounded-xl border p-1 shadow-xl backdrop-blur-xl"
                    style={{
                        backgroundColor: "var(--theme-header-bg)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    {LOCALES.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => {
                                setLocale(l.code);
                                setOpen(false);
                            }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                            style={{
                                color:
                                    l.code === locale
                                        ? "var(--theme-text)"
                                        : "var(--theme-text-muted)",
                                backgroundColor:
                                    l.code === locale
                                        ? "var(--theme-surface)"
                                        : "transparent",
                            }}
                            onMouseEnter={(e) => {
                                if (l.code !== locale) {
                                    e.currentTarget.style.backgroundColor =
                                        "var(--theme-surface)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (l.code !== locale) {
                                    e.currentTarget.style.backgroundColor =
                                        "transparent";
                                }
                            }}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
