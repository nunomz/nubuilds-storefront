import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/products";

export default function Home() {
  const products = getProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--theme-border)" }}>
        {/* Background image with blur */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/background.jpeg"
            alt="Hero background"
            fill
            className="object-cover blur-sm brightness-50"
            priority
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center px-10 lg:px-16">
          {/* Left side — text */}
          <div className="flex max-w-lg flex-col gap-5">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
              Built Different.
            </h1>
            <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
              Premium custom PCs engineered for peak performance. Crafted with
              precision, designed for power.
            </p>
          </div>

          {/* Right side — product PNG */}
          <div className="pointer-events-none absolute right-6 top-1/2 hidden h-[80%] w-[40%] -translate-y-1/2 md:block lg:w-[45%]">
            <Image
              src="/images/hero/product.png"
              alt="Featured product"
              width={900}
              height={600}
              className="h-full w-full object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
