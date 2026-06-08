import Link from "next/link";
import PageHero from "../../_components/PageHero";
import { getAboutSettings, reStats } from "@/lib/real-estate/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Бидний тухай",
  description:
    "Дархан хотын үл хөдлөх хөрөнгийн зөвлөх Oigon Numrug Properties — 12 жилийн туршлага, тоо баримтанд тулгуурласан, хүн төвтэй зөвлөгөө.",
  alternates: { canonical: "/real-estate/about" },
  openGraph: {
    title: "Бидний тухай — Oigon Numrug Properties",
    description: "Дархан хотын үл хөдлөх хөрөнгийн хараат бус зөвлөх баг.",
    url: "/real-estate/about",
  },
};

export default function AboutPage() {
  const s = getAboutSettings();

  return (
    <>
      <PageHero
        eyebrow={s.heroEyebrow}
        image={s.heroImage || undefined}
        title={
          <>
            {s.heroTitlePre}
            {s.heroTitleEm && (
              <>
                {" "}
                <em>{s.heroTitleEm}</em>
              </>
            )}
            {s.heroTitlePost && <> {s.heroTitlePost}</>}
          </>
        }
        description={s.heroDescription}
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/about", label: "Бидний тухай" },
        ]}
      />

      <section className="re-section re-about">
        <div className="re-container re-about-grid">
          <div className="re-about-copy">
            <span className="re-eyebrow re-eyebrow--dark">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              {s.missionEyebrow}
            </span>
            <h2>
              {s.missionTitlePre}
              {s.missionTitleEm && (
                <>
                  <br />
                  <em>{s.missionTitleEm}</em>
                </>
              )}
              {s.missionTitlePost && <> {s.missionTitlePost}</>}
            </h2>
            <p>{s.missionParagraph}</p>
            {s.missionChecklist.length > 0 && (
              <ul className="re-checklist">
                {s.missionChecklist.map((item) => (
                  <li key={item}>
                    <span className="re-check" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {s.milestones.length > 0 && (
            <ol className="re-timeline" aria-label="Бидний түүхэн замнал">
              {s.milestones.map((item, i) => (
                <li key={`${item.year}-${i}`}>
                  <span className="re-timeline__year">{item.year}</span>
                  <span className="re-timeline__line" aria-hidden="true" />
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {s.values.length > 0 && (
        <section className="re-section">
          <div className="re-container">
            <div className="re-section-head">
              <div>
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  {s.valuesEyebrow}
                </span>
                <h2>{s.valuesTitle}</h2>
              </div>
              <p>{s.valuesDescription}</p>
            </div>

            <div className="re-value-grid">
              {s.values.map((value, idx) => (
                <article key={`${value.title}-${idx}`} className="re-value">
                  <span className="re-value__num">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="re-stats">
        <div className="re-container">
          <div className="re-stats-grid">
            {reStats.map((item) => (
              <div key={item.label} className="re-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
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
            <h2>{s.ctaTitle}</h2>
            <p>{s.ctaParagraph}</p>
            <div className="re-cta-actions">
              {s.ctaPrimaryLabel && (
                <Link href={s.ctaPrimaryHref} className="re-btn re-btn--primary">
                  {s.ctaPrimaryLabel}
                </Link>
              )}
              {s.ctaSecondaryLabel && (
                <Link href={s.ctaSecondaryHref} className="re-btn re-btn--ghost">
                  {s.ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
