"use server";

import { mkdirSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DEFAULT_SAFETY_SETTINGS } from "@/lib/safety/defaults";
import { getDb, hashPassword } from "@/lib/safety/db";
import {
  createAdminSession,
  destroyCurrentSession,
  findAdminByUsername,
  requireAdmin,
  verifyPassword,
} from "@/lib/safety/auth";
import {
  getSafetyNews,
  getSafetyService,
  getSafetySettings,
} from "@/lib/safety/content";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "safety");
const PUBLIC_UPLOAD_DIR = "/uploads/safety";
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

async function saveUploadedImage(value: FormDataEntryValue | null, prefix: string) {
  if (!(value instanceof File) || value.size === 0) return "";
  if (!value.type.startsWith("image/")) {
    throw new Error("Зөвхөн зураг файл upload хийнэ.");
  }

  mkdirSync(UPLOAD_DIR, { recursive: true });
  const originalExt = path.extname(value.name).toLowerCase();
  const ext = IMAGE_EXTENSIONS.has(originalExt) ? originalExt : ".jpg";
  const filename = `${prefix}-${Date.now()}-${randomBytes(4).toString("hex")}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  const bytes = Buffer.from(await value.arrayBuffer());

  await writeFile(filepath, bytes);

  return `${PUBLIC_UPLOAD_DIR}/${filename}`;
}

async function imageValue(
  formData: FormData,
  textField: string,
  fileField: string,
  fallback = ""
) {
  const uploaded = await saveUploadedImage(formData.get(fileField), textField);
  return uploaded || text(formData, textField) || fallback;
}

function revalidateSafety() {
  ["/safety", "/safety/news", "/safety/about", "/safety/services", "/safety/training", "/safety/contact"].forEach(
    (route) => revalidatePath(route)
  );
  revalidatePath("/safety", "layout");
}

export async function loginAction(formData: FormData) {
  const username = text(formData, "username");
  const password = text(formData, "password");
  const user = findAdminByUsername(username);

  if (!user || !verifyPassword(password, user.password_hash)) {
    redirect("/safety/admin/login?error=1");
  }

  await createAdminSession(user.id);
  redirect("/safety/admin");
}

export async function logoutAction() {
  await destroyCurrentSession();
  redirect("/safety/admin/login");
}

export async function updateAdminPassword(formData: FormData) {
  const user = await requireAdmin();
  const password = text(formData, "new_password");
  const confirm = text(formData, "confirm_password");

  if (password.length < 8 || password !== confirm) {
    redirect("/safety/admin/settings?passwordError=1");
  }

  getDb()
    .prepare("UPDATE safety_admin_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .run(hashPassword(password), user.id);
  getDb().prepare("DELETE FROM safety_admin_sessions WHERE user_id = ?").run(user.id);

  await destroyCurrentSession();
  redirect("/safety/admin/login?passwordChanged=1");
}

export async function updatePageContent(slug: string, formData: FormData) {
  await requireAdmin();

  const current = getDb().prepare("SELECT * FROM safety_pages WHERE slug = ?").get(slug) as
    | { hero_image: string; visual_image: string }
    | undefined;

  let extra: Record<string, unknown> = {};
  if (slug === "home") {
    extra = {
      weatherIcon: text(formData, "weatherIcon"),
      weatherCity: text(formData, "weatherCity"),
      weatherTemp: text(formData, "weatherTemp"),
      weatherCondition: text(formData, "weatherCondition"),
      weatherWind: text(formData, "weatherWind"),
      weatherHumidity: text(formData, "weatherHumidity"),
    };
  }

  if (slug === "about") {
    extra = {
      features: splitLines(text(formData, "features")),
    };
  }

  getDb()
    .prepare(
      `
      UPDATE safety_pages
      SET
        hero_tag = ?,
        hero_title = ?,
        hero_highlight = ?,
        hero_description = ?,
        hero_image = ?,
        section_tag = ?,
        section_title = ?,
        section_highlight = ?,
        section_description = ?,
        body = ?,
        visual_image = ?,
        primary_button_text = ?,
        primary_button_href = ?,
        extra_json = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE slug = ?
    `
    )
    .run(
      text(formData, "hero_tag"),
      text(formData, "hero_title"),
      text(formData, "hero_highlight"),
      text(formData, "hero_description"),
      await imageValue(formData, "hero_image", "hero_image_file", current?.hero_image),
      text(formData, "section_tag"),
      text(formData, "section_title"),
      text(formData, "section_highlight"),
      text(formData, "section_description"),
      text(formData, "body"),
      await imageValue(formData, "visual_image", "visual_image_file", current?.visual_image),
      text(formData, "primary_button_text"),
      text(formData, "primary_button_href"),
      JSON.stringify(extra),
      slug
    );

  revalidateSafety();
  redirect(`/safety/admin/pages/${slug}?saved=1`);
}

export async function updateSettings(formData: FormData) {
  await requireAdmin();
  const current = getSafetySettings();
  const statement = getDb().prepare(`
    INSERT INTO safety_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
  `);

  for (const key of Object.keys(DEFAULT_SAFETY_SETTINGS)) {
    let value = text(formData, key);
    if (key === "nav_logo") {
      value = (await imageValue(formData, "nav_logo", "nav_logo_file", current.nav_logo)) || value;
    }
    if (key === "footer_logo") {
      value = (await imageValue(formData, "footer_logo", "footer_logo_file", current.footer_logo)) || value;
    }
    statement.run(key, value);
  }

  revalidateSafety();
  redirect("/safety/admin/settings?saved=1");
}

export async function saveNews(id: string, formData: FormData) {
  await requireAdmin();

  const isNew = id === "new";
  const existing = isNew ? undefined : getSafetyNews(Number(id));
  const image = await imageValue(formData, "image", "image_file", existing?.image);

  if (isNew) {
    const result = getDb()
      .prepare(
        `
        INSERT INTO safety_news (date, category, title, description, body, image, published, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `
      )
      .run(
        text(formData, "date"),
        text(formData, "category"),
        text(formData, "title"),
        text(formData, "description"),
        text(formData, "body"),
        image,
        boolValue(formData, "published"),
        intValue(formData, "sort_order")
      );

    revalidateSafety();
    redirect(`/safety/admin/news/${String(result.lastInsertRowid)}?saved=1`);
  }

  getDb()
    .prepare(
      `
      UPDATE safety_news
      SET date = ?, category = ?, title = ?, description = ?, body = ?, image = ?,
          published = ?, sort_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    )
    .run(
      text(formData, "date"),
      text(formData, "category"),
      text(formData, "title"),
      text(formData, "description"),
      text(formData, "body"),
      image,
      boolValue(formData, "published"),
      intValue(formData, "sort_order"),
      Number(id)
    );

  revalidateSafety();
  redirect(`/safety/admin/news/${id}?saved=1`);
}

