import Image from "next/image";
import type { CSSProperties } from "react";
import { getSafetyPage, listSafetyTraining } from "@/lib/safety/content";

export const dynamic = "force-dynamic";

export default function SafetyTrainingPage() {
  const page = getSafetyPage("training");
  const trainingSessions = listSafetyTraining();

  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: "40vh", minHeight: "300px" }}>
        <Image
          src={page.hero_image || "/project-residence.jpg"}
          alt="OHS Training"
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
            {trainingSessions.map((session, index) => (
              <article
                key={session.id}
                className="sf-card sf-reveal"
                style={
                  {
                    transitionDelay: `${index * 120}ms`,
                    "--accent": session.color,
                    "--accent-bg": session.bg_color,
                  } as CSSProperties
                }
              >
                <div className="sf-card-stripe" />
                <div className="sf-card-top">
                  <div className="sf-icon-wrap">
                    <span>{session.icon}</span>
                  </div>
                  <div className="sf-badges">
                    <span className="sf-pill">{session.level}</span>
                    <span className="sf-pill sf-pill--accent">⏱ {session.duration}</span>
                  </div>
                </div>
                <h3>{session.title}</h3>
                <p>{session.description}</p>
                <a href="#" className="sf-link">
                  Дэлгэрэнгүй үзэх
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
