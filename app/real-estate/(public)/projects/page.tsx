import CtaBand from "../../_components/CtaBand";
import PageHero from "../../_components/PageHero";
import ProjectCard from "../../_components/ProjectCard";
import { projects } from "@/lib/real-estate/content";

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
  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title={
          <>
            Сонгомол төслүүд, <em>бодит туршлага</em>
          </>
        }
        description="Бид төслийг зах зээлд эрсдэлгүй байршуулах, борлуулалтыг хурдасгахад мэргэшсэн. Доорх төслүүд нь сүүлийн жилүүдэд хамтран ажилласан туршлагаас."
        meta={[`${String(projects.length).padStart(2, "0")} төсөл`, "Дархан хот"]}
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/projects", label: "Төслүүд" },
        ]}
      />

      <section className="re-section">
        <div className="re-wrap">
          <div className="re-pgrid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                headingLevel={2}
                variant={index % 4 === 0 || index % 4 === 3 ? "wide" : "narrow"}
                sizes={index % 4 === 0 || index % 4 === 3 ? "(min-width: 900px) 58vw, 100vw" : "(min-width: 900px) 42vw, 100vw"}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Хамтын ажиллагаа"
        title={
          <>
            Танай төслийг <em>зөв байршуулъя.</em>
          </>
        }
        description="Хэрэв та төсөл хариуцаж буй бол маркетингийн стратеги, үнийн байршуулалт, борлуулалтын суваг зэргийг нэгтгэн санал болгоход бэлэн."
        primary={{ label: "Хамтран ажиллах", href: "/real-estate/contact" }}
        secondary={{ label: "Үйлчилгээ үзэх", href: "/real-estate/services" }}
      />
    </>
  );
}
