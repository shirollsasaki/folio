import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/folio',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://folio-afterapp.vercel.app' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
};

export default nextConfig;
