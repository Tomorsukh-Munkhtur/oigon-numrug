import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // Self-hosted on EC2 — keep optimizer disabled so newly uploaded files
    // are served directly from /public/uploads/* without the /_next/image
    // pipeline (which can fail when Sharp is missing on the host).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
