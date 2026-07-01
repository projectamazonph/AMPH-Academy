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
  title: "AdCraft — Amazon PPC Command Center",
  description:
    "Master Amazon PPC through interactive simulations and structured learning modules. Train your skills in campaign architecture, bidding strategies, and search term optimization.",
  keywords: [
    "Amazon PPC",
    "AdCraft",
    "Adcraft Academy",
    "PPC Training",
    "Campaign Management",
    "Bidding Strategy",
    "Search Term Optimization",
    "ACoS",
    "ROAS",
    "CPC",
  ],
  authors: [{ name: "Ryan Dabao — ProjectAmazonPH" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "AdCraft — Amazon PPC Command Center",
    description:
      "Master Amazon PPC through interactive simulations and structured learning",
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
