import { getDb } from "./db";

export type SafetyPageSlug = "home" | "news" | "about" | "services" | "training" | "contact";

export type SafetyPageContent = {
  id: number;
  slug: SafetyPageSlug;
  name: string;
  hero_tag: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  hero_image: string;
  section_tag: string;
  section_title: string;
  section_highlight: string;
  section_description: string;
  body: string;
  secondary_body: string;
  visual_image: string;
  primary_button_text: string;
  primary_button_href: string;
  secondary_button_text: string;
  secondary_button_href: string;
  extra_json: string;
};

export type SafetyNews = {
  id: number;
  date: string;
  category: string;
  title: string;
  description: string;
  body: string;
  image: string;
  published: number;
  sort_order: number;
};

export type SafetyService = {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  active: number;
  sort_order: number;
};

export type SafetyTraining = {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  icon: string;
  color: string;
  bg_color: string;
  active: number;
  sort_order: number;
};

export function listSafetyPages() {
  return getDb()
    .prepare("SELECT * FROM safety_pages ORDER BY id ASC")
    .all() as SafetyPageContent[];
}

export function getSafetyPage(slug: SafetyPageSlug) {
  const page = getDb().prepare("SELECT * FROM safety_pages WHERE slug = ?").get(slug) as
    | SafetyPageContent
    | undefined;

  if (!page) {
    throw new Error(`Safety page content not found: ${slug}`);
  }

  return page;
}

export function listSafetyNews(options: { limit?: number; includeUnpublished?: boolean } = {}) {
  const where = options.includeUnpublished ? "" : "WHERE published = 1";
  const limit = options.limit ? "LIMIT ?" : "";
  const params = options.limit ? [options.limit] : [];

  return getDb()
    .prepare(
      `SELECT * FROM safety_news ${where} ORDER BY sort_order ASC, date DESC, id DESC ${limit}`
    )
    .all(...params) as SafetyNews[];
}

export function getSafetyNews(id: number) {
  return getDb().prepare("SELECT * FROM safety_news WHERE id = ?").get(id) as SafetyNews | undefined;
}

export function listSafetyServices(includeInactive = false) {
  const where = includeInactive ? "" : "WHERE active = 1";
  return getDb()
    .prepare(`SELECT * FROM safety_services ${where} ORDER BY sort_order ASC, id ASC`)
    .all() as SafetyService[];
}

export function getSafetyService(id: number) {
  return getDb()
    .prepare("SELECT * FROM safety_services WHERE id = ?")
    .get(id) as SafetyService | undefined;
}

export function listSafetyTraining(includeInactive = false) {
  const where = includeInactive ? "" : "WHERE active = 1";
  return getDb()
    .prepare(`SELECT * FROM safety_training ${where} ORDER BY sort_order ASC, id ASC`)
    .all() as SafetyTraining[];
}

export function getSafetyTraining(id: number) {
  return getDb()
    .prepare("SELECT * FROM safety_training WHERE id = ?")
    .get(id) as SafetyTraining | undefined;
}

export function getSafetySettings() {
  const rows = getDb()
    .prepare("SELECT key, value FROM safety_settings ORDER BY key ASC")
    .all() as { key: string; value: string }[];

  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}

export function parseExtra<T>(page: SafetyPageContent, fallback: T): T {
  try {
    return { ...fallback, ...(JSON.parse(page.extra_json) as Partial<T>) };
  } catch {
    return fallback;
  }
}

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
