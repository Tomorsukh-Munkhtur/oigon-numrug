import PageHero from "../../_components/PageHero";
import {
  getContactSettings,
  type ContactChannelKind,
} from "@/lib/real-estate/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Холбоо барих — Oigon Numrug Properties",
};

function ChannelIcon({ kind }: { kind: ContactChannelKind }) {
  if (kind === "email") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </svg>
    );
  }
  if (kind === "location") {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

export default function ContactPage() {
  const s = getContactSettings();

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
          <div className="re-container">
            <div className="re-direct-grid">
              {s.channels.map((channel, idx) => (
                <a
                  key={`${channel.label}-${idx}`}
                  href={channel.href || "#"}
                  className="re-direct-card"
                >
                  <span className="re-direct-card__icon" aria-hidden="true">
                    <ChannelIcon kind={channel.kind} />
                  </span>
                  <span className="re-direct-card__label">{channel.label}</span>
                  <p className="re-direct-card__value">{channel.value}</p>
                  <span className="re-direct-card__detail">{channel.detail}</span>
                  {channel.cta && (
                    <span className="re-direct-card__cta">
                      {channel.cta}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
