import { loginAction } from "../actions";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SafetyAdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; passwordChanged?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <div>
          <p className="admin-kicker">Oigon Numrug HABEA</p>
          <h1>Safety admin</h1>
          <p>Контент удирдлагын хэсэгт нэвтрэнэ үү.</p>
        </div>

        {params.error && <p className="admin-alert">Нэвтрэх нэр эсвэл нууц үг буруу байна.</p>}
        {params.passwordChanged && <p className="admin-success">Нууц үг солигдлоо. Дахин нэвтэрнэ үү.</p>}

        <form action={loginAction} className="admin-form">
          <label>
            Нэвтрэх нэр
            <input name="username" autoComplete="username" required defaultValue="admin" />
          </label>
          <label>
            Нууц үг
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="admin-primary" type="submit">
            Нэвтрэх
          </button>
        </form>
      </section>
    </main>
  );
}
