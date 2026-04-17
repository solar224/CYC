export const NOTES_ROUTE_PATHS = {
  HOME: "/notes",
  DETAIL: "/notes/:slug",
};

export const NOTES_ROUTE_META = {
  [NOTES_ROUTE_PATHS.HOME]: {
    breadcrumb: "筆記",
    title: "Notes",
  },
  [NOTES_ROUTE_PATHS.DETAIL]: {
    breadcrumb: "筆記內容",
    title: "Note Detail",
  },
};

export const NOTES_SEGMENT_LABELS = {
  notes: "筆記",
  "school-curriculum": "學校課程",
  "coding-practice": "程式練習",
  "other-practice": "其他",
};
