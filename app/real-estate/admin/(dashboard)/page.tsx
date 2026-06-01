import Link from "next/link";
import { listProjects } from "@/lib/real-estate/content";

export const dynamic = "force-dynamic";

export default function RealEstateAdminDashboardPage() {
  const projects = listProjects({ includeUnpublished: true });
  const publishedProjects = projects.filter((p) => p.published).length;
  const hiddenProjects = projects.length - publishedProjects;

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Dashboard</p>
          <h1>Үл хөдлөх хөрөнгийн контент удирдлага</h1>
        </div>
        <Link href="/real-estate" className="admin-secondary" target="_blank">
          Public site →
        </Link>
      </div>

      <div className="admin-stat-grid">
        <Link href="/real-estate/admin/projects" className="admin-stat">
          <strong>{projects.length}</strong>
          <span>Төсөл (нийт)</span>
        </Link>
        <Link href="/real-estate/admin/projects" className="admin-stat">
          <strong>{publishedProjects}</strong>
          <span>Нийтлэгдсэн төсөл</span>
        </Link>
        <Link href="/real-estate/admin/projects" className="admin-stat">
          <strong>{hiddenProjects}</strong>
          <span>Нуусан төсөл</span>
        </Link>
        <Link href="/real-estate/admin/home" className="admin-stat">
          <strong>Засах</strong>
          <span>Нүүр хуудасны контент</span>
        </Link>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-top">
          <h2>Төслүүд</h2>
          <Link href="/real-estate/admin/projects/new" className="admin-primary">
            Шинэ төсөл
          </Link>
        </div>
        <div className="admin-table">
          {projects.slice(0, 5).map((p) => (
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
          {projects.length === 0 && <p>Одоогоор төсөл байхгүй.</p>}
        </div>
      </section>
    </div>
  );
}
