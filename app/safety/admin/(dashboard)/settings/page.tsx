import { DEFAULT_SAFETY_SETTINGS } from "@/lib/safety/defaults";
import { getSafetySettings } from "@/lib/safety/content";
import { updateAdminPassword, updateSettings } from "../../actions";
import ImageField from "../_components/ImageField";

export const dynamic = "force-dynamic";

export default async function SafetyAdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; passwordError?: string }>;
}) {
  const query = await searchParams;
  const settings = { ...DEFAULT_SAFETY_SETTINGS, ...getSafetySettings() };

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Settings</p>
          <h1>Ерөнхий тохиргоо</h1>
        </div>
      </div>

      {query.saved && <p className="admin-success">Хадгалагдлаа.</p>}

      <form action={updateSettings} className="admin-form admin-panel">
        <fieldset className="admin-fieldset">
          <legend>Лого</legend>
          <div className="admin-grid-2">
            <div className="admin-field">
              <span className="admin-field__label">Navigation лого</span>
              <ImageField
                name="nav_logo"
                fileName="nav_logo_file"
                initialPath={settings.nav_logo}
                aspect="logo"
                transparent
                hint="Header дээр харагдах лого. Тунгалаг (transparent PNG) илүү тохиромжтой."
              />
            </div>
            <div className="admin-field">
              <span className="admin-field__label">Footer лого</span>
              <ImageField
                name="footer_logo"
                fileName="footer_logo_file"
                initialPath={settings.footer_logo}
                aspect="logo"
                transparent
                hint="Footer дээр харагдах лого."
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Холбоо барих мэдээлэл</legend>
          <p className="admin-hint" style={{ marginTop: "-8px" }}>
            /safety/contact хуудсанд харагдах утас, и-мэйл, хаягын мэдээлэл.
          </p>

          <div className="admin-grid-2">
            <label className="admin-field">
              <span className="admin-field__label">📞 Утас</span>
              <input name="contact_phone" defaultValue={settings.contact_phone} />
            </label>
            <label className="admin-field">
              <span className="admin-field__label">Утасны тайлбар</span>
              <input
                name="contact_phone_note"
                defaultValue={settings.contact_phone_note}
                placeholder="Жнь: Ажлын цагаар холбогдоно уу."
              />
            </label>
          </div>

          <div className="admin-grid-2">
            <label className="admin-field">
              <span className="admin-field__label">✉️ И-мэйл</span>
              <input
                name="contact_email"
                type="email"
                defaultValue={settings.contact_email}
              />
            </label>
            <label className="admin-field">
              <span className="admin-field__label">И-мэйлийн тайлбар</span>
              <input
                name="contact_email_note"
                defaultValue={settings.contact_email_note}
                placeholder="Жнь: Бид 24 цагийн дотор хариулна."
              />
            </label>
          </div>

          <div className="admin-grid-2">
            <label className="admin-field">
              <span className="admin-field__label">📍 Хаяг</span>
              <input name="contact_address" defaultValue={settings.contact_address} />
            </label>
            <label className="admin-field">
              <span className="admin-field__label">Хаягын тайлбар</span>
              <input
                name="contact_address_note"
                defaultValue={settings.contact_address_note}
                placeholder="Жнь: Ойгон Нөмрөг Төв байр"
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Footer текст</legend>
          <label className="admin-field">
            <span className="admin-field__label">Footer-д харагдах copyright/брэнд текст</span>
            <input name="footer_text" defaultValue={settings.footer_text} />
          </label>
        </fieldset>

        <button className="admin-primary" type="submit">
          Хадгалах
        </button>
      </form>

      <form action={updateAdminPassword} className="admin-form admin-panel">
        <div>
          <p className="admin-kicker">Security</p>
          <h2>Admin нууц үг солих</h2>
        </div>
        {query.passwordError && (
          <p className="admin-alert">Нууц үг 8+ тэмдэгттэй, давтан оруулсан утгатайгаа ижил байх ёстой.</p>
        )}
        <div className="admin-grid-2">
          <label>
            Шинэ нууц үг
            <input name="new_password" type="password" autoComplete="new-password" required />
          </label>
          <label>
            Давтах
            <input name="confirm_password" type="password" autoComplete="new-password" required />
          </label>
        </div>
        <button className="admin-secondary" type="submit">
          Нууц үг солих
        </button>
      </form>
    </div>
  );
}
