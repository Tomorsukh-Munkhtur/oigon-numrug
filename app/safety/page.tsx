"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";



const latestNews = [
  { id: 1, date: "2026-05-15", title: "ХАБЭА-н шинэ стандарт хэрэгжиж эхэллээ", desc: "Олон улсын ISO 45001 стандартын хүрээнд байгууллагууд юуг анхаарах хэрэгтэй вэ?", image: "/project-office.jpg" },
  { id: 2, date: "2026-05-10", title: "Өндөрт ажиллах үеийн эрсдэлээс сэргийлэх нь", desc: "Барилгын талбайд өндөрт ажиллах үеийн ослын шалтгаан, түүнээс урьдчилан сэргийлэх арга замууд.", image: "/safety-bg.jpg" },
  { id: 3, date: "2026-05-02", title: "Галын аюулгүй байдлын сургалт амжилттай боллоо", desc: "Өнгөрсөн 7 хоногт зохион байгуулагдсан галын аюулаас урьдчилан сэргийлэх практик сургалтын тайлан.", image: "/real-estate-bg.jpg" },
  { id: 4, date: "2026-04-28", title: "Ажлын байрны стресс ба ХАБЭА", desc: "Ажилтны сэтгэл зүйн эрүүл мэнд ажлын бүтээмжид хэрхэн нөлөөлөх вэ?", image: "/project-office.jpg" },
  { id: 5, date: "2026-04-20", title: "Анхны тусламж үзүүлэх чадварыг сайжруулах", desc: "Ажлын байранд осол гарсан үед үзүүлэх анхны тусламжийн 5 чухал алхам.", image: "/safety-bg.jpg" },
];

export default function SafetyPage() {
  const [weather, setWeather] = useState({ temp: "--", condition: "Уншиж байна...", wind: "--", humidity: "--" });

  useEffect(() => {
    // Mocking an API call for weather
    setTimeout(() => {
      setWeather({
        temp: "+18°C",
        condition: "Цэлмэг, бага зэргийн үүлтэй",
        wind: "Салхи: 4 м/с",
        humidity: "Чийгшил: 45%",
      });
    }, 1000);
  }, []);

  return (
    <>
      {/* Enhanced Hero */}
      <section className="sf-hero">
        <Image src="/safety-bg.jpg" alt="Safety background" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content" style={{ maxWidth: '800px' }}>
            <h1 className="sf-hero-title">Аюулгүй байдлын <span style={{ color: 'var(--sf-yellow)' }}>стандарт тогтооно</span></h1>
            <p className="sf-hero-desc">
              Бид олон улсын стандартын дагуу ажлын байрны эрсдэлийг бууруулж,
              хамгаалалтын дэвшилтэт соёлыг таны байгууллагад нутагшуулна.
            </p>
            


            <div className="sf-hero-actions" style={{ marginTop: '40px' }}>
              <Link href="/safety/training" className="sf-btn sf-btn--primary">
                <span>Сургалтын хөтөлбөр</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </Link>
              <Link href="/safety/services" className="sf-btn sf-btn--outline">Бүх үйлчилгээ</Link>
            </div>
          </div>
        </div>
      </section>



      {/* Latest News */}
      <section className="sf-block sf-block--alt">
        <div className="sf-container">
          <div className="sf-section-top sf-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <span className="sf-tag">Мэдээ мэдээлэл</span>
              <h2>Сүүлийн үеийн <span className="sf-gradient-text">онцлох</span></h2>
            </div>
            <Link href="/safety/news" className="sf-btn sf-btn--outline" style={{ display: 'none' }}>Бүх мэдээ</Link> {/* Can display flex on larger screens */}
          </div>
          
          <div className="sf-news-layout">
            {/* News List */}
            <div className="sf-news-list">
              {latestNews.map((news, index) => (
                <div key={news.id} className="sf-news-item sf-news-item--horizontal sf-reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                  <div className="sf-news-image">
                    <Image src={news.image} alt={news.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="sf-news-content">
                    <span className="sf-news-date">{news.date}</span>
                    <h3 className="sf-news-title">{news.title}</h3>
                    <p className="sf-news-desc">{news.desc}</p>
                    <Link href={`/safety/news`} className="sf-news-link">Цааш унших →</Link>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: 'center', marginTop: '20px' }} className="sf-reveal">
                 <Link href="/safety/news" className="sf-btn sf-btn--outline">Бүх мэдээллийг үзэх</Link>
              </div>
            </div>

            {/* Sidebar / Weather */}
            <div className="sf-sidebar sf-reveal">
              <div className="sf-weather-widget" style={{ marginTop: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div className="sf-weather-icon">🌤️</div>
                  <div>
                    <span className="sf-weather-temp" style={{ display: 'block', lineHeight: 1 }}>{weather.temp}</span>
                    <span style={{ fontWeight: '700', fontSize: '18px' }}>Дархан хот</span>
                  </div>
                </div>
                <div className="sf-weather-details" style={{ flexDirection: 'column', gap: '8px' }}>
                  <span>{weather.condition}</span>
                  <span>{weather.wind}</span>
                  <span>{weather.humidity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
