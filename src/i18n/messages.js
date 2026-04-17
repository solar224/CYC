export const FALLBACK_LANGUAGE = "zh";

export const MESSAGES = {
  zh: {
    "brand.name": "YC-Chan",

    "nav.home": "關於我",
    "nav.contact": "聯絡",
    "nav.note": "筆記",
    "nav.tools": "小工具",
    "aria.home": "返回首頁",

    "breadcrumb.home": "首頁",
    "breadcrumb.note": "筆記",
    "breadcrumb.contact": "聯絡",
    "breadcrumb.notes": "筆記",
    "breadcrumb.noteDetail": "筆記內容",
    "breadcrumb.tools": "小工具",
    "breadcrumb.roughframe": "RoughFrame",

    "segment.about-me": "關於我",
    "segment.contact": "聯絡",
    "segment.note": "筆記",
    "segment.notes": "筆記",
    "segment.school-curriculum": "學校課程",
    "segment.coding-practice": "程式練習",
    "segment.other-practice": "其他",
    "segment.tools": "小工具",
    "segment.roughframe": "RoughFrame",
  },
  en: {
    "brand.name": "YC-Chan",

    "nav.home": "About",
    "nav.contact": "Contact",
    "nav.note": "Notes",
    "nav.tools": "Tools",
    "aria.home": "Go Home",

    "breadcrumb.home": "Home",
    "breadcrumb.note": "Note",
    "breadcrumb.contact": "Contact",
    "breadcrumb.notes": "Notes",
    "breadcrumb.noteDetail": "Note Detail",
    "breadcrumb.tools": "Tools",
    "breadcrumb.roughframe": "RoughFrame",

    "segment.about-me": "About",
    "segment.contact": "Contact",
    "segment.note": "Note",
    "segment.notes": "Notes",
    "segment.school-curriculum": "School Curriculum",
    "segment.coding-practice": "Coding Practice",
    "segment.other-practice": "Other",
    "segment.tools": "Tools",
    "segment.roughframe": "RoughFrame",
  },
};

export function t(key, language = FALLBACK_LANGUAGE) {
  const langDict = MESSAGES[language] || MESSAGES[FALLBACK_LANGUAGE];
  return langDict[key] || key;
}
