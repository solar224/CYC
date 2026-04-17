import { matchPath } from "react-router-dom";
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

const ROUTE_META_ENTRIES = Object.entries(ROUTE_META_INDEX).sort(
  ([leftPattern], [rightPattern]) => rightPattern.length - leftPattern.length
);

function normalizePath(pathname = "/") {
  if (!pathname) return "/";
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function matchRouteMeta(pathname = "/") {
  const normalized = normalizePath(pathname);
  for (const [pattern, meta] of ROUTE_META_ENTRIES) {
    const matched = matchPath(
      {
        path: pattern,
        end: true,
        caseSensitive: false,
      },
      normalized
    );

    if (matched) {
      return meta;
    }
  }

  return null;
}
