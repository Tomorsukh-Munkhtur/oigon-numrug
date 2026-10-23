import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Бүрэн статик сайт: `next build` нь out/ хавтсанд HTML үүсгэж, Cloudflare Pages түүнийг шууд үйлчилнэ.
  output: "export",
  images: {
    // Static export has no image optimizer — images in /public are served as-is.
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
