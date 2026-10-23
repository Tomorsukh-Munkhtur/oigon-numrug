import Image from "next/image";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { safetyPages, safetySettings } from "@/lib/safety/content";

export const metadata: Metadata = {
  title: "ХАБЭА — Холбоо барих",
  description: "Аюулгүй ажиллагааны зөвлөгөө авах, хамтран ажиллах хүсэлтээ Ойгон Нөмрөг ХАБЭА-д илгээнэ үү.",
  alternates: { canonical: "/safety/contact" },
  openGraph: {
    title: "ХАБЭА — Холбоо барих — Oigon Numrug ХАБЭА",
    description: "Аюулгүй ажиллагааны зөвлөгөө авах, хамтран ажиллах хүсэлтээ Ойгон Нөмрөг ХАБЭА-д илгээнэ үү.",
    url: "/safety/contact",
  },
};

export default function SafetyContactPage() {
  const page = safetyPages.contact;
  const settings = safetySettings;

  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: "40vh", minHeight: "300px" }}>
        <Image
          src={page.hero_image || "/real-estate-bg.jpg"}
          alt="Contact OHS"
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

          <div
            className="sf-contact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
              marginTop: "60px",
            }}
          >
            <div className="sf-card sf-reveal">
              <div className="sf-card-stripe" style={{ "--accent": "#FF9800" } as CSSProperties} />
              <div className="sf-icon-wrap" style={{ fontSize: "32px", marginBottom: "20px" }}>
                📞
              </div>
              <h3>Утас</h3>
              <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--sf-dark)" }}>
                {settings.contact_phone}
              </p>
              <p style={{ opacity: 0.7 }}>{settings.contact_phone_note}</p>
            </div>

            <div className="sf-card sf-reveal" style={{ transitionDelay: "100ms" }}>
              <div className="sf-card-stripe" style={{ "--accent": "#2196F3" } as CSSProperties} />
              <div className="sf-icon-wrap" style={{ fontSize: "32px", marginBottom: "20px" }}>
                ✉️
              </div>
              <h3>И-мэйл</h3>
              <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--sf-dark)" }}>
                {settings.contact_email}
              </p>
              <p style={{ opacity: 0.7 }}>{settings.contact_email_note}</p>
            </div>

            <div className="sf-card sf-reveal" style={{ transitionDelay: "200ms" }}>
              <div className="sf-card-stripe" style={{ "--accent": "#4CAF50" } as CSSProperties} />
              <div className="sf-icon-wrap" style={{ fontSize: "32px", marginBottom: "20px" }}>
                📍
              </div>
              <h3>Хаяг</h3>
              <p style={{ fontSize: "18px", fontWeight: "600", color: "var(--sf-dark)" }}>
                {settings.contact_address}
              </p>
              <p style={{ opacity: 0.7 }}>{settings.contact_address_note}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
