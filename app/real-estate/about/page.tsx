import Link from "next/link";
import PageHero from "../_components/PageHero";
import { reMilestones, reStats } from "@/lib/real-estate/content";

export const metadata = {
  title: "Бидний тухай — Oigon Numrug Properties",
};

const values = [
  {
    title: "Ил тод байдал",
    body: "Бид үнэлгээ, гэрээний нөхцөл, мөнгөн гүйлгээний бүх алхамыг тодорхой бичигдсэн байх ёстой гэж үздэг.",
  },
  {
    title: "Тоо баримтанд тулгуурла",
    body: "Бид зөвхөн зөн совин дээр шийдвэр гаргуулдаггүй — зах зээлийн өгөгдөл, харьцуулсан судалгаа дээр тулгуурлана.",
  },
  {
    title: "Урт хугацааны харилцаа",
    body: "Нэг удаагийн гэрээ биш — олон жилийн портфолиогийн хамт өсөж буй харилцагч, төслийн эзэдтэй ажиллана.",
  },
  {
    title: "Хараат бус зөвлөгөө",
    body: "Бид аль нэг төсөлд харьяалагдалгүй, харилцагчийн талын төлөөлөл болж ажиллана.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Бидний тухай"
        title={
          <>
            Тоо баримттай, зах зээлд тулгуурласан,{" "}
            <em>хүн төвтэй зөвлөгөө.</em>
          </>
        }
        description="Oigon Numrug Properties — Дархан хотын үл хөдлөх хөрөнгийн шийдвэрийг бодит мэдээлэл, ил тод үйл явцаар дэмждэг хараат бус зөвлөх баг."
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/about", label: "Бидний тухай" },
        ]}
      />

      <section className="re-section re-about">
        <div className="re-container re-about-grid">
          <div className="re-about-copy">
            <span className="re-eyebrow re-eyebrow--dark">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              Бидний эрхэм зорилго
            </span>
            <h2>
              Хүний хамгийн чухал шийдвэрийг
              <br />
              <em>тайван, итгэлтэй болгох.</em>
            </h2>
            <p>
              Үл хөдлөх хөрөнгө бол ихэнх хүний амьдралд хийдэг хамгийн том
              хөрөнгө оруулалт. Бид энэ шийдвэрийг таны өмнөөс хийдэггүй —
              харин зөв сонголтыг бие даан хийхэд тань хэрэгтэй мэдээлэл,
              шинжилгээ, дэмжлэгийг өгдөг.
            </p>
            <ul className="re-checklist">
              <li>
                <span className="re-check" aria-hidden="true">✓</span>
                Ил тод үнэлгээ ба бие даасан судалгаа
              </li>
              <li>
                <span className="re-check" aria-hidden="true">✓</span>
                Зорилтот зах зээлд тулгуурласан маркетинг
              </li>
              <li>
                <span className="re-check" aria-hidden="true">✓</span>
                Гэрээ, шилжүүлгийн эрх зүйн дэмжлэг
              </li>
              <li>
                <span className="re-check" aria-hidden="true">✓</span>
                Хөрөнгө оруулалтын дараах ашиглалтын зөвлөгөө
              </li>
            </ul>
          </div>

          <ol className="re-timeline" aria-label="Бидний түүхэн замнал">
            {reMilestones.map((item) => (
              <li key={item.year}>
                <span className="re-timeline__year">{item.year}</span>
                <span className="re-timeline__line" aria-hidden="true" />
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="re-section">
        <div className="re-container">
          <div className="re-section-head">
            <div>
              <span className="re-eyebrow re-eyebrow--dark">
                <span className="re-eyebrow-dot" aria-hidden="true" />
                Бидний үнэт зүйлс
              </span>
              <h2>Юу биднийг ялгаатай болгож байна вэ</h2>
            </div>
            <p>
              4 үндсэн зарчим биднийг өдөр тутмын шийдвэрт чиглүүлдэг. Энэ нь
              манай харилцагч, түнш, төслийн эздэд ялгаа авчирдаг гол шалтгаан
              юм.
            </p>
          </div>

          <div className="re-value-grid">
            {values.map((value, idx) => (
              <article key={value.title} className="re-value">
                <span className="re-value__num">{String(idx + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="re-stats">
        <div className="re-container">
          <div className="re-stats-grid">
            {reStats.map((item) => (
              <div key={item.label} className="re-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="re-cta">
        <div className="re-container re-cta-inner">
          <div className="re-cta-copy">
            <span className="re-eyebrow re-eyebrow--light">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              Бидэнтэй хамтран ажиллах
            </span>
            <h2>Бидний тухай илүү ихийг сонсох уу?</h2>
            <p>
              Танай төсөл, эсвэл хувийн шийдвэрт зориулсан 30 минутын
              үнэ төлбөргүй зөвлөгөө захиалаарай.
            </p>
            <div className="re-cta-actions">
              <Link href="/real-estate/contact" className="re-btn re-btn--primary">
                Уулзалт товлох
              </Link>
              <Link href="/real-estate/projects" className="re-btn re-btn--ghost">
                Төслүүдийг үзэх
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
