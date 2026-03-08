"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductFilters } from "./product-filters";
import { ProductGrid } from "./product-grid";
import { useLocale } from "./language-provider";
import { t } from "@/lib/i18n";

interface ProductsClientProps {
    products: Product[];
}

export function ProductsClient({ products }: ProductsClientProps) {
    const [activeFilters, setActiveFilters] = useState<Record<string, string | null>>({});
    const { locale } = useLocale();

    // Derive available filter definitions from all products
    const filterDefs = useMemo(() => {
        const map = new Map<string, Set<string>>();
        for (const p of products) {
            for (const [key, value] of Object.entries(p.filters)) {
                if (!map.has(key)) map.set(key, new Set());
                map.get(key)!.add(value);
            }
        }
        // Build filter definitions with translated labels
        const labelMap: Record<string, string> = {
            productType: t(locale, "filter.productType"),
        };
        return Array.from(map.entries()).map(([key, values]) => ({
            key,
            label: labelMap[key] ?? key,
            options: Array.from(values).sort(),
        }));
    }, [products, locale]);

    // Apply active filters
    const filtered = useMemo(() => {
        return products.filter((p) => {
            for (const [key, value] of Object.entries(activeFilters)) {
                if (value && p.filters[key] !== value) return false;
            }
            return true;
        });
    }, [products, activeFilters]);

    const handleFilterChange = (key: string, value: string | null) => {
        setActiveFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <ProductFilters
                filters={filterDefs}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
            />
            <div className="mx-auto max-w-7xl px-6 py-6">
                <ProductGrid products={filtered} />
            </div>
        </>
    );
}
