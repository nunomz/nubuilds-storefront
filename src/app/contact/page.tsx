import ContactForm from "@/components/contact-form";

export const metadata = {
    title: "Contact — nubuilds",
    description: "Get in touch with nubuilds.",
};

export default function ContactPage() {
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
                        Let&apos;s Build<br />Something Great.
                    </h1>
                    <p
                        className="text-base leading-relaxed sm:text-lg"
                        style={{ color: "var(--theme-text-muted)" }}
                    >
                        Got a custom build in mind, or just want to say hello?
                        Drop me a message and I&apos;ll get back to you as soon as possible.
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
                                    Quick Response
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--theme-text-muted)" }}
                                >
                                    Usually within 24 hours
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
                                    Custom Builds
                                </p>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--theme-text-muted)" }}
                                >
                                    Tailored to your exact needs
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
                        Send a Message
                    </h2>
                    <ContactForm />
                </div>
            </section>

        </div>
    );
}
