"use client";

import Image from "next/image";
import Link from "next/link";

const allNews = [
  { id: 1, date: "2026-05-15", category: "Зөвлөмж", title: "ХАБЭА-н шинэ стандарт хэрэгжиж эхэллээ", desc: "Олон улсын ISO 45001 стандартын хүрээнд байгууллагууд юуг анхаарах хэрэгтэй вэ? Шинэ стандарт нь хөдөлмөрийн аюулгүй байдлыг сайжруулах зорилготой.", image: "/project-office.jpg" },
  { id: 2, date: "2026-05-10", category: "Сургалт", title: "Өндөрт ажиллах үеийн эрсдэлээс сэргийлэх нь", desc: "Барилгын талбайд өндөрт ажиллах үеийн ослын шалтгаан, түүнээс урьдчилан сэргийлэх арга замуудын талаарх дэлгэрэнгүй зөвлөгөө.", image: "/safety-bg.jpg" },
  { id: 3, date: "2026-05-02", category: "Үйл явдал", title: "Галын аюулгүй байдлын сургалт амжилттай боллоо", desc: "Өнгөрсөн 7 хоногт зохион байгуулагдсан галын аюулаас урьдчилан сэргийлэх практик сургалтын тайлан. Сургалтад 50 гаруй ажилтан хамрагдсан.", image: "/real-estate-bg.jpg" },
  { id: 4, date: "2026-04-28", category: "Зөвлөмж", title: "Ажлын байрны стресс ба ХАБЭА", desc: "Ажилтны сэтгэл зүйн эрүүл мэнд ажлын бүтээмжид хэрхэн нөлөөлөх вэ? Стрессийг бууруулах аргууд болон нөлөөлөл.", image: "/project-office.jpg" },
  { id: 5, date: "2026-04-20", category: "Сургалт", title: "Анхны тусламж үзүүлэх чадварыг сайжруулах", desc: "Ажлын байранд осол гарсан үед үзүүлэх анхны тусламжийн 5 чухал алхам болон шаардлагатай мэдлэгүүд.", image: "/safety-bg.jpg" },
  { id: 6, date: "2026-04-15", category: "Үйл явдал", title: "Шинэ ажилтнуудад зориулсан ХАБЭА өдөрлөг", desc: "Компанид шинээр орсон ажилтнуудад зориулсан хөдөлмөрийн аюулгүй байдлын анхан шатны танилцуулга өдөрлөг амжилттай болж өндөрлөлөө.", image: "/real-estate-bg.jpg" },
];

export default function SafetyNewsPage() {
  const filteredNews = allNews.slice(1);
  const featuredNews = allNews[0];

  return (
    <>
      {/* Hero */}
      <section className="sf-hero sf-hero--mini" style={{ height: '40vh', minHeight: '350px' }}>
        <Image src="/safety-bg.jpg" alt="OHS News" fill priority sizes="100vw" className="sf-hero-image" />
        <div className="sf-hero-overlay" />
        <div className="sf-container">
          <div className="sf-hero-content">
            <span className="sf-tag">Мэдээ мэдээлэл</span>
            <h1 className="sf-hero-title">Сүүлийн үеийн <span style={{ color: 'var(--sf-yellow)' }}>мэдээлэл</span></h1>
          </div>
        </div>
      </section>

      <section className="sf-block" style={{ paddingBottom: '60px' }}>
        <div className="sf-container">
          
          {/* Featured News */}
          <div className="sf-news-featured sf-reveal">
            <div className="sf-news-featured-img">
              <Image src={featuredNews.image} alt={featuredNews.title} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="sf-news-featured-content">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <span className="sf-news-date" style={{ margin: 0 }}>{featuredNews.date}</span>
              </div>
              <h2 className="sf-news-title" style={{ fontSize: '32px', marginBottom: '20px' }}>{featuredNews.title}</h2>
              <p className="sf-news-desc" style={{ fontSize: '16px' }}>{featuredNews.desc}</p>
              <Link href="#" className="sf-btn sf-btn--primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>Унших</Link>
            </div>
          </div>

          {/* News List */}
          <div className="sf-news-list sf-reveal" style={{ marginTop: '60px' }}>
            {filteredNews.map((news, index) => (
              <div key={news.id} className="sf-news-item sf-news-item--horizontal" style={{ transitionDelay: `${index * 50}ms` }}>
                <div className="sf-news-image">
                  <Image src={news.image} alt={news.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="sf-news-content">
                  <span className="sf-news-date">{news.date}</span>
                  <h3 className="sf-news-title">{news.title}</h3>
                  <p className="sf-news-desc">{news.desc}</p>
                  <Link href="#" className="sf-news-link">Цааш унших →</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="sf-pagination sf-reveal">
            <button className="sf-page-btn" disabled>Өмнөх</button>
            <button className="sf-page-btn active">1</button>
            <button className="sf-page-btn">2</button>
            <button className="sf-page-btn">3</button>
            <button className="sf-page-btn">Дараах</button>
          </div>

        </div>
      </section>
    </>
  );
}
