"use client";

import Image from "next/image";

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

export default function SafetyServicesPage() {
  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: '40vh', minHeight: '300px' }}>
        <Image src="/project-garden.jpg" alt="OHS Services" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            <span className="sf-tag">Манай үйлчилгээ</span>
            <h1 className="sf-hero-title" style={{ fontSize: '48px' }}>Аюулгүй байдлын <span style={{ color: 'var(--sf-yellow)' }}>цогц шийдэл</span></h1>
          </div>
        </div>
      </section>

      <section className="sf-block">
        <div className="sf-container">
          <div className="sf-section-top sf-reveal">
            <span className="sf-tag">Үйлчилгээнүүд</span>
            <h2>Бид юу <span className="sf-gradient-text">хийж чадах вэ?</span></h2>
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
        </div>
      </section>
    </>
  );
}
