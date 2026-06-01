import Link from "next/link";
import { requireAdmin } from "@/lib/real-estate/auth";
import { logoutAction } from "../actions";

const navItems = [
  { href: "/real-estate/admin", label: "Самбар" },
  { href: "/real-estate/admin/home", label: "Нүүр хуудас" },
  { href: "/real-estate/admin/about", label: "Бидний тухай" },
  { href: "/real-estate/admin/services", label: "Үйлчилгээ" },
  { href: "/real-estate/admin/contact", label: "Холбоо барих" },
  { href: "/real-estate/admin/projects", label: "Төслүүд" },
];

export default async function RealEstateAdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span>ON</span>
          <div>
            <strong>Real Estate admin</strong>
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
      <section className="admin-main">{children}</section>
    </main>
  );
}
