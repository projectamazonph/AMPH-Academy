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
  },
  serverExternalPackages: ['@prisma/client'],
};

export default nextConfig;
