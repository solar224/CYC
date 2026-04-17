import { APP_ROUTE_META, APP_ROUTE_PATHS } from "./app.constants";
import { NOTES_ROUTE_META, NOTES_ROUTE_PATHS } from "./notes.constants";
import { TOOLS_ROUTE_META, TOOLS_ROUTE_PATHS } from "./tools.constants";

export const ROUTE_REGISTRY = Object.freeze({
  app: Object.freeze({
    paths: APP_ROUTE_PATHS,
    meta: APP_ROUTE_META,
  }),
  notes: Object.freeze({
    paths: NOTES_ROUTE_PATHS,
    meta: NOTES_ROUTE_META,
  }),
  tools: Object.freeze({
    paths: TOOLS_ROUTE_PATHS,
    meta: TOOLS_ROUTE_META,
  }),
});

export const ROUTE_META_INDEX = Object.freeze({
  ...APP_ROUTE_META,
  ...NOTES_ROUTE_META,
  ...TOOLS_ROUTE_META,
});

function normalizePath(pathname = "/") {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function matchRouteMeta(pathname = "/") {
  const normalized = normalizePath(pathname);
  if (ROUTE_META_INDEX[normalized]) {
    return ROUTE_META_INDEX[normalized];
  }

  const entries = Object.entries(ROUTE_META_INDEX);
  for (const [pattern, meta] of entries) {
    if (!pattern.includes(":")) continue;
    const base = pattern.split(":")[0].replace(/\/$/, "");
    if (normalized.startsWith(base) && normalized.length > base.length) {
      return meta;
    }
  }

  return null;
}
