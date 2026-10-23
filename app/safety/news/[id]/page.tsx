import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSafetyNews, listSafetyNews, safetyNews } from "@/lib/safety/content";

// Бүх мэдээний хуудсыг build үед бэлдэнэ; бусад ID 404 өгнө.
export const dynamicParams = false;

export function generateStaticParams() {
  return safetyNews.map((news) => ({ id: String(news.id) }));
}

function paragraphs(body: string | null | undefined) {
  if (!body) return [];
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function readingMinutes(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = getSafetyNews(Number(id));
  if (!item) return { title: "Мэдээ олдсонгүй" };
  const url = `/safety/news/${item.id}`;
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.description,
      url,
      images: item.image ? [item.image] : undefined,
    },
  };
}

export default async function SafetyNewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const item = getSafetyNews(numericId);
  if (!item) notFound();

  const blocks = paragraphs(item.body);
  const related = listSafetyNews(4)
    .filter((news) => news.id !== item.id)
    .slice(0, 3);

  const readTime = readingMinutes(
    `${item.title} ${item.description} ${item.body ?? ""}`
  );

  return (
    <article className="sf-article">
      <nav className="sf-article__topbar">
        <div className="sf-container">
          <Link href="/safety/news" className="sf-article__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Бүх мэдээ
          </Link>
        </div>
      </nav>

      <header className="sf-article__head">
        <div className="sf-container sf-article__head-inner">
          <div className="sf-article__meta">
            {item.category && (
              <span className="sf-article__category">{item.category}</span>
            )}
            <span className="sf-article__dot" aria-hidden="true" />
            <span className="sf-article__date">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {formatDate(item.date)}
            </span>
            <span className="sf-article__dot" aria-hidden="true" />
            <span className="sf-article__read">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {readTime} мин унших
            </span>
          </div>

          <h1 className="sf-article__title">{item.title}</h1>

          {item.description && (
            <p className="sf-article__lead">{item.description}</p>
          )}
        </div>
      </header>

      {item.image && (
        <div className="sf-container">
          <figure className="sf-article__figure sf-reveal">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="sf-article__figure-image"
            />
          </figure>
        </div>
      )}

      <section className="sf-block sf-article__main">
        <div className="sf-container">
          <div className="sf-article__body">
            {blocks.length > 0 ? (
              blocks.map((block, index) => <p key={index}>{block}</p>)
            ) : item.description ? (
              <p>{item.description}</p>
            ) : (
              <p className="sf-article__empty">
                Энэ мэдээний дэлгэрэнгүй агуулга бэлэн болоогүй байна.
              </p>
            )}

            <div className="sf-article__footer">
              <Link href="/safety/news" className="sf-btn sf-btn--outline">
                ← Бусад мэдээ үзэх
              </Link>
              <Link href="/safety/contact" className="sf-btn sf-btn--primary">
                Зөвлөгөө авах
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sf-block sf-block--alt">
          <div className="sf-container">
            <div className="sf-section-top sf-reveal" style={{ marginBottom: "30px" }}>
              <span className="sf-tag">Бусад мэдээ</span>
              <h2>
                Үргэлжлүүлэн <span className="sf-gradient-text">унших</span>
              </h2>
            </div>

            <div className="sf-news-grid">
              {related.map((news, index) => (
                <Link
                  key={news.id}
                  href={`/safety/news/${news.id}`}
                  className="sf-news-item sf-reveal"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="sf-news-image">
                    {news.image && (
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="sf-news-content">
                    <span className="sf-news-date">{formatDate(news.date)}</span>
                    <h3 className="sf-news-title">{news.title}</h3>
                    {news.description && (
                      <p className="sf-news-desc">{news.description}</p>
                    )}
                    <span className="sf-news-link">Цааш унших →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
