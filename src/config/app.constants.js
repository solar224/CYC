export const APP_ROUTE_PATHS = {
  HOME: "/",
  NOTE: "/note",
  CONTACT: "/contact-me",
};

export const APP_ROUTE_META = {
  [APP_ROUTE_PATHS.HOME]: {
    breadcrumb: "首頁",
    title: "Home",
  },
  [APP_ROUTE_PATHS.NOTE]: {
    breadcrumb: "筆記",
    title: "Note",
  },
  [APP_ROUTE_PATHS.CONTACT]: {
    breadcrumb: "聯絡",
    title: "Contact",
  },
};

export const APP_SEGMENT_LABELS = {
  "about-me": "關於我",
  "contact-me": "聯絡",
  note: "筆記",
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
    to: "/tools",
  },
];
