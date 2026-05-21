import Link from "next/link";
import { listSafetyPages } from "@/lib/safety/content";

export const dynamic = "force-dynamic";

const HIDDEN_SLUGS = new Set(["training"]);

export default function SafetyAdminPagesPage() {
  const pages = listSafetyPages().filter((page) => !HIDDEN_SLUGS.has(page.slug));

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Pages</p>
          <h1>Хуудасны контент</h1>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-table">
          {pages.map((page) => (
            <Link href={`/safety/admin/pages/${page.slug}`} className="admin-row" key={page.slug}>
              <span>/{page.slug === "home" ? "safety" : `safety/${page.slug}`}</span>
              <strong>{page.name}</strong>
              <em>Засах</em>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