export async function deleteNews(id: number) {
  await requireAdmin();
  getDb().prepare("DELETE FROM safety_news WHERE id = ?").run(id);
  revalidateSafety();
  redirect("/safety/admin/news");
}

export async function saveService(id: string, formData: FormData) {
  await requireAdmin();

  if (id === "new") {
    const result = getDb()
      .prepare(
        `
        INSERT INTO safety_services (title, description, icon, color, active, sort_order)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      )
      .run(
        text(formData, "title"),
        text(formData, "description"),
        text(formData, "icon"),
        text(formData, "color") || "#e67e22",
        boolValue(formData, "active"),
        intValue(formData, "sort_order")
      );

    revalidateSafety();
    redirect(`/safety/admin/services/${String(result.lastInsertRowid)}?saved=1`);
  }

  const existing = getSafetyService(Number(id));
  if (!existing) redirect("/safety/admin/services");

  getDb()
    .prepare(
      `
      UPDATE safety_services
      SET title = ?, description = ?, icon = ?, color = ?, active = ?,
          sort_order = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    )
    .run(
      text(formData, "title"),
      text(formData, "description"),
      text(formData, "icon"),
      text(formData, "color") || "#e67e22",
      boolValue(formData, "active"),
      intValue(formData, "sort_order"),
      Number(id)
    );

  revalidateSafety();
  redirect(`/safety/admin/services/${id}?saved=1`);
}

export async function deleteService(id: number) {
  await requireAdmin();
  getDb().prepare("DELETE FROM safety_services WHERE id = ?").run(id);
  revalidateSafety();
  redirect("/safety/admin/services");
}
