export const TOOLS_ROUTE_PATHS = {
  ROOT: "/tools",
  ROUGHFRAME: "/tools/RoughFrame",
};

export const TOOLS_ROUTE_SEGMENTS = {
  ROUGHFRAME: "RoughFrame",
};

export const TOOLS_ROUTE_META = {
  [TOOLS_ROUTE_PATHS.ROOT]: {
    breadcrumbKey: "breadcrumb.tools",
    titleKey: "title.tools",
  },
  [TOOLS_ROUTE_PATHS.ROUGHFRAME]: {
    breadcrumbKey: "breadcrumb.roughframe",
    titleKey: "title.roughframe",
  },
};

export const TOOLS_SEGMENT_LABEL_KEYS = {
  tools: "segment.tools",
  RoughFrame: "segment.roughframe",
};

export const TOOL_ROUTE_PREFIX = TOOLS_ROUTE_PATHS.ROOT;
