"use client";

import Image from "next/image";

export default function SafetyAboutPage() {
  return (
    <>
      {/* Hero Mini for subpages */}
      <section className="sf-hero sf-hero--mini" style={{ height: '40vh', minHeight: '300px' }}>
        <Image src="/project-office.jpg" alt="About OHS" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            <span className="sf-tag">Бидний тухай</span>
            <h1 style={{ fontSize: '48px' }}>Мэргэжлийн <span className="sf-gradient-text">хандлага</span></h1>
          </div>
        </div>
      </section>

      <section className="sf-block">
        <div className="sf-container">
          <div className="sf-about sf-reveal">
            <div className="sf-about-content">
              <span className="sf-tag">Бидний түүх</span>
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
        </div>
      </section>
    </>
  );
}
