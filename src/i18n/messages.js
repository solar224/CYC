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

    "title.home": "首頁",
    "title.note": "筆記",
    "title.contact": "聯絡",
    "title.notes": "筆記",
    "title.noteDetail": "筆記內容",
    "title.tools": "小工具",
    "title.roughframe": "RoughFrame",

    "segment.about-me": "關於我",
    "segment.contact": "聯絡",
    "segment.note": "筆記",
    "segment.notes": "筆記",
    "segment.school-curriculum": "學校課程",
    "segment.coding-practice": "程式練習",
    "segment.other-practice": "其他",
    "segment.tools": "小工具",
    "segment.roughframe": "RoughFrame",

    "note.title": "筆記",
    "note.search.placeholder": "搜尋標題、摘要或標籤…",
    "note.result.count": "共 {{count}} 筆結果",
    "note.result.category": "分類：{{category}}",
    "note.result.keyword": "關鍵字：{{keyword}}",
    "note.empty.title": "沒有符合的筆記",
    "note.empty.desc": "試著更換關鍵字或切換分類。",
    "note.category.unknown": "未分類",
    "note.star.add": "加上星號",
    "note.star.remove": "取消星號",
    "note.category.all": "全部",
    "note.category.school-curriculum": "學校課程",
    "note.category.coding-practice": "程式練習",
    "note.category.other-practice": "其他",
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

    "title.home": "Home",
    "title.note": "Note",
    "title.contact": "Contact",
    "title.notes": "Notes",
    "title.noteDetail": "Note Detail",
    "title.tools": "Tools",
    "title.roughframe": "RoughFrame",

    "segment.about-me": "About",
    "segment.contact": "Contact",
    "segment.note": "Note",
    "segment.notes": "Notes",
    "segment.school-curriculum": "School Curriculum",
    "segment.coding-practice": "Coding Practice",
    "segment.other-practice": "Other",
    "segment.tools": "Tools",
    "segment.roughframe": "RoughFrame",

    "note.title": "Notes",
    "note.search.placeholder": "Search title, summary, or tags...",
    "note.result.count": "{{count}} results",
    "note.result.category": "Category: {{category}}",
    "note.result.keyword": "Keyword: {{keyword}}",
    "note.empty.title": "No matching notes",
    "note.empty.desc": "Try another keyword or category.",
    "note.category.unknown": "Uncategorized",
    "note.star.add": "Star note",
    "note.star.remove": "Unstar note",
    "note.category.all": "All",
    "note.category.school-curriculum": "School Curriculum",
    "note.category.coding-practice": "Coding Practice",
    "note.category.other-practice": "Other",
  },
};

export function t(key, language = FALLBACK_LANGUAGE, params = {}) {
  const langDict = MESSAGES[language] || MESSAGES[FALLBACK_LANGUAGE];
  const message = langDict[key] || key;
  return message.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, token) => {
    const value = params[token];
    return value === undefined || value === null ? "" : String(value);
  });
}
