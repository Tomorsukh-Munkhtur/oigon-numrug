import Link from "next/link";
import {
  listSafetyNews,
  listSafetyPages,
  listSafetyServices,
} from "@/lib/safety/content";

export const dynamic = "force-dynamic";

export default function SafetyAdminDashboardPage() {
  const pages = listSafetyPages();
  const news = listSafetyNews({ includeUnpublished: true });
  const services = listSafetyServices(true);

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Dashboard</p>
          <h1>ХАБ контент удирдлага</h1>
        </div>
        <Link href="/safety" className="admin-secondary">
          Public site
        </Link>
      </div>

      <div className="admin-stat-grid">
        <Link href="/safety/admin/pages" className="admin-stat">
          <strong>{pages.length}</strong>
          <span>Хуудас</span>
        </Link>
        <Link href="/safety/admin/news" className="admin-stat">
          <strong>{news.length}</strong>
          <span>Мэдээ</span>
        </Link>
        <Link href="/safety/admin/services" className="admin-stat">
          <strong>{services.length}</strong>
          <span>Үйлчилгээ</span>
        </Link>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-top">
          <h2>Сүүлийн мэдээ</h2>
          <Link href="/safety/admin/news/new" className="admin-primary">
            Нэмэх
          </Link>
        </div>
        <div className="admin-table">
          {news.slice(0, 5).map((item) => (
            <Link href={`/safety/admin/news/${item.id}`} className="admin-row" key={item.id}>
              <span>{item.date}</span>
              <strong>{item.title}</strong>
              <em>{item.published ? "Нийтлэгдсэн" : "Нуусан"}</em>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
