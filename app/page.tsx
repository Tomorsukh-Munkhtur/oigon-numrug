import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

type Gateway = {
  id: "re" | "safety";
  index: string;
  eyebrow: string;
  logo: { src: string; alt: string; width: number; height: number };
  background: string;
  description: string;
  tags: string[];
  href: string;
  action: string;
};

const gateways: Gateway[] = [
  {
    id: "re",
    index: "01",
    eyebrow: "Үл хөдлөх хөрөнгө",
    logo: { src: "/Logo_White color - 2.png", alt: "Oigon Numrug Properties", width: 5884, height: 1493 },
    background: "/real-estate-bg.jpg",
    description:
      "Орон сууц, газар, арилжааны талбайн зөвлөгөө, борлуулалт, түрээсийн найдвартай шийдэл.",
    tags: ["Борлуулалт, түрээс", "Төслийн маркетинг", "Хөрөнгийн зөвлөгөө", "Үнэлгээ"],
    href: "/real-estate",
    action: "Дэлгэрэнгүй",
  },
  {
    id: "safety",
    index: "02",
    eyebrow: "ХАБЭА · Аюулгүй ажиллагаа",
    logo: { src: "/oigon numrug-06.png", alt: "Oigon Numrug ХАБЭА", width: 2771, height: 1300 },
    background: "/safety-bg.jpg",
    description:
      "Ажлын байрны эрсдэлийн үнэлгээ, сургалт, хяналт, хамгаалалтын соёлыг төлөвшүүлэх үйлчилгээ.",
    tags: ["Эрсдэлийн үнэлгээ", "Сургалт, сертификат", "Аудит, хяналт"],
    href: "/safety",
    action: "Танилцах",
  },
];

export default function Home() {
  return (
    <main className="gate">
      <header className="gate-top">
        <h1 className="gate-brand">Ойгон Нөмрөг</h1>
        <p className="gate-hint">Чиглэлээ сонгоно уу</p>
      </header>

      <div className="gate-grid">
        {gateways.map((gateway) => (
          <Link key={gateway.id} href={gateway.href} className={`gate-panel gate-panel--${gateway.id}`}>
            <div className="gate-media" aria-hidden="true">
              <Image
                src={gateway.background}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 60vw, 100vw"
                className="gate-bg"
              />
            </div>
            <div className="gate-shade" aria-hidden="true" />
            <div className="gate-lines" aria-hidden="true" />

            <div className="gate-inner">
              <div className="gate-meta">
                <span className="gate-index">{gateway.index}</span>
                <span className="gate-meta-line" aria-hidden="true" />
                <span>{gateway.eyebrow}</span>
              </div>

              <div className="gate-body">
                <Image
                  src={gateway.logo.src}
                  alt={gateway.logo.alt}
                  width={gateway.logo.width}
                  height={gateway.logo.height}
                  priority
                  className="gate-logo"
                />
                <p className="gate-desc">{gateway.description}</p>
                <ul className="gate-tags">
                  {gateway.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="gate-cta">
                  {gateway.action}
                  <span className="gate-cta-icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
