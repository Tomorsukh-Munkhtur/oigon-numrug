import { mkdirSync } from "node:fs";
import path from "node:path";
import { scryptSync, randomBytes } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import {
  DEFAULT_RE_HOME_SETTINGS,
  DEFAULT_RE_PROJECTS,
} from "./defaults";

type CountRow = { count: number };

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = process.env.REAL_ESTATE_DB_PATH ?? path.join(DATA_DIR, "real-estate.db");

const globalForRealEstateDb = globalThis as typeof globalThis & {
  __realEstateDb?: DatabaseSync;
};

export function getDb() {
  if (!globalForRealEstateDb.__realEstateDb) {
    mkdirSync(DATA_DIR, { recursive: true });
    const db = new DatabaseSync(DB_PATH);
    db.exec("PRAGMA foreign_keys = ON;");
    db.exec("PRAGMA journal_mode = WAL;");
    migrate(db);
    seed(db);
    globalForRealEstateDb.__realEstateDb = db;
  }

  return globalForRealEstateDb.__realEstateDb;
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function migrate(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS re_projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT '',
      price TEXT NOT NULL DEFAULT '',
      size TEXT NOT NULL DEFAULT '',
      summary TEXT NOT NULL DEFAULT '',
      long_description TEXT NOT NULL DEFAULT '',
      developer TEXT NOT NULL DEFAULT '',
      completion TEXT NOT NULL DEFAULT '',
      floors TEXT NOT NULL DEFAULT '',
      units TEXT NOT NULL DEFAULT '',
      parking TEXT NOT NULL DEFAULT '',
      extra_json TEXT NOT NULL DEFAULT '{}',
      published INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS re_admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS re_page_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS re_admin_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES re_admin_users(id) ON DELETE CASCADE
    );
  `);
}

function seed(db: DatabaseSync) {
  const projCount = db.prepare("SELECT COUNT(*) AS count FROM re_projects").get() as CountRow;
  if (projCount.count === 0) {
    const insert = db.prepare(`
      INSERT INTO re_projects (
        id, title, type, location, image, status, price, size, summary,
        long_description, developer, completion, floors, units, parking,
        extra_json, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    DEFAULT_RE_PROJECTS.forEach((p, idx) => {
      insert.run(
        p.id,
        p.title,
        p.type,
        p.location,
        p.image,
        p.status,
        p.price,
        p.size ?? "",
        p.summary ?? "",
        p.longDescription ?? "",
        p.developer ?? "",
        p.completion ?? "",
        p.floors ?? "",
        p.units ?? "",
        p.parking ?? "",
        JSON.stringify({
          highlights: p.highlights ?? [],
          amenities: p.amenities ?? [],
          gallery: p.gallery ?? [],
          floorPlans: p.floorPlans ?? [],
        }),
        idx + 1
      );
    });
  }

  const insertSetting = db.prepare(`
    INSERT INTO re_page_settings (key, value, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(key) DO NOTHING
  `);
  Object.entries(DEFAULT_RE_HOME_SETTINGS).forEach(([key, value]) => {
    insertSetting.run(key, value);
  });

  const userCount = db.prepare("SELECT COUNT(*) AS count FROM re_admin_users").get() as CountRow;
  if (userCount.count === 0) {
    const username = process.env.REAL_ESTATE_ADMIN_USERNAME ?? "admin";
    const password = process.env.REAL_ESTATE_ADMIN_PASSWORD ?? "admin123";
    db.prepare("INSERT INTO re_admin_users (username, password_hash) VALUES (?, ?)").run(
      username,
      hashPassword(password)
    );
  }
}
