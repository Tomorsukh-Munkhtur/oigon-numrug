import Image from "next/image";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { safetyPages, safetyServices } from "@/lib/safety/content";

export const metadata: Metadata = {
  title: "ХАБЭА үйлчилгээ",
  description: "Ажлын байрны эрсдэлийн үнэлгээ, аюулгүй байдлын сургалт ба сертификат, аудит, эрүүл мэндийн хамтын ажиллагаа — Ойгон Нөмрөг ХАБЭА.",
  alternates: { canonical: "/safety/services" },
  openGraph: {
    title: "ХАБЭА үйлчилгээ — Oigon Numrug ХАБЭА",
    description: "Ажлын байрны эрсдэлийн үнэлгээ, аюулгүй байдлын сургалт ба сертификат, аудит, эрүүл мэндийн хамтын ажиллагаа — Ойгон Нөмрөг ХАБЭА.",
    url: "/safety/services",
  },
};

export default function SafetyServicesPage() {
  const page = safetyPages.services;

  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: "40vh", minHeight: "300px" }}>
        <Image
          src={page.hero_image || "/project-garden.jpg"}
          alt="OHS Services"
          fill
          priority
          sizes="100vw"
          className="sf-hero-image"
        />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            {page.hero_tag && <span className="sf-tag">{page.hero_tag}</span>}
            <h1 className="sf-hero-title" style={{ fontSize: "48px" }}>
              {page.hero_title}{" "}
              <span style={{ color: "var(--sf-yellow)" }}>{page.hero_highlight}</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="sf-block">
        <div className="sf-container">
          <div className="sf-section-top sf-reveal">
            {page.section_tag && <span className="sf-tag">{page.section_tag}</span>}
            <h2>
              {page.section_title} <span className="sf-gradient-text">{page.section_highlight}</span>
            </h2>
            {page.section_description && <p className="sf-subtitle">{page.section_description}</p>}
          </div>
          <div className="sf-card-grid sf-card-grid--2">
            {safetyServices.map((service, index) => (
              <div
                key={service.id}
                className="sf-card sf-card--svc sf-reveal"
                style={{ transitionDelay: `${index * 120}ms`, "--accent": service.color } as CSSProperties}
              >
                <div className="sf-card-stripe" />
                <div className="sf-icon-wrap">
                  <span>{service.icon}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
