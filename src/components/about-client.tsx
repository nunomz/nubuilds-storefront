"use client";

import Image from "next/image";
import Link from "next/link";
import type { AboutData } from "@/lib/about";
import { useLocale } from "@/components/language-provider";
import { localize, t } from "@/lib/i18n";

interface AboutClientProps {
    about: AboutData;
}

export function AboutClient({ about }: AboutClientProps) {
    const { locale } = useLocale();

    return (
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-12">

            {/* ── Hero / Bio Section ──────────────────────────── */}
            <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">

                {/* Left — Big Title & Description */}
                <div className="flex flex-col gap-5 md:sticky md:top-28">
                    <h1
                        className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                        style={{ color: "var(--theme-text)" }}
                    >
                        {localize(about.title, locale)}
                    </h1>
                    {about.paragraphs.map((text, i) => (
                        <p
                            key={i}
                            className="text-base leading-relaxed sm:text-lg"
                            style={{ color: "var(--theme-text-muted)" }}
                        >
                            {localize(text, locale)}
                        </p>
                    ))}

                    {/* CTA Button */}
                    <Link
                        href="https://nuno.gg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            backgroundColor: "var(--theme-text)",
                            color: "var(--theme-bg)",
                            borderColor: "var(--theme-text)",
                        }}
                    >
                        {t(locale, "about.cta")}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {/* Right — Image */}
                <div
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
                    style={{ borderColor: "var(--theme-border)" }}
                >
                    <Image
                        src={about.image}
                        alt="The nubuilds workspace"
                        fill
                        className="object-cover"
                    />
                    {/* Subtle gradient overlay at bottom */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-1/3"
                        style={{
                            background:
                                "linear-gradient(to top, var(--theme-bg), transparent)",
                        }}
                    />
                </div>
            </section>

        </div>
    );
}
