import { Box, IconButton, Tooltip, Divider } from "@mui/material";
import { Lock, LockOpen } from "@mui/icons-material";
import { useEditor, useEditorDispatch, ACTION } from "../EditorContext";
import { TOOLS } from "../constants";

export default function ToolDock() {
  const { state } = useEditor();
  const dispatch = useEditorDispatch();
  const { activeTool, toolLocked, appState } = state;
  const isDark = appState.theme === "dark";

  return (
    <Box
      sx={{
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.25,
        bgcolor: isDark ? "rgba(30,30,46,0.92)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderRadius: 3,
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.12)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        py: 1,
        px: 0.5,
        zIndex: 10,
      }}
    >
      {TOOLS.map((tool, i) => (
        <Box key={tool.type}>
          {i === 1 && <Divider sx={{ my: 0.5, width: "100%" }} />}
          {i === 5 && <Divider sx={{ my: 0.5, width: "100%" }} />}
          {i === 7 && <Divider sx={{ my: 0.5, width: "100%" }} />}
          <Tooltip title={`${tool.label} (${tool.shortcut})`} placement="right" arrow>
            <IconButton
              size="small"
              onClick={() => dispatch({ type: ACTION.SET_TOOL, tool: tool.type })}
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                color:
                  activeTool === tool.type
                    ? "#fff"
                    : isDark
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(0,0,0,0.65)",
                bgcolor:
                  activeTool === tool.type
                    ? "#4a7dff"
                    : "transparent",
                "&:hover": {
                  bgcolor:
                    activeTool === tool.type
                      ? "#3a6de8"
                      : isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                },
                transition: "all 0.15s ease",
              }}
            >
              <tool.icon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      ))}

      <Divider sx={{ my: 0.5, width: "100%" }} />

      <Tooltip title={toolLocked ? "Unlock tool" : "Lock tool"} placement="right" arrow>
        <IconButton
          size="small"
          onClick={() =>
            dispatch({ type: ACTION.SET_TOOL_LOCKED, locked: !toolLocked })
          }
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            color: toolLocked
              ? "#f59f00"
              : isDark
              ? "rgba(255,255,255,0.4)"
              : "rgba(0,0,0,0.35)",
          }}
        >
          {toolLocked ? <Lock sx={{ fontSize: 18 }} /> : <LockOpen sx={{ fontSize: 18 }} />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
