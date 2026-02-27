import fs from "fs";
import path from "path";
import type { Product } from "./products";
import { getProduct, getProducts } from "./products";

export interface Feedback {
    review_title: string;
    review_body: string;
    rating: number;
    sell_date: string;
    reviewer_name: string;
}

export interface ProductWithFeedback {
    product: Product;
    feedback: Feedback;
    feedbackImages: string[];
}

const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");

/**
 * Check if a product has feedback (is sold + has feedback.json).
 */
export function hasFeedback(slug: string): boolean {
    const feedbackPath = path.join(PRODUCTS_DIR, slug, "feedback.json");
    const product = getProduct(slug);
    return product !== null && product.status === "sold" && fs.existsSync(feedbackPath);
}

/**
 * Get feedback for a single product by slug.
 * Returns null if the product is not sold or has no feedback.json.
 */
export function getProductFeedback(slug: string): ProductWithFeedback | null {
    const product = getProduct(slug);
    if (!product || product.status !== "sold") return null;

    const feedbackPath = path.join(PRODUCTS_DIR, slug, "feedback.json");
    if (!fs.existsSync(feedbackPath)) return null;

    const raw = JSON.parse(fs.readFileSync(feedbackPath, "utf-8"));

    // Discover feedback images
    const feedbackPicsDir = path.join(PRODUCTS_DIR, slug, "feedback_pics");
    let feedbackImages: string[] = [];
    if (fs.existsSync(feedbackPicsDir)) {
        feedbackImages = fs
            .readdirSync(feedbackPicsDir)
            .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
            .map((f) => `/products/${slug}/feedback_pics/${f}`);
    }

    return {
        product,
        feedback: {
            review_title: raw.review_title ?? "",
            review_body: raw.review_body ?? "",
            rating: typeof raw.rating === "number" ? raw.rating : 0,
            sell_date: raw.sell_date ?? "",
            reviewer_name: raw.reviewer_name ?? "Anonymous",
        },
        feedbackImages,
    };
}

/**
 * List all products that have feedback.
 */
export function getProductsWithFeedback(): ProductWithFeedback[] {
    const products = getProducts();
    return products
        .filter((p) => p.status === "sold")
        .map((p) => getProductFeedback(p.slug))
        .filter((pf): pf is ProductWithFeedback => pf !== null);
}
