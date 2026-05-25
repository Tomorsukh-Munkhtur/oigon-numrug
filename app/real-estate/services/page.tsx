import Link from "next/link";
import PageHero from "../_components/PageHero";
import { reServices } from "@/lib/real-estate/content";

export const metadata = {
  title: "Үйлчилгээ — Oigon Numrug Properties",
};

const process = [
  {
    step: "01",
    title: "Танилцах уулзалт",
    body: "Зорилго, нөхцөл, хязгаарлалтыг сонсож, хэрэгцээг тодорхойлно. Үнэ төлбөргүй.",
  },
  {
    step: "02",
    title: "Судалгаа ба санал",
    body: "Зах зээлийн өгөгдөл дээр тулгуурлан стратеги, хугацаа, төсөвт нийцсэн санал гаргана.",
  },
  {
    step: "03",
    title: "Гэрээ ба гүйцэтгэл",
    body: "Эрх зүйн ил тод гэрээ үндсэн дээр баг хуваарилж, ажлыг үе шаттай гүйцэтгэнэ.",
  },
  {
    step: "04",
    title: "Үр дүн ба дараах дэмжлэг",
    body: "Гэрээ хаалт, шилжүүлгийн дараа ашиглалт, портфолиогийн зөвлөгөөг үргэлжлүүлнэ.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Үйлчилгээ"
        title={<>Төслийн санаанаас хүлээлгэн өгөх хүртэлх дэмжлэг</>}
        description="4 үндсэн чиглэл нэгдсэн стратегиэр ажилладаг. Захиалга бүрт зориулсан баг, оролцоо, тайлагналт."
        crumbs={[
          { href: "/real-estate", label: "Нүүр" },
          { href: "/real-estate/services", label: "Үйлчилгээ" },
        ]}
      />

      <section className="re-section">
        <div className="re-container">
          <div className="re-service-grid">
            {reServices.map((service, idx) => (
              <article key={service.id} className="re-service">
                <span className="re-service__number">{String(idx + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>
                      <span aria-hidden="true">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="re-section re-about">
        <div className="re-container">
          <div className="re-section-head">
            <div>
              <span className="re-eyebrow re-eyebrow--dark">
                <span className="re-eyebrow-dot" aria-hidden="true" />
                Үйл явц
              </span>
              <h2>Бид хэрхэн ажилладаг вэ</h2>
            </div>
            <p>
              Эхний уулзалтаас хүлээлгэн өгөх хүртэлх дөрвөн алхамт явц. Үе шат
              бүрд та юу хүлээж авах, бид юу гүйцэтгэхээ урьдчилан тохироно.
            </p>
          </div>

          <ol className="re-process">
            {process.map((p) => (
              <li key={p.step}>
                <span className="re-process__step">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="re-cta">
        <div className="re-container re-cta-inner">
          <div className="re-cta-copy">
            <span className="re-eyebrow re-eyebrow--light">
              <span className="re-eyebrow-dot" aria-hidden="true" />
              Эхлэх
            </span>
            <h2>Аль үйлчилгээ тань хэрэгтэй вэ?</h2>
            <p>
              Бид эхний уулзалт дээр тань хамгийн тохиромжтой хувилбарыг
              тодорхойлоход туслана.
            </p>
            <div className="re-cta-actions">
              <Link href="/real-estate/contact" className="re-btn re-btn--primary">
                Зөвлөгөө захиалах
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
