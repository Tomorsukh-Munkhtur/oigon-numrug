import Image from "next/image";
import Link from "next/link";
import PageHero from "../../_components/PageHero";
import { listProjects } from "@/lib/real-estate/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Төслүүд",
  description:
    "Skyline Residence, Civic Office Tower, Garden Village, Darkhan Plaza зэрэг Дархан хотын онцлох үл хөдлөх төслүүд — Oigon Numrug Properties.",
  alternates: { canonical: "/real-estate/projects" },
  openGraph: {
    title: "Төслүүд — Oigon Numrug Properties",
    description: "Дархан хотын үл хөдлөх хөрөнгийн онцлох төслүүд.",
    url: "/real-estate/projects",
  },
};

export default function ProjectsPage() {
  const reProjects = listProjects();

  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title={<>Сонгомол төслүүд, бодит туршлага</>}
        description="Бид төслийг зах зээлд эрсдэлгүй байршуулах, борлуулалтыг хурдасгахад мэргэшсэн. Доорх төслүүд нь сүүлийн жилүүдэд хамтран ажилласан туршлагаас."
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/projects", label: "Төслүүд" },
        ]}
      />

      <section className="re-section">
        <div className="re-container">
          <div className="re-project-list">
            {reProjects.map((project, idx) => (
              <article
                key={project.id}
                className={`re-project-row ${idx % 2 === 1 ? "re-project-row--alt" : ""}`}
              >
                <Link
                  href={`/real-estate/projects/${project.id}`}
                  className="re-project-row__media"
                  aria-label={`${project.title} дэлгэрэнгүй`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 980px) 48vw, 100vw"
                    className="re-project-row__photo"
                  />
                  <span className="re-project__status">{project.status}</span>
                </Link>
                <div className="re-project-row__body">
                  <span className="re-project__type">{project.type}</span>
                  <h2>{project.title}</h2>
                  {project.summary && <p>{project.summary}</p>}
                  <dl className="re-project-row__facts">
                    <div>
                      <dt>Байршил</dt>
                      <dd>{project.location}</dd>
                    </div>
                    <div>
                      <dt>Талбай</dt>
                      <dd>{project.size ?? "—"}</dd>
                    </div>
                    <div>
                      <dt>Үнэ</dt>
                      <dd>{project.price}</dd>
                    </div>
                  </dl>
                  <Link href={`/real-estate/projects/${project.id}`} className="re-btn re-btn--dark">
                    Дэлгэрэнгүй үзэх
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="re-cta">
        <div className="re-container re-cta-inner">
          <div className="re-cta-copy">
            <span className="re-eyebrow re-eyebrow--light">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              Хамтын ажиллагаа
            </span>
            <h2>Танай төслийг зөв байршуулъя.</h2>
            <p>
              Хэрэв та төсөл хариуцаж буй бол маркетингийн стратеги, үнийн
              байршуулалт, борлуулалтын суваг зэргийг нэгтгэн санал болгоход
              бэлэн.
            </p>
            <div className="re-cta-actions">
              <Link href="/real-estate/contact" className="re-btn re-btn--primary">
                Хамтран ажиллах
              </Link>
              <Link href="/real-estate/services" className="re-btn re-btn--ghost">
                Үйлчилгээ үзэх
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
