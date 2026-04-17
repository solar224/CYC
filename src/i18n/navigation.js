import { t } from "./messages";

const NAV_KEY_MAP = {
  home: "nav.home",
  project: "nav.project",
  note: "nav.note",
  tools: "nav.tools",
  homeAria: "aria.home",
};

export function getNavLabel(key, language = "zh") {
  const messageKey = NAV_KEY_MAP[key] || key;
  return t(messageKey, language);
}
