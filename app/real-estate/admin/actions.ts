"use server";

import { mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyCurrentSession,
  findAdminByUsername,
  requireAdmin,
  verifyPassword,
} from "@/lib/real-estate/auth";
import { getDb, hashPassword } from "@/lib/real-estate/db";
import {
  getProject,
  RE_HOME_SETTING_KEYS,
  RE_ABOUT_SETTING_KEYS,
  RE_SERVICES_SETTING_KEYS,
  RE_CONTACT_SETTING_KEYS,
  getHomeSettings,
  getAboutSettings,
  getServicesSettings,
  getContactSettings,
} from "@/lib/real-estate/content";
import {
  RE_UPLOAD_DIR,
  RE_PUBLIC_UPLOAD_DIR,
} from "@/lib/real-estate/uploads";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function intValue(formData: FormData, name: string, fallback = 0) {
  const value = Number.parseInt(text(formData, name), 10);
  return Number.isFinite(value) ? value : fallback;
}

function boolValue(formData: FormData, name: string) {
  return formData.get(name) === "on" ? 1 : 0;
}

function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || `item-${Date.now()}`;
}

async function saveUploadedImage(value: FormDataEntryValue | null, prefix: string) {
  if (!(value instanceof File) || value.size === 0) return "";
  if (!value.type.startsWith("image/")) {
    throw new Error("Зөвхөн зураг файл upload хийнэ.");
  }

  mkdirSync(RE_UPLOAD_DIR, { recursive: true });
  const originalExt = path.extname(value.name).toLowerCase();
  const ext = IMAGE_EXTENSIONS.has(originalExt) ? originalExt : ".jpg";
  const filename = `${prefix}-${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
  const filepath = path.join(RE_UPLOAD_DIR, filename);
  const bytes = Buffer.from(await value.arrayBuffer());
  await writeFile(filepath, bytes);
  return `${RE_PUBLIC_UPLOAD_DIR}/${filename}`;
}

async function imageValue(
  formData: FormData,
  textField: string,
  fileField: string,
  fallback = ""
) {
  const uploaded = await saveUploadedImage(formData.get(fileField), textField);
  if (uploaded) return uploaded;
  const raw = text(formData, textField);
  if (raw === "__CLEAR__") return "";
  return raw || fallback;
}

function revalidateRealEstate() {
  [
    "/real-estate",
    "/real-estate/projects",
    "/real-estate/about",
    "/real-estate/services",
    "/real-estate/contact",
  ].forEach((route) => revalidatePath(route));
  revalidatePath("/real-estate", "layout");
}

// ---------- Auth ----------

export async function loginAction(formData: FormData) {
  const username = text(formData, "username");
  const password = text(formData, "password");
  const user = findAdminByUsername(username);

  if (!user || !verifyPassword(password, user.password_hash)) {
    redirect("/real-estate/admin/login?error=1");
  }

  await createAdminSession(user.id);
  redirect("/real-estate/admin");
}

export async function logoutAction() {
  await destroyCurrentSession();
  redirect("/real-estate/admin/login");
}

export async function updateAdminPassword(formData: FormData) {
  const user = await requireAdmin();
  const password = text(formData, "new_password");
  const confirm = text(formData, "confirm_password");

  if (password.length < 8 || password !== confirm) {
    redirect("/real-estate/admin/settings?passwordError=1");
  }

  getDb()
    .prepare(
      "UPDATE re_admin_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    )
    .run(hashPassword(password), user.id);
  getDb().prepare("DELETE FROM re_admin_sessions WHERE user_id = ?").run(user.id);

  await destroyCurrentSession();
  redirect("/real-estate/admin/login?passwordChanged=1");
}

// ---------- Contact settings ----------

const CONTACT_CHANNEL_SLOTS = 6;

function pickChannelKindSafe(v: string): "phone" | "email" | "location" {
  return v === "email" || v === "location" ? v : "phone";
}

export async function saveContactSettings(formData: FormData) {
  await requireAdmin();
  const current = getContactSettings();

  const upsert = getDb().prepare(`
    INSERT INTO re_page_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  // Channels — N slots × { kind, label, value, detail, href, cta }
  const channels: Array<{
    kind: "phone" | "email" | "location";
    label: string;
    value: string;
    detail: string;
    href: string;
    cta: string;
  }> = [];
  for (let i = 1; i <= CONTACT_CHANNEL_SLOTS; i++) {
    const label = text(formData, `contact_channel_${i}_label`);
    const value = text(formData, `contact_channel_${i}_value`);
    const detail = text(formData, `contact_channel_${i}_detail`);
    const href = text(formData, `contact_channel_${i}_href`);
    const cta = text(formData, `contact_channel_${i}_cta`);
    const kind = pickChannelKindSafe(text(formData, `contact_channel_${i}_kind`));
    if (label || value || detail || href || cta) {
      channels.push({ kind, label, value, detail, href, cta });
    }
  }

  for (const key of RE_CONTACT_SETTING_KEYS) {
    let value: string;

    if (key === "contact_hero_image") {
      value = await imageValue(
        formData,
        "contact_hero_image",
        "contact_hero_image_file",
        current.heroImage
      );
    } else if (key === "contact_channels_json") {
      value = JSON.stringify(channels);
    } else {
      value = text(formData, key);
    }

    upsert.run(key, value);
  }

  revalidatePath("/real-estate/contact");
  revalidatePath("/real-estate", "layout");
  redirect("/real-estate/admin/contact?saved=1");
}

