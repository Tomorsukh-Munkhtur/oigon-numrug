import Link from "next/link";
import { requireAdmin } from "@/lib/safety/auth";
import { logoutAction } from "../actions";
import AdminUploadGuard from "./AdminUploadGuard";

const navItems = [
  { href: "/safety/admin", label: "Самбар" },
  { href: "/safety/admin/pages", label: "Хуудас" },
  { href: "/safety/admin/news", label: "Мэдээ" },
  { href: "/safety/admin/services", label: "Үйлчилгээ" },
  { href: "/safety/admin/settings", label: "Тохиргоо" },
];

export default async function SafetyAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>ХАБ</span>
          <div>
            <strong>Safety admin</strong>
            <small>{user.username}</small>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction}>
          <button className="admin-ghost" type="submit">
            Гарах
          </button>
        </form>
      </aside>
      <section className="admin-main">
        <AdminUploadGuard />
        {children}
      </section>
    </main>
  );
}
