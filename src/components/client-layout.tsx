"use client";

import Link from "next/link";
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

                            <Link
                                href="/"
                                className="text-lg font-semibold tracking-tight transition-colors"
                                style={{ color: "var(--theme-text)" }}
                            >
                                nubuilds
                            </Link>

                            {/* Desktop nav */}
                            <nav className="ml-8 hidden items-center gap-6 md:flex">
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

                            <div className="ml-auto">
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

