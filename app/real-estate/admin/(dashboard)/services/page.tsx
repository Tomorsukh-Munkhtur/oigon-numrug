import Link from "next/link";
import { getServicesSettings } from "@/lib/real-estate/content";
import { saveServicesSettings } from "../../actions";
import ImageField from "../_components/ImageField";

export const dynamic = "force-dynamic";

const SERVICE_SLOTS = 8;
const PROCESS_SLOTS = 8;

export default async function ServicesSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const s = getServicesSettings();

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Үйлчилгээ</p>
          <h1>Үйлчилгээ — хуудасны контент</h1>
        </div>
        <Link href="/real-estate/services" target="_blank" className="admin-secondary">
          Хуудсыг үзэх →
        </Link>
      </div>

      {saved && <p className="admin-success">Хадгалагдлаа. Хуудас шинэчлэгдсэн.</p>}

      <form action={saveServicesSettings} className="admin-form admin-panel">
        <fieldset className="admin-fieldset">
          <legend>Hero (Дээд хэсэг)</legend>

          <div className="admin-field">
            <span className="admin-field__label">Дэвсгэр зураг (заавал биш)</span>
            <p className="admin-hint">
              Хоосон үлдээвэл анхдагч градиент дэвсгэр харагдана.
            </p>
            <ImageField
              name="services_hero_image"
              fileFieldName="services_hero_image_file"
              defaultValue={s.heroImage}
            />
          </div>

          <label>
            Eyebrow
            <input name="services_hero_eyebrow" defaultValue={s.heroEyebrow} />
          </label>

          <div className="admin-grid-3">
            <label>
              Гарчиг — өмнө
              <input name="services_hero_title_pre" defaultValue={s.heroTitlePre} />
            </label>
            <label>
              Гарчиг — italic
              <input name="services_hero_title_em" defaultValue={s.heroTitleEm} />
            </label>
            <label>
              Гарчиг — дараа
              <input name="services_hero_title_post" defaultValue={s.heroTitlePost} />
            </label>
          </div>

          <label>
            Тайлбар
            <textarea
              name="services_hero_description"
              rows={3}
              defaultValue={s.heroDescription}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Үйлчилгээний картууд</legend>
          <p className="admin-hint">
            {SERVICE_SLOTS} хүртэл. Хоосон үлдээсэн карт хадгалагдахгүй. Дэд
            зүйлсийг нэг мөрөнд нэг зүйлээр бичнэ.
          </p>
          {Array.from({ length: SERVICE_SLOTS }).map((_, i) => {
            const item = s.items[i];
            return (
              <div key={i} className="admin-fieldset" style={{ borderColor: "#e5ebf0" }}>
                <strong className="admin-field__label">{i + 1}-р үйлчилгээ</strong>
                <label>
                  Гарчиг
                  <input
                    name={`services_item_${i + 1}_title`}
                    defaultValue={item?.title ?? ""}
                  />
                </label>
                <label>
                  Тайлбар
                  <textarea
                    name={`services_item_${i + 1}_description`}
                    rows={3}
                    defaultValue={item?.description ?? ""}
                  />
                </label>
                <label>
                  Дэд зүйлс (нэг мөрөнд нэг)
                  <textarea
                    name={`services_item_${i + 1}_points`}
                    rows={4}
                    defaultValue={(item?.points ?? []).join("\n")}
                  />
                </label>
              </div>
            );
          })}
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Үйл явц — толгойн текст</legend>
          <label>
            Eyebrow
            <input
              name="services_process_eyebrow"
              defaultValue={s.processEyebrow}
            />
          </label>
          <label>
            Гарчиг
            <input
              name="services_process_title"
              defaultValue={s.processTitle}
            />
          </label>
          <label>
            Параграф
            <textarea
              name="services_process_paragraph"
              rows={3}
              defaultValue={s.processParagraph}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Үйл явц — алхамууд</legend>
          <p className="admin-hint">
            {PROCESS_SLOTS} хүртэл. Хоосон мөр хадгалагдахгүй.
          </p>
          {Array.from({ length: PROCESS_SLOTS }).map((_, i) => {
            const step = s.processSteps[i];
            return (
              <div key={i} className="admin-grid-3">
                <label>
                  {i + 1}-р дугаар
                  <input
                    name={`services_process_${i + 1}_step`}
                    placeholder={String(i + 1).padStart(2, "0")}
                    defaultValue={step?.step ?? ""}
                  />
                </label>
                <label>
                  {i + 1}-р гарчиг
                  <input
                    name={`services_process_${i + 1}_title`}
                    defaultValue={step?.title ?? ""}
                  />
                </label>
                <label>
                  {i + 1}-р тайлбар
                  <input
                    name={`services_process_${i + 1}_body`}
                    defaultValue={step?.body ?? ""}
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
            <input name="services_cta_eyebrow" defaultValue={s.ctaEyebrow} />
          </label>
          <label>
            Гарчиг
            <input name="services_cta_title" defaultValue={s.ctaTitle} />
          </label>
          <label>
            Параграф
            <textarea
              name="services_cta_paragraph"
              rows={3}
              defaultValue={s.ctaParagraph}
            />
          </label>
          <div className="admin-grid-2">
            <label>
              Эхний товч — нэр
              <input
                name="services_cta_primary_label"
                defaultValue={s.ctaPrimaryLabel}
              />
            </label>
            <label>
              Эхний товч — холбоос
              <input
                name="services_cta_primary_href"
                defaultValue={s.ctaPrimaryHref}
              />
            </label>
          </div>
          <div className="admin-grid-2">
            <label>
              Хоёр дахь товч — нэр
              <input
                name="services_cta_secondary_label"
                defaultValue={s.ctaSecondaryLabel}
              />
            </label>
            <label>
              Хоёр дахь товч — холбоос
              <input
                name="services_cta_secondary_href"
                defaultValue={s.ctaSecondaryHref}
              />
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
