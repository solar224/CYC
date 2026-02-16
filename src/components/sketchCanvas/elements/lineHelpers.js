/**
 * Shared helpers for computing rendered paths for line/arrow lineTypes.
 * Includes obstacle-aware routing so elbow connectors avoid shape edges,
 * and perpendicular approach stubs so lines/arrows meet shapes at 90°.
 *
 * Usage: call setShapeObstacles(shapes) before rendering / hit-testing,
 * then getRenderedPoints(el) will route elbow paths around them and
 * add perpendicular stubs at bound endpoints.
 */

// ============================================================
//  Module-level obstacle context (also used for normal lookup)
// ============================================================
let _shapeObstacles = [];

export function setShapeObstacles(shapes) {
  _shapeObstacles = shapes;
}

// ============================================================
//  Outward normal at an attachment point on a shape surface
// ============================================================
const STUB_LENGTH = 24;

function getOutwardNormal(shape, ax, ay) {
  switch (shape.type) {
    case "rectangle": {
      const distTop = Math.abs(ay - shape.y);
      const distBot = Math.abs(ay - (shape.y + shape.height));
      const distLeft = Math.abs(ax - shape.x);
      const distRight = Math.abs(ax - (shape.x + shape.width));
      const min = Math.min(distTop, distBot, distLeft, distRight);
      if (min === distTop) return { nx: 0, ny: -1 };
      if (min === distBot) return { nx: 0, ny: 1 };
      if (min === distLeft) return { nx: -1, ny: 0 };
      return { nx: 1, ny: 0 };
    }
    case "ellipse": {
      const cx = shape.x + shape.width / 2;
      const cy = shape.y + shape.height / 2;
      const a = shape.width / 2;
      const b = shape.height / 2;
      if (a < 1 || b < 1) return { nx: 0, ny: -1 };
      const dnx = (ax - cx) / (a * a);
      const dny = (ay - cy) / (b * b);
      const len = Math.hypot(dnx, dny) || 1;
      return { nx: dnx / len, ny: dny / len };
    }
    case "diamond": {
      const cx = shape.x + shape.width / 2;
      const cy = shape.y + shape.height / 2;
      const hw = shape.width / 2;
      const hh = shape.height / 2;
      const dx = ax - cx;
      const dy = ay - cy;
      // Each diamond face has a constant outward normal
      let nnx, nny;
      if (dx >= 0 && dy <= 0) { nnx = hh; nny = -hw; }       // top-right face
      else if (dx >= 0 && dy > 0) { nnx = hh; nny = hw; }     // bottom-right face
      else if (dx < 0 && dy > 0) { nnx = -hh; nny = hw; }     // bottom-left face
      else { nnx = -hh; nny = -hw; }                           // top-left face
      const len = Math.hypot(nnx, nny) || 1;
      return { nx: nnx / len, ny: nny / len };
    }
    default:
      return { nx: 0, ny: -1 };
  }
}

// ============================================================
//  Perpendicular approach: insert stubs at bound endpoints
// ============================================================

/**
 * Post-process rendered path: insert a short perpendicular stub segment
 * at each bound endpoint so the line meets shapes at 90°.
 */
function addPerpendicularApproach(pts, el) {
  if (!el.binding) return pts;

  const ox = el.x || 0;
  const oy = el.y || 0;
  const result = [...pts];

  // End binding first (so index doesn't shift for start)
  if (el.binding.end) {
    const target = _shapeObstacles.find((s) => s.id === el.binding.end.elementId);
    if (target) {
      const last = result[result.length - 1];
      const attachW = { x: ox + last[0], y: oy + last[1] };
      const n = getOutwardNormal(target, attachW.x, attachW.y);
      const stubLen = Math.min(STUB_LENGTH, totalLen(result) * 0.25);
      const stub = [last[0] + n.nx * stubLen, last[1] + n.ny * stubLen];
      result.splice(result.length - 1, 0, stub);
    }
  }

  // Start binding
  if (el.binding.start) {
    const target = _shapeObstacles.find((s) => s.id === el.binding.start.elementId);
    if (target) {
      const first = result[0];
      const attachW = { x: ox + first[0], y: oy + first[1] };
      const n = getOutwardNormal(target, attachW.x, attachW.y);
      const stubLen = Math.min(STUB_LENGTH, totalLen(result) * 0.25);
      const stub = [first[0] + n.nx * stubLen, first[1] + n.ny * stubLen];
      result.splice(1, 0, stub);
    }
  }

  return result;
}

function totalLen(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  return len || 1;
}

// ============================================================
//  Curve helpers
// ============================================================
export function getCurveControlPoint(p0, p1) {
  const mx = (p0[0] + p1[0]) / 2;
  const my = (p0[1] + p1[1]) / 2;
  const dx = p1[0] - p0[0];
  const dy = p1[1] - p0[1];
  const len = Math.hypot(dx, dy) || 1;
  const offset = len * 0.3;
  const nx = -dy / len;
  const ny = dx / len;
  return [mx + nx * offset, my + ny * offset];
}

