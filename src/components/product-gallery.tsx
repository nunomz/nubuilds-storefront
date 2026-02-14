"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

function NavigationArrows({
    hasPrev,
    hasNext,
    onPrev,
    onNext,
}: {
    hasPrev: boolean;
    hasNext: boolean;
    onPrev: () => void;
    onNext: () => void;
}) {
    return (
        <>
            {hasPrev && (
                <button
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    onClick={onPrev}
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            )}
            {hasNext && (
                <button
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                    onClick={onNext}
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            )}
        </>
    );
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [[index, direction], setIndex] = useState([0, 0]);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const changeImage = useCallback(
        (newIndex: number) => {
            setIndex([newIndex, newIndex > index ? 1 : -1]);
        },
        [index],
    );

    const hasPrev = index > 0;
    const hasNext = index < images.length - 1;

    // Keyboard navigation
    useEffect(() => {
        if (!lightboxOpen) return;

        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") setLightboxOpen(false);
            if (e.key === "ArrowRight" && index < images.length - 1)
                setIndex(([i]) => [i + 1, 1]);
            if (e.key === "ArrowLeft" && index > 0)
                setIndex(([i]) => [i - 1, -1]);
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [lightboxOpen, index, images.length]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (lightboxOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxOpen]);

    return (
        <MotionConfig
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            }}
        >
            <div className="flex w-full flex-col gap-3 lg:w-[50%]">
                {/* Main image area */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl border" style={{ borderColor: "var(--theme-border)", backgroundColor: "var(--theme-surface)" }}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={index}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 cursor-pointer"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <Image
                                src={images[index] ?? "/images/hero/product.png"}
                                alt={`${productName} — image ${index + 1}`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    <NavigationArrows
                        hasPrev={hasPrev}
                        hasNext={hasNext}
                        onPrev={() => changeImage(index - 1)}
                        onNext={() => changeImage(index + 1)}
                    />
                </div>

                {/* Bottom thumbnail strip */}
                {images.length > 1 && (
                    <div className="flex gap-2">
                        {images.map((img, i) => (
                            <button
                                key={img}
                                onClick={() => changeImage(i)}
                                className={`relative aspect-[3/2] w-20 shrink-0 overflow-hidden rounded-lg border transition-all ${i === index
                                    ? "brightness-110 ring-1 ring-white/30"
                                    : "brightness-50 contrast-125 hover:brightness-75"
                                    }`}
                                style={{ borderColor: i === index ? "var(--theme-text)" : "var(--theme-border)" }}
                            >
                                <Image
                                    src={img}
                                    alt={`${productName} — thumbnail ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Fullscreen lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
                        onClick={() => setLightboxOpen(false)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute right-4 top-4 z-20 rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                            onClick={() => setLightboxOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Lightbox image */}
                        <div
                            className="relative flex h-full w-full max-w-6xl items-center justify-center p-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={index}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-10"
                                >
                                    <Image
                                        src={images[index] ?? "/images/hero/product.png"}
                                        alt={`${productName} — image ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation arrows */}
                            <NavigationArrows
                                hasPrev={hasPrev}
                                hasNext={hasNext}
                                onPrev={() => changeImage(index - 1)}
                                onNext={() => changeImage(index + 1)}
                            />
                        </div>

                        {/* Bottom thumbnail strip in lightbox */}
                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                                {images.map((img, i) => (
                                    <button
                                        key={img}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            changeImage(i);
                                        }}
                                        className={`relative aspect-[3/2] w-20 shrink-0 overflow-hidden rounded-lg border transition-all ${i === index
                                            ? "border-white/50 brightness-110 ring-1 ring-white/30"
                                            : "border-white/10 brightness-50 contrast-125 hover:brightness-75"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${productName} — thumbnail ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </MotionConfig>
    );
}
