import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nubuilds",
  description: "nubuilds storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <header className="sticky top-0 z-50 border-b border-neutral-800 bg-black">
          <div className="mx-auto flex h-14 max-w-7xl items-center px-6">
            <span className="text-lg font-semibold tracking-tight text-white">
              nubuilds
            </span>
          </div>
        </header>
        <main className="min-h-[calc(100vh-3.5rem)] bg-white">{children}</main>
      </body>
    </html>
  );
}
