import { notFound } from "next/navigation";
import {
  getSafetyPage,
  parseExtra,
  type SafetyPageContent,
  type SafetyPageSlug,
} from "@/lib/safety/content";
import { updatePageContent } from "../../../actions";
import ImageField from "../../_components/ImageField";

export const dynamic = "force-dynamic";

const PAGE_SLUGS = new Set(["home", "news", "about", "services", "contact"]);

type HomeExtra = {
  weatherIcon: string;
  weatherCity: string;
  weatherTemp: string;
  weatherCondition: string;
  weatherWind: string;
  weatherHumidity: string;
};

type AboutExtra = {
  features: string[];
};

const ALL_TEXT_FIELDS = [
  "hero_tag",
  "hero_image",
  "hero_title",
  "hero_highlight",
  "hero_description",
  "section_tag",
  "section_title",
  "section_highlight",
  "section_description",
  "body",
  "visual_image",
  "primary_button_text",
  "primary_button_href",
] as const;

type FieldName = (typeof ALL_TEXT_FIELDS)[number];

function PreserveFields({
  page,
  except,
}: {
  page: SafetyPageContent;
  except: readonly FieldName[];
}) {
  const omitted = new Set(except);
  return (
    <>
      {ALL_TEXT_FIELDS.filter((field) => !omitted.has(field)).map((field) => (
        <input key={field} type="hidden" name={field} value={page[field] ?? ""} />
      ))}
    </>
  );
}

