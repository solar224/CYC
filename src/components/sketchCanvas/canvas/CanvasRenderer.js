import rough from "roughjs";
import { renderElement } from "../elements/elementRenderer";
import { GRID_SIZE } from "../constants";
import { getElementBounds, ELEMENT_TYPE, isLinearElement, isShapeElement } from "../elements/elementTypes";
import { getRenderedPoints, setShapeObstacles } from "../elements/lineHelpers";

/*
 * Coordinate system:
 *   screenX = worldX * zoom + scrollX
 *   screenY = worldY * zoom + scrollY
 *
 * scrollX/Y = pixel offset of the world origin on screen.
 * zoom = scale factor, centered on cursor via zoomAtPoint().
 *
 * Canvas physical pixels = CSS pixels * devicePixelRatio.
 * We set ctx transform = (dpr * zoom, 0, 0, dpr * zoom, dpr * scrollX, dpr * scrollY)
 * so all element coordinates are in world space.
 */

export function createRenderer(canvas) {
  const ctx = canvas.getContext("2d");
  const rc = rough.canvas(canvas);
  return { ctx, rc, canvas };
}

export function renderScene(renderer, state, extras = {}) {
  const { ctx, rc, canvas } = renderer;
  const { elements, selectedIds, appState } = state;
  const { zoom, scrollX, scrollY, grid, theme } = appState;
  const dpr = window.devicePixelRatio || 1;

  // Reset to identity, clear full physical canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  const bgColor = theme === "dark" ? "#1e1e2e" : "#f8f9fa";
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid (drawn in screen space with DPR scaling)
  if (grid) {
    drawGrid(ctx, scrollX, scrollY, zoom, canvas.width / dpr, canvas.height / dpr, theme, dpr);
  }

  // World-space transform: physical = world * zoom * dpr + scroll * dpr
  ctx.setTransform(dpr * zoom, 0, 0, dpr * zoom, dpr * scrollX, dpr * scrollY);

  // Set obstacle context so elbow connectors route around shapes
  setShapeObstacles(elements.filter(isShapeElement));

  // Render elements sorted by z-index
  const sorted = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
  for (const el of sorted) {
    renderElement(ctx, rc, el);
  }

  // Draft element being drawn (transient, not in state)
  if (extras.drawingElement) {
    renderElement(ctx, rc, extras.drawingElement);
  }

  // Selection overlay (AABB bounding box + 8-point handles, no rotate)
  if (selectedIds.size > 0) {
    drawSelectionOverlay(ctx, elements, selectedIds, theme, zoom, dpr);
  }

  // Bind-target highlight (glowing shape when line endpoint approaches)
  if (extras.bindTarget) {
    const targetEl = elements.find((el) => el.id === extras.bindTarget);
    if (targetEl) {
      drawBindHighlight(ctx, targetEl, theme, zoom);
    }
  }

  // Box-select rubberband
  if (extras.selectionBox) {
    drawSelectionBox(ctx, extras.selectionBox, theme);
  }
}

