import Link from "next/link";
import { requireAdmin } from "@/lib/real-estate/auth";
import { updateAdminPassword } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ passwordError?: string }>;
}) {
  const user = await requireAdmin();
  const { passwordError } = await searchParams;

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Тохиргоо</p>
          <h1>Админы тохиргоо</h1>
        </div>
        <Link href="/real-estate/admin" className="admin-secondary">
          ← Самбар руу
        </Link>
      </div>

      <section className="admin-panel">
        <div className="admin-section__head">
          <h2>Дансны мэдээлэл</h2>
          <p>Та одоогоор {user.username} нэрээр нэвтэрсэн байна.</p>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-section__head">
          <h2>Нууц үг солих</h2>
          <p>
            Шинэ нууц үг 8 ба түүнээс дээш тэмдэгттэй байх ёстой. Солисны дараа
            та автоматаар гарч, шинэ нууц үгээр дахин нэвтэрнэ.
          </p>
        </div>

        {passwordError && (
          <p className="admin-alert">
            Нууц үг хэт богино эсвэл хоёр талбар таарахгүй байна.
          </p>
        )}

        <form action={updateAdminPassword} className="admin-form">
          <label>
            Шинэ нууц үг
            <input
              type="password"
              name="new_password"
              minLength={8}
              required
              autoComplete="new-password"
            />
          </label>
          <label>
            Шинэ нууц үгээ дахин бичих
            <input
              type="password"
              name="confirm_password"
              minLength={8}
              required
              autoComplete="new-password"
            />
          </label>
          <button type="submit" className="admin-primary">
            Нууц үгийг солих
          </button>
        </form>
      </section>
    </div>
  );
}
