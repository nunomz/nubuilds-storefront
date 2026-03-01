import Image from "next/image";
import { getAbout } from "@/lib/about";

export const metadata = {
    title: "About — nubuilds",
    description: "Learn more about nubuilds — premium custom PCs engineered for peak performance.",
};

export default function AboutPage() {
    const about = getAbout();

    return (
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-12">

            {/* ── Story / Bio Section ──────────────────────────── */}
            <section className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                {/* Image */}
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

                {/* Text */}
                <div className="flex flex-col gap-5">
                    <h2
                        className="text-2xl font-bold tracking-tight sm:text-3xl"
                        style={{ color: "var(--theme-text)" }}
                    >
                        {about.title}
                    </h2>
                    {about.paragraphs.map((text, i) => (
                        <p
                            key={i}
                            className="text-base leading-relaxed sm:text-lg"
                            style={{ color: "var(--theme-text-muted)" }}
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </section>

            {/* ── Metrics Bar ──────────────────────────────────── */}
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {about.stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center gap-1 rounded-2xl border px-4 py-8 text-center transition-colors"
                        style={{
                            borderColor: "var(--theme-border)",
                            backgroundColor: "var(--theme-surface)",
                        }}
                    >
                        <span
                            className="text-3xl font-extrabold tracking-tight sm:text-4xl"
                            style={{ color: "var(--theme-text)" }}
                        >
                            {stat.value}
                        </span>
                        <span
                            className="text-xs font-medium uppercase tracking-widest sm:text-sm"
                            style={{ color: "var(--theme-text-muted)" }}
                        >
                            {stat.label}
                        </span>
                    </div>
                ))}
            </section>

        </div>
    );
}
