import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Hero Section */}
      <section className="relative h-96 overflow-visible rounded-2xl">
        {/* Background image with blur */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <Image
            src="/images/hero/background.png"
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
          {/* Left side — text & buttons */}
          <div className="flex max-w-lg flex-col gap-5">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
              Built Different.
            </h1>
            <p className="text-base leading-relaxed text-neutral-300 lg:text-lg">
              Premium custom PCs engineered for peak performance. Crafted with
              precision, designed for power.
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                size="lg"
                className="rounded-full bg-white px-8 font-semibold text-black hover:bg-neutral-200"
              >
                Shop Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-neutral-500 px-8 font-semibold text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right side — product PNG (overflows the hero) */}
          <div className="pointer-events-none absolute -right-12 top-1/2 hidden w-[50%] max-h-[28rem] -translate-y-1/2 md:block lg:w-[55%]">
            <Image
              src="/images/hero/product.png"
              alt="Featured product"
              width={900}
              height={600}
              className="h-full max-h-[28rem] w-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Tiles */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="border border-neutral-200 shadow-sm">
            <CardContent className="flex h-48 items-center justify-center">
              <span className="text-sm text-neutral-400">Tile {i + 1}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
