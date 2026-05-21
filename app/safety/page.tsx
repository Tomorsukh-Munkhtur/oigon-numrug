import Image from "next/image";
import Link from "next/link";
import { getSafetyPage, listSafetyNews, parseExtra } from "@/lib/safety/content";

export const dynamic = "force-dynamic";

type HomeExtra = {
  weatherIcon: string;
  weatherCity: string;
  weatherTemp: string;
  weatherCondition: string;
  weatherWind: string;
  weatherHumidity: string;
};

function metricValue(raw: string) {
  const idx = raw.indexOf(":");
  return idx === -1 ? raw.trim() : raw.slice(idx + 1).trim();
}

export default function SafetyPage() {
  const page = getSafetyPage("home");
  const latestNews = listSafetyNews({ limit: 5 });
  const weather = parseExtra<HomeExtra>(page, {
    weatherIcon: "🌤️",
    weatherCity: "Дархан хот",
    weatherTemp: "+18°C",
    weatherCondition: "Цэлмэг, бага зэргийн үүлтэй",
    weatherWind: "Салхи: 4 м/с",
    weatherHumidity: "Чийгшил: 45%",
  });

  return (
    <>
      <section className="sf-hero">
        <Image
          src={page.hero_image || "/safety-bg.jpg"}
          alt="Safety background"
          fill
          priority
          sizes="100vw"
          className="sf-hero-image"
        />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content" style={{ maxWidth: "800px" }}>
            <h1 className="sf-hero-title">
              {page.hero_title}{" "}
              <span style={{ color: "var(--sf-yellow)" }}>{page.hero_highlight}</span>
            </h1>
            {page.hero_description && <p className="sf-hero-desc">{page.hero_description}</p>}

            <div className="sf-hero-actions" style={{ marginTop: "40px" }}>
              {page.primary_button_text && page.primary_button_href && (
                <Link href={page.primary_button_href} className="sf-btn sf-btn--primary">
                  <span>{page.primary_button_text}</span>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </Link>
              )}
              {page.secondary_button_text && page.secondary_button_href && (
                <Link href={page.secondary_button_href} className="sf-btn sf-btn--outline">
                  {page.secondary_button_text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sf-block sf-block--alt">
        <div className="sf-container">
          <div
            className="sf-section-top sf-reveal"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
          >
            <div>
              {page.section_tag && <span className="sf-tag">{page.section_tag}</span>}
              <h2>
                {page.section_title} <span className="sf-gradient-text">{page.section_highlight}</span>
              </h2>
            </div>
          </div>

          <div className="sf-news-layout">
            <div className="sf-news-list">
              {latestNews.map((news, index) => (
                <Link
                  key={news.id}
                  href={`/safety/news/${news.id}`}
                  className="sf-news-item sf-news-item--horizontal sf-reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="sf-news-image">
                    <Image src={news.image} alt={news.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="sf-news-content">
                    <span className="sf-news-date">{news.date}</span>
                    <h3 className="sf-news-title">{news.title}</h3>
                    <p className="sf-news-desc">{news.description}</p>
                    <span className="sf-news-link">Цааш унших →</span>
                  </div>
                </Link>
              ))}
              <div style={{ textAlign: "center", marginTop: "20px" }} className="sf-reveal">
                <Link href="/safety/news" className="sf-btn sf-btn--outline">
                  Бүх мэдээллийг үзэх
                </Link>
              </div>
            </div>

            <div className="sf-sidebar sf-reveal">
              <article className="sf-weather-card">
                <div className="sf-weather-card__orb sf-weather-card__orb--a" aria-hidden="true" />
                <div className="sf-weather-card__orb sf-weather-card__orb--b" aria-hidden="true" />

                <header className="sf-weather-card__top">
                  <span className="sf-weather-card__badge">
                    <span className="sf-weather-card__dot" aria-hidden="true" />
                    Өнөөдөр
                  </span>
                  <span className="sf-weather-card__city">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {weather.weatherCity}
                  </span>
                </header>

                <div className="sf-weather-card__hero">
                  <div className="sf-weather-card__icon-wrap" aria-hidden="true">
                    <div className="sf-weather-card__rays" />
                    <span className="sf-weather-card__icon">{weather.weatherIcon}</span>
                  </div>
                  <div className="sf-weather-card__main">
                    <span className="sf-weather-card__temp">{weather.weatherTemp}</span>
                    <span className="sf-weather-card__condition">{weather.weatherCondition}</span>
                  </div>
                </div>

                <div className="sf-weather-card__divider" aria-hidden="true" />

                <div className="sf-weather-card__stats">
                  <div className="sf-weather-card__stat">
                    <div className="sf-weather-card__stat-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
                      </svg>
                    </div>
                    <div className="sf-weather-card__stat-text">
                      <span className="sf-weather-card__stat-label">Салхи</span>
                      <span className="sf-weather-card__stat-value">{metricValue(weather.weatherWind)}</span>
                    </div>
                  </div>

                  <div className="sf-weather-card__stat">
                    <div className="sf-weather-card__stat-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                      </svg>
                    </div>
                    <div className="sf-weather-card__stat-text">
                      <span className="sf-weather-card__stat-label">Чийгшил</span>
                      <span className="sf-weather-card__stat-value">{metricValue(weather.weatherHumidity)}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
