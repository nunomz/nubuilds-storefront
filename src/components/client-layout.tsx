"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import { ThemeDropdown } from "./theme-dropdown";
import { Menu, X } from "lucide-react";

const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Build breadcrumb segments from the current path
    const segments = pathname === "/" ? [] : pathname.split("/").filter(Boolean);
    const breadcrumbs = segments.map((seg, i) => ({
        label: decodeURIComponent(seg)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        href: "/" + segments.slice(0, i + 1).join("/"),
    }));

    // Close mobile menu on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMobileMenuOpen(false);
            }
        }
        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClick);
            return () => document.removeEventListener("mousedown", handleClick);
        }
    }, [mobileMenuOpen]);

    return (
        <ThemeProvider>
            <div
                className="min-h-screen transition-colors duration-300"
                style={{ backgroundColor: "var(--theme-bg)" }}
            >
                <div className="sticky top-0 z-50 mx-auto max-w-7xl px-4 pt-4 md:px-6">
                    <header
                        className="rounded-2xl border backdrop-blur-xl transition-colors duration-300"
                        style={{
                            backgroundColor: "var(--theme-header-bg)",
                            borderColor: "var(--theme-border)",
                        }}
                        ref={menuRef}
                    >
                        <div className="flex h-14 items-center px-4 md:px-6">
                            {/* Mobile hamburger button */}
                            <button
                                className="mr-3 flex items-center justify-center rounded-lg p-1.5 transition-colors md:hidden"
                                style={{ color: "var(--theme-text-muted)" }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </button>

                            <div className="flex items-center gap-2 min-w-0">
                                <Link
                                    href="/"
                                    className="text-lg font-semibold tracking-tight transition-colors shrink-0"
                                    style={{ color: breadcrumbs.length > 0 ? "var(--theme-text-muted)" : "var(--theme-text)" }}
                                >
                                    nubuilds
                                </Link>
                                {breadcrumbs.map((crumb, i) => (
                                    <span key={crumb.href} className="flex items-center gap-2 min-w-0">
                                        <span
                                            className="text-lg font-light select-none shrink-0"
                                            style={{ color: "var(--theme-text-muted)", opacity: 0.4 }}
                                        >
                                            /
                                        </span>
                                        {i === breadcrumbs.length - 1 ? (
                                            <span
                                                className="text-lg font-semibold tracking-tight truncate"
                                                style={{ color: "var(--theme-text)" }}
                                            >
                                                {crumb.label}
                                            </span>
                                        ) : (
                                            <Link
                                                href={crumb.href}
                                                className="text-lg font-semibold tracking-tight transition-colors truncate"
                                                style={{ color: "var(--theme-text-muted)" }}
                                            >
                                                {crumb.label}
                                            </Link>
                                        )}
                                    </span>
                                ))}
                            </div>

                            {/* Desktop nav + theme toggle (right side) */}
                            <div className="ml-auto hidden items-center gap-6 md:flex">
                                <nav className="flex items-center gap-6">
                                    {navLinks.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="text-sm font-medium transition-colors"
                                            style={{ color: "var(--theme-text-muted)" }}
                                            onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                "var(--theme-text)")
                                            }
                                            onMouseLeave={(e) =>
                                            (e.currentTarget.style.color =
                                                "var(--theme-text-muted)")
                                            }
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </nav>
                                <ThemeDropdown />
                            </div>

                            {/* Mobile theme toggle (right side) */}
                            <div className="ml-auto md:hidden">
                                <ThemeDropdown />
                            </div>
                        </div>

                        {/* Mobile dropdown menu */}
                        {mobileMenuOpen && (
                            <nav
                                className="border-t px-4 py-3 md:hidden"
                                style={{ borderColor: "var(--theme-border)" }}
                            >
                                <div className="flex flex-col gap-1">
                                    {navLinks.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                                            style={{ color: "var(--theme-text-muted)" }}
                                            onClick={() => setMobileMenuOpen(false)}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = "var(--theme-text)";
                                                e.currentTarget.style.backgroundColor = "var(--theme-surface)";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = "var(--theme-text-muted)";
                                                e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </nav>
                        )}
                    </header>
                </div>
                <main>{children}</main>
            </div>
        </ThemeProvider>
    );
}

