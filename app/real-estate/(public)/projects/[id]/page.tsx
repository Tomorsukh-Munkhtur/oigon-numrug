import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectCard from "../../../_components/ProjectCard";
import { ArrowRight, PhoneIcon, PinIcon } from "../../../_components/icons";
import { getContactChannel, getProject, projects } from "@/lib/real-estate/content";

// Бүх төслийн хуудсыг build үед бэлдэнэ; бусад ID 404 өгнө.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

type Params = { id: string };

const pad = (value: number) => String(value).padStart(2, "0");

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Төсөл олдсонгүй" };

  const description = project.summary ?? project.longDescription;
  const url = `/real-estate/projects/${project.id}`;
  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Oigon Numrug Properties`,
      description,
      url,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === project.id);
  const related = projects.filter((p) => p.id !== project.id).slice(0, 3);
  const phone = getContactChannel("phone");

  const facts = [
    { label: "Хөгжүүлэгч", value: project.developer },
    { label: "Ашиглалт", value: project.completion },
    { label: "Давхар", value: project.floors },
    { label: "Талбай", value: project.size },
    { label: "Нэгж", value: project.units },
    { label: "Зогсоол", value: project.parking },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  const highlights = project.highlights ?? [];
  const amenities = project.amenities ?? [];
  const floorPlans = (project.floorPlans ?? []).filter((plan) => plan.image);
  const gallery = (project.gallery ?? []).filter(Boolean);

  return (
    <>
      <section className="re-dhero">
        <div className="re-wrap">
          <nav className="re-crumbs re-rise" aria-label="Breadcrumb">
            <span>
              <Link href="/real-estate">Нүүр</Link>
              <span aria-hidden="true"> /</span>
            </span>
            <span>
              <Link href="/real-estate/projects">Төслүүд</Link>
              <span aria-hidden="true"> /</span>
            </span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="re-dhero__head">
            <div className="re-rise">
              <div className="re-dhero__tags">
                {project.status && <span className="re-pill re-pill--accent">{project.status}</span>}
                {project.type && <span className="re-pill">{project.type}</span>}
                <span className="re-pill">№ {pad(index + 1)}</span>
              </div>
              <h1 className="re-display re-dhero__title">{project.title}</h1>
              <p className="re-dhero__loc">
                <PinIcon size={17} />
                {project.location}
              </p>
            </div>
            {project.price && (
              <div className="re-dhero__price re-rise">
                <span>Эхлэх үнэ</span>
                <strong>{project.price}</strong>
              </div>
            )}
          </div>

          {project.image && (
            <div className="re-dhero__media re-rise">
              <Image src={project.image} alt={project.title} fill priority sizes="(min-width: 1280px) 1280px, 100vw" />
            </div>
          )}
        </div>
      </section>

      {facts.length > 0 && (
        <section className="re-facts" aria-label="Төслийн үзүүлэлт">
          <div className="re-wrap">
            <dl>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <section className="re-section">
        <div className="re-wrap re-detail">
          <div>
            {project.longDescription && (
              <div className="re-block re-reveal">
                <p className="re-kicker">Төслийн тухай</p>
                <h2 className="re-display re-block__title">Төслийн дэлгэрэнгүй</h2>
                <p className="re-block__text">{project.longDescription}</p>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="re-block re-reveal">
                <p className="re-kicker">Онцлог</p>
                <h2 className="re-display re-block__title">Яагаад энэ төсөл вэ</h2>
                <ol className="re-highlights">
                  {highlights.map((item, i) => (
                    <li key={item}>
                      <span>{pad(i + 1)}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {amenities.length > 0 && (
              <div className="re-block re-reveal">
                <p className="re-kicker">Тоноглол</p>
                <h2 className="re-display re-block__title">Тоноглол ба үйлчилгээ</h2>
                <ul className="re-amenities">
                  {amenities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {floorPlans.length > 0 && (
              <div className="re-block re-reveal">
                <p className="re-kicker">Зохион байгуулалт</p>
                <h2 className="re-display re-block__title">Өрөөний зохион байгуулалт</h2>
                <div className="re-plans">
                  {floorPlans.map((plan) => (
                    <figure key={plan.id} className="re-plan">
                      <div className="re-plan__media">
                        <Image
                          src={plan.image}
                          alt={`${project.title} — ${plan.label}`}
                          fill
                          sizes="(min-width: 1000px) 260px, 50vw"
                        />
                      </div>
                      <figcaption>
                        <strong>{plan.rooms || plan.label}</strong>
                        <span>{plan.area}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {gallery.length > 0 && (
              <div className="re-block re-reveal">
                <p className="re-kicker">Зургийн цомог</p>
                <h2 className="re-display re-block__title">Дотоод ба гаднах үзэмж</h2>
                <div className="re-gallery">
                  {gallery.map((src, i) => (
                    <div key={`${src}-${i}`} className="re-gallery__item">
                      <Image
                        src={src}
                        alt={`${project.title} — зураг ${i + 1}`}
                        fill
                        sizes={i === 0 ? "(min-width: 1000px) 850px, 100vw" : "(min-width: 1000px) 420px, 50vw"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="re-aside">
            <div className="re-aside__card">
              <p className="re-kicker">Сонирхож байна уу?</p>
              <h2 className="re-display re-aside__title">{project.title}</h2>
              <dl className="re-aside__rows">
                {project.price && (
                  <div>
                    <dt>Үнэ</dt>
                    <dd>{project.price}</dd>
                  </div>
                )}
                {project.size && (
                  <div>
                    <dt>Талбай</dt>
                    <dd>{project.size}</dd>
                  </div>
                )}
                {project.completion && (
                  <div>
                    <dt>Ашиглалт</dt>
                    <dd>{project.completion}</dd>
                  </div>
                )}
              </dl>
              <Link href="/real-estate/contact" className="re-btn re-btn--accent re-btn--block">
                Зөвлөгөө авах
                <ArrowRight />
              </Link>
              {phone && (
                <a href={phone.href} className="re-btn re-btn--line re-btn--block">
                  <PhoneIcon size={16} />
                  {phone.value}
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="re-section re-section--sand">
          <div className="re-wrap">
            <div className="re-head">
              <div>
                <p className="re-kicker">Бусад төсөл</p>
                <h2 className="re-display re-h2">Үргэлжлүүлэн үзэх</h2>
              </div>
              <div className="re-head__aside">
                <Link href="/real-estate/projects" className="re-link">
                  Бүх төсөл ({pad(projects.length)})
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="re-related">
              {related.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={projects.indexOf(p)}
                  sizes="(min-width: 760px) 33vw, 100vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
