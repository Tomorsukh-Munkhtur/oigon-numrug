import { getDb } from "./db";
import {
  DEFAULT_RE_ABOUT_SETTINGS,
  DEFAULT_RE_CONTACT_SETTINGS,
  DEFAULT_RE_HOME_SETTINGS,
  DEFAULT_RE_SERVICES_SETTINGS,
} from "./defaults";
import type {
  RealEstateFloorPlan,
  RealEstateMilestone,
  RealEstateProject,
  RealEstateService,
  RealEstateStat,
} from "./content-types";

export type {
  RealEstateFloorPlan,
  RealEstateMilestone,
  RealEstateProject,
  RealEstateService,
  RealEstateStat,
};

// ---------- Static (not editable via admin yet) ----------

export const reStats: RealEstateStat[] = [
  { value: "120+", label: "Хүлээлгэн өгсөн төсөл" },
  { value: "12", label: "Жилийн туршлага" },
  { value: "3,400", label: "Сэтгэл хангалуун харилцагч" },
  { value: "₮48 тэрбум", label: "Гүйцэтгэсэн гүйлгээ" },
];

export const reServices: RealEstateService[] = [
  {
    id: "sales",
    title: "Борлуулалт ба түрээсийн зуучлал",
    description:
      "Зорилтот зах зээл, үнийн стратегиар хүлээлгэн өгөх хүртэлх бүх явцыг нэг цэгээс удирдана.",
    points: ["Үнэлгээ, үнийн судалгаа", "Зорилтот харилцагчид хүрэх", "Гэрээ, шилжүүлгийн зөвлөгөө"],
  },
  {
    id: "marketing",
    title: "Төслийн маркетингийн байршуулалт",
    description:
      "Барилгын төслийг зах зээлд танигдсан, үнэ цэнэтэй брэнд болгон төлөвлөж байршуулна.",
    points: ["Брэнд платформ", "Дижитал кампанит ажил", "Үзвэр, нээлтийн зохион байгуулалт"],
  },
  {
    id: "advisory",
    title: "Хөрөнгийн зөвлөгөө, портфолио",
    description:
      "Хувийн болон институцийн хөрөнгө оруулагчдад зориулсан үл хөдлөх портфолиогийн стратеги.",
    points: ["Эрсдэлийн шинжилгээ", "Орлогын төсөөлөл", "Гарах стратеги"],
  },
  {
    id: "valuation",
    title: "Үнэлгээ ба зах зээлийн судалгаа",
    description:
      "Гэрээ, зээл, татварын зориулалтаар ашиглах боломжтой бие даасан үнэлгээний тайлан.",
    points: ["Харьцуулсан үнэлгээ", "Орлогын аргачлал", "Зах зээлийн прогноз"],
  },
];

export const reMilestones: RealEstateMilestone[] = [
  { year: "2014", text: "Үүсгэн байгуулагдсан, эхний борлуулалтын баг" },
  { year: "2017", text: "Анхны хотхоны төсөл маркетингийн хамтрал" },
  { year: "2020", text: "Дижитал зуучлалын платформоо нэвтрүүлсэн" },
  { year: "2024", text: "100+ төсөлд оролцож, бүсчилсэн үйлчилгээтэй болсон" },
  { year: "2026", text: "Хөрөнгийн зөвлөх үйлчилгээгээ өргөжүүлж байна" },
];

export const reNavLinks = [
  { href: "/real-estate/projects", label: "Төслүүд" },
  { href: "/real-estate/about", label: "Бидний тухай" },
  { href: "/real-estate/services", label: "Үйлчилгээ" },
];

// ---------- DB-backed ----------

type ProjectRow = {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  status: string;
  price: string;
  size: string;
  summary: string;
  long_description: string;
  developer: string;
  completion: string;
  floors: string;
  units: string;
  parking: string;
  extra_json: string;
  published: number;
  sort_order: number;
};

function rowToProject(row: ProjectRow): RealEstateProject {
  let extra: {
    highlights?: string[];
    amenities?: string[];
    gallery?: string[];
    floorPlans?: RealEstateFloorPlan[];
  } = {};
  try {
    extra = JSON.parse(row.extra_json || "{}");
  } catch {
    extra = {};
  }

  return {
    id: row.id,
    title: row.title,
    type: row.type,
    location: row.location,
    image: row.image,
    status: row.status,
    price: row.price,
    size: row.size || undefined,
    summary: row.summary || undefined,
    longDescription: row.long_description || undefined,
    developer: row.developer || undefined,
    completion: row.completion || undefined,
    floors: row.floors || undefined,
    units: row.units || undefined,
    parking: row.parking || undefined,
    highlights: extra.highlights ?? [],
    amenities: extra.amenities ?? [],
    gallery: extra.gallery ?? [],
    floorPlans: extra.floorPlans ?? [],
    published: row.published === 1,
    sortOrder: row.sort_order,
  };
}

