import CtaBand from "../../_components/CtaBand";
import PageHero from "../../_components/PageHero";
import { servicesContent } from "@/lib/real-estate/content";

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
  const s = servicesContent;

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
        meta={[`${String(s.items.length).padStart(2, "0")} чиглэл`, `${String(s.processSteps.length).padStart(2, "0")} алхамт явц`]}
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/services", label: "Үйлчилгээ" },
        ]}
      />

      {s.items.length > 0 && (
        <section className="re-section">
          <div className="re-wrap">
            <ol className="re-services">
              {s.items.map((service, index) => (
                <li key={service.title} id={`service-${index + 1}`} className="re-service re-reveal">
                  <span className="re-service__num">{String(index + 1).padStart(2, "0")}</span>
                  <div className="re-service__main">
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>
                  {service.points.length > 0 && (
                    <ul className="re-service__points">
                      {service.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {s.processSteps.length > 0 && (
        <section className="re-section re-section--sand">
          <div className="re-wrap">
            <div className="re-head">
              <div>
                <p className="re-kicker">{s.processEyebrow}</p>
                <h2 className="re-display re-h2">{s.processTitle}</h2>
              </div>
              <div className="re-head__aside">
                <p>{s.processParagraph}</p>
              </div>
            </div>
            <ol className="re-process">
              {s.processSteps.map((step) => (
                <li key={step.step} className="re-reveal">
                  <span className="re-process__step">{step.step}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <CtaBand
        kicker={s.ctaEyebrow}
        title={s.ctaTitle}
        description={s.ctaParagraph}
        primary={{ label: s.ctaPrimaryLabel, href: s.ctaPrimaryHref }}
        secondary={{ label: s.ctaSecondaryLabel, href: s.ctaSecondaryHref }}
      />
    </>
  );
}
