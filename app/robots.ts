import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oigonnumrug.mn";

// Static export (Cloudflare Pages): build үед нэг удаа үүсгэнэ.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: SITE_URL,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
