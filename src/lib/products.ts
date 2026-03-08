import fs from "fs";
import path from "path";
import type { LocalizedString } from "./i18n";

export interface Product {
    slug: string;
    name: LocalizedString;
    description: LocalizedString;
    price: string;
    status: "available" | "sold";
    sold_date?: string;
    specs: Record<string, string>;
    images: string[];
    links: Record<string, string>;
    filters: Record<string, string>;
}

const PRODUCTS_DIR = path.join(process.cwd(), "public", "products");

/**
 * Read a single product by slug.
 * Expects public/products/<slug>/product.json and image files alongside it.
 */
export function getProduct(slug: string): Product | null {
    const dir = path.join(PRODUCTS_DIR, slug);
    const jsonPath = path.join(dir, "product.json");

    if (!fs.existsSync(jsonPath)) return null;

    const raw = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    // Use images from JSON if provided, otherwise auto-discover from folder
    let images: string[];
    if (Array.isArray(raw.images) && raw.images.length > 0) {
        images = raw.images.map((f: string) => `/products/${slug}/${f}`);
    } else {
        const allFiles = fs.readdirSync(dir);
        images = allFiles
            .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
            .map((f) => `/products/${slug}/${f}`);
    }

    return {
        slug,
        name: raw.name ?? slug,
        description: raw.description ?? "",
        price: raw.price ?? "",
        status: raw.status === "sold" ? "sold" : "available",
        sold_date: raw.sold_date,
        specs: raw.specs ?? {},
        images,
        links: raw.links ?? {},
        filters: raw.filters ?? {},
    };
}

/**
 * List all products by scanning public/products/ subdirectories.
 */
export function getProducts(): Product[] {
    if (!fs.existsSync(PRODUCTS_DIR)) return [];

    return fs
        .readdirSync(PRODUCTS_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => getProduct(d.name))
        .filter((p): p is Product => p !== null);
}
