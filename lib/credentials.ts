import crypto from "node:crypto";

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789"; // no 0/O/1/l/I confusion

function token(length: number): string {
  const bytes = crypto.randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

export function generateIptvCredentials(): { username: string; password: string } {
  return {
    username: `slx${token(7)}`,    // 10 chars total, prefix makes them recognizable
    password: token(12),
  };
}
