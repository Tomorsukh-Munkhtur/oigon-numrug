import { loginAction } from "../actions";

export const metadata = {
  title: "Нэвтрэх — Real Estate Admin",
  robots: { index: false, follow: false },
};

export default async function RealEstateAdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; passwordChanged?: string; expired?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <div>
          <p className="admin-kicker">Oigon Numrug Properties</p>
          <h1>Real Estate admin</h1>
          <p>Контент удирдлагын хэсэгт нэвтрэнэ үү.</p>
        </div>

        {params.error && (
          <p className="admin-alert">Нэвтрэх нэр эсвэл нууц үг буруу байна.</p>
        )}
        {params.expired && (
          <p className="admin-alert">Сессийн хугацаа дууссан. Дахин нэвтэрнэ үү.</p>
        )}
        {params.passwordChanged && (
          <p className="admin-success">Нууц үг солигдлоо. Дахин нэвтэрнэ үү.</p>
        )}

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
