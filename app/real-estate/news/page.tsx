import Image from "next/image";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import { reNews } from "@/lib/real-estate/content";

export const metadata = {
  title: "Мэдээ ба тойм — Oigon Numrug Properties",
};

export default function NewsPage() {
  const [featured, ...rest] = reNews;

  return (
    <>
      <PageHero
        eyebrow="Мэдээ ба тойм"
        title={<>Зах зээлээс шууд хүргэх ойлголтууд</>}
        description="Долоо хоног бүр шинэчлэгдэх зах зээлийн тойм, шинжилгээ, зөвлөмжүүд. Худалдан авагч, төслийн эзэн, хөрөнгө оруулагчдад зориулсан."
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/news", label: "Мэдээ" },
        ]}
      />

      <section className="re-section">
        <div className="re-container">
          <article className="re-news-feature re-news-feature--page">
            <div className="re-news-feature__media">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 980px) 60vw, 100vw"
                className="re-news-feature__photo"
              />
              <div className="re-news-feature__overlay" aria-hidden="true" />
              <span className="re-news-feature__badge">{featured.category}</span>
            </div>
            <div className="re-news-feature__body">
              <div className="re-news-meta">
                <span>{featured.date}</span>
                <span aria-hidden="true">·</span>
                <span>{featured.readMinutes} мин унших</span>
              </div>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <Link className="re-news-feature__cta" href="/real-estate/contact">
                Дэлгэрэнгүй хүсэх
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>

          <div className="re-news-cards">
            {rest.map((item) => (
              <article key={item.id} className="re-news-card">
                <div className="re-news-card__media">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 980px) 33vw, (min-width: 720px) 50vw, 100vw"
                    className="re-news-card__photo"
                  />
                  <span className="re-news-card__cat">{item.category}</span>
                </div>
                <div className="re-news-card__body">
                  <div className="re-news-meta re-news-meta--dark">
                    <span>{item.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.readMinutes} мин</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <Link href="/real-estate/contact" className="re-news-card__cta">
                    Унших →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="re-cta">
        <div className="re-container re-cta-inner">
          <div className="re-cta-copy">
            <span className="re-eyebrow re-eyebrow--light">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              Шинэ мэдээллийг авах
            </span>
            <h2>Зах зээлийн долоо хоног тутмын тоймыг тогтмол хүлээж аваарай.</h2>
            <p>
              Бид зөвлөгөө, шинжилгээ, тоо баримтыг таны и-мэйл рүү долоо хоног
              бүр явуулна.
            </p>
            <div className="re-cta-actions">
              <Link href="/real-estate/contact" className="re-btn re-btn--primary">
                Захиалга үүсгэх
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
