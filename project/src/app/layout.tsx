import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PapHeader } from "@/components/header";
import { AuthProvider } from "@/components/providers/session-provider";
import { ErrorBoundary } from "@/components/amph/error-boundary";

const BASE_URL = "https://amph-academy.vercel.app";

// Brand standard font: Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ProjectAmazonPH Academy — Break the ₱15k VA Ceiling",
    template: "%s | ProjectAmazonPH Academy",
  },
  description:
    "Filipino VA earning ₱15k a month? Learn Amazon PPC from Ryan Dabao (14yr VA, ₱50M+ ad spend) and start billing ₱60k–₱80k/month. Interactive simulations, structured curriculum, and real campaign practice.",
  other: {
    "google-fonts": "https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&display=swap",
  },
  keywords: [
    "Amazon PPC",
    "ProjectAmazonPH Academy",
    "ProjectAmazonPH",
    "ProjectAmazonPH",
    "PPC Training Philippines",
    "Filipino VA",
    "VA Philippines",
    "Amazon PPC Philippines",
    "Campaign Management",
    "Bidding Strategy",
    "Search Term Optimization",
    "ACoS",
    "ROAS",
    "CPC",
    "freelancing Philippines",
    "online jobs Philippines",
    "Ryan Dabao",
    "ProjectAmazonPH",
  ],
  authors: [{ name: "Ryan Dabao", url: "https://projectamazonph.com" }],
  creator: "ProjectAmazonPH",
  publisher: "ProjectAmazonPH",
  metadataBase: new URL("https://amph-academy.vercel.app"),
  icons: {
    icon: "/icons/icon-32.png",
    apple: "/icons/icon-180.png",
    other: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://amph-academy.vercel.app",
    siteName: "ProjectAmazonPH Academy",
    title: "ProjectAmazonPH Academy — Break the ₱15k VA Ceiling",
    description:
      "Filipino VA earning ₱15k a month? Learn Amazon PPC from Ryan Dabao and start billing ₱60k–₱80k/month.",
    images: [
      {
        url: "/og/projectamazonph-og.png",
        width: 1200,
        height: 630,
        alt: "ProjectAmazonPH Academy — Learn • Earn • Empower",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@projectamazonph",
    creator: "@ryandabao",
    title: "ProjectAmazonPH Academy — Amazon PPC Command Center",
    description:
      "Master Amazon PPC through interactive simulations and structured learning. Built for Filipino VAs by ProjectAmazonPH.",
    images: ["/og/projectamazonph-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://amph-academy.vercel.app",
    languages: {
      "en-US": "https://amph-academy.vercel.app",
      "fil-PH": "https://amph-academy.vercel.app",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <ErrorBoundary>
            <div className="noise-overlay" />
            <PapHeader />
            <main id="main-content">
              {children}
            </main>
          </ErrorBoundary>
        </AuthProvider>
        <Toaster />
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ProjectAmazonPH",
              url: "https://projectamazonph.com",
              logo: `${BASE_URL}/icons/icon-og.png`,
              sameAs: [
                "https://www.facebook.com/projectamazonph",
                "https://www.linkedin.com/company/projectamazonph",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                availableLanguage: ["en", "fil"],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
