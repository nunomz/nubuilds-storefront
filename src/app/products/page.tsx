import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";

export const metadata = {
    title: "Products — nubuilds",
    description: "Browse our collection of premium custom PCs.",
};

export default function ProductsPage() {
    const products = getProducts();

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="group"
                    >
                        <div
                            className="relative aspect-square overflow-hidden rounded-2xl border transition-colors"
                            style={{
                                borderColor: "var(--theme-border)",
                                backgroundColor: "var(--theme-surface)",
                            }}
                        >
                            <Image
                                src={product.images[0] ?? "/images/hero/product.png"}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                                <p className="font-semibold text-white">{product.name}</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className="text-sm text-neutral-300">{product.price}</span>
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${product.status === "sold"
                                            ? "bg-red-500/15 text-red-400"
                                            : "bg-emerald-500/15 text-emerald-400"
                                            }`}
                                    >
                                        {product.status === "sold" ? "Sold" : "Available"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
