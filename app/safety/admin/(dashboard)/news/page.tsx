import Link from "next/link";
import { listSafetyNews } from "@/lib/safety/content";
import { deleteNews } from "../../actions";

export const dynamic = "force-dynamic";

export default function SafetyAdminNewsPage() {
  const news = listSafetyNews({ includeUnpublished: true });

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">News</p>
          <h1>Мэдээ мэдээлэл</h1>
        </div>
        <Link href="/safety/admin/news/new" className="admin-primary">
          Мэдээ нэмэх
        </Link>
      </div>

      <section className="admin-panel">
        <div className="admin-table">
          {news.map((item) => (
            <div className="admin-row" key={item.id}>
              <span>{item.date}</span>
              <Link href={`/safety/admin/news/${item.id}`}>
                <strong>{item.title}</strong>
              </Link>
              <em>{item.published ? "Нийтлэгдсэн" : "Нуусан"}</em>
              <form action={deleteNews.bind(null, item.id)}>
                <button className="admin-danger" type="submit">
                  Устгах
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
