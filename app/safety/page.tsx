"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const safetyServices = [
  {
    title: "Ажлын байрны эрсдэлийн үнэлгээ",
    desc: "Ажлын байрны аюулгүй нөхцөлийг бүрэн шинжилж, эрсдэлийг тодорхойлно.",
    icon: "📋",
    color: "#e67e22",
  },
  {
    title: "Аюулгүй байдлын сургалт ба сертификат",
    desc: "Олон улсын стандартад нийцсэн сургалт, сертификатын хөтөлбөрүүд.",
    icon: "🎓",
    color: "#2980b9",
  },
  {
    title: "Ажлын байрны аудит ба шинжилгээ",
    desc: "Тогтмол хяналт шалгалт, дүн шинжилгээ, тайлан гаргах үйлчилгээ.",
    icon: "🔍",
    color: "#27ae60",
  },
  {
    title: "Эрүүлжүүлэлтийн хамтын ажиллагаа",
    desc: "Ажилчдын эрүүл мэнд, сэтгэл зүйн дэмжлэг, хамтын ажиллагаа.",
    icon: "🤝",
    color: "#8e44ad",
  },
];

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

const stats = [
  { value: "500+", label: "Сургалтанд хамрагдсан", color: "#e67e22" },
  { value: "98%", label: "Сэтгэл ханамж", color: "#27ae60" },
  { value: "50+", label: "Хамтрагч байгууллага", color: "#2980b9" },
  { value: "12+", label: "Жилийн туршлага", color: "#8e44ad" },
];


export default function SafetyPage() {
  const obs = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    obs.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("sf-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".sf-reveal").forEach((el) => obs.current?.observe(el));
    return () => obs.current?.disconnect();
  }, []);

  return (
    <main className="sf-page">
      {/* Nav */}
      <nav className="sf-nav">
        <Image src="/oigon numrug-06.png" alt="Oigon Numrug HABEA" width={720} height={190} priority className="sf-nav-logo" />
        <div className="sf-nav-links">
          <a href="#about">Бидний тухай</a>
          <a href="#training">Сургалтууд</a>
          <a href="#services">Үйлчилгээ</a>
          <a href="#contact" className="sf-nav-cta">Зөвлөгөө авах</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="sf-hero">
        <Image src="/safety-bg.jpg" alt="Safety background" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-hero-content">
          <div className="sf-ohs-badge">OHS COMPLIANCE UNIT</div>
          <span className="sf-badge">⛑️ ХӨДӨЛМӨР АЮУЛГҮЙ БАЙДАЛ, ЭРҮҮЛ АХУЙ</span>
          <h1>Аюулгүй байдлын <span className="sf-gradient-text">стандарт тогтооно</span></h1>
          <p className="sf-hero-desc">
            Бид олон улсын стандартын дагуу ажлын байрны эрсдэлийг бууруулж, 
            хамгаалалтын дэвшилтэт соёлыг таны байгууллагад нутагшуулна.
          </p>
          <div className="sf-hero-actions">
            <a href="#training" className="sf-btn sf-btn--primary">
              <span>Сургалтын хөтөлбөр</span>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </a>
            <a href="#services" className="sf-btn sf-btn--outline">Бүх үйлчилгээ</a>
          </div>
        </div>
      </section>

      {/* Stats with Safety Focus */}
      <section className="sf-stats" id="stats">
        {stats.map((s, i) => (
          <div key={s.label} className="sf-stat sf-reveal" style={{ transitionDelay: `${i * 100}ms`, "--accent": s.color } as React.CSSProperties}>
            <div className="sf-stat-icon" style={{ color: s.color }}>
              {i === 0 && "👷"} {i === 1 && "✅"} {i === 2 && "🏢"} {i === 3 && "🏆"}
            </div>
            <span className="sf-stat-num">{s.value}</span>
            <span className="sf-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* About Section with OHS Focus */}
      <section className="sf-block" id="about">
        <div className="sf-about sf-reveal">
          <div className="sf-about-content">
            <span className="sf-tag">Мэргэжлийн хандлага</span>
            <h2>Таны аюулгүй байдал — <span className="sf-gradient-text">Бидний хариуцлага</span></h2>
            <div className="sf-about-body">
              <p>Ойгон Нөмрөг ХАБЭА нь байгууллагын аюулгүй ажиллагааны тогтолцоог сайжруулах, эрсдэлийг урьдчилан таамаглах, хянах чиглэлээр мэргэшсэн баг хамт олон юм.</p>
              <div className="sf-feature-list">
                <div className="sf-feature-item"><span>🛡️</span> Олон улсын стандарт (ISO 45001)</div>
                <div className="sf-feature-item"><span>🛠️</span> Мэргэжлийн багаж, тоног төхөөрөмж</div>
                <div className="sf-feature-item"><span>📈</span> Эрсдэлийн бодит үнэлгээ, шинжилгээ</div>
              </div>
            </div>
          </div>
          <div className="sf-about-visual">
             <div className="sf-stripe-card">
                <div className="sf-stripe-inner">
                   <h3>АЮУЛГҮЙ БАЙДАЛ 1-Т</h3>
                   <p>БҮХ ГҮЙЦЭТГЭЛД СТАНДАРТ БАРИМТЛАХ НЬ БИДНИЙ ЗАРЧИМ</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Training Sessions */}
      <section className="sf-block sf-block--alt" id="training">
        <div className="sf-section-top sf-reveal">
          <span className="sf-tag">Мэргэшүүлэх сургалт</span>
          <h2>ХАБЭА-н <span className="sf-gradient-text">цогц сургалтууд</span></h2>
          <p className="sf-subtitle">Онол болон практик хосолсон, салбарын онцлогт тохирсон сургалтын курсууд.</p>
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
      </section>

      {/* Services Grid */}
      <section className="sf-block" id="services">
        <div className="sf-section-top sf-reveal">
          <span className="sf-tag">Манай үйлчилгээ</span>
          <h2>Аюулгүй байдлын <span className="sf-gradient-text">цогц шийдэл</span></h2>
        </div>
        <div className="sf-card-grid sf-card-grid--2">
          {safetyServices.map((s, i) => (
            <div key={s.title} className="sf-card sf-card--svc sf-reveal" style={{ transitionDelay: `${i * 120}ms`, "--accent": s.color } as React.CSSProperties}>
              <div className="sf-card-stripe" />
              <div className="sf-icon-wrap"><span>{s.icon}</span></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="sf-cta" id="contact">
        <div className="sf-cta-inner sf-reveal">
          <div className="sf-cta-text">
            <span className="sf-tag sf-tag--light">ОДОО ХОЛБОГДОХ</span>
            <h2>Аюулгүй ажиллагааны зөвлөгөө авъя</h2>
            <div className="sf-contact-row">
              <div className="sf-contact-chip"><span>📞</span><div><small>Шуурхай утас</small><strong>+976 8800 0000</strong></div></div>
              <div className="sf-contact-chip"><span>✉️</span><div><small>И-мэйл хаяг</small><strong>safety@oigonnumrug.mn</strong></div></div>
            </div>
          </div>
          <a href="tel:+97688000000" className="sf-btn sf-btn--dark sf-btn--lg">
            <span>Зөвлөгөө авах</span>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </a>
        </div>
      </section>

      <footer className="sf-footer">
        <div className="sf-footer-pattern" />
        <p>© 2025 Oigon Numrug HABEA. Safety First - Integrity Always.</p>
      </footer>
    </main>
  );
}
