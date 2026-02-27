import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { getProductFeedback, getProductsWithFeedback } from "@/lib/feedback";
import { ProductGallery } from "@/components/product-gallery";

export async function generateStaticParams() {
    const items = getProductsWithFeedback();
    return items.map((item) => ({ slug: item.product.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = getProductFeedback(slug);
    if (!item) return { title: "Feedback not found" };
    return { title: `Feedback — ${item.product.name} — nubuilds` };
}

function StarRating({ rating, size = "lg" }: { rating: number; size?: "sm" | "lg" }) {
    const starSize = size === "lg" ? "h-6 w-6" : "h-4 w-4";
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`${starSize} ${i <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-none text-neutral-500"
                        }`}
                />
            ))}
        </div>
    );
}

export default async function FeedbackDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = getProductFeedback(slug);
    if (!item) notFound();

    const { product, feedback, feedbackImages } = item;

    // Use feedback images if available, otherwise fall back to product images
    const galleryImages = feedbackImages.length > 0 ? feedbackImages : product.images;

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <Link
                href="/feedback"
                className="mb-6 inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: "var(--theme-text-muted)" }}
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Feedback
            </Link>
            <div className="flex flex-col gap-10 lg:flex-row">
                {/* Left — gallery (feedback pics or product pics) */}
                <ProductGallery images={galleryImages} productName={product.name} />

                {/* Right — feedback details (mirrors product page layout) */}
                <div className="flex flex-1 flex-col gap-6 py-2">
                    {/* Review title (where product name goes) */}
                    <div>
                        <h1
                            className="text-4xl font-bold tracking-tight"
                            style={{ color: "var(--theme-text)" }}
                        >
                            &ldquo;{feedback.review_title}&rdquo;
                        </h1>
                        <p
                            className="mt-1 text-base"
                            style={{ color: "var(--theme-text-muted)" }}
                        >
                            — {feedback.reviewer_name}
                        </p>
                        {/* Star rating (where price goes) */}
                        <div className="mt-3 flex items-center gap-2">
                            <StarRating rating={feedback.rating} size="lg" />
                            <span
                                className="text-3xl font-semibold"
                                style={{ color: "var(--theme-text-muted)" }}
                            >
                                {feedback.rating}/5
                            </span>
                        </div>
                    </div>

                    {/* Review body (where description goes) */}
                    <p
                        className="max-w-xl leading-relaxed"
                        style={{ color: "var(--theme-text-muted)" }}
                    >
                        {feedback.review_body}
                    </p>

                    {/* Details table (where specs table goes) */}
                    <div
                        className="overflow-hidden rounded-xl border"
                        style={{ borderColor: "var(--theme-border)" }}
                    >
                        <table className="w-full text-sm">
                            <tbody>
                                {[
                                    ["Reviewer", feedback.reviewer_name],
                                    ["Rating", `${feedback.rating} / 5`],
                                    ["Sold Date", feedback.sell_date],
                                    ["Product", product.name],
                                    ["Price", product.price],
                                ].map(([key, value], i) => (
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

                    {/* Link to original product (where marketplace links go) */}
                    <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-2 self-start rounded-xl border px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{
                            borderColor: "var(--theme-border)",
                            color: "var(--theme-text)",
                            backgroundColor: "var(--theme-surface)",
                        }}
                    >
                        View Product
                    </Link>
                </div>
            </div>
        </div>
    );
}
