import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/session-provider";
import { ErrorBoundary } from "@/components/adcraft/error-boundary";

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
  title: "AdCraft Academy — Break the ₱15k VA Ceiling",
  description:
    "Filipino VA earning ₱15k a month? Learn Amazon PPC and start billing ₱60k–₱80k/month. Interactive simulations, structured curriculum, and real campaign practice. Built for Filipino VAs.",
  keywords: [
    "Amazon PPC",
    "AdCraft",
    "Adcraft Academy",
    "PPC Training",
    "Filipino VA",
    "VA Philippines",
    "Campaign Management",
    "Bidding Strategy",
    "Search Term Optimization",
    "ACoS",
    "ROAS",
    "CPC",
    "freelancing Philippines",
    "online jobs Philippines",
  ],
  authors: [{ name: "Ryan Dabao — ProjectAmazonPH" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AdCraft Academy — Break the ₱15k VA Ceiling",
    description:
      "Filipino VA earning ₱15k a month? Learn Amazon PPC and start billing ₱60k–₱80k/month. Built for Filipino VAs.",
    type: "website",
    siteName: "Adcraft Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdCraft — Amazon PPC Command Center",
    description:
      "Master Amazon PPC through interactive simulations and structured learning",
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
