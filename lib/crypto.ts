import crypto from "node:crypto";

const ALGO = "aes-256-gcm";

function key(): Buffer {
  const raw = process.env.SETTINGS_ENC_KEY;
  if (!raw) throw new Error("SETTINGS_ENC_KEY env var is missing");
  const buf = Buffer.from(raw, "base64");
  if (buf.length !== 32) throw new Error("SETTINGS_ENC_KEY must decode to 32 bytes (use `openssl rand -base64 32`)");
  return buf;
}

export function encrypt(plain: string): string {
  if (!plain) return "";
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, key(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64");
}

export function decrypt(packed: string): string {
  if (!packed) return "";
  const buf = Buffer.from(packed, "base64");
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const enc = buf.subarray(28);
  const decipher = crypto.createDecipheriv(ALGO, key(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}
