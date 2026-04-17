export const TOOLS_ROUTE_PATHS = {
  ROOT: "/tools",
  ROUGHFRAME: "/tools/RoughFrame",
};

export const TOOLS_ROUTE_SEGMENTS = {
  ROUGHFRAME: "RoughFrame",
};

export const TOOLS_ROUTE_META = {
  [TOOLS_ROUTE_PATHS.ROOT]: {
    breadcrumb: "小工具",
    title: "Tools",
  },
  [TOOLS_ROUTE_PATHS.ROUGHFRAME]: {
    breadcrumb: "RoughFrame",
    title: "RoughFrame",
  },
};

export const TOOLS_SEGMENT_LABELS = {
  tools: "小工具",
  RoughFrame: "RoughFrame",
};

export const TOOL_ROUTE_PREFIX = TOOLS_ROUTE_PATHS.ROOT;
