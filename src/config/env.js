const knownNodeEnvs = new Set(["development", "test", "production"]);

function readBuildEnv(name, fallback = "") {
  const env = typeof process !== "undefined" ? process.env || {} : {};
  const direct = env[name];
  const prefixed = env[`REACT_APP_${name}`];
  const value = direct ?? prefixed;
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
  if (!normalized) return "development";

  // Allow custom environments (e.g., staging, qa) while preserving common defaults.
  if (!knownNodeEnvs.has(normalized) && typeof console !== "undefined") {
    console.warn(`Using custom NODE_ENV: "${normalized}".`);
  }
  return normalized;
}

const NODE_ENV = parseNodeEnv(readBuildEnv("NODE_ENV", "development"));
const PUBLIC_URL = normalizePublicUrl(readBuildEnv("PUBLIC_URL", ""));

export const ENV = Object.freeze({
  PUBLIC_URL,
  NODE_ENV,
});

