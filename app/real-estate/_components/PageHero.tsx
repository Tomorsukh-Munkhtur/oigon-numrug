import Image from "next/image";
import Link from "next/link";

type Crumb = { href: string; label: string };

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  /** Optional background image override; falls back to gradient when empty. */
  image?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
}: PageHeroProps) {
  return (
    <section className={`re-page-hero ${image ? "re-page-hero--image" : ""}`}>
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="re-page-hero__image"
        />
      )}
      {image && <div className="re-page-hero__overlay" aria-hidden="true" />}
      <div className="re-page-hero__grid" aria-hidden="true" />
      <div className="re-container re-page-hero__inner">
        {crumbs && crumbs.length > 0 && (
          <nav className="re-crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.href}>
                <Link href={c.href}>{c.label}</Link>
                {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
              </span>
            ))}
          </nav>
        )}
        <span className="re-eyebrow re-eyebrow--light">
          <span className="re-eyebrow-dot" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
