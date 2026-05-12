import Image from "next/image";

const stats = [
  { value: "12+", label: "хамтарсан төсөл" },
  { value: "8 жил", label: "зах зээлийн туршлага" },
  { value: "24/7", label: "хэрэглэгчийн зөвлөгөө" },
];

const services = [
  "Борлуулалт, түрээсийн зөвлөгөө",
  "Төслийн маркетинг ба зах зээлийн байршуулалт",
  "Хөрөнгийн үнэлгээ, сонголтын судалгаа",
  "Хөрөнгө оруулагч, худалдан авагчийн холболт",
];

const projects = [
  {
    title: "Noble Residence",
    type: "Орон сууц",
    location: "Улаанбаатар",
    image: "/project-residence.jpg",
    status: "Борлуулалтын хамтын ажиллагаа",
  },
  {
    title: "Civic Office Hub",
    type: "Оффис, үйлчилгээ",
    location: "Хотын төв",
    image: "/project-office.jpg",
    status: "Түрээсийн зуучлал",
  },
  {
    title: "Garden Village",
    type: "Хотхон",
    location: "Ногоон бүс",
    image: "/project-garden.jpg",
    status: "Зах зээлийн байршуулалт",
  },
];

const team = [
  {
    name: "Борлуулалтын баг",
    role: "Хэрэглэгчийн зөвлөгөө, сонголтын судалгаа",
  },
  {
    name: "Төслийн баг",
    role: "Төслийн мэдээлэл, төлөвлөлт, явцын зохион байгуулалт",
  },
  {
    name: "Зах зээлийн баг",
    role: "Үнийн судалгаа, байршуулалт, хөрөнгө оруулалтын зөвлөмж",
  },
];

export default function RealEstatePage() {
  return (
    <main className="real-page">
      <nav className="real-nav" aria-label="Үл хөдлөхийн навигац">
        <Image
          src="/Logo_Primary color - 2.png"
          alt="Oigon Numrug Properties"
          width={720}
          height={190}
          priority
          className="real-nav-logo"
        />
        <div className="real-nav-links">
          <a href="#about">Бидний тухай</a>
          <a href="#projects">Төслүүд</a>
          <a href="#team">Хамт олон</a>
          <a href="#contact" className="real-nav-cta">
            Холбоо барих
          </a>
        </div>
      </nav>

      <section className="real-hero">
        <Image
          src="/real-estate-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="real-hero-image"
        />
        <div className="real-hero-overlay" aria-hidden="true" />
        <div className="real-hero-content">
          <p className="real-kicker">Oigon Numrug Properties</p>
          <h1>Үл хөдлөх хөрөнгийн үнэ цэнийг зөв байршуулдаг түнш</h1>
          <p className="real-hero-copy">
            Орон сууц, оффис, үйлчилгээний талбай болон хөрөнгө оруулалтын
            төслүүдэд борлуулалт, түрээс, зах зээлийн зөвлөгөөг нэг дор
            хүргэнэ.
          </p>
          <div className="real-hero-actions">
            <a href="#projects" className="real-primary-action">
              Хамтарч буй төслүүд
            </a>
            <a href="#services" className="real-secondary-action">
              Үйлчилгээ
            </a>
          </div>
        </div>
      </section>

      <section className="real-stats" aria-label="Товч үзүүлэлтүүд">
        {stats.map((item) => (
          <div key={item.label} className="real-stat">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="real-section real-intro" id="about">
        <div>
          <p className="real-section-label">Бидний тухай</p>
          <h2>Үл хөдлөхийн шийдвэрийг мэдээлэлтэй, тайван болгодог баг</h2>
        </div>
        <div className="real-intro-copy">
          <p>
            Бид үл хөдлөх хөрөнгийн шийдвэрийг зөв мэдээлэл, бодит зах зээлийн
            өнцөг, цэгцтэй борлуулалтын явцаар дэмждэг. Хэрэглэгч бүрт
            тохирсон сонголт санал болгож, төслийн эзэдтэй урт хугацааны
            итгэлцэл дээр ажиллана.
          </p>
          <p>
            Орон сууц, оффис, үйлчилгээний талбай, хөрөнгө оруулалтын
            боломжуудыг нэг дор харьцуулж, худалдан авагч болон төслийн
            эзэмшигчийн хэрэгцээг зөв холбохыг зорьдог.
          </p>
        </div>
      </section>

      <section className="real-section real-intro" id="services">
        <div>
          <p className="real-section-label">Үйлчилгээ</p>
          <h2>Төслийн эхний уулзалтаас хаалтын гэрээ хүртэл</h2>
        </div>
        <div className="real-intro-copy">
          <div className="real-service-list">
            {services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="real-section" id="projects">
        <div className="real-section-heading">
          <div>
            <p className="real-section-label">Хамтарч ажиллаж буй</p>
            <h2>Онцлох төслүүд</h2>
          </div>
          <p>
            Борлуулалт, түрээс, маркетингийн байршуулалтаар хамтран ажиллаж
            буй төслүүдийн жишээ.
          </p>
        </div>

        <div className="real-project-grid">
          {projects.map((project) => (
            <article key={project.title} className="real-project-card">
              <div className="real-project-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 900px) 33vw, 100vw"
                  className="real-project-photo"
                />
                <span>{project.status}</span>
              </div>
              <div className="real-project-info">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.type}</p>
                </div>
                <span>{project.location}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="real-section" id="team">
        <div className="real-section-heading">
          <div>
            <p className="real-section-label">Хамт олон</p>
            <h2>Төслийн бүх шатанд нэг цэгийн зохион байгуулалт</h2>
          </div>
          <p>
            Манай баг харилцагчийн хэрэгцээ, төслийн онцлог, зах зээлийн
            өгөгдлийг нэгтгэн шийдвэр гаргалтыг илүү ойлгомжтой болгодог.
          </p>
        </div>

        <div className="real-team-grid">
          {team.map((member, index) => (
            <article key={member.name} className="real-team-card">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="real-cta" id="contact">
        <div>
          <p className="real-section-label">Холбоо барих</p>
          <h2>Төслөө зах зээлд зөв байршуулъя</h2>
          <div className="real-contact-list">
            <span>Утас: +976 0000 0000</span>
            <span>И-мэйл: info@oigonnumrug.mn</span>
            <span>Улаанбаатар хот</span>
          </div>
        </div>
        <a href="tel:+97600000000" className="real-primary-action">
          Холбогдох
        </a>
      </section>
    </main>
  );
}
