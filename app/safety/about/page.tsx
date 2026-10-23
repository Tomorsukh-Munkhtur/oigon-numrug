import Image from "next/image";
import type { Metadata } from "next";
import { safetyAboutFeatures, safetyPages } from "@/lib/safety/content";

export const metadata: Metadata = {
  title: "ХАБЭА — Бидний тухай",
  description: "Ойгон Нөмрөг ХАБЭА нь байгууллагын аюулгүй ажиллагааны тогтолцоог сайжруулах, эрсдэлийг урьдчилан таамаглах, хянах чиглэлээр мэргэшсэн баг.",
  alternates: { canonical: "/safety/about" },
  openGraph: {
    title: "ХАБЭА — Бидний тухай — Oigon Numrug ХАБЭА",
    description: "Ойгон Нөмрөг ХАБЭА нь байгууллагын аюулгүй ажиллагааны тогтолцоог сайжруулах, эрсдэлийг урьдчилан таамаглах, хянах чиглэлээр мэргэшсэн баг.",
    url: "/safety/about",
  },
};

const featureIcons = ["🛡️", "🛠️", "📈"];

export default function SafetyAboutPage() {
  const page = safetyPages.about;

  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: "40vh", minHeight: "300px" }}>
        <Image
          src={page.hero_image || "/project-office.jpg"}
          alt="About OHS"
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
          <div className="sf-about sf-reveal">
            <div className="sf-about-content">
              {page.section_tag && <span className="sf-tag">{page.section_tag}</span>}
              <h2>
                {page.section_title} — <span className="sf-gradient-text">{page.section_highlight}</span>
              </h2>
              <div className="sf-about-body">
                {page.body && <p>{page.body}</p>}
                <div className="sf-feature-list">
                  {safetyAboutFeatures.map((feature, index) => (
                    <div className="sf-feature-item" key={feature}>
                      <span>{featureIcons[index] || "•"}</span> {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {page.visual_image && (
              <div className="sf-about-visual">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/3",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <Image src={page.visual_image} alt="Баг хамт олон" fill style={{ objectFit: "cover" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
