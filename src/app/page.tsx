import { getProducts } from "@/lib/products";
import { HomeClient } from "@/components/home-client";

export default function Home() {
  const products = getProducts();

  return <HomeClient products={products} />;
}
