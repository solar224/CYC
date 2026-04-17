import { TOOLS_ROUTE_PATHS } from "./tools.constants";

export const APP_ROUTE_KEYS = {
  HOME: "home",
  NOTE: "note",
  PROJECT: "project",
  TOOLS: "tools",
};

export const APP_ROUTE_PATHS = {
  HOME: "/",
  NOTE: "/note",
  PROJECT: "/project",
};

export const APP_ROUTE_META = {
  [APP_ROUTE_PATHS.HOME]: {
    breadcrumbKey: "breadcrumb.home",
    titleKey: "title.home",
  },
  [APP_ROUTE_PATHS.NOTE]: {
    breadcrumbKey: "breadcrumb.note",
    titleKey: "title.note",
  },
  [APP_ROUTE_PATHS.PROJECT]: {
    breadcrumbKey: "breadcrumb.project",
    titleKey: "title.project",
  },
};

export const APP_SEGMENT_LABEL_KEYS = {
  "about-me": "segment.about-me",
  project: "segment.project",
  note: "segment.note",
};

export const MAIN_NAV_ITEMS = [
  {
    key: APP_ROUTE_KEYS.HOME,
    to: APP_ROUTE_PATHS.HOME,
  },
  {
    key: APP_ROUTE_KEYS.PROJECT,
    to: APP_ROUTE_PATHS.PROJECT,
  },
  {
    key: APP_ROUTE_KEYS.NOTE,
    to: APP_ROUTE_PATHS.NOTE,
  },
  {
    key: APP_ROUTE_KEYS.TOOLS,
    to: TOOLS_ROUTE_PATHS.ROOT,
  },
];
