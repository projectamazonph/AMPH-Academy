import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/session-provider";
import { ErrorBoundary } from "@/components/amph/error-boundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ProjectAMPH Academy — Break the ₱15k VA Ceiling",
  description:
    "Filipino VA earning ₱15k a month? Learn Amazon PPC from Ryan Dabao (14yr VA, ₱50M+ ad spend) and start billing ₱60k–₱80k/month. Interactive simulations, structured curriculum, and real campaign practice. Built for Filipino VAs by ProjectAmazonPH.",
  keywords: [
    "Amazon PPC",
    "ProjectAMPH Academy",
    "ProjectAMPH",
    "AMPH",
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
  authors: [{ name: "Ryan Dabao — ProjectAmazonPH" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ProjectAMPH Academy — Break the ₱15k VA Ceiling",
    description:
      "Filipino VA earning ₱15k a month? Learn Amazon PPC from Ryan Dabao and start billing ₱60k–₱80k/month. ProjectAmazonPH's advanced PPC training platform.",
    type: "website",
    siteName: "ProjectAMPH Academy",
    url: "https://amph-academy.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProjectAMPH Academy — Amazon PPC Command Center",
    description:
      "Master Amazon PPC through interactive simulations and structured learning. Built for Filipino VAs by ProjectAmazonPH.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://amph-academy.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <ErrorBoundary>
            <div className="noise-overlay" />
            {children}
          </ErrorBoundary>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
