import { ELEMENT_TYPE, isShapeElement, isLinearElement } from "../elements/elementTypes";

const SNAP_DISTANCE = 15;

// ============================================================
//  Find the nearest bindable shape within snap distance
// ============================================================
export function findBindTarget(elements, sceneX, sceneY, excludeId, zoom) {
  const snapDist = SNAP_DISTANCE / zoom;
  let best = null;
  let bestDist = Infinity;

  for (const el of elements) {
    if (el.id === excludeId) continue;
    if (!isShapeElement(el)) continue;
    if (el.locked) continue;

    const dist = distToShapeEdge(el, sceneX, sceneY);
    if (dist < snapDist && dist < bestDist) {
      bestDist = dist;
      best = el;
    }
  }
  return best;
}

// ============================================================
//  Compute the attachment point on a shape's edge
//  given a "from" point (the other end of the line).
//  Uses ray-from-center-to-"from" intersection with the shape boundary.
// ============================================================
export function getAttachmentPoint(targetEl, fromX, fromY) {
  const cx = targetEl.x + targetEl.width / 2;
  const cy = targetEl.y + targetEl.height / 2;

  const dx = fromX - cx;
  const dy = fromY - cy;

  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
    return { x: targetEl.x + targetEl.width / 2, y: targetEl.y };
  }

  switch (targetEl.type) {
    case ELEMENT_TYPE.RECTANGLE:
      return rayRectIntersection(cx, cy, dx, dy, targetEl);
    case ELEMENT_TYPE.ELLIPSE:
      return rayEllipseIntersection(cx, cy, dx, dy, targetEl);
    case ELEMENT_TYPE.DIAMOND:
      return rayDiamondIntersection(cx, cy, dx, dy, targetEl);
    default:
      return { x: cx, y: cy };
  }
}

// ============================================================
//  Update all bound line/arrow endpoints after shapes moved.
//  Call this after any element move/resize with the updated elements.
//  Returns an array of { id, updates } for lines that need updating.
// ============================================================
export function computeBindingUpdates(elements, movedIds) {
  const movedSet = new Set(movedIds);
  const elMap = new Map(elements.map((el) => [el.id, el]));
  const updates = [];

  for (const el of elements) {
    if (!isLinearElement(el)) continue;
    if (!el.binding) continue;

    const pts = el.points ? el.points.map((p) => [...p]) : [];
    if (pts.length < 2) continue;
    let changed = false;

    // Start binding
    if (el.binding.start) {
      const target = elMap.get(el.binding.start.elementId);
      if (target && movedSet.has(target.id)) {
        const otherEnd = { x: el.x + pts[pts.length - 1][0], y: el.y + pts[pts.length - 1][1] };
        const attach = getAttachmentPoint(target, otherEnd.x, otherEnd.y);
        pts[0] = [attach.x - el.x, attach.y - el.y];
        changed = true;
      }
    }

    // End binding
    if (el.binding.end) {
      const target = elMap.get(el.binding.end.elementId);
      if (target && movedSet.has(target.id)) {
        const otherEnd = { x: el.x + pts[0][0], y: el.y + pts[0][1] };
        const attach = getAttachmentPoint(target, otherEnd.x, otherEnd.y);
        pts[pts.length - 1] = [attach.x - el.x, attach.y - el.y];
        changed = true;
      }
    }

    if (changed) {
      updates.push({ id: el.id, changes: { points: pts } });
    }
  }

  return updates;
}

// Also update when the linear element itself moves (both bound endpoints follow)
export function computeBindingUpdatesForLinear(elements, linearEl) {
  if (!linearEl.binding) return null;
  const elMap = new Map(elements.map((el) => [el.id, el]));
  const pts = linearEl.points ? linearEl.points.map((p) => [...p]) : [];
  if (pts.length < 2) return null;
  let changed = false;

  if (linearEl.binding.start) {
    const target = elMap.get(linearEl.binding.start.elementId);
    if (target) {
      const otherEnd = { x: linearEl.x + pts[pts.length - 1][0], y: linearEl.y + pts[pts.length - 1][1] };
      const attach = getAttachmentPoint(target, otherEnd.x, otherEnd.y);
      pts[0] = [attach.x - linearEl.x, attach.y - linearEl.y];
      changed = true;
    }
  }

  if (linearEl.binding.end) {
    const target = elMap.get(linearEl.binding.end.elementId);
    if (target) {
      const otherEnd = { x: linearEl.x + pts[0][0], y: linearEl.y + pts[0][1] };
      const attach = getAttachmentPoint(target, otherEnd.x, otherEnd.y);
      pts[pts.length - 1] = [attach.x - linearEl.x, attach.y - linearEl.y];
      changed = true;
    }
  }

  return changed ? { points: pts } : null;
}

