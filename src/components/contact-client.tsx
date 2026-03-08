"use client";

import ContactForm from "@/components/contact-form";
import { useLocale } from "@/components/language-provider";
import { t } from "@/lib/i18n";

export default function ContactClient() {
    const { locale } = useLocale();

    const titleParts = t(locale, "contact.title").split("\n");

    return (
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-12">

            {/* ── Hero Section ──────────────────────────────────── */}
            <section className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">

                {/* Left — Heading & Description */}
                <div className="flex flex-col gap-5 md:sticky md:top-28">
                    <h1
                        className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                        style={{ color: "var(--theme-text)" }}
                    >
                        {titleParts.map((part, i) => (
                            <span key={i}>
                                {part}
                                {i < titleParts.length - 1 && <br />}
                            </span>
                        ))}
                    </h1>
                    <p
                        className="text-base leading-relaxed sm:text-lg"
                        style={{ color: "var(--theme-text-muted)" }}
                    >
                        {t(locale, "contact.subtitle")}
                    </p>

                    {/* Decorative info cards */}
                    <div className="mt-4 flex flex-col gap-3">
                        <div
                            className="flex items-center gap-4 rounded-xl border px-5 py-4"
                            style={{
                                borderColor: "var(--theme-border)",
                                backgroundColor: "var(--theme-surface)",
                            }}
                        >
                            <span className="text-2xl">⚡</span>
                            <div>
                                <p
                                    className="text-sm font-semibold"
                                    style={{ color: "var(--theme-text)" }}
                                >
                                    {t(locale, "contact.quickResponse")}
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--theme-text-muted)" }}
                                >
                                    {t(locale, "contact.quickResponseDesc")}
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-4 rounded-xl border px-5 py-4"
                            style={{
                                borderColor: "var(--theme-border)",
                                backgroundColor: "var(--theme-surface)",
                            }}
                        >
                            <span className="text-2xl">🛠️</span>
                            <div>
                                <p
                                    className="text-sm font-semibold"
                                    style={{ color: "var(--theme-text)" }}
                                >
                                    {t(locale, "contact.customBuilds")}
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--theme-text-muted)" }}
                                >
                                    {t(locale, "contact.customBuildsDesc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Contact Form */}
                <div
                    className="rounded-2xl border p-6 sm:p-8"
                    style={{
                        borderColor: "var(--theme-border)",
                        backgroundColor: "var(--theme-surface)",
                    }}
                >
                    <h2
                        className="mb-6 text-lg font-semibold tracking-tight"
                        style={{ color: "var(--theme-text)" }}
                    >
                        {t(locale, "contact.sendMessage")}
                    </h2>
                    <ContactForm />
                </div>
            </section>

        </div>
    );
}
