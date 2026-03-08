import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import { hasFeedback } from "@/lib/feedback";
import { ProductDetailClient } from "@/components/product-detail-client";
import { localize } from "@/lib/i18n";

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
    return { title: `${localize(product.name, "en")} — nubuilds` };
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
        <ProductDetailClient
            product={product}
            productHasFeedback={productHasFeedback}
        />
    );
}
