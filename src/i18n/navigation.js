const FALLBACK_LANGUAGE = "zh";

export const NAV_LABELS = {
  zh: {
    home: "關於我",
    contact: "聯絡",
    note: "筆記",
    tools: "小工具",
    homeAria: "返回首頁",
  },
  en: {
    home: "About",
    contact: "Contact",
    note: "Notes",
    tools: "Tools",
    homeAria: "Go Home",
  },
};

export function getNavLabel(key, language = FALLBACK_LANGUAGE) {
  const dict = NAV_LABELS[language] || NAV_LABELS[FALLBACK_LANGUAGE];
  return dict[key] || key;
}
