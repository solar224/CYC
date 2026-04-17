const allowedNodeEnvs = new Set(["development", "test", "production"]);

function createRuntimeEnvSource() {
  return {
    name: "runtime.__APP_ENV__",
    read(key) {
      if (typeof window === "undefined") return undefined;
      const runtimeEnv = window.__APP_ENV__;
      if (!runtimeEnv || typeof runtimeEnv !== "object") return undefined;
      return runtimeEnv[key];
    },
  };
}

function createProcessEnvSource() {
  return {
    name: "process.env",
    read(key) {
      if (typeof process === "undefined" || !process.env) return undefined;
      return process.env[key];
    },
  };
}

const envSources = [
  createRuntimeEnvSource(),
  createProcessEnvSource(),
];

function buildEnvCandidateKeys(name) {
  return [name, `REACT_APP_${name}`];
}

function readRawEnv(name) {
  const keys = buildEnvCandidateKeys(name);
  for (const key of keys) {
    for (const source of envSources) {
      const value = source.read(key);
      if (value !== undefined && value !== null && value !== "") {
        return String(value);
      }
    }
  }
  return undefined;
}

function readEnvString(name, fallback = "") {
  const value = readRawEnv(name);
  if (value === undefined) {
    return fallback;
  }
  return value;
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

