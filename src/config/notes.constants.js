export const NOTES_ROUTE_PATHS = {
  HOME: "/notes",
  DETAIL: "/notes/:slug",
};

export const NOTES_ROUTE_META = {
  [NOTES_ROUTE_PATHS.HOME]: {
    breadcrumbKey: "breadcrumb.notes",
    titleKey: "title.notes",
  },
  [NOTES_ROUTE_PATHS.DETAIL]: {
    breadcrumbKey: "breadcrumb.noteDetail",
    titleKey: "title.noteDetail",
  },
};

export const NOTES_SEGMENT_LABEL_KEYS = {
  notes: "segment.notes",
  "school-curriculum": "segment.school-curriculum",
  "coding-practice": "segment.coding-practice",
  "other-practice": "segment.other-practice",
};

export const NOTE_CATEGORY_FILTERS = [
  { value: "all", labelKey: "note.category.all" },
  { value: "school-curriculum", labelKey: "note.category.school-curriculum" },
  { value: "coding-practice", labelKey: "note.category.coding-practice" },
  { value: "other-practice", labelKey: "note.category.other-practice" },
];
