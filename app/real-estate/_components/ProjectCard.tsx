import Image from "next/image";
import Link from "next/link";
import type { RealEstateProject } from "@/lib/real-estate/content";
import { ArrowUpRight } from "./icons";

type Props = {
  project: RealEstateProject;
  /** Портфолио дахь дараалал (0-ээс) — "№ 01" гэж харагдана. */
  index: number;
  variant?: "tall" | "wide" | "narrow";
  headingLevel?: 2 | 3;
  sizes?: string;
};

export default function ProjectCard({
  project,
  index,
  variant,
  headingLevel = 3,
  sizes = "(min-width: 900px) 50vw, 100vw",
}: Props) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Link
      href={`/real-estate/projects/${project.id}`}
      className={`re-card re-reveal${variant ? ` re-card--${variant}` : ""}`}
    >
      <div className="re-card__media">
        {project.image && <Image src={project.image} alt={project.title} fill sizes={sizes} />}
        {project.status && <span className="re-card__status">{project.status}</span>}
        <span className="re-card__arrow" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </div>
      <div>
        <p className="re-card__meta">
          <span className="re-card__idx">№ {String(index + 1).padStart(2, "0")}</span>
          <span>{project.type}</span>
        </p>
        <Heading className="re-card__title">{project.title}</Heading>
        <p className="re-card__facts">
          <span>{project.location}</span>
          <span>{project.price}</span>
        </p>
      </div>
    </Link>
  );
}
