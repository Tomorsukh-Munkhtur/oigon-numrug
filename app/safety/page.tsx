"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Сургалтанд хамрагдсан", color: "#e67e22" },
  { value: "98%", label: "Сэтгэл ханамж", color: "#27ae60" },
  { value: "50+", label: "Хамтрагч байгууллага", color: "#2980b9" },
  { value: "12+", label: "Жилийн туршлага", color: "#8e44ad" },
];

export default function SafetyPage() {
  return (
    <>
      {/* Hero */}
      <section className="sf-hero">
        <Image src="/safety-bg.jpg" alt="Safety background" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            <div className="sf-ohs-badge">OHS COMPLIANCE UNIT</div>
            <span className="sf-badge">⛑️ ХӨДӨЛМӨР АЮУЛГҮЙ БАЙДАЛ, ЭРҮҮЛ АХУЙ</span>
            <h1>Аюулгүй байдлын <span className="sf-gradient-text">стандарт тогтооно</span></h1>
            <p className="sf-hero-desc">
              Бид олон улсын стандартын дагуу ажлын байрны эрсдэлийг бууруулж,
              хамгаалалтын дэвшилтэт соёлыг таны байгууллагад нутагшуулна.
            </p>
            <div className="sf-hero-actions">
              <Link href="/safety/training" className="sf-btn sf-btn--primary">
                <span>Сургалтын хөтөлбөр</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </Link>
              <Link href="/safety/services" className="sf-btn sf-btn--outline">Бүх үйлчилгээ</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="sf-stats">
        <div className="sf-container">
          <div className="sf-stats-inner">
            {stats.map((s, i) => (
              <div key={s.label} className="sf-stat sf-reveal" style={{ transitionDelay: `${i * 100}ms`, "--accent": s.color } as React.CSSProperties}>
                <div className="sf-stat-icon" style={{ color: s.color }}>
                  {i === 0 && "👷"} {i === 1 && "✅"} {i === 2 && "🏢"} {i === 3 && "🏆"}
                </div>
                <span className="sf-stat-num">{s.value}</span>
                <span className="sf-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teasers */}
      <section className="sf-block">
        <div className="sf-container">
          <div className="sf-section-top sf-reveal">
            <span className="sf-tag">Бидний үйл ажиллагаа</span>
            <h2>Аюулгүй байдлыг <span className="sf-gradient-text">цогцоор нь</span></h2>
          </div>
          <div className="sf-card-grid sf-card-grid--2">
            <div className="sf-card sf-reveal">
              <div className="sf-card-stripe" style={{ '--accent': '#FF9800' } as CSSProperties} />
              <h3>Мэргэшүүлэх сургалт</h3>
              <p>Бид ажилтан бүрт тохирсон ХАБЭА-н цогц сургалтууд онол болон практик хосолсон байдлаар явуулдаг.</p>
              <Link href="/safety/training" className="sf-link">Сургалтууд үзэх</Link>
            </div>
            <div className="sf-card sf-reveal">
              <div className="sf-card-stripe" style={{ '--accent': '#2196F3' } as CSSProperties} />
              <h3>Мэргэжлийн үйлчилгээ</h3>
              <p>Эрсдэлийн үнэлгээ, аудит болон зөвлөх үйлчилгээгээр дамжуулан таны байгууллагыг эрсдэлээс хамгаална.</p>
              <Link href="/safety/services" className="sf-link">Бүх үйлчилгээ</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
