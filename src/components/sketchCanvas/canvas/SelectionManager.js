import { getElementBounds, isLinearElement } from "../elements/elementTypes";
import { ELEMENT_TYPE } from "../elements/elementTypes";
import { getRenderedPoints } from "../elements/lineHelpers";

// Tolerance = max(8, strokeWidth * 2), scaled inversely by zoom
// so thin lines at zoomed-out views are still clickable.
function getHitTolerance(el, zoom) {
  const base = Math.max(8, (el.strokeWidth || 2) * 2);
  return base / zoom;
}

export function hitTestElement(el, sceneX, sceneY, zoom = 1) {
  if (el.locked) return false;
  const tol = getHitTolerance(el, zoom);

  if (el.type === ELEMENT_TYPE.FREEDRAW) {
    return hitTestFreedraw(el, sceneX, sceneY, tol);
  }

  if (isLinearElement(el)) {
    return hitTestLinear(el, sceneX, sceneY, tol);
  }

  if (el.type === ELEMENT_TYPE.TEXT) {
    return hitTestBox(el, sceneX, sceneY, tol);
  }

  // For shapes: check fill area first (if filled), then stroke border
  return hitTestShape(el, sceneX, sceneY, tol);
}

function hitTestShape(el, sx, sy, tol) {
  const b = getElementBounds(el);
  const hasFill = el.fillColor && el.fillColor !== "transparent";

  if (hasFill) {
    // Point inside the shape bounding box = hit (fill area)
    if (sx >= b.x && sx <= b.x + b.width && sy >= b.y && sy <= b.y + b.height) {
      return true;
    }
  }

  // Stroke border: within tolerance of the bounding rectangle edges
  const inOuter = sx >= b.x - tol && sx <= b.x + b.width + tol &&
                  sy >= b.y - tol && sy <= b.y + b.height + tol;
  const inInner = sx >= b.x + tol && sx <= b.x + b.width - tol &&
                  sy >= b.y + tol && sy <= b.y + b.height - tol;

  return inOuter && !inInner;
}

function hitTestBox(el, sx, sy, tol) {
  const b = getElementBounds(el);
  return (
    sx >= b.x - tol &&
    sx <= b.x + b.width + tol &&
    sy >= b.y - tol &&
    sy <= b.y + b.height + tol
  );
}

function hitTestLinear(el, sx, sy, tol) {
  if (!el.points || el.points.length < 2) return false;
  const rendered = getRenderedPoints(el);
  for (let i = 0; i < rendered.length - 1; i++) {
    const x1 = el.x + rendered[i][0];
    const y1 = el.y + rendered[i][1];
    const x2 = el.x + rendered[i + 1][0];
    const y2 = el.y + rendered[i + 1][1];
    if (distToSegment(sx, sy, x1, y1, x2, y2) < tol) return true;
  }
  return false;
}

function hitTestFreedraw(el, sx, sy, tol) {
  if (!el.points || el.points.length < 2) return false;
  for (let i = 0; i < el.points.length - 1; i++) {
    const x1 = el.x + el.points[i][0];
    const y1 = el.y + el.points[i][1];
    const x2 = el.x + el.points[i + 1][0];
    const y2 = el.y + el.points[i + 1][1];
    if (distToSegment(sx, sy, x1, y1, x2, y2) < tol) return true;
  }
  return false;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

export function getElementAtPosition(elements, sceneX, sceneY, zoom = 1) {
  // Search top-to-bottom by z-index; first hit wins
  const sorted = [...elements].sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0));
  for (const el of sorted) {
    if (hitTestElement(el, sceneX, sceneY, zoom)) return el;
  }
  return null;
}

export function getElementsInBox(elements, box) {
  return elements.filter((el) => {
    if (el.locked) return false;
    const b = getElementBounds(el);
    return (
      b.x >= box.x &&
      b.y >= box.y &&
      b.x + b.width <= box.x + box.width &&
      b.y + b.height <= box.y + box.height
    );
  });
}

// Hit-test resize/endpoint handles. Accepts the element directly
// so it can use shape-specific handle positions.
export function hitTestHandle(el, sceneX, sceneY, zoom) {
  const handleSize = 10 / zoom;
  const pad = 4 / zoom;

  // For linear elements: test start/end point handles
  if (isLinearElement(el) && el.points && el.points.length >= 2) {
    for (let i = 0; i < el.points.length; i++) {
      const hx = el.x + el.points[i][0];
      const hy = el.y + el.points[i][1];
      if (Math.abs(sceneX - hx) < handleSize / 2 && Math.abs(sceneY - hy) < handleSize / 2) {
        return i === 0 ? "line-start" : "line-end";
      }
    }
    return null;
  }

  // For shapes: 8-point AABB handles
  const { x, y, width: w = 0, height: h = 0 } = el;
  const handles = [
    { key: "nw", hx: x - pad, hy: y - pad },
    { key: "n",  hx: x + w / 2, hy: y - pad },
    { key: "ne", hx: x + w + pad, hy: y - pad },
    { key: "e",  hx: x + w + pad, hy: y + h / 2 },
    { key: "se", hx: x + w + pad, hy: y + h + pad },
    { key: "s",  hx: x + w / 2, hy: y + h + pad },
    { key: "sw", hx: x - pad, hy: y + h + pad },
    { key: "w",  hx: x - pad, hy: y + h / 2 },
  ];

  for (const handle of handles) {
    if (
      Math.abs(sceneX - handle.hx) < handleSize / 2 &&
      Math.abs(sceneY - handle.hy) < handleSize / 2
    ) {
      return handle.key;
    }
  }

  return null;
}
