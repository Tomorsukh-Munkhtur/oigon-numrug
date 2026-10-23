import Image from "next/image";
import Link from "next/link";

type Crumb = { href: string; label: string };

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs: Crumb[];
  /** Гарчгийн доорх өргөн зураг; хоосон бол зураггүй хувилбар. */
  image?: string;
  /** Тайлбарын доор харагдах жижиг шошгууд. */
  meta?: string[];
};

export default function PageHero({ eyebrow, title, description, crumbs, image, meta }: PageHeroProps) {
  return (
    <section className={`re-phero${image ? "" : " re-phero--plain"}`}>
      <div className="re-wrap">
        <nav className="re-crumbs re-rise" aria-label="Breadcrumb">
          {crumbs.map((crumb, index) =>
            index === crumbs.length - 1 ? (
              <span key={crumb.href} aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <span key={crumb.href}>
                <Link href={crumb.href}>{crumb.label}</Link>
                <span aria-hidden="true"> /</span>
              </span>
            )
          )}
        </nav>

        <div className="re-phero__grid">
          <div className="re-rise">
            <p className="re-kicker">{eyebrow}</p>
            <h1 className="re-display re-phero__title">{title}</h1>
          </div>
          {(description || meta) && (
            <div className="re-rise">
              {description && <p className="re-lead">{description}</p>}
              {meta && meta.length > 0 && (
                <div className="re-phero__meta">
                  {meta.map((item) => (
                    <span key={item} className="re-pill">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {image && (
          <div className="re-phero__banner re-rise">
            <Image src={image} alt="" fill priority sizes="(min-width: 1280px) 1280px, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