export function listProjects(options: { includeUnpublished?: boolean } = {}): RealEstateProject[] {
  const where = options.includeUnpublished ? "" : "WHERE published = 1";
  const rows = getDb()
    .prepare(`SELECT * FROM re_projects ${where} ORDER BY sort_order ASC, id ASC`)
    .all() as ProjectRow[];
  return rows.map(rowToProject);
}

export function getProject(id: string): RealEstateProject | null {
  const row = getDb()
    .prepare("SELECT * FROM re_projects WHERE id = ?")
    .get(id) as ProjectRow | undefined;
  return row ? rowToProject(row) : null;
}

// ---------- Home page settings (key-value) ----------

export type HomeSettings = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroLead: string;
  heroPrimaryLabel: string;
  heroPrimaryHref: string;
  heroSecondaryLabel: string;
  heroSecondaryHref: string;

  trust1Label: string;
  trust1Value: string;
  trust2Label: string;
  trust2Value: string;
  trust3Label: string;
  trust3Value: string;

  marketPill: string;
  marketTitle: string;
  marketRow1Label: string;
  marketRow1Value: string;
  marketRow1Delta: string;
  marketRow1Kind: "up" | "down";
  marketRow2Label: string;
  marketRow2Value: string;
  marketRow2Delta: string;
  marketRow2Kind: "up" | "down";
  marketRow3Label: string;
  marketRow3Value: string;
  marketRow3Delta: string;
  marketRow3Kind: "up" | "down";
  marketFooter: string;

  marqueeNames: string[];
  stats: { value: string; label: string }[];

  projectsEyebrow: string;
  projectsTitle: string;
  projectsDescription: string;

  ctaEyebrow: string;
  ctaTitleLine1: string;
  ctaTitleLine2: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

type SettingRow = { key: string; value: string };

export const RE_HOME_SETTING_KEYS = Object.keys(DEFAULT_RE_HOME_SETTINGS);

function pickKind(value: string): "up" | "down" {
  return value === "down" ? "down" : "up";
}

