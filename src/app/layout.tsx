import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulai.com"),
  title: {
    default: "Rahul AI Product Consultant | rahulai.com",
    template: "%s | Rahul AI Product Consultant",
  },
  description:
    "Rahul helps startups, SMEs, and enterprise teams design, build, and scale AI products, automation systems, and enterprise-grade digital transformation.",
  openGraph: {
    title: "Rahul AI Product Consultant",
    description:
      "Premium personal website for Rahul, an AI Product Consultant, AI Entrepreneur, and Founder.",
    url: "https://rahulai.com",
    siteName: "rahulai.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul AI Product Consultant",
    description:
      "Rahul helps organizations transform with strategy-led AI products and enterprise execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
