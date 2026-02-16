import { useRef, useEffect, useCallback, useState } from "react";
import { useEditor, useEditorDispatch, ACTION } from "../EditorContext";
import { createRenderer, renderScene } from "../canvas/CanvasRenderer";
import {
  screenToScene,
  zoomAtPoint,
  resizeElement,
} from "../canvas/CanvasInteraction";
import {
  getElementAtPosition,
  getElementsInBox,
  hitTestHandle,
} from "../canvas/SelectionManager";
import { isLinearElement } from "../elements/elementTypes";
import { createElement } from "../elements/elementFactory";
import { measureText } from "../elements/textRenderer";
import {
  findBindTarget,
  getAttachmentPoint,
  computeBindingUpdates,
  computeBindingUpdatesForLinear,
} from "../canvas/BindingManager";
import { TOOL_TYPES } from "../constants";
import { Box } from "@mui/material";

export default function CanvasArea() {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const { state, getState } = useEditor();
  const dispatch = useEditorDispatch();

  // Interaction mode flags (only one true at a time)
  const modeRef = useRef("idle");
  // "idle" | "panning" | "drawing" | "dragging" | "resizing" | "selecting"

  // Transient refs for drag operations -- NOT in reducer
  const drawingElRef = useRef(null);
  const selectionBoxRef = useRef(null);
  const dragStartRef = useRef(null);
  const resizeHandleRef = useRef(null);
  const originalElsRef = useRef(null);   // snapshot of elements before drag/resize
  const lastPosRef = useRef({ x: 0, y: 0 });
  const spaceDownRef = useRef(false);
  const rafRef = useRef(null);
  const editingTextRef = useRef(null);
  const bindTargetRef = useRef(null); // shape currently highlighted as bind target

  // Force re-render trigger (for transient visual updates without reducer)
  const [renderTick, setRenderTick] = useState(0);
  const requestRender = useCallback(() => setRenderTick((t) => t + 1), []);

  // --- Canvas init & DPR setup (ResizeObserver for responsive resize) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let rafId = null;

    const syncSize = () => {
      const r = canvas.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      const w = Math.round(r.width * d);
      const h = Math.round(r.height * d);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        rendererRef.current = createRenderer(canvas);
        requestRender();
      }
    };

    syncSize();

    const ro = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncSize);
    });
    ro.observe(canvas);

    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [requestRender]);

  // --- Render loop: runs on state change OR transient tick ---
  useEffect(() => {
    if (!rendererRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      renderScene(rendererRef.current, state, {
        drawingElement: drawingElRef.current,
        selectionBox: selectionBoxRef.current,
        bindTarget: bindTargetRef.current,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, renderTick]);

  const getCanvasXY = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }, []);

  // ====================================================
  //  POINTER DOWN
  // ====================================================
  const handlePointerDown = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const s = getState();
      const { x: screenX, y: screenY } = getCanvasXY(e);
      const scene = screenToScene(screenX, screenY, s.appState);

      // --- Text tool: DO NOT capture pointer (would steal focus from textarea) ---
      if (s.activeTool === TOOL_TYPES.TEXT && !spaceDownRef.current && e.button !== 1 && e.button !== 2) {
        handleTextCreate(scene.x, scene.y);
        return;
      }

      // Capture pointer for all other interactions (drag, draw, pan, etc.)
      canvas.setPointerCapture(e.pointerId);

      // --- Pan (Space+Drag, middle mouse, or right-click drag) ---
      if (spaceDownRef.current || e.button === 1 || e.button === 2) {
        modeRef.current = "panning";
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        requestRender();
        return;
      }

      const tool = s.activeTool;

      // --- Select tool ---
      if (tool === TOOL_TYPES.SELECT) {
        // Check resize handle on single selection
        if (s.selectedIds.size === 1) {
          const selId = [...s.selectedIds][0];
          const selEl = s.elements.find((el) => el.id === selId);
          if (selEl) {
            const handle = hitTestHandle(selEl, scene.x, scene.y, s.appState.zoom);
            if (handle) {
              modeRef.current = "resizing";
              resizeHandleRef.current = handle;
              originalElsRef.current = JSON.parse(JSON.stringify(selEl));
              lastPosRef.current = { x: scene.x, y: scene.y };
              dispatch({ type: ACTION.PUSH_HISTORY });
              return;
            }
          }
        }

        // Hit-test elements (with zoom-aware tolerance)
        const hitEl = getElementAtPosition(s.elements, scene.x, scene.y, s.appState.zoom);
        if (hitEl) {
          if (e.shiftKey) {
            if (s.selectedIds.has(hitEl.id)) {
              dispatch({ type: ACTION.REMOVE_FROM_SELECTION, id: hitEl.id });
            } else {
              dispatch({ type: ACTION.ADD_TO_SELECTION, id: hitEl.id });
            }
          } else if (!s.selectedIds.has(hitEl.id)) {
            dispatch({ type: ACTION.SET_SELECTION, ids: [hitEl.id] });
          }
          modeRef.current = "dragging";
          lastPosRef.current = { x: scene.x, y: scene.y };
          // Snapshot selected elements' positions for transient drag
          const selectedEls = s.elements.filter((el) => s.selectedIds.has(el.id) || el.id === hitEl.id);
          originalElsRef.current = selectedEls.map((el) => ({ id: el.id, x: el.x, y: el.y }));
          dispatch({ type: ACTION.PUSH_HISTORY });
          return;
        }

        // Box selection
        dispatch({ type: ACTION.CLEAR_SELECTION });
        modeRef.current = "selecting";
        selectionBoxRef.current = { x: scene.x, y: scene.y, width: 0, height: 0 };
        dragStartRef.current = { x: scene.x, y: scene.y };
        return;
      }

      // --- Eraser ---
      if (tool === TOOL_TYPES.ERASER) {
        const hitEl = getElementAtPosition(s.elements, scene.x, scene.y, s.appState.zoom);
        if (hitEl) {
          dispatch({ type: ACTION.PUSH_HISTORY });
          dispatch({ type: ACTION.DELETE_ELEMENTS, ids: [hitEl.id] });
        }
        return;
      }

      // --- Drawing shapes/lines/freedraw ---
      // History pushed once at start; element committed only on pointerup.
      dispatch({ type: ACTION.PUSH_HISTORY });
      modeRef.current = "drawing";

      const isLinear = tool === TOOL_TYPES.LINE || tool === TOOL_TYPES.ARROW;
      const isFree = tool === TOOL_TYPES.FREEDRAW;

      // For line/arrow: detect start-point bind target
      let startBindTarget = null;
      let startX = scene.x;
      let startY = scene.y;
      if (isLinear) {
        startBindTarget = findBindTarget(s.elements, scene.x, scene.y, null, s.appState.zoom);
        if (startBindTarget) {
          const cx = startBindTarget.x + startBindTarget.width / 2;
          const cy = startBindTarget.y + startBindTarget.height / 2;
          startX = cx;
          startY = cy;
        }
      }

      const newEl = createElement(
        tool,
        {
          x: startX,
          y: startY,
          ...(isLinear ? { points: [[0, 0]] } : {}),
          ...(isFree ? { points: [[0, 0]] } : {}),
          ...(startBindTarget ? { binding: { start: { elementId: startBindTarget.id }, end: null } } : {}),
        },
        s.defaults
      );

      if (s.appState.theme === "dark") {
        if (newEl.strokeColor === "#1e1e1e") newEl.strokeColor = "#e0e0e0";
      }

      drawingElRef.current = newEl;
      dragStartRef.current = { x: startX, y: startY };
      if (startBindTarget) {
        bindTargetRef.current = startBindTarget.id;
        requestRender();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getState, getCanvasXY, dispatch, requestRender]
  );

  // ====================================================
  //  POINTER MOVE
  // ====================================================
  const handlePointerMove = useCallback(
    (e) => {
      const mode = modeRef.current;
      if (mode === "idle") {
        // Continuous eraser while button held
        if (e.buttons === 1) {
          const s = getState();
          if (s.activeTool === TOOL_TYPES.ERASER) {
            const { x: sx, y: sy } = getCanvasXY(e);
            const scene = screenToScene(sx, sy, s.appState);
            const hitEl = getElementAtPosition(s.elements, scene.x, scene.y, s.appState.zoom);
            if (hitEl) {
              dispatch({ type: ACTION.DELETE_ELEMENTS, ids: [hitEl.id] });
            }
          }
        }
        return;
      }

      const s = getState();
      const { x: screenX, y: screenY } = getCanvasXY(e);
      const scene = screenToScene(screenX, screenY, s.appState);

      // --- Panning: update scrollX/Y ---
      if (mode === "panning") {
        const dx = e.clientX - lastPosRef.current.x;
        const dy = e.clientY - lastPosRef.current.y;
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        dispatch({
          type: ACTION.SET_APP_STATE,
          updates: {
            scrollX: s.appState.scrollX + dx,
            scrollY: s.appState.scrollY + dy,
          },
        });
        return;
      }

      // --- Dragging selected elements (transient: mutate ref, requestRender) ---
      if (mode === "dragging" && originalElsRef.current) {
        const dx = scene.x - lastPosRef.current.x;
        const dy = scene.y - lastPosRef.current.y;
        lastPosRef.current = { x: scene.x, y: scene.y };
        const updates = [...s.selectedIds].map((id) => ({
          id,
          changes: {
            x: (s.elements.find((el) => el.id === id)?.x || 0) + dx,
            y: (s.elements.find((el) => el.id === id)?.y || 0) + dy,
          },
        }));
        dispatch({ type: ACTION.UPDATE_ELEMENTS, updates });

        // Update bound line/arrow endpoints when shapes move
        const movedIds = [...s.selectedIds];
        // We need to use the updated elements for correct binding computation
        const updatedElements = s.elements.map((el) => {
          const u = updates.find((up) => up.id === el.id);
          return u ? { ...el, ...u.changes } : el;
        });
        const bindUpdates = computeBindingUpdates(updatedElements, movedIds);
        if (bindUpdates.length > 0) {
          dispatch({ type: ACTION.UPDATE_ELEMENTS, updates: bindUpdates });
        }
        return;
      }

      // --- Resizing (via handle) ---
      if (mode === "resizing" && originalElsRef.current) {
        const handle = resizeHandleRef.current;
        const orig = originalElsRef.current;

        // Line/Arrow endpoint drag (with binding support)
        if (handle === "line-start" || handle === "line-end") {
          const pts = orig.points ? [...orig.points.map((p) => [...p])] : [[0, 0]];
          const idx = handle === "line-start" ? 0 : pts.length - 1;

          // Detect bind target for the endpoint being dragged
          const target = findBindTarget(s.elements, scene.x, scene.y, orig.id, s.appState.zoom);
          bindTargetRef.current = target ? target.id : null;

          if (target) {
            // Snap to shape edge
            const otherIdx = idx === 0 ? pts.length - 1 : 0;
            const otherPt = { x: orig.x + pts[otherIdx][0], y: orig.y + pts[otherIdx][1] };
            const attach = getAttachmentPoint(target, otherPt.x, otherPt.y);
            pts[idx] = [attach.x - orig.x, attach.y - orig.y];
          } else {
            pts[idx] = [scene.x - orig.x, scene.y - orig.y];
          }

          // Update binding data
          const binding = { ...(orig.binding || { start: null, end: null }) };
          if (handle === "line-start") {
            binding.start = target ? { elementId: target.id } : null;
          } else {
            binding.end = target ? { elementId: target.id } : null;
          }

          originalElsRef.current = { ...orig, points: pts, binding };
          dispatch({
            type: ACTION.UPDATE_ELEMENT,
            id: orig.id,
            updates: { points: pts, binding },
          });
          return;
        }

        // Shape resize (8-point AABB)
        const dx = scene.x - lastPosRef.current.x;
        const dy = scene.y - lastPosRef.current.y;
        const newDims = resizeElement(
          { x: orig.x, y: orig.y, width: orig.width, height: orig.height },
          handle, dx, dy
        );
        originalElsRef.current = { ...orig, ...newDims };
        lastPosRef.current = { x: scene.x, y: scene.y };
        dispatch({
          type: ACTION.UPDATE_ELEMENT,
          id: orig.id,
          updates: newDims,
        });

        // Update bound lines when shape is resized
        const resizedEl = { ...orig, ...newDims };
        const updatedEls = s.elements.map((el2) =>
          el2.id === orig.id ? resizedEl : el2
        );
        const resizeBindUpdates = computeBindingUpdates(updatedEls, [orig.id]);
        if (resizeBindUpdates.length > 0) {
          dispatch({ type: ACTION.UPDATE_ELEMENTS, updates: resizeBindUpdates });
        }
        return;
      }

      // --- Box selection (transient: only update ref + request render) ---
      if (mode === "selecting" && dragStartRef.current) {
        const start = dragStartRef.current;
        selectionBoxRef.current = {
          x: Math.min(start.x, scene.x),
          y: Math.min(start.y, scene.y),
          width: Math.abs(scene.x - start.x),
          height: Math.abs(scene.y - start.y),
        };
        requestRender();
        return;
      }

      // --- Drawing (transient draft element: only update ref + request render) ---
      if (mode === "drawing" && drawingElRef.current) {
        const el = drawingElRef.current;
        const start = dragStartRef.current;
        const tool = s.activeTool;

        if (tool === TOOL_TYPES.FREEDRAW) {
          el.points = [...el.points, [scene.x - el.x, scene.y - el.y]];
          drawingElRef.current = { ...el };
          bindTargetRef.current = null;
        } else if (tool === TOOL_TYPES.LINE || tool === TOOL_TYPES.ARROW) {
          // Detect bind target for end point
          const endTarget = findBindTarget(s.elements, scene.x, scene.y, el.id, s.appState.zoom);
          bindTargetRef.current = endTarget ? endTarget.id : null;

          // Compute end point
          let endPt;
          if (endTarget) {
            const startWorld = { x: el.x + el.points[0][0], y: el.y + el.points[0][1] };
            endPt = getAttachmentPoint(endTarget, startWorld.x, startWorld.y);
          } else {
            endPt = { x: scene.x, y: scene.y };
          }

          // Recompute start attachment if start is bound
          let startPt = { x: el.x, y: el.y }; // default: origin offset [0,0]
          const startBinding = el.binding?.start;
          if (startBinding) {
            const startTarget = s.elements.find((e2) => e2.id === startBinding.elementId);
            if (startTarget) {
              startPt = getAttachmentPoint(startTarget, endPt.x, endPt.y);
            }
          }

          el.points = [
            [startPt.x - el.x, startPt.y - el.y],
            [endPt.x - el.x, endPt.y - el.y],
          ];
          drawingElRef.current = { ...el };
        } else {
          const w = scene.x - start.x;
          const h = scene.y - start.y;
          drawingElRef.current = {
            ...el,
            x: w < 0 ? scene.x : start.x,
            y: h < 0 ? scene.y : start.y,
            width: Math.abs(w),
            height: Math.abs(h),
          };
          bindTargetRef.current = null;
        }
        requestRender();
        return;
      }
    },
    [getState, getCanvasXY, dispatch, requestRender]
  );

  // ====================================================
  //  POINTER UP
  // ====================================================
  const handlePointerUp = useCallback(
    (e) => {
      const mode = modeRef.current;
      const s = getState();

      if (mode === "panning") {
        modeRef.current = "idle";
        requestRender();
        return;
      }

      if (mode === "dragging") {
        // When a linear element with bindings finishes dragging,
        // recompute its bound endpoints from the final positions
        const draggedIds = [...s.selectedIds];
        const allBindUpdates = [];

        // For bound shapes that were dragged, update attached lines
        const bindShapeUpdates = computeBindingUpdates(s.elements, draggedIds);
        allBindUpdates.push(...bindShapeUpdates);

        // For linear elements that were dragged, recompute endpoints
        for (const id of draggedIds) {
          const el = s.elements.find((e2) => e2.id === id);
          if (el && isLinearElement(el) && el.binding) {
            const linUpd = computeBindingUpdatesForLinear(s.elements, el);
            if (linUpd) allBindUpdates.push({ id: el.id, changes: linUpd });
          }
        }

        if (allBindUpdates.length > 0) {
          dispatch({ type: ACTION.UPDATE_ELEMENTS, updates: allBindUpdates });
        }

        modeRef.current = "idle";
        originalElsRef.current = null;
        return;
      }

      if (mode === "resizing") {
        modeRef.current = "idle";
        originalElsRef.current = null;
        resizeHandleRef.current = null;
        bindTargetRef.current = null;
        return;
      }

      if (mode === "selecting" && selectionBoxRef.current) {
        const box = selectionBoxRef.current;
        if (box.width > 2 || box.height > 2) {
          const hits = getElementsInBox(s.elements, box);
          dispatch({ type: ACTION.SET_SELECTION, ids: hits.map((el) => el.id) });
        }
        selectionBoxRef.current = null;
        modeRef.current = "idle";
        requestRender();
        return;
      }

      if (mode === "drawing" && drawingElRef.current) {
        const el = drawingElRef.current;
        const hasSize =
          el.type === "freedraw"
            ? el.points.length > 1
            : el.type === "line" || el.type === "arrow"
            ? el.points && el.points.length >= 2 &&
              (Math.abs(el.points[1]?.[0] || 0) > 2 || Math.abs(el.points[1]?.[1] || 0) > 2)
            : el.width > 2 || el.height > 2;

        if (hasSize) {
          // Finalize binding for line/arrow end point
          if (isLinearElement(el)) {
            const { x: sx, y: sy } = getCanvasXY(e);
            const endScene = screenToScene(sx, sy, s.appState);
            const endTarget = findBindTarget(s.elements, endScene.x, endScene.y, el.id, s.appState.zoom);
            const binding = el.binding || { start: null, end: null };
            if (endTarget) {
              binding.end = { elementId: endTarget.id };
              // Snap start attachment to edge (from end)
              if (binding.start) {
                const startTarget = s.elements.find((e2) => e2.id === binding.start.elementId);
                if (startTarget) {
                  const endPt = getAttachmentPoint(endTarget, el.x + el.points[0][0], el.y + el.points[0][1]);
                  const startPt = getAttachmentPoint(startTarget, endPt.x, endPt.y);
                  el.points[0] = [startPt.x - el.x, startPt.y - el.y];
                  el.points[el.points.length - 1] = [endPt.x - el.x, endPt.y - el.y];
                }
              }
            } else if (binding.start) {
              // Recompute start attachment from actual end position
              const startTarget = s.elements.find((e2) => e2.id === binding.start.elementId);
              if (startTarget) {
                const endWorldPt = { x: el.x + el.points[el.points.length - 1][0], y: el.y + el.points[el.points.length - 1][1] };
                const startPt = getAttachmentPoint(startTarget, endWorldPt.x, endWorldPt.y);
                el.points[0] = [startPt.x - el.x, startPt.y - el.y];
              }
            }
            el.binding = binding;
          }

          dispatch({ type: ACTION.ADD_ELEMENT, element: { ...el } });
          dispatch({ type: ACTION.SET_SELECTION, ids: [el.id] });
        }

        drawingElRef.current = null;
        bindTargetRef.current = null;
        modeRef.current = "idle";

        // Freedraw stays active so you can draw multiple strokes continuously
        if (!s.toolLocked && s.activeTool !== TOOL_TYPES.FREEDRAW) {
          dispatch({ type: ACTION.SET_TOOL, tool: TOOL_TYPES.SELECT });
        }
        return;
      }

      modeRef.current = "idle";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getState, dispatch, requestRender]
  );

  // ====================================================
  //  WHEEL (zoom / scroll)
  // ====================================================
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const s = getState();
      const { x: screenX, y: screenY } = getCanvasXY(e);

      if (e.ctrlKey || e.metaKey) {
        // Pinch-zoom or Ctrl+Scroll: zoom at cursor
        const delta = -e.deltaY * 0.001;
        const newZoom = s.appState.zoom * (1 + delta);
        const updates = zoomAtPoint(s.appState, newZoom, screenX, screenY);
        dispatch({ type: ACTION.SET_APP_STATE, updates });
      } else {
        // Scroll pan
        dispatch({
          type: ACTION.SET_APP_STATE,
          updates: {
            scrollX: s.appState.scrollX - e.deltaX,
            scrollY: s.appState.scrollY - e.deltaY,
          },
        });
      }
    },
    [getState, getCanvasXY, dispatch]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    const preventContextMenu = (e) => e.preventDefault();
    canvas.addEventListener("contextmenu", preventContextMenu);
    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("contextmenu", preventContextMenu);
    };
  }, [handleWheel]);

  // ====================================================
  //  TEXT CREATION
  // ====================================================
  const handleTextCreate = useCallback(
    (sceneX, sceneY) => {
      const s = getState();
      if (editingTextRef.current) return;

      const textarea = document.createElement("textarea");
      textarea.style.position = "fixed";
      const screenPos = {
        x: sceneX * s.appState.zoom + s.appState.scrollX,
        y: sceneY * s.appState.zoom + s.appState.scrollY,
      };
      const canvasRect = canvasRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
      textarea.style.left = `${canvasRect.left + screenPos.x}px`;
      textarea.style.top = `${canvasRect.top + screenPos.y}px`;
      textarea.style.fontSize = `${20 * s.appState.zoom}px`;
      textarea.style.fontFamily = "Caveat, cursive, sans-serif";
      textarea.style.color = s.appState.theme === "dark" ? "#e0e0e0" : "#1e1e1e";
      textarea.style.background = "transparent";
      textarea.style.border = "2px solid #4a7dff";
      textarea.style.borderRadius = "4px";
      textarea.style.outline = "none";
      textarea.style.resize = "none";
      textarea.style.overflow = "hidden";
      textarea.style.minWidth = "60px";
      textarea.style.minHeight = "30px";
      textarea.style.padding = "4px";
      textarea.style.zIndex = "10000";
      textarea.style.whiteSpace = "pre";
      textarea.style.lineHeight = "1.3";

      editingTextRef.current = { textarea, sceneX, sceneY };
      document.body.appendChild(textarea);
      // Delay focus so the browser finishes processing the pointer event first;
      // otherwise the canvas pointer-down steals focus back from the textarea.
      requestAnimationFrame(() => textarea.focus());

      const finalize = () => {
        const text = textarea.value.trim();
        if (text) {
          const ms = measureText(text, 20, "Caveat, cursive, sans-serif");
          const newEl = createElement(TOOL_TYPES.TEXT, {
            x: sceneX,
            y: sceneY,
            text,
            width: ms.width,
            height: ms.height,
            strokeColor: s.appState.theme === "dark" ? "#e0e0e0" : "#1e1e1e",
          }, s.defaults);
          dispatch({ type: ACTION.PUSH_HISTORY });
          dispatch({ type: ACTION.ADD_ELEMENT, element: newEl });
          dispatch({ type: ACTION.SET_SELECTION, ids: [newEl.id] });
        }
        textarea.remove();
        editingTextRef.current = null;
        if (!s.toolLocked) {
          dispatch({ type: ACTION.SET_TOOL, tool: TOOL_TYPES.SELECT });
        }
      };

      textarea.addEventListener("blur", finalize);
      textarea.addEventListener("keydown", (ke) => {
        // Stop propagation so global keyboard shortcuts (tool switching, etc.)
        // don't intercept keystrokes meant for the textarea
        ke.stopPropagation();

        // Esc = cancel editing, discard text
        if (ke.key === "Escape") {
          textarea.removeEventListener("blur", finalize);
          textarea.remove();
          editingTextRef.current = null;
          if (!s.toolLocked) {
            dispatch({ type: ACTION.SET_TOOL, tool: TOOL_TYPES.SELECT });
          }
        }
        // Enter = confirm (commit text); Shift+Enter = newline
        if (ke.key === "Enter" && !ke.shiftKey) {
          ke.preventDefault();
          textarea.blur();
        }
      });

      // Auto-resize textarea to fit content
      textarea.addEventListener("input", () => {
        textarea.style.width = "auto";
        textarea.style.height = "auto";
        textarea.style.width = textarea.scrollWidth + 8 + "px";
        textarea.style.height = textarea.scrollHeight + 4 + "px";
      });
    },
    [getState, dispatch]
  );

  // ====================================================
  //  SPACE key for pan mode
  // ====================================================
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Space" && !e.repeat) {
        spaceDownRef.current = true;
      }
    };
    const onKeyUp = (e) => {
      if (e.code === "Space") {
        spaceDownRef.current = false;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Cursor
  const mode = modeRef.current;
  const cursor =
    mode === "panning"
      ? "grabbing"
      : spaceDownRef.current
      ? "grab"
      : state.activeTool === TOOL_TYPES.SELECT
      ? "default"
      : "crosshair";

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        cursor,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      />
    </Box>
  );
}
