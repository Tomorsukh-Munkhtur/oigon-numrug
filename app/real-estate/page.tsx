import Image from "next/image";
import Link from "next/link";
import { reProjects, reStats } from "@/lib/real-estate/content";

export default function RealEstateHomePage() {
  const featuredProjects = reProjects.slice(0, 3);

  return (
    <>
      <section className="re-hero">
        <Image
          src="/real-estate-bg.jpg"
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
              Oigon Numrug Properties · Real Estate Advisory
            </span>
            <h1>
              Үл хөдлөх хөрөнгийн <em>үнэ цэнийг</em>
              <br />
              мэдрэмжтэй, мэдээлэлтэй удирддаг түнш.
            </h1>
            <p className="re-hero-lead">
              12 жил, 120+ төсөл, 3,400+ харилцагч. Бид орон сууц, оффис болон
              арилжааны хөрөнгөд зориулсан зах зээлийн судалгаа, маркетинг,
              зуучлал ба хөрөнгө оруулалтын зөвлөгөөг нэг цэгээс хүргэдэг.
            </p>
            <div className="re-hero-actions">
              <Link href="/real-estate/projects" className="re-btn re-btn--primary">
                Онцлох төслүүд
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/real-estate/news" className="re-btn re-btn--ghost">
                Сүүлийн мэдээ
              </Link>
            </div>

            <dl className="re-hero-trust">
              <div>
                <dt>Зах зээлд</dt>
                <dd>12 жил</dd>
              </div>
              <div>
                <dt>Гүйцэтгэсэн төсөл</dt>
                <dd>120+</dd>
              </div>
              <div>
                <dt>Зөвлөгөөний цаг</dt>
                <dd>24/7</dd>
              </div>
            </dl>
          </div>

          <aside className="re-hero-card" aria-label="Үл хөдлөх хөрөнгийн зах зээлийн товч">
            <header>
              <span className="re-hero-card__pill">
                <span className="re-pulse" aria-hidden="true" />
                Зах зээлийн товч · 2026 II сар
              </span>
              <h2>Дархан хотын зах зээл</h2>
            </header>

            <div className="re-hero-card__rows">
              <div className="re-hero-card__row">
                <div>
                  <span>Орон сууцны үнэ</span>
                  <strong>3.2 сая ₮/м²</strong>
                </div>
                <span className="re-tag re-tag--up">▲ 6.8%</span>
              </div>
              <div className="re-hero-card__row">
                <div>
                  <span>А зэрэглэлийн оффис түрээс</span>
                  <strong>41,200 ₮/м²</strong>
                </div>
                <span className="re-tag re-tag--up">▲ 4.2%</span>
              </div>
              <div className="re-hero-card__row">
                <div>
                  <span>Газрын дундаж үнэ</span>
                  <strong>620,000 ₮/м²</strong>
                </div>
                <span className="re-tag re-tag--down">▼ 0.9%</span>
              </div>
            </div>

            <footer>
              <span>Эх сурвалж — манай дотоод судалгаа</span>
              <Link href="/real-estate/news">Бүх тоймыг үзэх →</Link>
            </footer>
          </aside>
        </div>

        <div className="re-hero-marquee" aria-hidden="true">
          <div className="re-hero-marquee__track">
            {[
              "Skyline Residence",
              "Civic Office Tower",
              "Garden Village",
              "Darkhan Plaza",
              "Northern Heights",
              "Lakeside Residences",
              "Capital Park",
            ]
              .concat([
                "Skyline Residence",
                "Civic Office Tower",
                "Garden Village",
                "Darkhan Plaza",
                "Northern Heights",
                "Lakeside Residences",
                "Capital Park",
              ])
              .map((name, idx) => (
                <span key={`${name}-${idx}`}>{name}</span>
              ))}
          </div>
        </div>
      </section>

      <section className="re-stats" aria-label="Гол үзүүлэлтүүд">
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

      <section className="re-section re-projects">
        <div className="re-container">
          <div className="re-section-head re-section-head--with-cta">
            <div>
              <span className="re-eyebrow re-eyebrow--dark">
                <span className="re-eyebrow-dot" aria-hidden="true" />
                Онцлох портфолио
              </span>
              <h2>Хамтран ажиллаж буй сонгомол төслүүд</h2>
              <p>
                Бид төслийг зах зээлд эрсдэлгүй байршуулах, дуусгахаас өмнө
                борлуулалтыг хурдасгахад мэргэшсэн.
              </p>
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
              Холбоо барих
            </span>
            <h2>
              Төслөө зөв байршуулах,
              <br />
              шийдвэрээ итгэлтэй гаргах цаг.
            </h2>
            <p>
              Эхний 30 минутын зөвлөгөөг үнэ төлбөргүй хүргэнэ — таны зорилго,
              боломж, хязгаарлалтыг сонсож, дараагийн алхамыг тодорхой
              төлөвлөж өгнө.
            </p>
            <div className="re-cta-actions">
              <Link href="/real-estate/contact" className="re-btn re-btn--primary">
                Зөвлөгөө захиалах
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/real-estate/about" className="re-btn re-btn--ghost">
                Бидний тухай
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
