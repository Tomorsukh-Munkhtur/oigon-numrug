import Image from "next/image";

const safetyServices = [
  "Ажлын байрны эрсдэлийн үнэлгээ",
  "Аюулгүй байдлын сургалт ба сертификат",
  "Ажлын байрны аудит ба шинжилгээ",
  "Эргүүлэх эрүүлжүүлэлтийн хамтын ажиллагаа",
];

const trainingSessions = [
  {
    id: 1,
    title: "Ажлын байр дахь аюулгүй байдал",
    description: "Үндсэн аюулгүй байдлын дүрэм, эвчүүлэлтээс сэргийлэх арга",
    duration: "2 цаг",
    level: "Эхлэгч",
    icon: "🔒",
  },
  {
    id: 2,
    title: "Аварийн нөхцөлд үйлдэл",
    description: "Гал түймэр, цахилгааны аюулаас хорших эсвэл аврах үйлдэл",
    duration: "1.5 цаг",
    level: "Дунд",
    icon: "🚨",
  },
  {
    id: 3,
    title: "Аюулгүй үйлдэл ба санитар нөхцөл",
    description: "Хүнд болон химийн материалыг удирдах аюулгүй байдал",
    duration: "2.5 цаг",
    level: "Дэвшилтэт",
    icon: "⚠️",
  },
  {
    id: 4,
    title: "Эрүүл мэндийн эрсдэл ба дохиолол",
    description: "Эргүүлэх эрүүл мэндийн эрсдэлийг хэрхэн мэдэрч, тайлагнах",
    duration: "1 цаг",
    level: "Эхлэгч",
    icon: "🏥",
  },
];

export default function SafetyPage() {
  return (
    <main className="safety-page">
      <nav className="safety-nav" aria-label="Аюулгүй байдлын навигац">
        <Image
          src="/oigon numrug-06.png"
          alt="Oigon Numrug HABEA"
          width={720}
          height={190}
          priority
          className="safety-nav-logo"
        />
        <div className="safety-nav-links">
          <a href="#about">Бидний тухай</a>
          <a href="#training">Сургалт</a>
          <a href="#services">Үйлчилгээ</a>
          <a href="#contact" className="safety-nav-cta">
            Холбоо барих
          </a>
        </div>
      </nav>

      <section className="safety-hero">
        <Image
          src="/safety-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="safety-hero-image"
        />
        <div className="safety-hero-overlay" aria-hidden="true" />
        <div className="safety-hero-content">
          <p className="safety-kicker">Oigon Numrug HABEA</p>
          <h1>Ажлын байрны аюулгүй байдлын үйлчилгээ ба сургалт</h1>
          <p className="safety-hero-copy">
            Ажилтнаас эхлээд удирдлагын түвшинд хүн бүрт хамгаалалтын соёлыг
            төлөвшүүлэх үйлчилгээг нэг дор хүргэнэ.
          </p>
          <div className="safety-hero-actions">
            <a href="#training" className="safety-primary-action">
              Сургалтын курсүүд
            </a>
            <a href="#services" className="safety-secondary-action">
              Үйлчилгээ
            </a>
          </div>
        </div>
      </section>

      <section className="safety-section safety-intro" id="about">
        <div>
          <p className="safety-section-label">Бидний тухай</p>
          <h2>Ажилтнаа хамгаалах нь аз жаргалын түм</h2>
        </div>
        <div className="safety-intro-copy">
          <p>
            Ажлын байрны аюулгүй байдал нь зөвхөн өрөлдөөн биш, хүний эрхи юм.
            Бид аж ахуйн байгууллага, үйлдвэр, оффистой хамтран ажилчдын
            аюулгүй байдлын нөхцөлөө сайжруулдаг.
          </p>
          <p>
            Сургалт, аудит, үнэлгээ, хэргэлэлт болон хамтын ажиллагаагаар
            аюулгүй байдлын соёлыг нэгтгэлэй цол сэргээн байгуулдаг.
          </p>
        </div>
      </section>

      <section className="safety-section" id="training">
        <div className="safety-section-heading">
          <div>
            <p className="safety-section-label">Онлайн сургалт</p>
            <h2>Идэвхтэй сургалтын курсүүд</h2>
          </div>
          <p>
            Ажилчдын ур чадвар, мэдлэгийг нэмэгдүүлэх онлайн сургалтын
            платформ.
          </p>
        </div>

        <div className="training-grid">
          {trainingSessions.map((session) => (
            <article key={session.id} className="training-card">
              <div className="training-header">
                <span className="training-icon">{session.icon}</span>
                <div className="training-meta">
                  <span className="training-level">{session.level}</span>
                  <span className="training-duration">{session.duration}</span>
                </div>
              </div>
              <h3>{session.title}</h3>
              <p>{session.description}</p>
              <a href="#" className="training-enroll">
                Сургалтанд элсэх
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="safety-section safety-intro" id="services">
        <div>
          <p className="safety-section-label">Үйлчилгээ</p>
          <h2>Бүрэн аюулгүй байдлын шийдэл</h2>
        </div>
        <div className="safety-intro-copy">
          <div className="safety-service-list">
            {safetyServices.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="safety-cta" id="contact">
        <div>
          <p className="safety-section-label">Холбоо барих</p>
          <h2>Аюулгүй байдлын сургалт авъя</h2>
          <div className="safety-contact-list">
            <span>Утас: +976 0000 0000</span>
            <span>И-мэйл: habea@oigonnumrug.mn</span>
            <span>Улаанбаатар хот</span>
          </div>
        </div>
        <a href="tel:+97600000000" className="safety-primary-action">
          Холбогдох
        </a>
      </section>
    </main>
  );
}
