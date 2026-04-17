import { z } from "zod";

const knownNodeEnvs = new Set(["development", "test", "production"]);
const staticBuildEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PUBLIC_URL: process.env.PUBLIC_URL,
  REACT_APP_PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || process.env.API_BASE_URL,
  REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  REQUIRED_ENVS: process.env.REACT_APP_REQUIRED_ENVS || process.env.REQUIRED_ENVS,
  REACT_APP_REQUIRED_ENVS: process.env.REACT_APP_REQUIRED_ENVS,
};

function readBuildEnv(name) {
  const direct = staticBuildEnv[name];
  const prefixed = staticBuildEnv[`REACT_APP_${name}`];
  const value = direct ?? prefixed;
  if (value === undefined || value === null) {
    return undefined;
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
  if (!normalized) {
    throw new Error("NODE_ENV cannot be empty.");
  }

  if (!knownNodeEnvs.has(normalized)) {
    throw new Error(
      `Invalid NODE_ENV: "${normalized}". Allowed values: development, test, production.`
    );
  }
  return normalized;
}

function parseRequiredEnvList(value = "") {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const BuildEnvSchema = z.object({
  NODE_ENV: z.string({ required_error: "NODE_ENV is required." }).transform(parseNodeEnv),
  PUBLIC_URL: z
    .string()
    .optional()
    .transform((value) => normalizePublicUrl(value || "")),
  API_BASE_URL: z
    .string()
    .optional()
    .transform((value) => (value || "").trim())
    .refine(
      (value) => !value || /^https?:\/\//i.test(value),
      "API_BASE_URL must start with http:// or https:// when provided."
    ),
  REQUIRED_ENVS: z
    .string()
    .optional()
    .transform((value) => parseRequiredEnvList(value || "")),
});

function formatEnvIssues(issues) {
  return issues
    .map((issue) => {
      const keyPath = issue.path.length ? issue.path.join(".") : "(root)";
      return `- ${keyPath}: ${issue.message}`;
    })
    .join("\n");
}

function parseBuildEnv() {
  const rawEnv = {
    NODE_ENV: readBuildEnv("NODE_ENV") || "development",
    PUBLIC_URL: readBuildEnv("PUBLIC_URL"),
    API_BASE_URL: readBuildEnv("API_BASE_URL"),
    REQUIRED_ENVS: readBuildEnv("REQUIRED_ENVS"),
  };

  const parsed = BuildEnvSchema.safeParse(rawEnv);
  if (!parsed.success) {
    throw new Error(`Invalid environment configuration:\n${formatEnvIssues(parsed.error.issues)}`);
  }

  const requiredEnvs = [...parsed.data.REQUIRED_ENVS];
  const missingRequired = requiredEnvs.filter((name) => {
    const value = readBuildEnv(name);
    return value === undefined || value.trim() === "";
  });

  if (missingRequired.length) {
    throw new Error(
      `Missing required environment variables: ${missingRequired.join(", ")}. ` +
      "Set them via process.env or REACT_APP_ prefixed equivalents."
    );
  }

  return parsed.data;
}

const parsedEnv = parseBuildEnv();
const NODE_ENV = parsedEnv.NODE_ENV;
const PUBLIC_URL = parsedEnv.PUBLIC_URL;
const API_BASE_URL = parsedEnv.API_BASE_URL;
const REQUIRED_ENVS = Object.freeze([...parsedEnv.REQUIRED_ENVS]);

export const ENV = Object.freeze({
  PUBLIC_URL,
  NODE_ENV,
  API_BASE_URL,
  REQUIRED_ENVS,
});

