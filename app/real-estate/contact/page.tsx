import Link from "next/link";
import PageHero from "../_components/PageHero";

export const metadata = {
  title: "Холбоо барих — Oigon Numrug Properties",
};

const directChannels = [
  {
    label: "Утсаар холбогдох",
    value: "+976 0000 0000",
    detail: "Даваа — Баасан, 09:00 — 19:00",
    href: "tel:+97600000000",
    cta: "Залгах",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "И-мэйл илгээх",
    value: "info@oigonnumrug.mn",
    detail: "Ажлын 24 цагт хариу өгнө.",
    href: "mailto:info@oigonnumrug.mn",
    cta: "И-мэйл бичих",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </svg>
    ),
  },
  {
    label: "Очиж уулзах",
    value: "Дархан хот, 14-р баг",
    detail: "Энэрэлийн гудамж 12, 4-р давхар",
    href: "#office",
    cta: "Газрын зураг",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const team = [
  {
    initials: "БМ",
    name: "Б. Мөнхзул",
    role: "Борлуулалт, түрээсийн ахлах зөвлөх",
    focus: "Орон сууц · Оффис",
    phone: "+976 9911 0001",
    email: "munkhzul@oigonnumrug.mn",
  },
  {
    initials: "ДА",
    name: "Д. Анударь",
    role: "Төслийн маркетингийн менежер",
    focus: "Хотхон · Шинэ төсөл",
    phone: "+976 9911 0002",
    email: "anudari@oigonnumrug.mn",
  },
  {
    initials: "ГЭ",
    name: "Г. Энхбаатар",
    role: "Хөрөнгийн зөвлөх, үнэлгээ",
    focus: "Хөрөнгө оруулалт · Портфолио",
    phone: "+976 9911 0003",
    email: "enkhbaatar@oigonnumrug.mn",
  },
];

const nextSteps = [
  {
    step: "01",
    title: "Хариу хүлээх",
    body: "Ажлын цагаар хэдэн минутын дотор, бусад үед ажлын 24 цагт хариу өгнө.",
  },
  {
    step: "02",
    title: "Танилцах уулзалт",
    body: "30 минутын үнэгүй уулзалтад тань ирж, зорилго, нөхцөл, хязгаарлалтыг тань сонсоно.",
  },
  {
    step: "03",
    title: "Тохирох санал",
    body: "Уулзалтаас 2 ажлын өдрийн дотор хугацаа, төсөв, үе шатыг тань тодорхой санал ирүүлнэ.",
  },
];

const hours = [
  { day: "Даваа — Баасан", time: "09:00 — 19:00" },
  { day: "Бямба", time: "10:00 — 14:00" },
  { day: "Ням", time: "Амарна" },
];

const socials = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Messenger", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Холбоо барих"
        title={
          <>
            Бид тантай <em>хэдэн минутын</em> дотор холбогдоно.
          </>
        }
        description="Утсаар, и-мэйлээр, эсвэл оффис дээр ирж уулзаж болно. Аль ч сувгаар хандсан таны хэрэгцээ, асуултанд хариу өгөхөд бэлэн."
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/contact", label: "Холбоо барих" },
        ]}
      />

      <section className="re-section">
        <div className="re-container">
          <div className="re-direct-grid">
            {directChannels.map((channel) => (
              <a key={channel.label} href={channel.href} className="re-direct-card">
                <span className="re-direct-card__icon" aria-hidden="true">
                  {channel.icon}
                </span>
                <span className="re-direct-card__label">{channel.label}</span>
                <p className="re-direct-card__value">{channel.value}</p>
                <span className="re-direct-card__detail">{channel.detail}</span>
                <span className="re-direct-card__cta">
                  {channel.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="re-section re-about" id="office">
        <div className="re-container re-office-grid">
          <div className="re-office-copy">
            <span className="re-eyebrow re-eyebrow--dark">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              Манай оффис
            </span>
            <h2>
              Уулзахаар ирэхэд тань
              <br />
              <em>үргэлж нээлттэй.</em>
            </h2>
            <p>
              Бид төв байршилд, харилцагчдын үзвэрт зориулсан тусдаа өрөөтэйгөөр
              хүлээж байна. Урьдчилан цаг товлох эсвэл шууд ирж уулзаж болно.
            </p>

            <address className="re-office-address">
              <span className="re-office-address__label">Хаяг</span>
              <strong>Энэрэлийн гудамж 12, 4-р давхар</strong>
              <span>14-р баг, Дархан сум, Дархан-Уул аймаг, Монгол улс</span>
            </address>

            <ul className="re-office-hours">
              {hours.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <strong>{h.time}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="re-office-map" aria-hidden="true">
            <div className="re-office-map__grid" />
            <div className="re-office-map__rings" />
            <div className="re-office-map__pin">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="re-office-map__label">
              14-р баг · Дархан
            </span>
          </div>
        </div>
      </section>

      <section className="re-section">
        <div className="re-container">
          <div className="re-section-head">
            <div>
              <span className="re-eyebrow re-eyebrow--dark">
                <span className="re-eyebrow-dot" aria-hidden="true" />
                Тусгайлсан зөвлөхүүд
              </span>
              <h2>Зөв хүнтэй шууд холбогдоорой</h2>
            </div>
            <p>
              Та хэрэгцээ, чиглэлээсээ хамаараад тус тусын мэргэшилтэй зөвлөхтэй
              шууд холбогдох боломжтой.
            </p>
          </div>

          <div className="re-team-grid">
            {team.map((member) => (
              <article key={member.email} className="re-team-card">
                <div className="re-team-card__head">
                  <span className="re-team-avatar" aria-hidden="true">
                    {member.initials}
                  </span>
                  <span className="re-team-card__focus">{member.focus}</span>
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="re-team-card__links">
                  <a href={`tel:${member.phone.replace(/\s|\+/g, "")}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.8a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.9.34 1.84.57 2.8.7A2 2 0 0122 16.92z" />
                    </svg>
                    {member.phone}
                  </a>
                  <a href={`mailto:${member.email}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                    {member.email}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="re-section">
        <div className="re-container">
          <div className="re-section-head">
            <div>
              <span className="re-eyebrow re-eyebrow--dark">
                <span className="re-eyebrow-dot" aria-hidden="true" />
                Холбогдсоны дараа
              </span>
              <h2>Юу хүлээж авах вэ?</h2>
            </div>
            <p>
              Хариу хурдан, үйл явц ил тод. Эхний холбоо барьсанаас 2 ажлын
              өдрийн дотор тодорхой санал гартаа авах болно.
            </p>
          </div>

          <ol className="re-process">
            {nextSteps.map((s) => (
              <li key={s.step}>
                <span className="re-process__step">{s.step}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="re-cta">
        <div className="re-container re-cta-final">
          <span className="re-eyebrow re-eyebrow--light">
            <span className="re-eyebrow-dot" aria-hidden="true" />
            Шууд холбогдох
          </span>
          <h2>
            <a href="tel:+97600000000">+976 0000 0000</a>
          </h2>
          <p>
            Эсвэл{" "}
            <a href="mailto:info@oigonnumrug.mn">info@oigonnumrug.mn</a>{" "}
            хаягаар бичээрэй — бид хариуг богино хугацаанд ирүүлнэ.
          </p>

          <div className="re-socials" aria-label="Нийгмийн сүлжээ">
            {socials.map((s) => (
              <Link key={s.name} href={s.href} className="re-social">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