// ---------- Services settings ----------

const SERVICES_ITEM_SLOTS = 8;
const SERVICES_PROCESS_SLOTS = 8;

export async function saveServicesSettings(formData: FormData) {
  await requireAdmin();
  const current = getServicesSettings();

  const upsert = getDb().prepare(`
    INSERT INTO re_page_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  // Service cards — N slots × { title, description, points (newline list) }
  const items: { title: string; description: string; points: string[] }[] = [];
  for (let i = 1; i <= SERVICES_ITEM_SLOTS; i++) {
    const title = text(formData, `services_item_${i}_title`);
    const description = text(formData, `services_item_${i}_description`);
    const points = splitLines(text(formData, `services_item_${i}_points`));
    if (title || description || points.length > 0) {
      items.push({ title, description, points });
    }
  }

  // Process steps — N slots × { step, title, body }
  const processSteps: { step: string; title: string; body: string }[] = [];
  for (let i = 1; i <= SERVICES_PROCESS_SLOTS; i++) {
    const step = text(formData, `services_process_${i}_step`);
    const title = text(formData, `services_process_${i}_title`);
    const body = text(formData, `services_process_${i}_body`);
    if (step || title || body) {
      processSteps.push({ step, title, body });
    }
  }

  for (const key of RE_SERVICES_SETTING_KEYS) {
    let value: string;

    if (key === "services_hero_image") {
      value = await imageValue(
        formData,
        "services_hero_image",
        "services_hero_image_file",
        current.heroImage
      );
    } else if (key === "services_list_json") {
      value = JSON.stringify(items);
    } else if (key === "services_process_json") {
      value = JSON.stringify(processSteps);
    } else {
      value = text(formData, key);
    }

    upsert.run(key, value);
  }

  revalidatePath("/real-estate/services");
  revalidatePath("/real-estate", "layout");
  redirect("/real-estate/admin/services?saved=1");
}

// ---------- About settings ----------

const ABOUT_VALUE_SLOTS = 6;
const ABOUT_CHECK_SLOTS = 6;
const ABOUT_MILESTONE_SLOTS = 8;

export async function saveAboutSettings(formData: FormData) {
  await requireAdmin();
  const current = getAboutSettings();

  const upsert = getDb().prepare(`
    INSERT INTO re_page_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  // Mission checklist — collect non-empty entries from N slots.
  const checklist: string[] = [];
  for (let i = 1; i <= ABOUT_CHECK_SLOTS; i++) {
    const v = text(formData, `about_check_${i}`);
    if (v) checklist.push(v);
  }

  // Values — N slots of {title, body}.
  const values: { title: string; body: string }[] = [];
  for (let i = 1; i <= ABOUT_VALUE_SLOTS; i++) {
    const title = text(formData, `about_value_${i}_title`);
    const body = text(formData, `about_value_${i}_body`);
    if (title || body) values.push({ title, body });
  }

  // Milestones — N slots of {year, text}.
  const milestones: { year: string; text: string }[] = [];
  for (let i = 1; i <= ABOUT_MILESTONE_SLOTS; i++) {
    const year = text(formData, `about_milestone_${i}_year`);
    const txt = text(formData, `about_milestone_${i}_text`);
    if (year || txt) milestones.push({ year, text: txt });
  }

  for (const key of RE_ABOUT_SETTING_KEYS) {
    let value: string;

    if (key === "about_hero_image") {
      value = await imageValue(
        formData,
        "about_hero_image",
        "about_hero_image_file",
        current.heroImage
      );
    } else if (key === "about_mission_checklist_json") {
      value = JSON.stringify(checklist);
    } else if (key === "about_values_json") {
      value = JSON.stringify(values);
    } else if (key === "about_milestones_json") {
      value = JSON.stringify(milestones);
    } else {
      value = text(formData, key);
    }

    upsert.run(key, value);
  }

  revalidatePath("/real-estate/about");
  revalidatePath("/real-estate", "layout");
  redirect("/real-estate/admin/about?saved=1");
}

// ---------- Projects ----------

export async function saveProject(id: string, formData: FormData) {
  await requireAdmin();

  const isNew = id === "new";
  const existing = isNew ? null : getProject(id);
  const image = await imageValue(formData, "image", "image_file", existing?.image);
  const newId = isNew ? text(formData, "id") || slugify(text(formData, "title")) : id;

  let floorPlans: Array<{
    id: string;
    label: string;
    rooms: string;
    area: string;
    image: string;
  }> = existing?.floorPlans ?? [];

  const floorPlansRaw = text(formData, "floor_plans");
  if (floorPlansRaw) {
    try {
      const parsed = JSON.parse(floorPlansRaw);
      if (Array.isArray(parsed)) {
        floorPlans = parsed
          .filter((p): p is Record<string, unknown> => p !== null && typeof p === "object")
          .map((p, idx) => ({
            id: String(p.id ?? `plan-${idx}`),
            label: String(p.label ?? ""),
            rooms: String(p.rooms ?? ""),
            area: String(p.area ?? ""),
            image: String(p.image ?? ""),
          }));

        // Per-row file uploads — replace image for any row that has a file.
        for (const plan of floorPlans) {
          const uploaded = await saveUploadedImage(
            formData.get(`floor_plan_file_${plan.id}`),
            `floorplan-${plan.id}`
          );
          if (uploaded) plan.image = uploaded;
        }

        // Drop completely empty rows.
        floorPlans = floorPlans.filter(
          (p) => p.image || p.label || p.rooms || p.area
        );
      }
    } catch {
      // ignore — keep existing
    }
  }

  // Gallery: keep the existing paths the client retained + append every
  // newly uploaded file (multiple allowed via `gallery_files`).
  const existingGallery = splitLines(text(formData, "gallery"));
  const newGalleryFiles = formData.getAll("gallery_files");
  const galleryPrefix = `gallery-${newId}`;
  for (const f of newGalleryFiles) {
    if (f instanceof File && f.size > 0) {
      const p = await saveUploadedImage(f, galleryPrefix);
      if (p) existingGallery.push(p);
    }
  }

  const extra = {
    highlights: splitLines(text(formData, "highlights")),
    amenities: splitLines(text(formData, "amenities")),
    gallery: existingGallery,
    floorPlans,
  };

  if (isNew) {
    getDb()
      .prepare(
        `
        INSERT INTO re_projects (
          id, title, type, location, image, status, price, size, summary,
          long_description, developer, completion, floors, units, parking,
          extra_json, published, sort_order
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `
      )
      .run(
        newId,
        text(formData, "title"),
        text(formData, "type"),
        text(formData, "location"),
        image,
        text(formData, "status"),
        text(formData, "price"),
        text(formData, "size"),
        text(formData, "summary"),
        text(formData, "long_description"),
        text(formData, "developer"),
        text(formData, "completion"),
        text(formData, "floors"),
        text(formData, "units"),
        text(formData, "parking"),
        JSON.stringify(extra),
        boolValue(formData, "published"),
        intValue(formData, "sort_order")
      );

    revalidateRealEstate();
    redirect(`/real-estate/admin/projects/${newId}?saved=1`);
  }

  getDb()
    .prepare(
      `
      UPDATE re_projects
      SET title = ?, type = ?, location = ?, image = ?, status = ?, price = ?,
          size = ?, summary = ?, long_description = ?, developer = ?,
          completion = ?, floors = ?, units = ?, parking = ?, extra_json = ?,
          published = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    )
    .run(
      text(formData, "title"),
      text(formData, "type"),
      text(formData, "location"),
      image,
      text(formData, "status"),
      text(formData, "price"),
      text(formData, "size"),
      text(formData, "summary"),
      text(formData, "long_description"),
      text(formData, "developer"),
      text(formData, "completion"),
      text(formData, "floors"),
      text(formData, "units"),
      text(formData, "parking"),
      JSON.stringify(extra),
      boolValue(formData, "published"),
      intValue(formData, "sort_order"),
      id
    );

  revalidateRealEstate();
  redirect(`/real-estate/admin/projects/${id}?saved=1`);
}

export async function deleteProject(id: string) {
  await requireAdmin();
  getDb().prepare("DELETE FROM re_projects WHERE id = ?").run(id);
  revalidateRealEstate();
  redirect("/real-estate/admin/projects");
}

// ---------- Home settings ----------

const HOME_MARQUEE_SLOTS = 12;
const HOME_STAT_SLOTS = 4;

export async function saveHomeSettings(formData: FormData) {
  await requireAdmin();
  const current = getHomeSettings();

  const upsert = getDb().prepare(`
    INSERT INTO re_page_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  // Marquee partner/project names — collect non-empty slot values.
  const marqueeNames: string[] = [];
  for (let i = 1; i <= HOME_MARQUEE_SLOTS; i++) {
    const v = text(formData, `home_marquee_${i}`);
    if (v) marqueeNames.push(v);
  }

  // Stats — 4 slots of {value, label}.
  const stats: { value: string; label: string }[] = [];
  for (let i = 1; i <= HOME_STAT_SLOTS; i++) {
    const value = text(formData, `home_stat_${i}_value`);
    const label = text(formData, `home_stat_${i}_label`);
    if (value || label) stats.push({ value, label });
  }

  for (const key of RE_HOME_SETTING_KEYS) {
    let value: string;

    if (key === "home_hero_image") {
      value = await imageValue(
        formData,
        "home_hero_image",
        "home_hero_image_file",
        current.heroImage
      );
    } else if (key === "home_marquee_names_json") {
      value = JSON.stringify(marqueeNames);
    } else if (key === "home_stats_json") {
      value = JSON.stringify(stats);
    } else {
      value = text(formData, key);
    }

    upsert.run(key, value);
  }

  revalidatePath("/real-estate");
  redirect("/real-estate/admin/home?saved=1");
}

