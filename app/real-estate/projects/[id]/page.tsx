import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reProjects } from "@/lib/real-estate/content";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return reProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const project = reProjects.find((p) => p.id === id);
  if (!project) return { title: "Төсөл олдсонгүй" };
  return {
    title: `${project.title} — Oigon Numrug Properties`,
    description: project.summary ?? project.longDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const project = reProjects.find((p) => p.id === id);
  if (!project) notFound();

  const related = reProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <>
      <section className="re-detail-hero">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="re-detail-hero__image"
        />
        <div className="re-detail-hero__overlay" aria-hidden="true" />
        <div className="re-container re-detail-hero__inner">
          <nav className="re-detail-crumbs" aria-label="Сурвалж">
            <Link href="/real-estate">Нүүр</Link>
            <span aria-hidden="true">/</span>
            <Link href="/real-estate/projects">Төслүүд</Link>
            <span aria-hidden="true">/</span>
            <span>{project.title}</span>
          </nav>
          <span className="re-detail-hero__status">{project.status}</span>
          <span className="re-detail-hero__type">{project.type}</span>
          <h1>{project.title}</h1>
          <p className="re-detail-hero__location">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {project.location}
          </p>
          <div className="re-detail-hero__price">
            <span>Эхлэх үнэ</span>
            <strong>{project.price}</strong>
          </div>
        </div>
      </section>

      <section className="re-section">
        <div className="re-container re-detail-grid">
          <div className="re-detail-main">
            {project.longDescription && (
              <article className="re-detail-block">
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  Төслийн тухай
                </span>
                <h2>Төслийн дэлгэрэнгүй</h2>
                <p>{project.longDescription}</p>
              </article>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <article className="re-detail-block">
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  Онцлог
                </span>
                <h2>Яагаад энэ төсөл вэ</h2>
                <ul className="re-detail-highlights">
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {project.amenities && project.amenities.length > 0 && (
              <article className="re-detail-block">
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  Тоноглол
                </span>
                <h2>Тоноглол ба үйлчилгээ</h2>
                <div className="re-detail-amenities">
                  {project.amenities.map((a) => (
                    <span key={a} className="re-detail-amenity">{a}</span>
                  ))}
                </div>
              </article>
            )}

            {project.floorPlans && project.floorPlans.length > 0 && (
              <article className="re-detail-block">
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  Зохион байгуулалт
                </span>
                <h2>Өрөөний зохион байгуулалт</h2>
                <p className="re-detail-block__lead">
                  Сонирхсон айлын төлөвлөгөөг доорхоос үзнэ үү. Шууд утсаар
                  холбогдох эсвэл уулзалт товлоход тус болно.
                </p>
                <div className="re-floorplan-grid">
                  {project.floorPlans.map((plan) => (
                    <figure key={plan.id} className="re-floorplan">
                      <div className="re-floorplan__media">
                        <Image
                          src={plan.image}
                          alt={`${project.title} — ${plan.label}`}
                          fill
                          sizes="(min-width: 1100px) 32vw, (min-width: 700px) 48vw, 100vw"
                          className="re-floorplan__image"
                        />
                      </div>
                      <figcaption>
                        <strong>{plan.rooms}</strong>
                        <span>{plan.area}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <article className="re-detail-block">
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  Зургийн цомог
                </span>
                <h2>Дотоод ба гаднах үзэмж</h2>
                <div className="re-detail-gallery">
                  {project.gallery.map((src, i) => (
                    <div
                      key={`${src}-${i}`}
                      className={`re-detail-gallery__item ${i === 0 ? "re-detail-gallery__item--lead" : ""}`}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} зураг ${i + 1}`}
                        fill
                        sizes="(min-width: 1100px) 48vw, 100vw"
                        className="re-detail-gallery__image"
                      />
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          <aside className="re-detail-aside">
            <div className="re-detail-card">
              <h3>Төслийн товч</h3>
              <dl className="re-detail-facts">
                <div>
                  <dt>Хөгжүүлэгч</dt>
                  <dd>{project.developer ?? "—"}</dd>
                </div>
                <div>
                  <dt>Ашиглалт</dt>
                  <dd>{project.completion ?? "—"}</dd>
                </div>
                <div>
                  <dt>Давхар</dt>
                  <dd>{project.floors ?? "—"}</dd>
                </div>
                <div>
                  <dt>Талбай</dt>
                  <dd>{project.size ?? "—"}</dd>
                </div>
                <div>
                  <dt>Нэгж тоо</dt>
                  <dd>{project.units ?? "—"}</dd>
                </div>
                <div>
                  <dt>Зогсоол</dt>
                  <dd>{project.parking ?? "—"}</dd>
                </div>
                <div>
                  <dt>Үнэ</dt>
                  <dd>{project.price}</dd>
                </div>
                <div>
                  <dt>Байршил</dt>
                  <dd>{project.location}</dd>
                </div>
              </dl>

              <div className="re-detail-card__actions">
                <Link href="/real-estate/contact" className="re-btn re-btn--primary">
                  Дэлгэрэнгүй авах
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <a href="tel:+97600000000" className="re-btn re-btn--ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.92z" />
                  </svg>
                  Утсаар холбогдох
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="re-section re-projects">
          <div className="re-container">
            <div className="re-section-head re-section-head--with-cta">
              <div>
                <span className="re-eyebrow re-eyebrow--dark">
                  <span className="re-eyebrow-dot" aria-hidden="true" />
                  Бусад төсөл
                </span>
                <h2>Үргэлжлүүлэн үзэх</h2>
              </div>
              <Link href="/real-estate/projects" className="re-section-head__cta">
                Бүх төслийг үзэх
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="re-project-grid">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/real-estate/projects/${p.id}`}
                  className="re-project"
                  aria-label={`${p.title} төсөл`}
                >
                  <div className="re-project__media">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw"
                      className="re-project__photo"
                    />
                    <div className="re-project__media-overlay" aria-hidden="true" />
                    <span className="re-project__status">{p.status}</span>
                  </div>
                  <div className="re-project__body">
                    <span className="re-project__type">{p.type}</span>
                    <h3>{p.title}</h3>
                    <p className="re-project__meta">
                      <span>{p.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.price}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
