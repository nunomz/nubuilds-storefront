import { notFound } from "next/navigation";
import { getProductFeedback, getProductsWithFeedback } from "@/lib/feedback";
import { FeedbackDetailClient } from "@/components/feedback-detail-client";
import { localize } from "@/lib/i18n";

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
    return { title: `Feedback — ${localize(item.product.name, "en")} — nubuilds` };
}

export default async function FeedbackDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = getProductFeedback(slug);
    if (!item) notFound();

    return <FeedbackDetailClient item={item} />;
}
