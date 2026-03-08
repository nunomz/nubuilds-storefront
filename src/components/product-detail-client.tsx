"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductGallery } from "@/components/product-gallery";
import { MarketplaceLinks } from "@/components/marketplace-links";
import { useLocale } from "@/components/language-provider";
import { localize, t } from "@/lib/i18n";

interface ProductDetailClientProps {
    product: Product;
    productHasFeedback: boolean;
}

export function ProductDetailClient({ product, productHasFeedback }: ProductDetailClientProps) {
    const { locale } = useLocale();

    const localeDateOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    const dateLocaleMap = { en: "en-US", pt: "pt-PT", es: "es-ES" } as const;

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: "var(--theme-text-muted)" }}
            >
                <ArrowLeft className="h-4 w-4" />
                {t(locale, "product.back")}
            </Link>
            <div className="flex flex-col gap-10 lg:flex-row">
                {/* Left — product image gallery */}
                <ProductGallery images={product.images} productName={localize(product.name, locale)} />

                {/* Right — product details */}
                <div className="flex flex-1 flex-col gap-6 py-2">
                    <div>
                        <h1
                            className="text-4xl font-bold tracking-tight"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {localize(product.name, locale)}
                        </h1>
                        <div className="mt-2 flex items-center gap-4">
                            <p
                                className="text-3xl font-semibold"
                                style={{ color: "var(--theme-text-muted)" }}
                            >
                                {product.price}
                            </p>
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${product.status === "sold"
                                    ? "bg-red-500/15 text-red-400"
                                    : "bg-emerald-500/15 text-emerald-400"
                                    }`}
                            >
                                {product.status === "sold"
                                    ? product.sold_date
                                        ? `${t(locale, "status.sold")} · ${new Date(product.sold_date).toLocaleDateString(dateLocaleMap[locale], localeDateOptions)}`
                                        : t(locale, "status.sold")
                                    : t(locale, "status.available")}
                            </span>
                        </div>
                    </div>

                    <p
                        className="max-w-xl leading-relaxed"
                        style={{ color: "var(--theme-text-muted)" }}
                    >
                        {localize(product.description, locale)}
                    </p>

                    {/* Specs table */}
                    {Object.keys(product.specs).length > 0 && (
                        <div
                            className="overflow-hidden rounded-xl border"
                            style={{ borderColor: "var(--theme-border)" }}
                        >
                            <table className="w-full text-sm">
                                <tbody>
                                    {Object.entries(product.specs).map(([key, value], i) => (
                                        <tr
                                            key={key}
                                            style={{
                                                backgroundColor:
                                                    i % 2 === 0
                                                        ? "var(--theme-surface)"
                                                        : "transparent",
                                            }}
                                        >
                                            <td
                                                className="px-5 py-3 font-medium"
                                                style={{ color: "var(--theme-text-muted)" }}
                                            >
                                                {key}
                                            </td>
                                            <td
                                                className="px-5 py-3 text-right"
                                                style={{ color: "var(--theme-text)" }}
                                            >
                                                {value}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* View Feedback button + Marketplace links */}
                    <div className="flex flex-wrap gap-3">
                        {productHasFeedback && (
                            <Link
                                href={`/feedback/${product.slug}`}
                                className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                                style={{
                                    borderColor: "rgba(251, 191, 36, 0.3)",
                                    color: "var(--theme-text)",
                                    backgroundColor: "rgba(251, 191, 36, 0.1)",
                                }}
                            >
                                {t(locale, "product.viewFeedback")}
                            </Link>
                        )}
                        <MarketplaceLinks links={product.links} />
                    </div>
                </div>
            </div>
        </div>
    );
}
