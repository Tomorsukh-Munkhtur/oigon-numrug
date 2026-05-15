import Image from "next/image";

type Organization =
  | {
      id: string;
      logo: string;
      logoAlt: string;
      background: string;
      description: string;
      href: string;
      action: string;
      side: "realEstate";
    }
  | {
      id: string;
      logo: string;
      logoAlt: string;
      background: string;
      description: string;
      href: string;
      action: string;
      side: "safety";
    };

const organizations: Organization[] = [
  {
    id: "real-estate",
    logo: "/Logo_Primary color - 2.png",
    logoAlt: "Oigon Numrug Properties",
    background: "/real-estate-bg.jpg",
    description:
      "Орон сууц, газар, арилжааны талбайн зөвлөгөө, борлуулалт, түрээсийн найдвартай шийдэл.",
    href: "/real-estate",
    action: "Дэлгэрэнгүй",
    side: "realEstate",
  },
  {
    id: "safety",
    logo: "/oigon numrug-06.png",
    logoAlt: "Oigon Numrug HABEA",
    background: "/safety-bg.jpg",
    description:
      "Ажлын байрны эрсдэлийн үнэлгээ, сургалт, хяналт, хамгаалалтын соёлыг төлөвшүүлэх үйлчилгээ.",
    href: "/safety",
    action: "Танилцах",
    side: "safety",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="org-grid">
        {organizations.map((organization) => (
          <a
            key={organization.id}
            href={organization.href}
            className={`org-panel org-panel-${organization.side}`}
          >
            <Image
              src={organization.background}
              alt=""
              fill
              priority={organization.side === "realEstate"}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="org-bg-image"
            />
            <div className="org-overlay" aria-hidden="true" />
            <div className="org-panel-pattern" aria-hidden="true" />

            <div className="org-content">
              <div className="org-logo-card">
                <Image
                  src={organization.logo}
                  alt={organization.logoAlt}
                  width={820}
                  height={360}
                  priority
                  className="org-logo"
                />
              </div>

              <div className="org-copy">
                <p className="org-description">{organization.description}</p>
                <span className="org-action">{organization.action}</span>
              </div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
