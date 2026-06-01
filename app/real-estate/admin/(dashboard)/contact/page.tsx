import Link from "next/link";
import { getContactSettings } from "@/lib/real-estate/content";
import { saveContactSettings } from "../../actions";
import ImageField from "../_components/ImageField";

export const dynamic = "force-dynamic";

const CHANNEL_SLOTS = 6;

export default async function ContactSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const s = getContactSettings();

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Холбоо барих</p>
          <h1>Холбоо барих — хуудасны контент</h1>
        </div>
        <Link href="/real-estate/contact" target="_blank" className="admin-secondary">
          Хуудсыг үзэх →
        </Link>
      </div>

      {saved && <p className="admin-success">Хадгалагдлаа. Хуудас шинэчлэгдсэн.</p>}

      <form action={saveContactSettings} className="admin-form admin-panel">
        <fieldset className="admin-fieldset">
          <legend>Hero (Дээд хэсэг)</legend>

          <div className="admin-field">
            <span className="admin-field__label">Дэвсгэр зураг (заавал биш)</span>
            <p className="admin-hint">Хоосон үлдээвэл анхдагч градиент.</p>
            <ImageField
              name="contact_hero_image"
              fileFieldName="contact_hero_image_file"
              defaultValue={s.heroImage}
            />
          </div>

          <label>
            Eyebrow
            <input name="contact_hero_eyebrow" defaultValue={s.heroEyebrow} />
          </label>

          <div className="admin-grid-3">
            <label>
              Гарчиг — өмнө
              <input name="contact_hero_title_pre" defaultValue={s.heroTitlePre} />
            </label>
            <label>
              Гарчиг — italic
              <input name="contact_hero_title_em" defaultValue={s.heroTitleEm} />
            </label>
            <label>
              Гарчиг — дараа
              <input name="contact_hero_title_post" defaultValue={s.heroTitlePost} />
            </label>
          </div>

          <label>
            Тайлбар
            <textarea
              name="contact_hero_description"
              rows={3}
              defaultValue={s.heroDescription}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Шууд холбогдох сувгууд</legend>
          <p className="admin-hint">
            {CHANNEL_SLOTS} хүртэл карт. Дүрс нь тухайн сувгийн icon-ыг сонгоно.
          </p>
          {Array.from({ length: CHANNEL_SLOTS }).map((_, i) => {
            const ch = s.channels[i];
            return (
              <div key={i} className="admin-fieldset" style={{ borderColor: "#e5ebf0" }}>
                <strong className="admin-field__label">{i + 1}-р карт</strong>
                <div className="admin-grid-2">
                  <label>
                    Дүрс
                    <select
                      name={`contact_channel_${i + 1}_kind`}
                      defaultValue={ch?.kind ?? "phone"}
                    >
                      <option value="phone">Утас</option>
                      <option value="email">И-мэйл</option>
                      <option value="location">Байршил</option>
                    </select>
                  </label>
                  <label>
                    Шошго
                    <input
                      name={`contact_channel_${i + 1}_label`}
                      placeholder="Утсаар холбогдох"
                      defaultValue={ch?.label ?? ""}
                    />
                  </label>
                </div>
                <div className="admin-grid-2">
                  <label>
                    Гол утга
                    <input
                      name={`contact_channel_${i + 1}_value`}
                      placeholder="+976 0000 0000"
                      defaultValue={ch?.value ?? ""}
                    />
                  </label>
                  <label>
                    Дэлгэрэнгүй
                    <input
                      name={`contact_channel_${i + 1}_detail`}
                      placeholder="Даваа — Баасан, 09:00 — 19:00"
                      defaultValue={ch?.detail ?? ""}
                    />
                  </label>
                </div>
                <div className="admin-grid-2">
                  <label>
                    Холбоос
                    <input
                      name={`contact_channel_${i + 1}_href`}
                      placeholder="tel:+97600000000"
                      defaultValue={ch?.href ?? ""}
                    />
                  </label>
                  <label>
                    CTA товчны нэр
                    <input
                      name={`contact_channel_${i + 1}_cta`}
                      placeholder="Залгах"
                      defaultValue={ch?.cta ?? ""}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </fieldset>

        <button type="submit" className="admin-primary">
          Хадгалах
        </button>
      </form>
    </div>
  );
}
