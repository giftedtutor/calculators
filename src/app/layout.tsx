import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Sora } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd, buildPageMetadata, websiteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `${SITE.name} — Free Online Calculators`,
    description: `${SITE.tagline}. EMI, BMI, age, GST, currency, unit conversion, scientific calculator, and more.`,
    path: "/",
    keywords: [
      "online calculator",
      "EMI calculator",
      "BMI calculator",
      "age calculator",
      "GST calculator",
      "currency converter",
      "scientific calculator",
    ],
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e7c6b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" className={`${sora.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased" suppressHydrationWarning>
        {adsense ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        ) : null}
        <JsonLd data={websiteJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
