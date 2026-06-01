import { createHash, randomBytes, timingSafeEqual, scryptSync } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "./db";

export const RE_SESSION_COOKIE = "real_estate_admin_session";

// 8 hours — short enough that the expiry timer in the sidebar is meaningful.
export const RE_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

type AdminUserRow = {
  id: number;
  username: string;
  password_hash: string;
};

type SessionRow = {
  id: number;
  username: string;
  expires_at: number;
};

export type CurrentAdmin = {
  id: number;
  username: string;
  /** Unix milliseconds when the cookie + DB session will expire. */
  expiresAt: number;
};

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, expected] = storedHash.split("$");
  if (scheme !== "scrypt" || !salt || !expected) return false;

  const actual = scryptSync(password, salt, 64);
  const expectedBuffer = Buffer.from(expected, "hex");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export function findAdminByUsername(username: string) {
  return getDb()
    .prepare("SELECT * FROM re_admin_users WHERE username = ?")
    .get(username) as AdminUserRow | undefined;
}

export async function createAdminSession(userId: number) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const expiresAt = Date.now() + RE_SESSION_MAX_AGE_SECONDS * 1000;

  getDb()
    .prepare("INSERT INTO re_admin_sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)")
    .run(userId, tokenHash, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set(RE_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/real-estate/admin",
    maxAge: RE_SESSION_MAX_AGE_SECONDS,
  });
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(RE_SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = getDb()
    .prepare(
      `
      SELECT u.id, u.username, s.expires_at
      FROM re_admin_sessions s
      JOIN re_admin_users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND CAST(s.expires_at AS INTEGER) > ?
      LIMIT 1
    `
    )
    .get(hashToken(token), Date.now()) as SessionRow | undefined;

  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    expiresAt: Number(row.expires_at),
  };
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const user = await getCurrentAdmin();
  if (!user) redirect("/real-estate/admin/login");
  return user;
}

export async function destroyCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(RE_SESSION_COOKIE)?.value;

  if (token) {
    getDb().prepare("DELETE FROM re_admin_sessions WHERE token_hash = ?").run(hashToken(token));
  }

  cookieStore.delete({ name: RE_SESSION_COOKIE, path: "/real-estate/admin" });
}
