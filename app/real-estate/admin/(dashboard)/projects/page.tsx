import Link from "next/link";
import { listProjects } from "@/lib/real-estate/content";

export const dynamic = "force-dynamic";

export default function ProjectsListPage() {
  const projects = listProjects({ includeUnpublished: true });

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Төслүүд</p>
          <h1>Төслийн жагсаалт</h1>
        </div>
        <Link href="/real-estate/admin/projects/new" className="admin-primary">
          Шинэ төсөл нэмэх
        </Link>
      </div>

      <section className="admin-panel">
        <div className="admin-table">
          {projects.length === 0 && <p>Одоогоор төсөл алга. Шинээр нэмнэ үү.</p>}
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/real-estate/admin/projects/${p.id}`}
              className="admin-row"
            >
              <span>{p.type}</span>
              <strong>{p.title}</strong>
              <em>{p.published ? "Нийтлэгдсэн" : "Нуусан"}</em>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