// ============================================================
//  Distance from point to shape edge (for snap detection)
// ============================================================
function distToShapeEdge(el, px, py) {
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;

  switch (el.type) {
    case ELEMENT_TYPE.RECTANGLE:
      return distToRect(px, py, el.x, el.y, el.width, el.height);
    case ELEMENT_TYPE.ELLIPSE:
      return distToEllipse(px, py, cx, cy, el.width / 2, el.height / 2);
    case ELEMENT_TYPE.DIAMOND:
      return distToDiamond(px, py, el);
    default:
      return Infinity;
  }
}

function distToRect(px, py, rx, ry, rw, rh) {
  const edges = [
    [rx, ry, rx + rw, ry],
    [rx + rw, ry, rx + rw, ry + rh],
    [rx + rw, ry + rh, rx, ry + rh],
    [rx, ry + rh, rx, ry],
  ];
  let min = Infinity;
  for (const [x1, y1, x2, y2] of edges) {
    min = Math.min(min, distToSegment(px, py, x1, y1, x2, y2));
  }
  return min;
}

function distToEllipse(px, py, cx, cy, a, b) {
  if (a < 1 || b < 1) return Infinity;
  const dx = px - cx;
  const dy = py - cy;
  const angle = Math.atan2(dy / b, dx / a);
  const ex = cx + a * Math.cos(angle);
  const ey = cy + b * Math.sin(angle);
  return Math.hypot(px - ex, py - ey);
}

function distToDiamond(px, py, el) {
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;
  const top = [cx, el.y];
  const right = [el.x + el.width, cy];
  const bottom = [cx, el.y + el.height];
  const left = [el.x, cy];
  const edges = [
    [...top, ...right],
    [...right, ...bottom],
    [...bottom, ...left],
    [...left, ...top],
  ];
  let min = Infinity;
  for (const [x1, y1, x2, y2] of edges) {
    min = Math.min(min, distToSegment(px, py, x1, y1, x2, y2));
  }
  return min;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const ddx = x2 - x1;
  const ddy = y2 - y1;
  const lenSq = ddx * ddx + ddy * ddy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);
  let t = ((px - x1) * ddx + (py - y1) * ddy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * ddx), py - (y1 + t * ddy));
}

// ============================================================
//  Ray-shape intersection for attachment point computation
// ============================================================
function rayRectIntersection(cx, cy, dx, dy, el) {
  const hw = el.width / 2;
  const hh = el.height / 2;
  let tMin = Infinity;

  if (dx !== 0) {
    const t = dx > 0 ? hw / dx : -hw / dx;
    if (t > 0 && Math.abs(t * dy) <= hh) tMin = Math.min(tMin, t);
  }
  if (dy !== 0) {
    const t = dy > 0 ? hh / dy : -hh / dy;
    if (t > 0 && Math.abs(t * dx) <= hw) tMin = Math.min(tMin, t);
  }

  if (tMin === Infinity) tMin = 1;
  return { x: cx + dx * tMin, y: cy + dy * tMin };
}

function rayEllipseIntersection(cx, cy, dx, dy, el) {
  const a = el.width / 2;
  const b = el.height / 2;
  if (a < 1 || b < 1) return { x: cx, y: cy };
  const ndx = dx / a;
  const ndy = dy / b;
  const len = Math.hypot(ndx, ndy);
  if (len < 0.001) return { x: cx, y: cy - b };
  const t = 1 / len;
  return { x: cx + dx * t, y: cy + dy * t };
}

function rayDiamondIntersection(cx, cy, dx, dy, el) {
  const hw = el.width / 2;
  const hh = el.height / 2;
  const vertices = [
    [0, -hh],
    [hw, 0],
    [0, hh],
    [-hw, 0],
  ];

  let bestT = Infinity;
  for (let i = 0; i < 4; i++) {
    const [ax, ay] = vertices[i];
    const [bx, by] = vertices[(i + 1) % 4];
    const t = raySegIntersect(0, 0, dx, dy, ax, ay, bx, by);
    if (t !== null && t > 0 && t < bestT) bestT = t;
  }

  if (bestT === Infinity) bestT = 1;
  return { x: cx + dx * bestT, y: cy + dy * bestT };
}

function raySegIntersect(ox, oy, dx, dy, ax, ay, bx, by) {
  const sx = bx - ax;
  const sy = by - ay;
  const denom = dx * sy - dy * sx;
  if (Math.abs(denom) < 1e-10) return null;
  const t = ((ax - ox) * sy - (ay - oy) * sx) / denom;
  const u = ((ax - ox) * dy - (ay - oy) * dx) / denom;
  if (u >= 0 && u <= 1 && t > 0) return t;
  return null;
}
