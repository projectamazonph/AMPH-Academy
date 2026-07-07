import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['localhost'],
  experimental: {
    serverActions: {
      allowedOrigins: [
        'amph-academy.vercel.app',
        'localhost',
      ],
    },
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
