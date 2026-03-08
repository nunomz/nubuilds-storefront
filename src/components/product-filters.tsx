"use client";

import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useLocale } from "@/components/language-provider";
import { t } from "@/lib/i18n";

interface FilterDef {
    key: string;
    label: string;
    options: string[];
}

interface ProductFiltersProps {
    filters: FilterDef[];
    activeFilters: Record<string, string | null>;
    onFilterChange: (key: string, value: string | null) => void;
}

function FilterDropdown({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: string[];
    value: string | null;
    onChange: (v: string | null) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { locale } = useLocale();

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClick);
            return () => document.removeEventListener("mousedown", handleClick);
        }
    }, [open]);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
                style={{
                    color: value ? "var(--theme-text)" : "var(--theme-text-muted)",
                    backgroundColor: value ? "var(--theme-surface)" : "transparent",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--theme-text)";
                    if (!value) e.currentTarget.style.backgroundColor = "var(--theme-surface)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.color = value ? "var(--theme-text)" : "var(--theme-text-muted)";
                    if (!value) e.currentTarget.style.backgroundColor = "transparent";
                }}
            >
                {label}{value ? `: ${value}` : ""}
                <ChevronDown
                    className="h-3.5 w-3.5 transition-transform"
                    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                />
            </button>

            {open && (
                <div
                    className="absolute left-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border backdrop-blur-xl"
                    style={{
                        backgroundColor: "var(--theme-header-bg)",
                        borderColor: "var(--theme-border)",
                    }}
                >
                    <div className="flex flex-col py-1">
                        <button
                            onClick={() => {
                                onChange(null);
                                setOpen(false);
                            }}
                            className="px-4 py-2 text-left text-sm transition-colors"
                            style={{
                                color: !value ? "var(--theme-text)" : "var(--theme-text-muted)",
                                fontWeight: !value ? 600 : 400,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--theme-surface)";
                                e.currentTarget.style.color = "var(--theme-text)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = !value ? "var(--theme-text)" : "var(--theme-text-muted)";
                            }}
                        >
                            {t(locale, "filter.all")}
                        </button>
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setOpen(false);
                                }}
                                className="px-4 py-2 text-left text-sm transition-colors"
                                style={{
                                    color: value === opt ? "var(--theme-text)" : "var(--theme-text-muted)",
                                    fontWeight: value === opt ? 600 : 400,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "var(--theme-surface)";
                                    e.currentTarget.style.color = "var(--theme-text)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = value === opt ? "var(--theme-text)" : "var(--theme-text-muted)";
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function ProductFilters({
    filters,
    activeFilters,
    onFilterChange,
}: ProductFiltersProps) {
    if (filters.length === 0) return null;

    return (
        <div className="sticky top-[72px] z-40 mx-auto max-w-7xl px-4 pt-2 md:px-6">
            <div
                className="flex h-11 items-center gap-1 rounded-2xl border px-4 backdrop-blur-xl transition-colors duration-300 md:px-6"
                style={{
                    backgroundColor: "var(--theme-header-bg)",
                    borderColor: "var(--theme-border)",
                }}
            >
                <SlidersHorizontal
                    className="mr-2 h-4 w-4 shrink-0"
                    style={{ color: "var(--theme-text-muted)" }}
                />
                {filters.map((f) => (
                    <FilterDropdown
                        key={f.key}
                        label={f.label}
                        options={f.options}
                        value={activeFilters[f.key] ?? null}
                        onChange={(v) => onFilterChange(f.key, v)}
                    />
                ))}
            </div>
        </div>
    );
}
