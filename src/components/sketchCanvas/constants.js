import {
  NearMe,
  Crop75,
  CircleOutlined,
  ChangeHistory,
  HorizontalRule,
  TrendingFlat,
  Draw,
  TextFields,
  AutoFixOff,
} from "@mui/icons-material";

export const TOOL_TYPES = {
  SELECT: "select",
  RECTANGLE: "rectangle",
  ELLIPSE: "ellipse",
  DIAMOND: "diamond",
  LINE: "line",
  ARROW: "arrow",
  FREEDRAW: "freedraw",
  TEXT: "text",
  ERASER: "eraser",
};

export const TOOLS = [
  { type: TOOL_TYPES.SELECT, label: "Select", shortcut: "V", icon: NearMe },
  { type: TOOL_TYPES.RECTANGLE, label: "Rectangle", shortcut: "R", icon: Crop75 },
  { type: TOOL_TYPES.ELLIPSE, label: "Ellipse", shortcut: "O", icon: CircleOutlined },
  { type: TOOL_TYPES.DIAMOND, label: "Diamond", shortcut: "D", icon: ChangeHistory },
  { type: TOOL_TYPES.LINE, label: "Line", shortcut: "L", icon: HorizontalRule },
  { type: TOOL_TYPES.ARROW, label: "Arrow", shortcut: "A", icon: TrendingFlat },
  { type: TOOL_TYPES.FREEDRAW, label: "Pen", shortcut: "P", icon: Draw },
  { type: TOOL_TYPES.TEXT, label: "Text", shortcut: "T", icon: TextFields },
  { type: TOOL_TYPES.ERASER, label: "Eraser", shortcut: "E", icon: AutoFixOff },
];

export const ELEMENT_DEFAULTS = {
  strokeColor: "#1e1e1e",
  fillColor: "transparent",
  strokeWidth: 2,
  roughness: 1,
  opacity: 1,
  roundness: 0,
  locked: false,
};

export const DARK_ELEMENT_DEFAULTS = {
  strokeColor: "#e0e0e0",
  fillColor: "transparent",
};

export const FONT_FAMILIES = [
  { value: "Caveat, cursive, sans-serif", label: "Hand-drawn" },
  { value: "'Segoe UI', Roboto, sans-serif", label: "Normal" },
  { value: "'Courier New', monospace", label: "Code" },
];

export const ZOOM_LIMITS = { min: 0.1, max: 8 };
export const GRID_SIZE = 20;
export const SNAP_GRID = 8;
export const SNAP_ANGLE = 15;
export const HISTORY_LIMIT = 200;

export const KEYBOARD_SHORTCUTS = {
  SELECT: "v",
  RECTANGLE: "r",
  ELLIPSE: "o",
  DIAMOND: "d",
  LINE: "l",
  ARROW: "a",
  FREEDRAW: "p",
  TEXT: "t",
  ERASER: "e",
};

export const COLORS_PALETTE = [
  "#1e1e1e", "#e03131", "#2f9e44", "#1971c2",
  "#f08c00", "#6741d9", "#0c8599", "#e8590c",
  "#ffffff", "#ffc9c9", "#b2f2bb", "#a5d8ff",
  "#ffec99", "#d0bfff", "#99e9f2", "#ffd8a8",
  "transparent",
];

export const FILL_STYLES = ["solid", "hachure", "cross-hatch", "none"];
