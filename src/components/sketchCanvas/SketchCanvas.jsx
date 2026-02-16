import { useContext, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { EditorProvider, useEditorDispatch, ACTION } from "./EditorContext";
import { ThemeContext } from "../../App";
import TopBar from "./ui/TopBar";
import ToolDock from "./ui/ToolDock";
import Inspector from "./ui/Inspector";
import ZoomControls from "./ui/ZoomControls";
import CanvasArea from "./ui/CanvasArea";
import KeyboardShortcutsProvider from "./ui/KeyboardShortcutsProvider";
import { importFromJson } from "./export/exportJson";

export default function SketchCanvas() {
  const { theme } = useContext(ThemeContext);

  return (
    <EditorProvider theme={theme}>
      <SketchCanvasInner />
    </EditorProvider>
  );
}

function SketchCanvasInner() {
  return (
    <KeyboardShortcutsProvider>
      <SketchCanvasLayout />
    </KeyboardShortcutsProvider>
  );
}

function SketchCanvasLayout() {
  useFileDrop();
  useThemeSync();

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "calc(100vh - 56px)", md: "calc(100vh - 64px)" },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <TopBar />
      <Box
        sx={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <CanvasArea />
        <ToolDock />
        <Inspector />
        <ZoomControls />
      </Box>
    </Box>
  );
}

function useThemeSync() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useEditorDispatch();
  useEffect(() => {
    dispatch({ type: ACTION.SET_APP_STATE, updates: { theme } });
  }, [theme, dispatch]);
}

function useFileDrop() {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (file.name.endsWith(".json") || file.name.endsWith(".excalidraw")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = importFromJson(ev.target.result);
        if (result) {
          window.__sketchCanvasImport?.(result);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  useEffect(() => {
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragover", handleDragOver);
    return () => {
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragover", handleDragOver);
    };
  }, [handleDrop, handleDragOver]);
}
