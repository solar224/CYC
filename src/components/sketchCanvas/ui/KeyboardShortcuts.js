import { useEffect, useCallback } from "react";
import { useEditor, useEditorDispatch, ACTION } from "../EditorContext";
import { TOOL_TYPES, KEYBOARD_SHORTCUTS } from "../constants";
import { exportToPng } from "../export/exportPng";
import { getAllElementsBounds } from "../elements/elementTypes";
import { clampZoom } from "../canvas/CanvasInteraction";
import { nanoid } from "nanoid";

// Internal clipboard (JSON element subset).
// We use a module-level ref so it persists across re-renders
// but stays within this browser tab (no external clipboard for MVP).
let internalClipboard = [];

export function useKeyboardShortcuts() {
  const { getState } = useEditor();
  const dispatch = useEditorDispatch();

  const handleKeyDown = useCallback(
    (e) => {
      // Don't intercept when user is typing in a text input
      if (
        e.target.tagName === "TEXTAREA" ||
        e.target.tagName === "INPUT" ||
        e.target.isContentEditable
      ) {
        return;
      }

      const s = getState();
      const ctrl = e.ctrlKey || e.metaKey;

      // Ctrl+Shift+E: Export PNG
      if (ctrl && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        const isDark = s.appState.theme === "dark";
        exportToPng(s.elements, { bgColor: isDark ? "#1e1e2e" : "#ffffff" });
        return;
      }

      // Ctrl+Z: Undo
      if (ctrl && e.key.toLowerCase() === "z") {
        e.preventDefault();
        dispatch({ type: ACTION.UNDO });
        return;
      }

      // Ctrl+Y: Redo
      if (ctrl && e.key.toLowerCase() === "y") {
        e.preventDefault();
        dispatch({ type: ACTION.REDO });
        return;
      }

      // Ctrl+A: Select all
      if (ctrl && e.key.toLowerCase() === "a") {
        e.preventDefault();
        dispatch({ type: ACTION.SET_SELECTION, ids: s.elements.map((el) => el.id) });
        return;
      }

      // Ctrl+C: Copy selected elements (internal JSON clipboard)
      if (ctrl && e.key.toLowerCase() === "c") {
        e.preventDefault();
        if (s.selectedIds.size > 0) {
          const selected = s.elements.filter((el) => s.selectedIds.has(el.id));
          internalClipboard = JSON.parse(JSON.stringify(selected));
        }
        return;
      }

      // Ctrl+V: Paste from internal clipboard with +20px offset
      if (ctrl && e.key.toLowerCase() === "v") {
        e.preventDefault();
        if (internalClipboard.length > 0) {
          dispatch({ type: ACTION.PUSH_HISTORY });
          const newIds = [];
          for (const orig of internalClipboard) {
            const newId = nanoid();
            const newEl = {
              ...orig,
              id: newId,
              x: orig.x + 20,
              y: orig.y + 20,
              seed: Math.floor(Math.random() * 2147483647),
              versionNonce: Math.floor(Math.random() * 2147483647),
              zIndex: (orig.zIndex || 0) + 1,
            };
            if (newEl.binding) newEl.binding = { start: null, end: null };
            dispatch({ type: ACTION.ADD_ELEMENT, element: newEl });
            newIds.push(newId);
          }
          // Update clipboard positions so subsequent pastes cascade
          internalClipboard = internalClipboard.map((el) => ({
            ...el,
            x: el.x + 20,
            y: el.y + 20,
          }));
          dispatch({ type: ACTION.SET_SELECTION, ids: newIds });
        }
        return;
      }

      // Ctrl+D: Duplicate (same as copy+paste in one action)
      if (ctrl && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (s.selectedIds.size > 0) {
          dispatch({ type: ACTION.PUSH_HISTORY });
          const selected = s.elements.filter((el) => s.selectedIds.has(el.id));
          const newIds = [];
          for (const orig of selected) {
            const newId = nanoid();
            const newEl = {
              ...JSON.parse(JSON.stringify(orig)),
              id: newId,
              x: orig.x + 20,
              y: orig.y + 20,
              seed: Math.floor(Math.random() * 2147483647),
              versionNonce: Math.floor(Math.random() * 2147483647),
              zIndex: (orig.zIndex || 0) + 1,
            };
            if (newEl.binding) newEl.binding = { start: null, end: null };
            dispatch({ type: ACTION.ADD_ELEMENT, element: newEl });
            newIds.push(newId);
          }
          dispatch({ type: ACTION.SET_SELECTION, ids: newIds });
        }
        return;
      }

      // Delete / Backspace: Delete selected
      if (e.key === "Delete" || e.key === "Backspace") {
        if (s.selectedIds.size > 0) {
          e.preventDefault();
          dispatch({ type: ACTION.PUSH_HISTORY });
          dispatch({ type: ACTION.DELETE_ELEMENTS, ids: [...s.selectedIds] });
        }
        return;
      }

      // Escape: Clear selection, switch to select tool
      if (e.key === "Escape") {
        dispatch({ type: ACTION.CLEAR_SELECTION });
        dispatch({ type: ACTION.SET_TOOL, tool: TOOL_TYPES.SELECT });
        return;
      }

      // Shift+1: Zoom to fit
      if (e.shiftKey && e.key === "!") {
        e.preventDefault();
        zoomToFit(s, dispatch);
        return;
      }

      // Single-key tool shortcuts (no modifier)
      const key = e.key.toLowerCase();
      const toolMap = {
        [KEYBOARD_SHORTCUTS.SELECT]: TOOL_TYPES.SELECT,
        [KEYBOARD_SHORTCUTS.RECTANGLE]: TOOL_TYPES.RECTANGLE,
        [KEYBOARD_SHORTCUTS.ELLIPSE]: TOOL_TYPES.ELLIPSE,
        [KEYBOARD_SHORTCUTS.DIAMOND]: TOOL_TYPES.DIAMOND,
        [KEYBOARD_SHORTCUTS.LINE]: TOOL_TYPES.LINE,
        [KEYBOARD_SHORTCUTS.ARROW]: TOOL_TYPES.ARROW,
        [KEYBOARD_SHORTCUTS.FREEDRAW]: TOOL_TYPES.FREEDRAW,
        [KEYBOARD_SHORTCUTS.TEXT]: TOOL_TYPES.TEXT,
        [KEYBOARD_SHORTCUTS.ERASER]: TOOL_TYPES.ERASER,
      };

      if (toolMap[key] && !ctrl && !e.altKey) {
        dispatch({ type: ACTION.SET_TOOL, tool: toolMap[key] });
        return;
      }
    },
    [getState, dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

function getCanvasRect() {
  const canvas = document.querySelector("canvas");
  if (canvas) return canvas.getBoundingClientRect();
  return { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
}

function zoomToFit(state, dispatch) {
  const { elements } = state;
  if (elements.length === 0) {
    dispatch({ type: ACTION.SET_APP_STATE, updates: { zoom: 1, scrollX: 0, scrollY: 0 } });
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
  dispatch({ type: ACTION.SET_APP_STATE, updates: { zoom: newZoom, scrollX, scrollY } });
}
