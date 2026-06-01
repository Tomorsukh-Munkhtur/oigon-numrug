import Link from "next/link";
import { getAboutSettings } from "@/lib/real-estate/content";
import { saveAboutSettings } from "../../actions";
import ImageField from "../_components/ImageField";

export const dynamic = "force-dynamic";

const VALUE_SLOTS = 6;
const CHECK_SLOTS = 6;
const MILESTONE_SLOTS = 8;

export default async function AboutSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const s = getAboutSettings();

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Бидний тухай</p>
          <h1>Бидний тухай — хуудасны контент</h1>
        </div>
        <Link href="/real-estate/about" target="_blank" className="admin-secondary">
          Хуудсыг үзэх →
        </Link>
      </div>

      {saved && <p className="admin-success">Хадгалагдлаа. Хуудас шинэчлэгдсэн.</p>}

      <form action={saveAboutSettings} className="admin-form admin-panel">
        <fieldset className="admin-fieldset">
          <legend>Hero (Дээд хэсэг)</legend>

          <div className="admin-field">
            <span className="admin-field__label">Дэвсгэр зураг (заавал биш)</span>
            <p className="admin-hint">
              Хоосон үлдээвэл анхдагч градиент дэвсгэр харагдана.
            </p>
            <ImageField
              name="about_hero_image"
              fileFieldName="about_hero_image_file"
              defaultValue={s.heroImage}
            />
          </div>

          <label>
            Eyebrow (дээд бичээс)
            <input name="about_hero_eyebrow" defaultValue={s.heroEyebrow} />
          </label>

          <div className="admin-grid-3">
            <label>
              Гарчиг — өмнө
              <input name="about_hero_title_pre" defaultValue={s.heroTitlePre} />
            </label>
            <label>
              Гарчиг — italic
              <input name="about_hero_title_em" defaultValue={s.heroTitleEm} />
            </label>
            <label>
              Гарчиг — дараа
              <input name="about_hero_title_post" defaultValue={s.heroTitlePost} />
            </label>
          </div>

          <label>
            Тайлбар
            <textarea name="about_hero_description" rows={3} defaultValue={s.heroDescription} />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Эрхэм зорилго (зүүн талын блок)</legend>
          <label>
            Eyebrow
            <input name="about_mission_eyebrow" defaultValue={s.missionEyebrow} />
          </label>
          <div className="admin-grid-3">
            <label>
              Гарчиг — өмнө
              <input name="about_mission_title_pre" defaultValue={s.missionTitlePre} />
            </label>
            <label>
              Гарчиг — italic
              <input name="about_mission_title_em" defaultValue={s.missionTitleEm} />
            </label>
            <label>
              Гарчиг — дараа
              <input name="about_mission_title_post" defaultValue={s.missionTitlePost} />
            </label>
          </div>
          <label>
            Үндсэн параграф
            <textarea name="about_mission_paragraph" rows={4} defaultValue={s.missionParagraph} />
          </label>

          <p className="admin-hint">
            Шалгах жагсаалт ({CHECK_SLOTS} хүртэл; хоосон үлдээсэн нь хадгалагдахгүй).
          </p>
          {Array.from({ length: CHECK_SLOTS }).map((_, i) => (
            <label key={i}>
              {i + 1}-р зүйл
              <input
                name={`about_check_${i + 1}`}
                defaultValue={s.missionChecklist[i] ?? ""}
              />
            </label>
          ))}
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Бидний түүхэн замнал (timeline)</legend>
          <p className="admin-hint">
            {MILESTONE_SLOTS} хүртэл. Хоосон үлдээсэн мөр хадгалагдахгүй.
          </p>
          {Array.from({ length: MILESTONE_SLOTS }).map((_, i) => {
            const m = s.milestones[i];
            return (
              <div key={i} className="admin-grid-2">
                <label>
                  {i + 1}-р он
                  <input
                    name={`about_milestone_${i + 1}_year`}
                    placeholder="2024"
                    defaultValue={m?.year ?? ""}
                  />
                </label>
                <label>
                  {i + 1}-р текст
                  <input
                    name={`about_milestone_${i + 1}_text`}
                    placeholder="Юу болсон тухай..."
                    defaultValue={m?.text ?? ""}
                  />
                </label>
              </div>
            );
          })}
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Бидний үнэт зүйлс (карт хэсэг)</legend>
          <label>
            Eyebrow
            <input name="about_values_eyebrow" defaultValue={s.valuesEyebrow} />
          </label>
          <label>
            Гарчиг
            <input name="about_values_title" defaultValue={s.valuesTitle} />
          </label>
          <label>
            Тайлбар
            <textarea name="about_values_description" rows={3} defaultValue={s.valuesDescription} />
          </label>

          <p className="admin-hint">
            Үнэт зүйлсийн карт ({VALUE_SLOTS} хүртэл).
          </p>
          {Array.from({ length: VALUE_SLOTS }).map((_, i) => {
            const v = s.values[i];
            return (
              <div key={i} className="admin-grid-2">
                <label>
                  {i + 1}-р гарчиг
                  <input
                    name={`about_value_${i + 1}_title`}
                    defaultValue={v?.title ?? ""}
                  />
                </label>
                <label>
                  {i + 1}-р тайлбар
                  <textarea
                    name={`about_value_${i + 1}_body`}
                    rows={3}
                    defaultValue={v?.body ?? ""}
                  />
                </label>
              </div>
            );
          })}
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Доод CTA</legend>
          <label>
            Eyebrow
            <input name="about_cta_eyebrow" defaultValue={s.ctaEyebrow} />
          </label>
          <label>
            Гарчиг
            <input name="about_cta_title" defaultValue={s.ctaTitle} />
          </label>
          <label>
            Параграф
            <textarea name="about_cta_paragraph" rows={3} defaultValue={s.ctaParagraph} />
          </label>
          <div className="admin-grid-2">
            <label>
              Эхний товч — нэр
              <input name="about_cta_primary_label" defaultValue={s.ctaPrimaryLabel} />
            </label>
            <label>
              Эхний товч — холбоос
              <input name="about_cta_primary_href" defaultValue={s.ctaPrimaryHref} />
            </label>
          </div>
          <div className="admin-grid-2">
            <label>
              Хоёр дахь товч — нэр
              <input name="about_cta_secondary_label" defaultValue={s.ctaSecondaryLabel} />
            </label>
            <label>
              Хоёр дахь товч — холбоос
              <input name="about_cta_secondary_href" defaultValue={s.ctaSecondaryHref} />
            </label>
          </div>
        </fieldset>

        <button type="submit" className="admin-primary">
          Хадгалах
        </button>
      </form>
    </div>
  );
}
