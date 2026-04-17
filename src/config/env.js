const allowedNodeEnvs = new Set(["development", "test", "production"]);

function readEnvString(name, fallback = "") {
  const value = process.env[name];
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  return String(value);
}

function normalizePublicUrl(value) {
  if (!value) return "";

  const trimmed = value.trim();
  const isAbsoluteUrl = /^https?:\/\//i.test(trimmed);
  const isAbsolutePath = trimmed.startsWith("/");

  if (!isAbsoluteUrl && !isAbsolutePath) {
    throw new Error(
      `Invalid PUBLIC_URL: "${trimmed}". Use "/repo-name" or a full URL.`
    );
  }

  if (trimmed !== "/" && trimmed.endsWith("/")) {
    return trimmed.slice(0, -1);
  }

  return trimmed;
}

function parseNodeEnv(value) {
  const normalized = value.trim().toLowerCase();
  if (!allowedNodeEnvs.has(normalized)) {
    throw new Error(
      `Invalid NODE_ENV: "${value}". Expected development, test, or production.`
    );
  }
  return normalized;
}

const NODE_ENV = parseNodeEnv(readEnvString("NODE_ENV", "development"));
const PUBLIC_URL = normalizePublicUrl(readEnvString("PUBLIC_URL", ""));

export const ENV = Object.freeze({
  PUBLIC_URL,
  NODE_ENV,
});