export function getCurvePoints(p0, p1, segments = 24) {
  const cp = getCurveControlPoint(p0, p1);
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const mt = 1 - t;
    const x = mt * mt * p0[0] + 2 * mt * t * cp[0] + t * t * p1[0];
    const y = mt * mt * p0[1] + 2 * mt * t * cp[1] + t * t * p1[1];
    pts.push([x, y]);
  }
  return pts;
}

// ============================================================
//  Elbow helpers (with obstacle avoidance + perpendicular entry)
// ============================================================
const AVOID_MARGIN = 12;

/**
 * Build an elbow path that respects the outward normal at each bound end.
 * If the start is on a top/bottom face → first segment is vertical.
 * If the start is on a left/right face → first segment is horizontal (classic).
 */
function elbowWithNormals(el) {
  const p0 = el.points[0];
  const p1 = el.points[el.points.length - 1];
  const ox = el.x || 0;
  const oy = el.y || 0;

  const startNorm = getBoundNormal(el.binding?.start, ox + p0[0], oy + p0[1]);
  const endNorm = getBoundNormal(el.binding?.end, ox + p1[0], oy + p1[1]);

  const startIsV = startNorm && Math.abs(startNorm.ny) > Math.abs(startNorm.nx);
  const endIsV = endNorm && Math.abs(endNorm.ny) > Math.abs(endNorm.nx);

  // Determine routing strategy based on approach directions
  let worldPath;
  const wp0 = [ox + p0[0], oy + p0[1]];
  const wp1 = [ox + p1[0], oy + p1[1]];

  if (startIsV && endIsV) {
    // Both vertical entry: V → H → V
    const midY = (wp0[1] + wp1[1]) / 2;
    worldPath = [wp0, [wp0[0], midY], [wp1[0], midY], wp1];
  } else if (!startIsV && !endIsV) {
    // Both horizontal entry (classic): H → V → H
    const midX = (wp0[0] + wp1[0]) / 2;
    worldPath = [wp0, [midX, wp0[1]], [midX, wp1[1]], wp1];
  } else if (startIsV && !endIsV) {
    // Start vertical, end horizontal: V → H
    worldPath = [wp0, [wp0[0], wp1[1]], wp1];
  } else {
    // Start horizontal, end vertical: H → V
    worldPath = [wp0, [wp1[0], wp0[1]], wp1];
  }

  return worldPath.map(([x, y]) => [x - ox, y - oy]);
}

function getBoundNormal(binding, ax, ay) {
  if (!binding) return null;
  const target = _shapeObstacles.find((s) => s.id === binding.elementId);
  if (!target) return null;
  return getOutwardNormal(target, ax, ay);
}

/** Simple elbow (no obstacle awareness). */
function elbowSimple(p0, p1) {
  const midX = (p0[0] + p1[0]) / 2;
  return [[p0[0], p0[1]], [midX, p0[1]], [midX, p1[1]], [p1[0], p1[1]]];
}

/**
 * Obstacle-aware elbow routing.
 * Tries multiple candidate positions and picks the one that
 * minimises overlap with shape edges.
 */
function elbowAvoiding(el) {
  // Start with normal-aware base path
  const basePath = elbowWithNormals(el);

  const ox = el.x || 0;
  const oy = el.y || 0;

  // Exclude bound shapes from obstacles
  const boundIds = new Set();
  if (el.binding?.start?.elementId) boundIds.add(el.binding.start.elementId);
  if (el.binding?.end?.elementId) boundIds.add(el.binding.end.elementId);
  const obstacles = _shapeObstacles.filter((s) => !boundIds.has(s.id));

  if (obstacles.length === 0) return basePath;

  // Convert basePath to world coords for scoring
  const worldBase = basePath.map(([x, y]) => [x + ox, y + oy]);
  const baseScore = scoreWorldPath(worldBase, obstacles);
  if (baseScore === 0) return basePath;

  // Try shifting the "middle" segment(s) to avoid obstacles
  const p0 = el.points[0];
  const p1 = el.points[el.points.length - 1];
  const wp0 = [ox + p0[0], oy + p0[1]];
  const wp1 = [ox + p1[0], oy + p1[1]];

  const startNorm = getBoundNormal(el.binding?.start, wp0[0], wp0[1]);
  const endNorm = getBoundNormal(el.binding?.end, wp1[0], wp1[1]);
  const startIsV = startNorm && Math.abs(startNorm.ny) > Math.abs(startNorm.nx);
  const endIsV = endNorm && Math.abs(endNorm.ny) > Math.abs(endNorm.nx);

  // The adjustable "mid" value is either midX or midY depending on path orientation
  const isVHV = startIsV && endIsV;
  const nomMid = isVHV ? (wp0[1] + wp1[1]) / 2 : (wp0[0] + wp1[0]) / 2;

  const candidates = [nomMid];
  for (const obs of obstacles) {
    if (isVHV) {
      candidates.push(obs.y - AVOID_MARGIN);
      candidates.push(obs.y + obs.height + AVOID_MARGIN);
    } else {
      candidates.push(obs.x - AVOID_MARGIN);
      candidates.push(obs.x + obs.width + AVOID_MARGIN);
    }
  }

  let bestPath = basePath;
  let bestScore = baseScore + Math.abs(nomMid - nomMid) * 0.05;

  for (const cm of candidates) {
    let worldPath;
    if (isVHV) {
      worldPath = [wp0, [wp0[0], cm], [wp1[0], cm], wp1];
    } else if (!startIsV && !endIsV) {
      worldPath = [wp0, [cm, wp0[1]], [cm, wp1[1]], wp1];
    } else if (startIsV && !endIsV) {
      worldPath = [wp0, [wp0[0], cm], [wp1[0], cm], wp1];
    } else {
      worldPath = [wp0, [cm, wp0[1]], [cm, wp1[1]], wp1];
    }

    const score = scoreWorldPath(worldPath, obstacles) + Math.abs(cm - nomMid) * 0.05;
    if (score < bestScore) {
      bestScore = score;
      bestPath = worldPath.map(([x, y]) => [x - ox, y - oy]);
    }
  }

  return bestPath;
}

