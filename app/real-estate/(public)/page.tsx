import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import RevealText from "../_components/RevealText";
import SkyHero from "../_components/SkyHero";
import { ArrowRight, CheckIcon, ChannelIcon, MailIcon, PhoneIcon } from "../_components/icons";
import { externalProps, softBreak } from "../_components/softBreak";
import {
  aboutContent,
  contactContent,
  getContactChannel,
  homeContent,
  sectionHref,
  servicesContent,
} from "@/lib/real-estate/content";

export const metadata: Metadata = {
  title: "Үл хөдлөх хөрөнгийн зуучлал — Дархан",
  description:
    "Ойгон Нөмрөг Properties — Дархан хотын үл хөдлөх хөрөнгийн мэргэжлийн, шуурхай зуучлал. Тусгай зөвшөөрөлтэй агентууд, эдийн засагчийн санхүүгийн зөвлөгөө, ипотек ба ногоон зээлийн дэмжлэг.",
  alternates: { canonical: "/real-estate" },
  openGraph: {
    title: "Үл хөдлөх хөрөнгийн зуучлал — Дархан",
    description:
      "Ойгон Нөмрөг Properties — Дархан хотын үл хөдлөх хөрөнгийн мэргэжлийн, шуурхай зуучлал.",
    url: "/real-estate",
    images: ["/real-estate-bg.jpg"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oigonnumrug.mn";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Нэг хуудастай сайт: цэсний холбоос бүр энэ хуудасны хэсэг рүү гүйлгэнэ
 * (#about → #services → #contact).
 */
export default function RealEstateHomePage() {
  const s = homeContent;
  const a = aboutContent;
  const sv = servicesContent;
  const c = contactContent;

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

  const phone = getContactChannel("phone");
  const email = getContactChannel("email");
  const location = getContactChannel("location");
  // The address has its own block below, so the cards show only the ways to reach us
  const cards = c.channels.filter((channel) => channel.kind !== "location");
  const quickRows = [phone, email, location].filter((channel) => channel !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Ойгон Нөмрөг Properties",
    alternateName: "Oigon Numrug Properties",
    url: `${SITE_URL}/real-estate`,
    logo: `${SITE_URL}/Logo_Primary color - 2.png`,
    image: `${SITE_URL}/real-estate-bg.jpg`,
    description: "Дархан хотын үл хөдлөх хөрөнгийн мэргэжлийн, шуурхай зуучлал, санхүүгийн зөвлөгөө.",
    telephone: phone?.href.replace("tel:", ""),
    email: email?.value,
    openingHours: "Mo-Su 00:00-23:59",
    sameAs: c.socials.map((social) => social.href),
    areaServed: { "@type": "City", name: "Darkhan" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Дархан",
      addressRegion: "Дархан-Уул",
      postalCode: "45000",
      addressCountry: "MN",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SkyHero
        titlePre="Таны дараагийн"
        titleEm="хаяг"
        subtitle={["Мэргэжлийн зуучлал.", "Санхүүгийн зөвлөгөө.", "Итгэлтэй шийдвэр."]}
        cta={{ label: s.heroPrimaryLabel, href: s.heroPrimaryHref }}
        windowImage="/real-estate/office.webp"
      />

      {/* ---------- Бидний тухай ---------- */}
      <div id="about" className="re-anchor">
        <section className="re-section re-intro">
          <div className="re-wrap re-intro__grid">
            <div className="re-intro__side">
              <p className="re-kicker">{s.heroEyebrow}</p>
              <aside className="re-market" aria-label="Бидэнтэй холбогдох">
                <span className="re-market__pill">{c.hours}</span>
                <h2>Бидэнтэй холбогдох</h2>
                {quickRows.map((channel) => (
                  <div key={channel.label} className="re-market__row">
                    <span>{channel.label}</span>
                    <strong>
                      <a href={channel.href.startsWith("#") ? sectionHref(channel.href.slice(1)) : channel.href}>
                        {softBreak(channel.value)}
                      </a>
                    </strong>
                  </div>
                ))}
                <p className="re-market__foot">
                  {phone?.detail && <span>{phone.detail}</span>}
                  <Link href={sectionHref("contact")} className="re-link">
                    Холбоо барих
                    <ArrowRight size={14} />
                  </Link>
                </p>
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

        <section className="re-section">
          <div className="re-wrap re-mission">
            <div className="re-reveal">
              <p className="re-kicker">{a.missionEyebrow}</p>
              <h2 className="re-display re-h2">
                {a.missionTitlePre} {a.missionTitleEm && <em>{a.missionTitleEm}</em>}
                {a.missionTitlePost && <> {a.missionTitlePost}</>}
              </h2>
            </div>
            <div className="re-reveal">
              <p className="re-lead">{a.missionParagraph}</p>
              {a.missionChecklist.length > 0 && (
                <ul className="re-checklist">
                  {a.missionChecklist.map((item) => (
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

        {a.values.length > 0 && (
          <section className="re-section re-section--sand">
            <div className="re-wrap">
              <div className="re-head">
                <div>
                  <p className="re-kicker">{a.valuesEyebrow}</p>
                  <h2 className="re-display re-h2">{a.valuesTitle}</h2>
                </div>
                <div className="re-head__aside">
                  <p>{a.valuesDescription}</p>
                </div>
              </div>
              <div className="re-values">
                {a.values.map((value, index) => (
                  <article key={value.title} className="re-value re-reveal">
                    <span className="re-value__num">{pad(index + 1)}</span>
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

        {a.milestones.length > 0 && (
          <section className="re-section">
            <div className="re-wrap">
              <div className="re-head">
                <div>
                  <p className="re-kicker">Түүхэн замнал</p>
                  <h2 className="re-display re-h2">
                    Он жилүүдээр <em>өссөн туршлага</em>
                  </h2>
                </div>
              </div>
              <ol className="re-timeline">
                {a.milestones.map((item) => (
                  <li key={item.year} className="re-reveal">
                    <span className="re-timeline__year">{item.year}</span>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </div>

      {marquee.length > 0 && (
        <div className="re-marquee" aria-hidden="true">
          <div className="re-marquee__track">
            {marquee.map((name, index) => (
              <span key={`${name}-${index}`}>{name}</span>
            ))}
          </div>
        </div>
      )}

      {/* ---------- Үйлчилгээ ---------- */}
      <div id="services" className="re-anchor">
        <section className="re-section">
          <div className="re-wrap">
            <div className="re-head">
              <div>
                <p className="re-kicker">{sv.eyebrow}</p>
                <h2 className="re-display re-h2">
                  {sv.titlePre} <em>{sv.titleEm}</em> {sv.titlePost}
                </h2>
              </div>
              <div className="re-head__aside">
                <p>{sv.description}</p>
              </div>
            </div>

            <ol className="re-services">
              {sv.items.map((service, index) => (
                <li key={service.title} id={`service-${index + 1}`} className="re-service re-anchor re-reveal">
                  <span className="re-service__num">{pad(index + 1)}</span>
                  <div className="re-service__main">
                    <h3>{service.title}</h3>
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

        {sv.processSteps.length > 0 && (
          <section className="re-section re-section--sand">
            <div className="re-wrap">
              <div className="re-head">
                <div>
                  <p className="re-kicker">{sv.processEyebrow}</p>
                  <h2 className="re-display re-h2">{sv.processTitle}</h2>
                </div>
                <div className="re-head__aside">
                  <p>{sv.processParagraph}</p>
                </div>
              </div>
              <ol className="re-process">
                {sv.processSteps.map((step) => (
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
      </div>

      {/* ---------- Холбоо барих ---------- */}
      <div id="contact" className="re-anchor">
        <section className="re-section">
          <div className="re-wrap">
            <div className="re-head">
              <div>
                <p className="re-kicker">{c.eyebrow}</p>
                <h2 className="re-display re-h2">
                  {c.titlePre} <em>{c.titleEm}</em> {c.titlePost}
                </h2>
              </div>
              <div className="re-head__aside">
                <p>{c.description}</p>
              </div>
            </div>

            {cards.length > 0 && (
              <div className="re-channels">
                {cards.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    className="re-channel re-reveal"
                    {...externalProps(channel.href)}
                  >
                    <span className="re-channel__icon">
                      <ChannelIcon kind={channel.kind} />
                    </span>
                    <span className="re-channel__label">{channel.label}</span>
                    <span className="re-channel__value">{softBreak(channel.value)}</span>
                    {channel.detail && <span className="re-channel__detail">{channel.detail}</span>}
                    {channel.cta && (
                      <span className="re-channel__cta">
                        {channel.cta}
                        <ArrowRight size={16} />
                      </span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="office" className="re-section re-section--sand re-anchor">
          <div className="re-wrap re-office">
            <div className="re-office__media re-reveal">
              <Image src="/real-estate/office.webp" alt="" fill sizes="(min-width: 960px) 50vw, 100vw" />
            </div>
            <div className="re-reveal">
              <p className="re-kicker">Манай байршил</p>
              <h2 className="re-display re-h2">
                Дархан хотод <em>үйлчилнэ.</em>
              </h2>
              <dl className="re-office__rows">
                {location && (
                  <div>
                    <dt>Хаяг</dt>
                    <dd>
                      {location.value}
                      {location.detail && <>, {location.detail}</>}
                    </dd>
                  </div>
                )}
                {c.hours && (
                  <div>
                    <dt>Ажлын цаг</dt>
                    <dd>{c.hours}</dd>
                  </div>
                )}
                {phone && (
                  <div>
                    <dt>{phone.label}</dt>
                    <dd>
                      <a href={phone.href}>{phone.value}</a>
                      {phone.detail && <> · {phone.detail}</>}
                    </dd>
                  </div>
                )}
                {email && (
                  <div>
                    <dt>И-мэйл</dt>
                    <dd>
                      <a href={email.href}>{softBreak(email.value)}</a>
                    </dd>
                  </div>
                )}
                {c.socials.length > 0 && (
                  <div>
                    <dt>Сошиал</dt>
                    <dd>
                      {c.socials.map((social, index) => (
                        <span key={social.href}>
                          {index > 0 && " · "}
                          <a href={social.href} {...externalProps(social.href)}>
                            {social.label}
                          </a>
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              <div className="re-actions">
                {phone && (
                  <a href={phone.href} className="re-btn re-btn--ink">
                    <PhoneIcon size={16} />
                    {phone.cta || "Залгах"}
                  </a>
                )}
                {email && (
                  <a href={email.href} className="re-btn re-btn--line">
                    <MailIcon size={16} />
                    {email.cta || "И-мэйл бичих"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
