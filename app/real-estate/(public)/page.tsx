import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getHomeSettings,
  listProjects,
} from "@/lib/real-estate/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Үл хөдлөх хөрөнгийн зуучлал, маркетинг — Дархан",
  description:
    "Oigon Numrug Properties — Дархан хотын үл хөдлөх хөрөнгийн зуучлал, төслийн маркетинг, зөвлөгөө. 12 жилийн туршлага, 120+ төсөл, 3,400+ харилцагч.",
  alternates: { canonical: "/real-estate" },
  openGraph: {
    title: "Үл хөдлөх хөрөнгийн зуучлал, маркетинг — Дархан",
    description:
      "Oigon Numrug Properties — Дархан хотын үл хөдлөх хөрөнгийн зуучлал, төслийн маркетинг, зөвлөгөө.",
    url: "/real-estate",
    images: ["/real-estate-bg.jpg"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oigonnumrug.mn";

export default function RealEstateHomePage() {
  const s = getHomeSettings();
  const featuredProjects = listProjects().slice(0, 3);
  const marqueeRail = s.marqueeNames.length > 0
    ? [...s.marqueeNames, ...s.marqueeNames]
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Oigon Numrug Properties",
    alternateName: "Ойгон Нөмрөг",
    url: `${SITE_URL}/real-estate`,
    logo: `${SITE_URL}/Logo_Primary color - 2.png`,
    image: `${SITE_URL}/real-estate-bg.jpg`,
    description:
      "Дархан хотын үл хөдлөх хөрөнгийн зуучлал, төслийн маркетинг, зөвлөгөө үзүүлэгч компани.",
    areaServed: { "@type": "City", name: "Darkhan" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Дархан",
      addressRegion: "Дархан-Уул",
      addressCountry: "MN",
    },
    sameAs: [`${SITE_URL}/real-estate`],
  };

  const marketRows = [
    {
      label: s.marketRow1Label,
      value: s.marketRow1Value,
      delta: s.marketRow1Delta,
      kind: s.marketRow1Kind,
    },
    {
      label: s.marketRow2Label,
      value: s.marketRow2Value,
      delta: s.marketRow2Delta,
      kind: s.marketRow2Kind,
    },
    {
      label: s.marketRow3Label,
      value: s.marketRow3Value,
      delta: s.marketRow3Delta,
      kind: s.marketRow3Kind,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="re-hero">
        <Image
          src={s.heroImage || "/real-estate-bg.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="re-hero-image"
        />
        <div className="re-hero-overlay" aria-hidden="true" />
        <div className="re-hero-grid" aria-hidden="true" />

        <div className="re-hero-inner">
          <div className="re-hero-copy">
            <span className="re-eyebrow">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              {s.heroEyebrow}
            </span>
            <h1>
              {s.heroTitlePre} <em>{s.heroTitleEm}</em>
              <br />
              {s.heroTitlePost}
            </h1>
            <p className="re-hero-lead">{s.heroLead}</p>
            <div className="re-hero-actions">
              <Link href={s.heroPrimaryHref} className="re-btn re-btn--primary">
                {s.heroPrimaryLabel}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href={s.heroSecondaryHref} className="re-btn re-btn--ghost">
                {s.heroSecondaryLabel}
              </Link>
            </div>

            <dl className="re-hero-trust">
              <div>
                <dt>{s.trust1Label}</dt>
                <dd>{s.trust1Value}</dd>
              </div>
              <div>
                <dt>{s.trust2Label}</dt>
                <dd>{s.trust2Value}</dd>
              </div>
              <div>
                <dt>{s.trust3Label}</dt>
                <dd>{s.trust3Value}</dd>
              </div>
            </dl>
          </div>

          <aside className="re-hero-card" aria-label="Үл хөдлөх хөрөнгийн зах зээлийн товч">
            <header>
              <span className="re-hero-card__pill">
                <span className="re-pulse" aria-hidden="true" />
                {s.marketPill}
              </span>
              <h2>{s.marketTitle}</h2>
            </header>

            <div className="re-hero-card__rows">
              {marketRows.map((row, idx) => (
                <div key={idx} className="re-hero-card__row">
                  <div>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                  <span
                    className={`re-tag ${row.kind === "up" ? "re-tag--up" : "re-tag--down"}`}
                  >
                    {row.delta}
                  </span>
                </div>
              ))}
            </div>

            <footer>
              <span>{s.marketFooter}</span>
            </footer>
          </aside>
        </div>

        {marqueeRail.length > 0 && (
          <div className="re-hero-marquee" aria-hidden="true">
            <div className="re-hero-marquee__track">
              {marqueeRail.map((name, idx) => (
                <span key={`${name}-${idx}`}>{name}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {s.stats.length > 0 && (
        <section className="re-stats" aria-label="Гол үзүүлэлтүүд">
          <div className="re-container">
            <div className="re-stats-grid">
              {s.stats.map((item, idx) => (
                <div key={`${item.label}-${idx}`} className="re-stat">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="re-section re-projects">
        <div className="re-container">
          <div className="re-section-head re-section-head--with-cta">
            <div>
              <span className="re-eyebrow re-eyebrow--dark">
                <span className="re-eyebrow-dot" aria-hidden="true" />
                {s.projectsEyebrow}
              </span>
              <h2>{s.projectsTitle}</h2>
              <p>{s.projectsDescription}</p>
            </div>
            <Link href="/real-estate/projects" className="re-section-head__cta">
              Бүх төслийг үзэх
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="re-project-grid">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/real-estate/projects/${project.id}`}
                className="re-project"
                aria-label={`${project.title} төслийн мэдээлэл`}
              >
                <div className="re-project__media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                    className="re-project__photo"
                  />
                  <div className="re-project__media-overlay" aria-hidden="true" />
                  <span className="re-project__status">{project.status}</span>
                </div>
                <div className="re-project__body">
                  <span className="re-project__type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p className="re-project__meta">
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.price}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="re-cta">
        <div className="re-container re-cta-inner">
          <div className="re-cta-copy">
            <span className="re-eyebrow re-eyebrow--light">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              {s.ctaEyebrow}
            </span>
            <h2>
              {s.ctaTitleLine1}
              <br />
              {s.ctaTitleLine2}
            </h2>
            <p>{s.ctaDescription}</p>
            <div className="re-cta-actions">
              <Link href={s.ctaPrimaryHref} className="re-btn re-btn--primary">
                {s.ctaPrimaryLabel}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href={s.ctaSecondaryHref} className="re-btn re-btn--ghost">
                {s.ctaSecondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
