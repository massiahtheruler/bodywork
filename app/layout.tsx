import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { brand } from "@/data/brand";
import { AmbientGlow } from "@/components/motion/AmbientGlow";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.baseUrl),
  title: {
    default: `${brand.name} | Massage and Bodywork Matching in Miami`,
    template: `%s | ${brand.name}`,
  },
  description:
    "A Miami booking and matching platform connecting visitors with independent licensed massage and bodywork providers.",
  openGraph: {
    title: `${brand.name} | Massage and Bodywork Matching in Miami`,
    description:
      "Tell us what you need, where you are located and when you are available. We will help connect you with an appropriate licensed provider.",
    url: brand.baseUrl,
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
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
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="paper-texture min-h-full">
        <AmbientGlow />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