function drawGrid(ctx, scrollX, scrollY, zoom, viewW, viewH, theme, dpr) {
  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const gridColor = theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  ctx.fillStyle = gridColor;

  const step = GRID_SIZE * zoom;
  const offsetX = ((scrollX % step) + step) % step;
  const offsetY = ((scrollY % step) + step) % step;

  for (let x = offsetX; x < viewW; x += step) {
    for (let y = offsetY; y < viewH; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawSelectionOverlay(ctx, elements, selectedIds, theme, zoom) {
  const accentColor = theme === "dark" ? "#7c9cff" : "#4a7dff";
  const invZoom = 1 / zoom;
  const lw = 1.5 * invZoom;
  const hs = 8 * invZoom;
  const pad = 4 * invZoom;

  for (const el of elements) {
    if (!selectedIds.has(el.id)) continue;

    ctx.save();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = lw;
    ctx.setLineDash([]);

    // --- Shape-conforming outline ---
    switch (el.type) {
      case ELEMENT_TYPE.RECTANGLE:
      case ELEMENT_TYPE.TEXT: {
        ctx.strokeRect(el.x - pad, el.y - pad, (el.width || 0) + pad * 2, (el.height || 0) + pad * 2);
        break;
      }
      case ELEMENT_TYPE.ELLIPSE: {
        const cx = el.x + el.width / 2;
        const cy = el.y + el.height / 2;
        const rx = el.width / 2 + pad;
        const ry = el.height / 2 + pad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case ELEMENT_TYPE.DIAMOND: {
        const cx = el.x + el.width / 2;
        const cy = el.y + el.height / 2;
        const hw = el.width / 2 + pad;
        const hh = el.height / 2 + pad;
        ctx.beginPath();
        ctx.moveTo(cx, cy - hh);
        ctx.lineTo(cx + hw, cy);
        ctx.lineTo(cx, cy + hh);
        ctx.lineTo(cx - hw, cy);
        ctx.closePath();
        ctx.stroke();
        break;
      }
      case ELEMENT_TYPE.LINE:
      case ELEMENT_TYPE.ARROW: {
        if (el.points && el.points.length >= 2) {
          const rendered = getRenderedPoints(el);
          ctx.lineWidth = Math.max(lw, (el.strokeWidth || 2) * invZoom) + pad * 2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = 0.35;
          ctx.beginPath();
          ctx.moveTo(el.x + rendered[0][0], el.y + rendered[0][1]);
          for (let i = 1; i < rendered.length; i++) {
            ctx.lineTo(el.x + rendered[i][0], el.y + rendered[i][1]);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        break;
      }
      case ELEMENT_TYPE.FREEDRAW: {
        if (el.points && el.points.length >= 2) {
          ctx.lineWidth = Math.max(lw, (el.strokeWidth || 2) * invZoom) + pad * 2;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalAlpha = 0.35;
          ctx.beginPath();
          ctx.moveTo(el.x + el.points[0][0], el.y + el.points[0][1]);
          for (let i = 1; i < el.points.length; i++) {
            ctx.lineTo(el.x + el.points[i][0], el.y + el.points[i][1]);
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        break;
      }
      default: {
        const b = getElementBounds(el);
        ctx.strokeRect(b.x - pad, b.y - pad, b.width + pad * 2, b.height + pad * 2);
        break;
      }
    }

    // --- Handles ---
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = lw;
    ctx.globalAlpha = 1;

    const handles = getHandlePositionsForElement(el, pad);
    for (const h of handles) {
      ctx.fillRect(h.x - hs / 2, h.y - hs / 2, hs, hs);
      ctx.strokeRect(h.x - hs / 2, h.y - hs / 2, hs, hs);
    }

    ctx.restore();
  }
}

// Returns handle positions adapted to the element type.
// Shapes: 8-point AABB handles.
// Lines/arrows: handles at each point (start + end).
// Freedraw: handles at start + end.
export function getHandlePositionsForElement(el, pad = 4) {
  if (isLinearElement(el) && el.points && el.points.length >= 2) {
    return el.points.map((pt, i) => ({
      key: i === 0 ? "line-start" : i === el.points.length - 1 ? "line-end" : `pt-${i}`,
      x: el.x + pt[0],
      y: el.y + pt[1],
    }));
  }

  if (el.type === ELEMENT_TYPE.FREEDRAW) {
    if (!el.points || el.points.length < 2) return [];
    const first = el.points[0];
    const last = el.points[el.points.length - 1];
    return [
      { key: "fd-start", x: el.x + first[0], y: el.y + first[1] },
      { key: "fd-end", x: el.x + last[0], y: el.y + last[1] },
    ];
  }

  // Standard 8-point AABB handles for shapes
  const { x, y, width: w = 0, height: h = 0 } = el;
  return [
    { key: "nw", x: x - pad, y: y - pad },
    { key: "n",  x: x + w / 2, y: y - pad },
    { key: "ne", x: x + w + pad, y: y - pad },
    { key: "e",  x: x + w + pad, y: y + h / 2 },
    { key: "se", x: x + w + pad, y: y + h + pad },
    { key: "s",  x: x + w / 2, y: y + h + pad },
    { key: "sw", x: x - pad, y: y + h + pad },
    { key: "w",  x: x - pad, y: y + h / 2 },
  ];
}

function drawBindHighlight(ctx, el, theme, zoom) {
  const invZoom = 1 / zoom;
  const pad = 6 * invZoom;
  const lw = 2.5 * invZoom;
  const highlightColor = theme === "dark" ? "rgba(100, 200, 255, 0.7)" : "rgba(0, 120, 255, 0.6)";

  ctx.save();
  ctx.strokeStyle = highlightColor;
  ctx.lineWidth = lw;
  ctx.setLineDash([6 * invZoom, 4 * invZoom]);

  switch (el.type) {
    case ELEMENT_TYPE.RECTANGLE: {
      ctx.strokeRect(el.x - pad, el.y - pad, el.width + pad * 2, el.height + pad * 2);
      break;
    }
    case ELEMENT_TYPE.ELLIPSE: {
      const cx = el.x + el.width / 2;
      const cy = el.y + el.height / 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, el.width / 2 + pad, el.height / 2 + pad, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case ELEMENT_TYPE.DIAMOND: {
      const cx = el.x + el.width / 2;
      const cy = el.y + el.height / 2;
      const hw = el.width / 2 + pad;
      const hh = el.height / 2 + pad;
      ctx.beginPath();
      ctx.moveTo(cx, cy - hh);
      ctx.lineTo(cx + hw, cy);
      ctx.lineTo(cx, cy + hh);
      ctx.lineTo(cx - hw, cy);
      ctx.closePath();
      ctx.stroke();
      break;
    }
    default:
      break;
  }

  ctx.restore();
}

function drawSelectionBox(ctx, box, theme) {
  ctx.save();
  const fillColor = theme === "dark" ? "rgba(124,156,255,0.15)" : "rgba(74,125,255,0.12)";
  const borderColor = theme === "dark" ? "#7c9cff" : "#4a7dff";
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1 / (ctx.getTransform().a / (window.devicePixelRatio || 1));
  ctx.fillRect(box.x, box.y, box.width, box.height);
  ctx.strokeRect(box.x, box.y, box.width, box.height);
  ctx.restore();
}
