import Image from "next/image";
import PageHero from "../../_components/PageHero";
import { ArrowRight, ChannelIcon, MailIcon, PhoneIcon } from "../../_components/icons";
import { contactContent, getContactChannel } from "@/lib/real-estate/content";

export const metadata = {
  title: "Холбоо барих",
  description:
    "Дархан хот дахь Oigon Numrug Properties-тэй утсаар, и-мэйлээр, эсвэл оффис дээр уулзаж холбогдох.",
  alternates: { canonical: "/real-estate/contact" },
  openGraph: {
    title: "Холбоо барих — Oigon Numrug Properties",
    description: "Дархан хотын үл хөдлөх хөрөнгийн зөвлөхтэй холбогдох.",
    url: "/real-estate/contact",
  },
};

export default function ContactPage() {
  const s = contactContent;
  const phone = getContactChannel("phone");
  const email = getContactChannel("email");
  const location = getContactChannel("location");

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
          { href: "/real-estate/contact", label: "Холбоо барих" },
        ]}
      />

      {s.channels.length > 0 && (
        <section className="re-section">
          <div className="re-wrap">
            <div className="re-channels">
              {s.channels.map((channel) => (
                <a key={channel.label} href={channel.href || "#office"} className="re-channel re-reveal">
                  <span className="re-channel__icon">
                    <ChannelIcon kind={channel.kind} />
                  </span>
                  <span className="re-channel__label">{channel.label}</span>
                  <span className="re-channel__value">{channel.value}</span>
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
          </div>
        </section>
      )}

      <section id="office" className="re-section re-section--sand">
        <div className="re-wrap re-office">
          <div className="re-office__media re-reveal">
            <Image src="/project-residence.jpg" alt="" fill sizes="(min-width: 960px) 50vw, 100vw" />
          </div>
          <div className="re-reveal">
            <p className="re-kicker">Манай оффис</p>
            <h2 className="re-display re-h2">
              Ирж <em>уулзаарай.</em>
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
              {phone?.detail && (
                <div>
                  <dt>Ажлын цаг</dt>
                  <dd>{phone.detail}</dd>
                </div>
              )}
              {phone && (
                <div>
                  <dt>Утас</dt>
                  <dd>
                    <a href={phone.href}>{phone.value}</a>
                  </dd>
                </div>
              )}
              {email && (
                <div>
                  <dt>И-мэйл</dt>
                  <dd>
                    <a href={email.href}>{email.value}</a>
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
    </>
  );
}
