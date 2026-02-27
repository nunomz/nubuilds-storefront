import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProduct, getProducts } from "@/lib/products";
import { hasFeedback } from "@/lib/feedback";
import { ProductGallery } from "@/components/product-gallery";
import { MarketplaceLinks } from "@/components/marketplace-links";

export async function generateStaticParams() {
    const products = getProducts();
    return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) return { title: "Product not found" };
    return { title: `${product.name} — nubuilds` };
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = getProduct(slug);
    if (!product) notFound();

    const productHasFeedback = hasFeedback(slug);

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: "var(--theme-text-muted)" }}
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>
            <div className="flex flex-col gap-10 lg:flex-row">
                {/* Left — product image gallery */}
                <ProductGallery images={product.images} productName={product.name} />

                {/* Right — product details */}
                <div className="flex flex-1 flex-col gap-6 py-2">
                    <div>
                        <h1
                            className="text-4xl font-bold tracking-tight"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {product.name}
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
                                {product.status === "sold" ? "Sold" : "Available"}
                            </span>
                        </div>
                    </div>

                    <p
                        className="max-w-xl leading-relaxed"
                        style={{ color: "var(--theme-text-muted)" }}
                    >
                        {product.description}
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
                                View Customer Feedback
                            </Link>
                        )}
                        <MarketplaceLinks links={product.links} />
                    </div>
                </div>
            </div>
        </div>
    );
}
