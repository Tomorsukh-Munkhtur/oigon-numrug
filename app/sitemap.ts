import type { MetadataRoute } from "next";
import { safetyNews } from "@/lib/safety/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oigonnumrug.mn";

// Static export (Cloudflare Pages): build үед нэг удаа үүсгэнэ.
export const dynamic = "force-static";

type Route = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const staticRoutes: Route[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/real-estate", changeFrequency: "weekly", priority: 0.95 },
  { path: "/safety", changeFrequency: "weekly", priority: 0.9 },
  { path: "/safety/news", changeFrequency: "weekly", priority: 0.8 },
  { path: "/safety/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/safety/services", changeFrequency: "monthly", priority: 0.7 },
  { path: "/safety/contact", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Route[] = [
    ...staticRoutes,
    ...safetyNews.map((news) => ({
      path: `/safety/news/${news.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