/** Score a world-space polyline: higher = more overlap with obstacles. */
function scoreWorldPath(worldPts, obstacles) {
  let score = 0;
  for (let i = 0; i < worldPts.length - 1; i++) {
    const seg = {
      x1: worldPts[i][0], y1: worldPts[i][1],
      x2: worldPts[i + 1][0], y2: worldPts[i + 1][1],
    };
    const isH = Math.abs(seg.y1 - seg.y2) < 0.5;
    for (const obs of obstacles) {
      score += isH ? hSegOverlap(seg, obs) : vSegOverlap(seg, obs);
    }
  }
  return score;
}

function hSegOverlap(seg, obs) {
  const y = seg.y1;
  const xMin = Math.min(seg.x1, seg.x2);
  const xMax = Math.max(seg.x1, seg.x2);
  if (xMax <= obs.x || xMin >= obs.x + obs.width) return 0;
  let pen = 0;
  if (Math.abs(y - obs.y) < AVOID_MARGIN) pen += 100;
  if (Math.abs(y - (obs.y + obs.height)) < AVOID_MARGIN) pen += 100;
  if (y > obs.y && y < obs.y + obs.height) pen += 30;
  return pen;
}

function vSegOverlap(seg, obs) {
  const x = seg.x1;
  const yMin = Math.min(seg.y1, seg.y2);
  const yMax = Math.max(seg.y1, seg.y2);
  if (yMax <= obs.y || yMin >= obs.y + obs.height) return 0;
  let pen = 0;
  if (Math.abs(x - obs.x) < AVOID_MARGIN) pen += 100;
  if (Math.abs(x - (obs.x + obs.width)) < AVOID_MARGIN) pen += 100;
  if (x > obs.x && x < obs.x + obs.width) pen += 30;
  return pen;
}

// ============================================================
//  Public API
// ============================================================

export function getElbowPoints(p0, p1) {
  return elbowSimple(p0, p1);
}

/**
 * Get the rendered path points for a linear element.
 * - Elbow: obstacle-aware routing with perpendicular entry
 * - All types with bindings: perpendicular approach stubs at bound endpoints
 */
export function getRenderedPoints(el) {
  if (!el.points || el.points.length < 2) return el.points || [];
  const p0 = el.points[0];
  const p1 = el.points[el.points.length - 1];

  let pts;
  switch (el.lineType) {
    case "curve":
      pts = getCurvePoints(p0, p1);
      break;
    case "elbow":
      pts = _shapeObstacles.length > 0 ? elbowAvoiding(el) : elbowSimple(p0, p1);
      break;
    default:
      pts = el.points;
      break;
  }

  // For non-elbow types, add perpendicular stubs at bound endpoints
  // (Elbow already handles perpendicular entry via elbowWithNormals)
  if (el.lineType !== "elbow" && _shapeObstacles.length > 0) {
    pts = addPerpendicularApproach(pts, el);
  }

  return pts;
}

/**
 * Get tangent directions at the start and end of the rendered path.
 * Used for correct arrowhead orientation.
 */
export function getEndTangents(el) {
  const rendered = getRenderedPoints(el);
  if (rendered.length < 2) return { startAngle: 0, endAngle: 0 };

  const first = rendered[0];
  const second = rendered[1];
  const secondLast = rendered[rendered.length - 2];
  const last = rendered[rendered.length - 1];

  return {
    startAngle: Math.atan2(first[1] - second[1], first[0] - second[0]),
    endAngle: Math.atan2(last[1] - secondLast[1], last[0] - secondLast[0]),
  };
}
