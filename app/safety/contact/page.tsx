"use client";

import Image from "next/image";

export default function SafetyContactPage() {
  return (
    <>
      <section className="sf-hero sf-hero--mini" style={{ height: '40vh', minHeight: '300px' }}>
        <Image src="/real-estate-bg.jpg" alt="Contact OHS" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            <span className="sf-tag">Холбоо барих</span>
            <h1 style={{ fontSize: '48px' }}>Бидэнтэй <span className="sf-gradient-text">холбогдоно уу</span></h1>
          </div>
        </div>
      </section>

      <section className="sf-block">
        <div className="sf-container">
          <div className="sf-section-top sf-reveal">
            <span className="sf-tag">Мэдээлэл</span>
            <h2>Шуурхай <span className="sf-gradient-text">холбоо барих</span></h2>
            <p className="sf-subtitle">Та аюулгүй ажиллагааны зөвлөгөө авах эсвэл хамтран ажиллах хүсэлтээ илгээнэ үү.</p>
          </div>

          <div className="sf-contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '60px' }}>
            <div className="sf-card sf-reveal">
               <div className="sf-card-stripe" style={{ '--accent': '#FF9800' } as any} />
               <div className="sf-icon-wrap" style={{ fontSize: '32px', marginBottom: '20px' }}>📞</div>
               <h3>Утас</h3>
               <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--sf-dark)' }}>+976 8800 0000</p>
               <p style={{ opacity: 0.7 }}>Ажлын цагаар холбогдоно уу.</p>
            </div>
            
            <div className="sf-card sf-reveal" style={{ transitionDelay: '100ms' }}>
               <div className="sf-card-stripe" style={{ '--accent': '#2196F3' } as any} />
               <div className="sf-icon-wrap" style={{ fontSize: '32px', marginBottom: '20px' }}>✉️</div>
               <h3>И-мэйл</h3>
               <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--sf-dark)' }}>safety@oigonnumrug.mn</p>
               <p style={{ opacity: 0.7 }}>Бид 24 цагийн дотор хариулах болно.</p>
            </div>

            <div className="sf-card sf-reveal" style={{ transitionDelay: '200ms' }}>
               <div className="sf-card-stripe" style={{ '--accent': '#4CAF50' } as any} />
               <div className="sf-icon-wrap" style={{ fontSize: '32px', marginBottom: '20px' }}>📍</div>
               <h3>Хаяг</h3>
               <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--sf-dark)' }}>Улаанбаатар хот, Сүхбаатар дүүрэг</p>
               <p style={{ opacity: 0.7 }}>Ойгон Нөмрөг Төв байр</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
