import { createHash, randomBytes, timingSafeEqual, scryptSync } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "./db";

export const SAFETY_SESSION_COOKIE = "safety_admin_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type AdminUser = {
  id: number;
  username: string;
  password_hash: string;
};

type SessionUser = {
  id: number;
  username: string;
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
    .prepare("SELECT * FROM safety_admin_users WHERE username = ?")
    .get(username) as AdminUser | undefined;
}

export async function createAdminSession(userId: number) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashToken(token);
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;

  getDb()
    .prepare("INSERT INTO safety_admin_sessions (user_id, token_hash, expires_at) VALUES (?, ?, ?)")
    .run(userId, tokenHash, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set(SAFETY_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/safety/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SAFETY_SESSION_COOKIE)?.value;
  if (!token) return null;

  const user = getDb()
    .prepare(
      `
      SELECT u.id, u.username
      FROM safety_admin_sessions s
      JOIN safety_admin_users u ON u.id = s.user_id
      WHERE s.token_hash = ? AND CAST(s.expires_at AS INTEGER) > ?
      LIMIT 1
    `
    )
    .get(hashToken(token), Date.now()) as SessionUser | undefined;

  return user ?? null;
}

export async function requireAdmin() {
  const user = await getCurrentAdmin();
  if (!user) redirect("/safety/admin/login");
  return user;
}

export async function destroyCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SAFETY_SESSION_COOKIE)?.value;

  if (token) {
    getDb().prepare("DELETE FROM safety_admin_sessions WHERE token_hash = ?").run(hashToken(token));
  }

  cookieStore.delete({ name: SAFETY_SESSION_COOKIE, path: "/safety/admin" });
}
