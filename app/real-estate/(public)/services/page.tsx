import Link from "next/link";
import PageHero from "../../_components/PageHero";
import { getServicesSettings } from "@/lib/real-estate/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Үйлчилгээ",
  description:
    "Дархан хотын үл хөдлөх хөрөнгийн борлуулалт, түрээсийн зуучлал, төслийн маркетинг, хөрөнгийн зөвлөгөө, үнэлгээ — Oigon Numrug Properties.",
  alternates: { canonical: "/real-estate/services" },
  openGraph: {
    title: "Үйлчилгээ — Oigon Numrug Properties",
    description: "4 үндсэн чиглэлээр Дархан хотын үл хөдлөх хөрөнгийн зөвлөх үйлчилгээ.",
    url: "/real-estate/services",
  },
};

export default function ServicesPage() {
  const s = getServicesSettings();

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
          { href: "/real-estate/services", label: "Үйлчилгээ" },
        ]}
      />

      {s.items.length > 0 && (
        <section className="re-section">
          <div className="re-container">
            <div className="re-service-grid">
              {s.items.map((service, idx) => (
                <article key={`${service.title}-${idx}`} className="re-service">
                  <span className="re-service__number">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  {service.points.length > 0 && (
                    <ul>
                      {service.points.map((point, pIdx) => (
                        <li key={`${point}-${pIdx}`}>
                          <span aria-hidden="true">—</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {s.processSteps.length > 0 && (
        <section className="re-section re-about">
          <div className="re-container">
            <div className="re-section-head">
              <div>
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  {s.processEyebrow}
                </span>
                <h2>{s.processTitle}</h2>
              </div>
              <p>{s.processParagraph}</p>
            </div>

            <ol className="re-process">
              {s.processSteps.map((p, idx) => (
                <li key={`${p.step}-${idx}`}>
                  <span className="re-process__step">{p.step}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

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
                <Link
                  href={s.ctaPrimaryHref}
                  className="re-btn re-btn--primary"
                >
                  {s.ctaPrimaryLabel}
                </Link>
              )}
              {s.ctaSecondaryLabel && (
                <Link
                  href={s.ctaSecondaryHref}
                  className="re-btn re-btn--ghost"
                >
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
