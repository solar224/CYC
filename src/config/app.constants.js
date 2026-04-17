import { TOOLS_ROUTE_PATHS } from "./tools.constants";

export const APP_ROUTE_PATHS = {
  HOME: "/",
  NOTE: "/note",
  CONTACT: "/contact-me",
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
  [APP_ROUTE_PATHS.CONTACT]: {
    breadcrumbKey: "breadcrumb.contact",
    titleKey: "title.contact",
  },
};

export const APP_SEGMENT_LABEL_KEYS = {
  "about-me": "segment.about-me",
  "contact-me": "segment.contact",
  note: "segment.note",
};

export const MAIN_NAV_ITEMS = [
  {
    key: "home",
    to: APP_ROUTE_PATHS.HOME,
  },
  {
    key: "contact",
    to: APP_ROUTE_PATHS.CONTACT,
  },
  {
    key: "note",
    to: APP_ROUTE_PATHS.NOTE,
  },
  {
    key: "tools",
    to: TOOLS_ROUTE_PATHS.ROOT,
  },
];
