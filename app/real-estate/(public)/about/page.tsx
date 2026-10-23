import CtaBand from "../../_components/CtaBand";
import PageHero from "../../_components/PageHero";
import { CheckIcon } from "../../_components/icons";
import { aboutContent, reStats } from "@/lib/real-estate/content";

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
  const s = aboutContent;

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

      <section className="re-section">
        <div className="re-wrap re-mission">
          <div className="re-reveal">
            <p className="re-kicker">{s.missionEyebrow}</p>
            <h2 className="re-display re-h2">
              {s.missionTitlePre} {s.missionTitleEm && <em>{s.missionTitleEm}</em>}
              {s.missionTitlePost && <> {s.missionTitlePost}</>}
            </h2>
          </div>
          <div className="re-reveal">
            <p className="re-lead">{s.missionParagraph}</p>
            {s.missionChecklist.length > 0 && (
              <ul className="re-checklist">
                {s.missionChecklist.map((item) => (
                  <li key={item}>
                    <span className="re-checklist__icon">
                      <CheckIcon size={15} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {s.values.length > 0 && (
        <section className="re-section re-section--sand">
          <div className="re-wrap">
            <div className="re-head">
              <div>
                <p className="re-kicker">{s.valuesEyebrow}</p>
                <h2 className="re-display re-h2">{s.valuesTitle}</h2>
              </div>
              <div className="re-head__aside">
                <p>{s.valuesDescription}</p>
              </div>
            </div>
            <div className="re-values">
              {s.values.map((value, index) => (
                <article key={value.title} className="re-value re-reveal">
                  <span className="re-value__num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="re-section">
        <div className="re-wrap">
          {s.milestones.length > 0 && (
            <>
              <div className="re-head">
                <div>
                  <p className="re-kicker">Түүхэн замнал</p>
                  <h2 className="re-display re-h2">
                    Он жилүүдээр <em>өссөн туршлага</em>
                  </h2>
                </div>
              </div>
              <ol className="re-timeline">
                {s.milestones.map((item) => (
                  <li key={item.year} className="re-reveal">
                    <span className="re-timeline__year">{item.year}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </>
          )}

          <div className="re-figures re-reveal" aria-label="Гол үзүүлэлтүүд">
            {reStats.map((item) => (
              <div key={item.label} className="re-figure">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
