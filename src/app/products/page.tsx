import { getProducts } from "@/lib/products";
import { ProductsClient } from "@/components/products-client";

export const metadata = {
    title: "Products — nubuilds",
    description: "Browse our collection of premium custom PCs.",
};

export default function ProductsPage() {
    const products = getProducts();

    return <ProductsClient products={products} />;
}
