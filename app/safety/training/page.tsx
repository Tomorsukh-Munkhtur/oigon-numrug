"use client";

import Image from "next/image";

const trainingSessions = [
  {
    id: 1,
    title: "Ажлын байр дахь аюулгүй байдал",
    desc: "Үндсэн аюулгүй байдлын дүрэм, эвчүүлэлтээс сэргийлэх арга",
    duration: "2 цаг",
    level: "Эхлэгч",
    icon: "🛡️",
    color: "#27ae60",
    bg: "#e8f8f0",
  },
  {
    id: 2,
    title: "Аварийн нөхцөлд үйлдэл",
    desc: "Гал түймэр, цахилгааны аюулаас хорших эсвэл аврах үйлдэл",
    duration: "1.5 цаг",
    level: "Дунд",
    icon: "🚨",
    color: "#e74c3c",
    bg: "#fdf0ef",
  },
  {
    id: 3,
    title: "Аюулгүй үйлдэл ба санитар нөхцөл",
    desc: "Хүнд болон химийн материалыг удирдах аюулгүй байдал",
    duration: "2.5 цаг",
    level: "Дэвшилтэт",
    icon: "⚠️",
    color: "#e67e22",
    bg: "#fef6ec",
  },
  {
    id: 4,
    title: "Эрүүл мэндийн эрсдэл ба дохиолол",
    desc: "Эргүүлэх эрүүл мэндийн эрсдэлийг хэрхэн мэдэрч, тайлагнах",
    duration: "1 цаг",
    level: "Эхлэгч",
    icon: "🏥",
    color: "#2980b9",
    bg: "#edf4fc",
  },
];

export default function SafetyTrainingPage() {
  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: '40vh', minHeight: '300px' }}>
        <Image src="/project-residence.jpg" alt="OHS Training" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            <span className="sf-tag">Мэргэшүүлэх сургалт</span>
            <h1 style={{ fontSize: '48px' }}>ХАБЭА-н <span className="sf-gradient-text">цогц сургалтууд</span></h1>
          </div>
        </div>
      </section>

      <section className="sf-block">
        <div className="sf-container">
          <div className="sf-section-top sf-reveal">
            <span className="sf-tag">Хөтөлбөрүүд</span>
            <h2>Салбарын онцлогт <span className="sf-gradient-text">тохирсон курсууд</span></h2>
            <p className="sf-subtitle">Онол болон практик хосолсон, олон улсын стандартад нийцсэн сургалтын хөтөлбөрүүд.</p>
          </div>
          <div className="sf-card-grid sf-card-grid--2">
            {trainingSessions.map((s, i) => (
              <article key={s.id} className="sf-card sf-reveal" style={{ transitionDelay: `${i * 120}ms`, "--accent": s.color, "--accent-bg": s.bg } as React.CSSProperties}>
                <div className="sf-card-stripe" />
                <div className="sf-card-top">
                  <div className="sf-icon-wrap"><span>{s.icon}</span></div>
                  <div className="sf-badges">
                    <span className="sf-pill">{s.level}</span>
                    <span className="sf-pill sf-pill--accent">⏱ {s.duration}</span>
                  </div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href="#" className="sf-link">
                  Дэлгэрэнгүй үзэх
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
