import Link from "next/link";
import type { Metadata } from "next";
import CtaBand from "../_components/CtaBand";
import ProjectCard from "../_components/ProjectCard";
import RevealText from "../_components/RevealText";
import SkyHero from "../_components/SkyHero";
import { ArrowRight, ArrowUpRight } from "../_components/icons";
import { homeContent, projects, servicesContent } from "@/lib/real-estate/content";

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

const pad = (value: number) => String(value).padStart(2, "0");

export default function RealEstateHomePage() {
  const s = homeContent;
  const featured = projects.slice(0, 3);
  const marquee = s.marqueeNames.length > 0 ? [...s.marqueeNames, ...s.marqueeNames] : [];
  // Эхний өгүүлбэр нь том мэдэгдэлд, үлдсэн нь тайлбарт орно.
  const leadBreak = s.heroLead.indexOf(". ");
  const leadFirst = leadBreak === -1 ? s.heroLead : s.heroLead.slice(0, leadBreak + 1);
  const leadRest = leadBreak === -1 ? "" : s.heroLead.slice(leadBreak + 2);

  const trust = [
    { label: s.trust1Label, value: s.trust1Value },
    { label: s.trust2Label, value: s.trust2Value },
    { label: s.trust3Label, value: s.trust3Value },
  ];

  const marketRows = [
    { label: s.marketRow1Label, value: s.marketRow1Value, delta: s.marketRow1Delta, kind: s.marketRow1Kind },
    { label: s.marketRow2Label, value: s.marketRow2Value, delta: s.marketRow2Delta, kind: s.marketRow2Kind },
    { label: s.marketRow3Label, value: s.marketRow3Value, delta: s.marketRow3Delta, kind: s.marketRow3Kind },
  ];

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
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SkyHero
        titlePre="Таны дараагийн"
        titleEm="хаяг"
        subtitle={["Мэргэжлийн зөвлөгөө.", "Бодит мэдээлэл.", "Итгэлтэй шийдвэр."]}
        cta={{ label: s.heroPrimaryLabel, href: s.heroPrimaryHref }}
        windowImage="/project-residence.jpg"
      />

      <section className="re-section re-intro">
        <div className="re-wrap re-intro__grid">
          <div className="re-intro__side">
            <p className="re-kicker">{s.heroEyebrow}</p>
            <aside className="re-market" aria-label={s.marketTitle}>
              <span className="re-market__pill">{s.marketPill}</span>
              <h2>{s.marketTitle}</h2>
              {marketRows.map((row) => (
                <div key={row.label} className="re-market__row">
                  <div>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                  <span className={`re-market__delta re-market__delta--${row.kind}`}>{row.delta}</span>
                </div>
              ))}
              <p className="re-market__foot">{s.marketFooter}</p>
            </aside>
          </div>

          <div>
            <RevealText
              className="re-display re-intro__statement"
              segments={[
                { text: s.heroTitlePre },
                { text: s.heroTitleEm, em: true },
                { text: s.heroTitlePost },
                { text: leadFirst },
              ]}
            />
            {leadRest && <p className="re-lead re-intro__lead">{leadRest}</p>}
            <div className="re-actions">
              <Link href={s.heroPrimaryHref} className="re-btn re-btn--ink">
                {s.heroPrimaryLabel}
                <ArrowRight />
              </Link>
              <Link href={s.heroSecondaryHref} className="re-btn re-btn--line">
                {s.heroSecondaryLabel}
              </Link>
            </div>
            <dl className="re-trust">
              {trust.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {marquee.length > 0 && (
        <div className="re-marquee" aria-hidden="true">
          <div className="re-marquee__track">
            {marquee.map((name, index) => (
              <span key={`${name}-${index}`}>{name}</span>
            ))}
          </div>
        </div>
      )}

      {s.stats.length > 0 && (
        <section className="re-section" aria-label="Гол үзүүлэлтүүд">
          <div className="re-wrap">
            <div className="re-figures re-reveal">
              {s.stats.map((item) => (
                <div key={item.label} className="re-figure">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="re-section re-section--flush-top">
        <div className="re-wrap">
          <div className="re-head">
            <div>
              <p className="re-kicker">{s.projectsEyebrow}</p>
              <h2 className="re-display re-h2">{s.projectsTitle}</h2>
            </div>
            <div className="re-head__aside">
              <p>{s.projectsDescription}</p>
              <Link href="/real-estate/projects" className="re-link">
                Бүх төсөл ({pad(projects.length)})
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="re-feature-grid">
            {featured.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                variant={index === 0 ? "tall" : undefined}
                sizes={index === 0 ? "(min-width: 900px) 55vw, 100vw" : "(min-width: 900px) 45vw, 100vw"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="re-section re-section--sand">
        <div className="re-wrap re-svc">
          <div className="re-svc__intro">
            <p className="re-kicker">{servicesContent.heroEyebrow}</p>
            <h2 className="re-display re-h2">
              {servicesContent.heroTitlePre} <em>{servicesContent.heroTitleEm}</em>{" "}
              {servicesContent.heroTitlePost}
            </h2>
            <p className="re-lead">{servicesContent.heroDescription}</p>
            <Link href="/real-estate/services" className="re-btn re-btn--ink">
              Үйлчилгээ үзэх
              <ArrowRight />
            </Link>
          </div>

          <ol className="re-svc__list">
            {servicesContent.items.map((item, index) => (
              <li key={item.title} className="re-reveal">
                <Link href={`/real-estate/services#service-${index + 1}`}>
                  <span className="re-svc__num">{pad(index + 1)}</span>
                  <span>
                    <span className="re-svc__title">{item.title}</span>
                    <span className="re-svc__desc">{item.description}</span>
                  </span>
                  <span className="re-svc__arrow" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        kicker={s.ctaEyebrow}
        title={
          <>
            {s.ctaTitleLine1}
            <br />
            <em>{s.ctaTitleLine2}</em>
          </>
        }
        description={s.ctaDescription}
        primary={{ label: s.ctaPrimaryLabel, href: s.ctaPrimaryHref }}
        secondary={{ label: s.ctaSecondaryLabel, href: s.ctaSecondaryHref }}
      />
    </>
  );
}
