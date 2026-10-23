import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { listSafetyNews, safetyPages } from "@/lib/safety/content";

export const metadata: Metadata = {
  title: "ХАБЭА мэдээ мэдээлэл",
  description: "Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн зөвлөмж, сургалт, үйл явдлын мэдээ — Ойгон Нөмрөг ХАБЭА.",
  alternates: { canonical: "/safety/news" },
  openGraph: {
    title: "ХАБЭА мэдээ мэдээлэл — Oigon Numrug ХАБЭА",
    description: "Хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн зөвлөмж, сургалт, үйл явдлын мэдээ — Ойгон Нөмрөг ХАБЭА.",
    url: "/safety/news",
  },
};

export default function SafetyNewsPage() {
  const page = safetyPages.news;
  const allNews = listSafetyNews();
  const featuredNews = allNews[0];
  const filteredNews = allNews.slice(1);

  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: "40vh", minHeight: "350px" }}>
        <Image
          src={page.hero_image || "/safety-bg.jpg"}
          alt="OHS News"
          fill
          priority
          sizes="100vw"
          className="sf-hero-image"
        />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            {page.hero_tag && <span className="sf-tag">{page.hero_tag}</span>}
            <h1 className="sf-hero-title">
              {page.hero_title}{" "}
              <span style={{ color: "var(--sf-yellow)" }}>{page.hero_highlight}</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="sf-block" style={{ paddingBottom: "60px" }}>
        <div className="sf-container">
          {featuredNews && (
            <div className="sf-news-featured sf-reveal">
              <div className="sf-news-featured-img">
                <Image
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="sf-news-featured-content">
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                  <span className="sf-news-date" style={{ margin: 0 }}>
                    {featuredNews.date}
                  </span>
                  {featuredNews.category && <span className="sf-pill">{featuredNews.category}</span>}
                </div>
                <h2 className="sf-news-title" style={{ fontSize: "32px", marginBottom: "20px" }}>
                  {featuredNews.title}
                </h2>
                <p className="sf-news-desc" style={{ fontSize: "16px" }}>
                  {featuredNews.description}
                </p>
                <Link
                  href={`/safety/news/${featuredNews.id}`}
                  className="sf-btn sf-btn--primary"
                  style={{ marginTop: "auto", alignSelf: "flex-start" }}
                >
                  Унших
                </Link>
              </div>
            </div>
          )}

          <div className="sf-news-list sf-reveal" style={{ marginTop: "60px" }}>
            {filteredNews.map((news, index) => (
              <Link
                key={news.id}
                href={`/safety/news/${news.id}`}
                className="sf-news-item sf-news-item--horizontal"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="sf-news-image">
                  <Image src={news.image} alt={news.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="sf-news-content">
                  <span className="sf-news-date">{news.date}</span>
                  <h3 className="sf-news-title">{news.title}</h3>
                  <p className="sf-news-desc">{news.description}</p>
                  <span className="sf-news-link">Цааш унших →</span>
                </div>
              </Link>
            ))}
          </div>

          {allNews.length > 0 && (
            <div className="sf-pagination sf-reveal">
              <button className="sf-page-btn" disabled>
                Өмнөх
              </button>
              <button className="sf-page-btn active">1</button>
              <button className="sf-page-btn" disabled>
                Дараах
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