export default async function SafetyAdminPageEditor({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;

  if (!PAGE_SLUGS.has(slug)) notFound();

  const page = getSafetyPage(slug as SafetyPageSlug);

  return (
    <div className="admin-stack">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Page editor</p>
          <h1>{page.name}</h1>
        </div>
      </div>

      {query.saved && <p className="admin-success">Хадгалагдлаа.</p>}

      {page.slug === "home" && <HomeEditor page={page} />}
      {page.slug === "news" && <NewsEditor page={page} />}
      {page.slug === "about" && <AboutEditor page={page} />}
      {(page.slug === "services" || page.slug === "contact") && (
        <SectionEditor page={page} />
      )}
    </div>
  );
}

function HomeEditor({ page }: { page: SafetyPageContent }) {
  const homeExtra = parseExtra<HomeExtra>(page, {
    weatherIcon: "",
    weatherCity: "",
    weatherTemp: "",
    weatherCondition: "",
    weatherWind: "",
    weatherHumidity: "",
  });

  return (
    <form action={updatePageContent.bind(null, page.slug)} className="admin-form admin-panel">
      <fieldset className="admin-fieldset">
        <legend>Нүүр хуудасны баннер</legend>

        <div className="admin-field">
          <span className="admin-field__label">Banner зураг</span>
          <ImageField
            name="hero_image"
            fileName="hero_image_file"
            initialPath={page.hero_image}
            aspect="16:9"
            hint="Жнь: /safety-bg.jpg эсвэл бүрэн URL."
          />
        </div>

        <div className="admin-grid-2">
          <label>
            Banner гарчиг
            <input name="hero_title" defaultValue={page.hero_title} />
          </label>
          <label>
            Banner тодруулсан үг
            <input name="hero_highlight" defaultValue={page.hero_highlight} />
          </label>
        </div>

        <label>
          Banner тайлбар
          <textarea name="hero_description" rows={3} defaultValue={page.hero_description} />
        </label>

        <div className="admin-grid-2">
          <label>
            Товчны текст
            <input name="primary_button_text" defaultValue={page.primary_button_text} />
          </label>
          <label>
            Товчны линк
            <input name="primary_button_href" defaultValue={page.primary_button_href} />
          </label>
        </div>
        <p className="admin-hint">
          Жнь: текст “Бүх үйлчилгээ”, линк <code>/safety/services</code>.
        </p>
      </fieldset>

      <PreserveFields
        page={page}
        except={[
          "hero_image",
          "hero_title",
          "hero_highlight",
          "hero_description",
          "primary_button_text",
          "primary_button_href",
        ]}
      />
      <input type="hidden" name="weatherIcon" value={homeExtra.weatherIcon} />
      <input type="hidden" name="weatherCity" value={homeExtra.weatherCity} />
      <input type="hidden" name="weatherTemp" value={homeExtra.weatherTemp} />
      <input type="hidden" name="weatherCondition" value={homeExtra.weatherCondition} />
      <input type="hidden" name="weatherWind" value={homeExtra.weatherWind} />
      <input type="hidden" name="weatherHumidity" value={homeExtra.weatherHumidity} />

      <button className="admin-primary" type="submit">
        Хадгалах
      </button>
    </form>
  );
}

function NewsEditor({ page }: { page: SafetyPageContent }) {
  return (
    <form action={updatePageContent.bind(null, page.slug)} className="admin-form admin-panel">
      <fieldset className="admin-fieldset">
        <legend>Мэдээ хуудасны баннер</legend>

        <label>
          Banner tag
          <input name="hero_tag" defaultValue={page.hero_tag} />
        </label>

        <div className="admin-field">
          <span className="admin-field__label">Banner зураг</span>
          <ImageField
            name="hero_image"
            fileName="hero_image_file"
            initialPath={page.hero_image}
            aspect="16:9"
            hint="Hero бүсэд харагдах гол зураг."
          />
        </div>

        <div className="admin-grid-2">
          <label>
            Banner гарчиг
            <input name="hero_title" defaultValue={page.hero_title} />
          </label>
          <label>
            Banner тодруулсан үг
            <input name="hero_highlight" defaultValue={page.hero_highlight} />
          </label>
        </div>
      </fieldset>

      <PreserveFields
        page={page}
        except={["hero_tag", "hero_image", "hero_title", "hero_highlight"]}
      />

      <button className="admin-primary" type="submit">
        Хадгалах
      </button>
    </form>
  );
}

function AboutEditor({ page }: { page: SafetyPageContent }) {
  const aboutExtra = parseExtra<AboutExtra>(page, { features: [] });

  return (
    <form action={updatePageContent.bind(null, page.slug)} className="admin-form admin-panel">
      <fieldset className="admin-fieldset">
        <legend>Баннер</legend>

        <label>
          Banner tag
          <input name="hero_tag" defaultValue={page.hero_tag} />
        </label>

        <div className="admin-field">
          <span className="admin-field__label">Banner зураг</span>
          <ImageField
            name="hero_image"
            fileName="hero_image_file"
            initialPath={page.hero_image}
            aspect="16:9"
            hint="About хуудасны hero зураг."
          />
        </div>

        <div className="admin-grid-2">
          <label>
            Banner гарчиг
            <input name="hero_title" defaultValue={page.hero_title} />
          </label>
          <label>
            Banner тодруулсан үг
            <input name="hero_highlight" defaultValue={page.hero_highlight} />
          </label>
        </div>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Бидний тухай хэсэг</legend>

        <div className="admin-grid-2">
          <label>
            Section tag
            <input name="section_tag" defaultValue={page.section_tag} />
          </label>
          <label>
            Section гарчиг
            <input name="section_title" defaultValue={page.section_title} />
          </label>
        </div>

        <label>
          Section тодруулсан үг
          <input name="section_highlight" defaultValue={page.section_highlight} />
        </label>

        <label>
          Үндсэн текст
          <textarea name="body" rows={5} defaultValue={page.body} />
        </label>

        <div className="admin-field">
          <span className="admin-field__label">Хажуугийн зураг</span>
          <ImageField
            name="visual_image"
            fileName="visual_image_file"
            initialPath={page.visual_image}
            aspect="4:3"
            hint="Хэсгийн дэргэд харагдах зураг."
          />
        </div>

        <label>
          Feature list (мөр бүр нэг item)
          <textarea name="features" rows={5} defaultValue={aboutExtra.features.join("\n")} />
        </label>
      </fieldset>

      <PreserveFields
        page={page}
        except={[
          "hero_tag",
          "hero_image",
          "hero_title",
          "hero_highlight",
          "section_tag",
          "section_title",
          "section_highlight",
          "body",
          "visual_image",
        ]}
      />

      <button className="admin-primary" type="submit">
        Хадгалах
      </button>
    </form>
  );
}

function SectionEditor({ page }: { page: SafetyPageContent }) {
  return (
    <form action={updatePageContent.bind(null, page.slug)} className="admin-form admin-panel">
      <fieldset className="admin-fieldset">
        <legend>Баннер</legend>

        <label>
          Banner tag
          <input name="hero_tag" defaultValue={page.hero_tag} />
        </label>

        <div className="admin-field">
          <span className="admin-field__label">Banner зураг</span>
          <ImageField
            name="hero_image"
            fileName="hero_image_file"
            initialPath={page.hero_image}
            aspect="16:9"
            hint="Hero бүсэд харагдах гол зураг."
          />
        </div>

        <div className="admin-grid-2">
          <label>
            Banner гарчиг
            <input name="hero_title" defaultValue={page.hero_title} />
          </label>
          <label>
            Banner тодруулсан үг
            <input name="hero_highlight" defaultValue={page.hero_highlight} />
          </label>
        </div>

        <label>
          Banner тайлбар
          <textarea name="hero_description" rows={3} defaultValue={page.hero_description} />
        </label>
      </fieldset>

      <fieldset className="admin-fieldset">
        <legend>Хэсгийн гарчиг</legend>

        <div className="admin-grid-2">
          <label>
            Section tag
            <input name="section_tag" defaultValue={page.section_tag} />
          </label>
          <label>
            Section гарчиг
            <input name="section_title" defaultValue={page.section_title} />
          </label>
        </div>

        <label>
          Section тодруулсан үг
          <input name="section_highlight" defaultValue={page.section_highlight} />
        </label>

        <label>
          Section тайлбар
          <textarea name="section_description" rows={3} defaultValue={page.section_description} />
        </label>
      </fieldset>

      <PreserveFields
        page={page}
        except={[
          "hero_tag",
          "hero_image",
          "hero_title",
          "hero_highlight",
          "hero_description",
          "section_tag",
          "section_title",
          "section_highlight",
          "section_description",
        ]}
      />

      <button className="admin-primary" type="submit">
        Хадгалах
      </button>
    </form>
  );
}
