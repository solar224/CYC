import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import { Add, Remove, CenterFocusStrong } from "@mui/icons-material";
import { useEditor, useEditorDispatch, ACTION } from "../EditorContext";
import { zoomAtPoint, clampZoom } from "../canvas/CanvasInteraction";
import { getAllElementsBounds } from "../elements/elementTypes";

function getCanvasRect() {
  const canvas = document.querySelector("canvas");
  if (canvas) return canvas.getBoundingClientRect();
  return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
}

export default function ZoomControls() {
  const { state } = useEditor();
  const dispatch = useEditorDispatch();
  const { appState, elements } = state;
  const isDark = appState.theme === "dark";
  const zoom = appState.zoom;

  const handleZoomIn = () => {
    const r = getCanvasRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    const updates = zoomAtPoint(appState, zoom * 1.2, cx, cy);
    dispatch({ type: ACTION.SET_APP_STATE, updates });
  };

  const handleZoomOut = () => {
    const r = getCanvasRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    const updates = zoomAtPoint(appState, zoom / 1.2, cx, cy);
    dispatch({ type: ACTION.SET_APP_STATE, updates });
  };

  const handleZoomToFit = () => {
    if (elements.length === 0) {
      dispatch({
        type: ACTION.SET_APP_STATE,
        updates: { zoom: 1, scrollX: 0, scrollY: 0 },
      });
      return;
    }

    const r = getCanvasRect();
    const bounds = getAllElementsBounds(elements);
    const padding = 64;
    const vw = r.width;
    const vh = r.height;
    const scaleX = vw / (bounds.width + padding * 2);
    const scaleY = vh / (bounds.height + padding * 2);
    const newZoom = clampZoom(Math.min(scaleX, scaleY, 1));

    const cx = bounds.x + bounds.width / 2;
    const cy = bounds.y + bounds.height / 2;
    const scrollX = r.width / 2 - cx * newZoom;
    const scrollY = r.height / 2 - cy * newZoom;

    dispatch({
      type: ACTION.SET_APP_STATE,
      updates: { zoom: newZoom, scrollX, scrollY },
    });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        bgcolor: isDark ? "rgba(30,30,46,0.92)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderRadius: 2.5,
        boxShadow: isDark
          ? "0 4px 24px rgba(0,0,0,0.5)"
          : "0 4px 24px rgba(0,0,0,0.12)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        px: 1,
        py: 0.5,
        zIndex: 10,
      }}
    >
      <Tooltip title="Zoom out">
        <IconButton size="small" onClick={handleZoomOut}>
          <Remove sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>

      <Typography
        variant="caption"
        sx={{
          minWidth: 48,
          textAlign: "center",
          fontWeight: 600,
          fontSize: 12,
          userSelect: "none",
          cursor: "pointer",
          borderRadius: 1,
          px: 0.5,
          "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" },
        }}
        onClick={() => dispatch({ type: ACTION.SET_APP_STATE, updates: { zoom: 1, scrollX: 0, scrollY: 0 } })}
      >
        {Math.round(zoom * 100)}%
      </Typography>

      <Tooltip title="Zoom in">
        <IconButton size="small" onClick={handleZoomIn}>
          <Add sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Zoom to fit (Shift+1)">
        <IconButton size="small" onClick={handleZoomToFit}>
          <CenterFocusStrong sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
