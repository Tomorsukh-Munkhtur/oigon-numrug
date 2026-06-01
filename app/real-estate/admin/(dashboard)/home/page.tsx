import Link from "next/link";
import { getHomeSettings } from "@/lib/real-estate/content";
import { saveHomeSettings } from "../../actions";
import ImageField from "../_components/ImageField";

export const dynamic = "force-dynamic";

export default async function HomeSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const s = getHomeSettings();

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Нүүр хуудас</p>
          <h1>Үл хөдлөхийн нүүр хуудасны контент</h1>
        </div>
        <Link href="/real-estate" target="_blank" className="admin-secondary">
          Нүүр хуудсыг үзэх →
        </Link>
      </div>

      {saved && <p className="admin-success">Хадгалагдлаа. Нүүр хуудас шинэчлэгдсэн.</p>}

      <form action={saveHomeSettings} className="admin-form admin-panel">
        <fieldset className="admin-fieldset">
          <legend>Hero (Гол хэсэг)</legend>

          <div className="admin-field">
            <span className="admin-field__label">Дэвсгэр зураг</span>
            <ImageField
              name="home_hero_image"
              fileFieldName="home_hero_image_file"
              defaultValue={s.heroImage}
            />
          </div>

          <label>
            Eyebrow (дээд бичээс)
            <input name="home_hero_eyebrow" defaultValue={s.heroEyebrow} />
          </label>

          <div className="admin-grid-3">
            <label>
              Гарчиг — өмнө
              <input name="home_hero_title_pre" defaultValue={s.heroTitlePre} />
            </label>
            <label>
              Гарчиг — italic
              <input name="home_hero_title_em" defaultValue={s.heroTitleEm} />
            </label>
            <label>
              Гарчиг — дараа
              <input name="home_hero_title_post" defaultValue={s.heroTitlePost} />
            </label>
          </div>

          <label>
            Тайлбар (lead)
            <textarea name="home_hero_lead" rows={4} defaultValue={s.heroLead} />
          </label>

          <div className="admin-grid-2">
            <label>
              Эхний товч — нэр
              <input name="home_hero_cta_primary_label" defaultValue={s.heroPrimaryLabel} />
            </label>
            <label>
              Эхний товч — холбоос
              <input name="home_hero_cta_primary_href" defaultValue={s.heroPrimaryHref} />
            </label>
          </div>
          <div className="admin-grid-2">
            <label>
              Хоёр дахь товч — нэр
              <input name="home_hero_cta_secondary_label" defaultValue={s.heroSecondaryLabel} />
            </label>
            <label>
              Хоёр дахь товч — холбоос
              <input name="home_hero_cta_secondary_href" defaultValue={s.heroSecondaryHref} />
            </label>
          </div>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Итгэлийн зурвас (Hero доорх 3 үзүүлэлт)</legend>
          <div className="admin-grid-2">
            <label>
              1-р шошго
              <input name="home_trust_1_label" defaultValue={s.trust1Label} />
            </label>
            <label>
              1-р утга
              <input name="home_trust_1_value" defaultValue={s.trust1Value} />
            </label>
          </div>
          <div className="admin-grid-2">
            <label>
              2-р шошго
              <input name="home_trust_2_label" defaultValue={s.trust2Label} />
            </label>
            <label>
              2-р утга
              <input name="home_trust_2_value" defaultValue={s.trust2Value} />
            </label>
          </div>
          <div className="admin-grid-2">
            <label>
              3-р шошго
              <input name="home_trust_3_label" defaultValue={s.trust3Label} />
            </label>
            <label>
              3-р утга
              <input name="home_trust_3_value" defaultValue={s.trust3Value} />
            </label>
          </div>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Зах зээлийн товч (Hero хажуу карт)</legend>
          <div className="admin-grid-2">
            <label>
              Pill бичээс (улирал)
              <input name="home_market_pill" defaultValue={s.marketPill} />
            </label>
            <label>
              Картын гарчиг
              <input name="home_market_title" defaultValue={s.marketTitle} />
            </label>
          </div>

          {[1, 2, 3].map((i) => {
            const labelKey = `home_market_row_${i}_label` as const;
            const valueKey = `home_market_row_${i}_value` as const;
            const deltaKey = `home_market_row_${i}_delta` as const;
            const kindKey = `home_market_row_${i}_kind` as const;
            const labelDefault = s[`marketRow${i}Label` as keyof typeof s] as string;
            const valueDefault = s[`marketRow${i}Value` as keyof typeof s] as string;
            const deltaDefault = s[`marketRow${i}Delta` as keyof typeof s] as string;
            const kindDefault = s[`marketRow${i}Kind` as keyof typeof s] as string;

            return (
              <div key={i} className="admin-grid-3">
                <label>
                  {i}-р мөр шошго
                  <input name={labelKey} defaultValue={labelDefault} />
                </label>
                <label>
                  {i}-р мөр утга
                  <input name={valueKey} defaultValue={valueDefault} />
                </label>
                <div className="admin-grid-2">
                  <label>
                    {i}-р дельта
                    <input name={deltaKey} defaultValue={deltaDefault} placeholder="▲ 5%" />
                  </label>
                  <label>
                    {i}-р чиглэл
                    <select name={kindKey} defaultValue={kindDefault}>
                      <option value="up">Өсөлт (ногоон)</option>
                      <option value="down">Бууралт (улаан)</option>
                    </select>
                  </label>
                </div>
              </div>
            );
          })}

          <label>
            Картын доод тайлбар
            <input name="home_market_footer" defaultValue={s.marketFooter} />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Гүйдэг жагсаалт (Hero доорх хамтрагч/төслийн нэрс)</legend>
          <p className="admin-hint">
            12 хүртэл нэр оруулж болно. Хоосон үлдээсэн мөр алгасагдана.
          </p>
          {Array.from({ length: 12 }).map((_, i) => (
            <label key={i}>
              {i + 1}-р нэр
              <input
                name={`home_marquee_${i + 1}`}
                defaultValue={s.marqueeNames[i] ?? ""}
                placeholder={i === 0 ? "Skyline Residence" : ""}
              />
            </label>
          ))}
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Гол үзүүлэлтүүд (4 статистик)</legend>
          <p className="admin-hint">
            Эхний мөр — том тоо (120+); хоёр дахь — тайлбар (Хүлээлгэн өгсөн төсөл).
          </p>
          {Array.from({ length: 4 }).map((_, i) => {
            const stat = s.stats[i];
            return (
              <div key={i} className="admin-grid-2">
                <label>
                  {i + 1}-р тоо
                  <input
                    name={`home_stat_${i + 1}_value`}
                    defaultValue={stat?.value ?? ""}
                    placeholder="120+"
                  />
                </label>
                <label>
                  {i + 1}-р шошго
                  <input
                    name={`home_stat_${i + 1}_label`}
                    defaultValue={stat?.label ?? ""}
                    placeholder="Хүлээлгэн өгсөн төсөл"
                  />
                </label>
              </div>
            );
          })}
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Төслийн хэсэг (preview-ын дээд гарчиг)</legend>
          <label>
            Eyebrow
            <input name="home_projects_eyebrow" defaultValue={s.projectsEyebrow} />
          </label>
          <label>
            Гарчиг
            <input name="home_projects_title" defaultValue={s.projectsTitle} />
          </label>
          <label>
            Тайлбар
            <textarea
              name="home_projects_description"
              rows={3}
              defaultValue={s.projectsDescription}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Холбоо барих хэсэг (доод CTA)</legend>
          <label>
            Eyebrow
            <input name="home_cta_eyebrow" defaultValue={s.ctaEyebrow} />
          </label>
          <div className="admin-grid-2">
            <label>
              Гарчиг — 1-р мөр
              <input name="home_cta_title_line1" defaultValue={s.ctaTitleLine1} />
            </label>
            <label>
              Гарчиг — 2-р мөр
              <input name="home_cta_title_line2" defaultValue={s.ctaTitleLine2} />
            </label>
          </div>
          <label>
            Тайлбар
            <textarea
              name="home_cta_description"
              rows={3}
              defaultValue={s.ctaDescription}
            />
          </label>
          <div className="admin-grid-2">
            <label>
              Эхний товч — нэр
              <input name="home_cta_primary_label" defaultValue={s.ctaPrimaryLabel} />
            </label>
            <label>
              Эхний товч — холбоос
              <input name="home_cta_primary_href" defaultValue={s.ctaPrimaryHref} />
            </label>
          </div>
          <div className="admin-grid-2">
            <label>
              Хоёр дахь товч — нэр
              <input name="home_cta_secondary_label" defaultValue={s.ctaSecondaryLabel} />
            </label>
            <label>
              Хоёр дахь товч — холбоос
              <input name="home_cta_secondary_href" defaultValue={s.ctaSecondaryHref} />
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
