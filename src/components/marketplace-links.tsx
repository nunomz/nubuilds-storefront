"use client";

import { ExternalLink } from "lucide-react";

interface MarketplaceLinksProps {
    links: Record<string, string>;
}

export function MarketplaceLinks({ links }: MarketplaceLinksProps) {
    const entries = Object.entries(links);

    if (entries.length === 0) return null;

    return (
        <>
            {entries.map(([label, url]) => (
                <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-text)",
                        backgroundColor: "var(--theme-surface)",
                    }}
                >
                    {label}
                    <ExternalLink className="h-4 w-4" />
                </a>
            ))}
        </>
    );
}