function parseJsonArray<T>(raw: string, fallback: T[]): T[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function getHomeSettings(): HomeSettings {
  const rows = getDb()
    .prepare("SELECT key, value FROM re_page_settings WHERE key LIKE 'home_%'")
    .all() as SettingRow[];

  const map = new Map<string, string>(rows.map((r) => [r.key, r.value]));
  const get = (key: string) => map.get(key) ?? DEFAULT_RE_HOME_SETTINGS[key] ?? "";

  const marqueeNames = parseJsonArray<string>(get("home_marquee_names_json"), []).filter(
    (s): s is string => typeof s === "string" && s.length > 0
  );

  const stats = parseJsonArray<{ value: string; label: string }>(
    get("home_stats_json"),
    []
  ).filter(
    (s): s is { value: string; label: string } =>
      s !== null && typeof s === "object" && typeof (s as { value: unknown }).value === "string"
  );

  return {
    heroImage: get("home_hero_image"),
    heroEyebrow: get("home_hero_eyebrow"),
    heroTitlePre: get("home_hero_title_pre"),
    heroTitleEm: get("home_hero_title_em"),
    heroTitlePost: get("home_hero_title_post"),
    heroLead: get("home_hero_lead"),
    heroPrimaryLabel: get("home_hero_cta_primary_label"),
    heroPrimaryHref: get("home_hero_cta_primary_href"),
    heroSecondaryLabel: get("home_hero_cta_secondary_label"),
    heroSecondaryHref: get("home_hero_cta_secondary_href"),

    trust1Label: get("home_trust_1_label"),
    trust1Value: get("home_trust_1_value"),
    trust2Label: get("home_trust_2_label"),
    trust2Value: get("home_trust_2_value"),
    trust3Label: get("home_trust_3_label"),
    trust3Value: get("home_trust_3_value"),

    marketPill: get("home_market_pill"),
    marketTitle: get("home_market_title"),
    marketRow1Label: get("home_market_row_1_label"),
    marketRow1Value: get("home_market_row_1_value"),
    marketRow1Delta: get("home_market_row_1_delta"),
    marketRow1Kind: pickKind(get("home_market_row_1_kind")),
    marketRow2Label: get("home_market_row_2_label"),
    marketRow2Value: get("home_market_row_2_value"),
    marketRow2Delta: get("home_market_row_2_delta"),
    marketRow2Kind: pickKind(get("home_market_row_2_kind")),
    marketRow3Label: get("home_market_row_3_label"),
    marketRow3Value: get("home_market_row_3_value"),
    marketRow3Delta: get("home_market_row_3_delta"),
    marketRow3Kind: pickKind(get("home_market_row_3_kind")),
    marketFooter: get("home_market_footer"),

    marqueeNames,
    stats,

    projectsEyebrow: get("home_projects_eyebrow"),
    projectsTitle: get("home_projects_title"),
    projectsDescription: get("home_projects_description"),

    ctaEyebrow: get("home_cta_eyebrow"),
    ctaTitleLine1: get("home_cta_title_line1"),
    ctaTitleLine2: get("home_cta_title_line2"),
    ctaDescription: get("home_cta_description"),
    ctaPrimaryLabel: get("home_cta_primary_label"),
    ctaPrimaryHref: get("home_cta_primary_href"),
    ctaSecondaryLabel: get("home_cta_secondary_label"),
    ctaSecondaryHref: get("home_cta_secondary_href"),
  };
}

// ---------- About page settings ----------

export type AboutValueItem = { title: string; body: string };
export type AboutMilestoneItem = { year: string; text: string };

export type AboutSettings = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroDescription: string;

  missionEyebrow: string;
  missionTitlePre: string;
  missionTitleEm: string;
  missionTitlePost: string;
  missionParagraph: string;
  missionChecklist: string[];

  valuesEyebrow: string;
  valuesTitle: string;
  valuesDescription: string;
  values: AboutValueItem[];

  milestones: AboutMilestoneItem[];

  ctaEyebrow: string;
  ctaTitle: string;
  ctaParagraph: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export const RE_ABOUT_SETTING_KEYS = Object.keys(DEFAULT_RE_ABOUT_SETTINGS);

export function getAboutSettings(): AboutSettings {
  const rows = getDb()
    .prepare("SELECT key, value FROM re_page_settings WHERE key LIKE 'about_%'")
    .all() as SettingRow[];

  const map = new Map<string, string>(rows.map((r) => [r.key, r.value]));
  const get = (key: string) => map.get(key) ?? DEFAULT_RE_ABOUT_SETTINGS[key] ?? "";

  const checklist = parseJsonArray<string>(
    get("about_mission_checklist_json"),
    []
  ).filter((s): s is string => typeof s === "string");

  const values = parseJsonArray<AboutValueItem>(get("about_values_json"), []).filter(
    (v): v is AboutValueItem =>
      v !== null &&
      typeof v === "object" &&
      typeof (v as AboutValueItem).title === "string"
  );

  const milestones = parseJsonArray<AboutMilestoneItem>(
    get("about_milestones_json"),
    []
  ).filter(
    (m): m is AboutMilestoneItem =>
      m !== null && typeof m === "object" && typeof (m as AboutMilestoneItem).year === "string"
  );

  return {
    heroImage: get("about_hero_image"),
    heroEyebrow: get("about_hero_eyebrow"),
    heroTitlePre: get("about_hero_title_pre"),
    heroTitleEm: get("about_hero_title_em"),
    heroTitlePost: get("about_hero_title_post"),
    heroDescription: get("about_hero_description"),

    missionEyebrow: get("about_mission_eyebrow"),
    missionTitlePre: get("about_mission_title_pre"),
    missionTitleEm: get("about_mission_title_em"),
    missionTitlePost: get("about_mission_title_post"),
    missionParagraph: get("about_mission_paragraph"),
    missionChecklist: checklist,

    valuesEyebrow: get("about_values_eyebrow"),
    valuesTitle: get("about_values_title"),
    valuesDescription: get("about_values_description"),
    values,

    milestones,

    ctaEyebrow: get("about_cta_eyebrow"),
    ctaTitle: get("about_cta_title"),
    ctaParagraph: get("about_cta_paragraph"),
    ctaPrimaryLabel: get("about_cta_primary_label"),
    ctaPrimaryHref: get("about_cta_primary_href"),
    ctaSecondaryLabel: get("about_cta_secondary_label"),
    ctaSecondaryHref: get("about_cta_secondary_href"),
  };
}

// ---------- Services page settings ----------

export type ServicesItem = {
  title: string;
  description: string;
  points: string[];
};

export type ServicesProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type ServicesSettings = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroDescription: string;

  items: ServicesItem[];

  processEyebrow: string;
  processTitle: string;
  processParagraph: string;
  processSteps: ServicesProcessStep[];

  ctaEyebrow: string;
  ctaTitle: string;
  ctaParagraph: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

export const RE_SERVICES_SETTING_KEYS = Object.keys(DEFAULT_RE_SERVICES_SETTINGS);

export function getServicesSettings(): ServicesSettings {
  const rows = getDb()
    .prepare("SELECT key, value FROM re_page_settings WHERE key LIKE 'services_%'")
    .all() as SettingRow[];

  const map = new Map<string, string>(rows.map((r) => [r.key, r.value]));
  const get = (key: string) =>
    map.get(key) ?? DEFAULT_RE_SERVICES_SETTINGS[key] ?? "";

  const items = parseJsonArray<ServicesItem>(get("services_list_json"), []).filter(
    (v): v is ServicesItem =>
      v !== null && typeof v === "object" && typeof (v as ServicesItem).title === "string"
  );

  const processSteps = parseJsonArray<ServicesProcessStep>(
    get("services_process_json"),
    []
  ).filter(
    (s): s is ServicesProcessStep =>
      s !== null && typeof s === "object" && typeof (s as ServicesProcessStep).title === "string"
  );

  return {
    heroImage: get("services_hero_image"),
    heroEyebrow: get("services_hero_eyebrow"),
    heroTitlePre: get("services_hero_title_pre"),
    heroTitleEm: get("services_hero_title_em"),
    heroTitlePost: get("services_hero_title_post"),
    heroDescription: get("services_hero_description"),

    items,

    processEyebrow: get("services_process_eyebrow"),
    processTitle: get("services_process_title"),
    processParagraph: get("services_process_paragraph"),
    processSteps,

    ctaEyebrow: get("services_cta_eyebrow"),
    ctaTitle: get("services_cta_title"),
    ctaParagraph: get("services_cta_paragraph"),
    ctaPrimaryLabel: get("services_cta_primary_label"),
    ctaPrimaryHref: get("services_cta_primary_href"),
    ctaSecondaryLabel: get("services_cta_secondary_label"),
    ctaSecondaryHref: get("services_cta_secondary_href"),
  };
}

// ---------- Contact page settings ----------

export type ContactChannelKind = "phone" | "email" | "location";

export type ContactChannel = {
  kind: ContactChannelKind;
  label: string;
  value: string;
  detail: string;
  href: string;
  cta: string;
};

export type ContactSettings = {
  heroImage: string;
  heroEyebrow: string;
  heroTitlePre: string;
  heroTitleEm: string;
  heroTitlePost: string;
  heroDescription: string;

  channels: ContactChannel[];
};

export const RE_CONTACT_SETTING_KEYS = Object.keys(DEFAULT_RE_CONTACT_SETTINGS);

function pickChannelKind(v: string): ContactChannelKind {
  return v === "email" || v === "location" ? v : "phone";
}

export function getContactSettings(): ContactSettings {
  const rows = getDb()
    .prepare("SELECT key, value FROM re_page_settings WHERE key LIKE 'contact_%'")
    .all() as SettingRow[];

  const map = new Map<string, string>(rows.map((r) => [r.key, r.value]));
  const get = (key: string) =>
    map.get(key) ?? DEFAULT_RE_CONTACT_SETTINGS[key] ?? "";

  const channels = parseJsonArray<ContactChannel>(get("contact_channels_json"), [])
    .filter(
      (c): c is ContactChannel =>
        c !== null && typeof c === "object" && typeof (c as ContactChannel).label === "string"
    )
    .map((c) => ({ ...c, kind: pickChannelKind(c.kind as string) }));

  return {
    heroImage: get("contact_hero_image"),
    heroEyebrow: get("contact_hero_eyebrow"),
    heroTitlePre: get("contact_hero_title_pre"),
    heroTitleEm: get("contact_hero_title_em"),
    heroTitlePost: get("contact_hero_title_post"),
    heroDescription: get("contact_hero_description"),

    channels,
  };
}
