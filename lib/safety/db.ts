import { mkdirSync } from "node:fs";
import path from "node:path";
import { scryptSync, randomBytes } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import {
  DEFAULT_SAFETY_NEWS,
  DEFAULT_SAFETY_PAGES,
  DEFAULT_SAFETY_SERVICES,
  DEFAULT_SAFETY_SETTINGS,
  DEFAULT_SAFETY_TRAINING,
} from "./defaults";

type CountRow = { count: number };

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = process.env.SAFETY_DB_PATH ?? path.join(DATA_DIR, "safety.db");

const globalForSafetyDb = globalThis as typeof globalThis & {
  __safetyDb?: DatabaseSync;
};

export function getDb() {
  if (!globalForSafetyDb.__safetyDb) {
    mkdirSync(DATA_DIR, { recursive: true });
    const db = new DatabaseSync(DB_PATH);
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec("PRAGMA journal_mode = WAL;");
    migrate(db);
    seed(db);
    globalForSafetyDb.__safetyDb = db;
  }

  return globalForSafetyDb.__safetyDb;
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function ensureColumn(db: DatabaseSync, table: string, column: string, ddl: string) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[];
  if (columns.some((c) => c.name === column)) return;
  db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
}

function migrate(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS safety_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      hero_tag TEXT NOT NULL DEFAULT '',
      hero_title TEXT NOT NULL DEFAULT '',
      hero_highlight TEXT NOT NULL DEFAULT '',
      hero_description TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      section_tag TEXT NOT NULL DEFAULT '',
      section_title TEXT NOT NULL DEFAULT '',
      section_highlight TEXT NOT NULL DEFAULT '',
      section_description TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      secondary_body TEXT NOT NULL DEFAULT '',
      visual_image TEXT NOT NULL DEFAULT '',
      primary_button_text TEXT NOT NULL DEFAULT '',
      primary_button_href TEXT NOT NULL DEFAULT '',
      secondary_button_text TEXT NOT NULL DEFAULT '',
      secondary_button_href TEXT NOT NULL DEFAULT '',
      extra_json TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS safety_news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT '',
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS safety_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      icon TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '#e67e22',
      active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS safety_training (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      duration TEXT NOT NULL DEFAULT '',
      level TEXT NOT NULL DEFAULT '',
      icon TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '#27ae60',
      bg_color TEXT NOT NULL DEFAULT '#e8f8f0',
      active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS safety_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS safety_admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS safety_admin_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES safety_admin_users(id) ON DELETE CASCADE
    );
  `);

  ensureColumn(db, "safety_news", "body", "TEXT NOT NULL DEFAULT ''");
}

function seed(db: DatabaseSync) {
  const pageCount = db.prepare("SELECT COUNT(*) AS count FROM safety_pages").get() as CountRow;
  if (pageCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO safety_pages (
        slug, name, hero_tag, hero_title, hero_highlight, hero_description, hero_image,
        section_tag, section_title, section_highlight, section_description, body,
        secondary_body, visual_image, primary_button_text, primary_button_href,
        secondary_button_text, secondary_button_href, extra_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    DEFAULT_SAFETY_PAGES.forEach((page) => {
      insert.run(
        page.slug,
        page.name,
        page.hero_tag,
        page.hero_title,
        page.hero_highlight,
        page.hero_description,
        page.hero_image,
        page.section_tag,
        page.section_title,
        page.section_highlight,
        page.section_description,
        page.body,
        page.secondary_body,
        page.visual_image,
        page.primary_button_text,
        page.primary_button_href,
        page.secondary_button_text,
        page.secondary_button_href,
        page.extra_json
      );
    });
  }

  const newsCount = db.prepare("SELECT COUNT(*) AS count FROM safety_news").get() as CountRow;
  if (newsCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO safety_news (date, category, title, description, image, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    DEFAULT_SAFETY_NEWS.forEach((item, index) => {
      insert.run(item.date, item.category, item.title, item.description, item.image, index + 1);
    });
  }

  const serviceCount = db.prepare("SELECT COUNT(*) AS count FROM safety_services").get() as CountRow;
  if (serviceCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO safety_services (title, description, icon, color, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `);

    DEFAULT_SAFETY_SERVICES.forEach((item, index) => {
      insert.run(item.title, item.description, item.icon, item.color, index + 1);
    });
  }

  const trainingCount = db.prepare("SELECT COUNT(*) AS count FROM safety_training").get() as CountRow;
  if (trainingCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO safety_training (title, description, duration, level, icon, color, bg_color, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    DEFAULT_SAFETY_TRAINING.forEach((item, index) => {
      insert.run(
        item.title,
        item.description,
        item.duration,
        item.level,
        item.icon,
        item.color,
        item.bg_color,
        index + 1
      );
    });
  }

  const settingCount = db.prepare("SELECT COUNT(*) AS count FROM safety_settings").get() as CountRow;
  if (settingCount.count === 0) {
    const insert = db.prepare("INSERT INTO safety_settings (key, value) VALUES (?, ?)");
    Object.entries(DEFAULT_SAFETY_SETTINGS).forEach(([key, value]) => insert.run(key, value));
  }

  const userCount = db.prepare("SELECT COUNT(*) AS count FROM safety_admin_users").get() as CountRow;
  if (userCount.count === 0) {
    const username = process.env.SAFETY_ADMIN_USERNAME ?? "admin";
    const password = process.env.SAFETY_ADMIN_PASSWORD ?? "admin123";
    db.prepare("INSERT INTO safety_admin_users (username, password_hash) VALUES (?, ?)").run(
      username,
      hashPassword(password)
    );
  }
}
