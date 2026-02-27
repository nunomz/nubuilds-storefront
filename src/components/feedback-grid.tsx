"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductWithFeedback } from "@/lib/feedback";
import { Star } from "lucide-react";

interface FeedbackGridProps {
    items: ProductWithFeedback[];
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    className={`h-4 w-4 ${i <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-none text-neutral-500"
                        }`}
                />
            ))}
        </div>
    );
}

export function FeedbackGrid({ items }: FeedbackGridProps) {
    if (items.length === 0) {
        return (
            <p
                className="py-20 text-center text-sm"
                style={{ color: "var(--theme-text-muted)" }}
            >
                No feedback available yet.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(({ product, feedback }) => (
                <Link
                    key={product.slug}
                    href={`/feedback/${product.slug}`}
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
                            <div className="flex items-center gap-2">
                                <StarRating rating={feedback.rating} />
                                <span className="text-sm font-semibold text-white">
                                    {feedback.rating}/5
                                </span>
                            </div>
                            <p className="mt-1.5 font-semibold text-white">
                                &ldquo;{feedback.review_title}&rdquo;
                            </p>
                            <p className="mt-0.5 text-sm text-neutral-300">
                                — {feedback.reviewer_name}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
