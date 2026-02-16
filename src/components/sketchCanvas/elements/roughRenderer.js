import { ELEMENT_TYPE } from "./elementTypes";
import { getRenderedPoints, getEndTangents } from "./lineHelpers";

// Cache keyed by element id + a fingerprint of geometry/style props.
// This ensures roughjs produces identical output for the same element,
// and only regenerates when properties actually change.
const drawableCache = new Map();

function cacheKey(el, renderedPts) {
  // For linear elements use the RENDERED points (which may differ from el.points
  // when obstacle avoidance is active for elbow connectors).
  let pointsKey = "";
  const pts = renderedPts || el.points;
  if (pts && pts.length > 0) {
    pointsKey = pts.map(([x, y]) => `${Math.round(x * 10)}:${Math.round(y * 10)}`).join(",");
  }
  return `${el.id}:${el.seed}:${el.width}:${el.height}:${el.strokeColor}:${el.fillColor}:${el.strokeWidth}:${el.roughness}:${el.roundness}:${el.type}:${el.lineType || "straight"}:${pointsKey}`;
}

function getRoughOptions(el) {
  return {
    stroke: el.strokeColor,
    fill: el.fillColor === "transparent" ? undefined : el.fillColor,
    fillStyle: el.fillColor === "transparent" ? undefined : "hachure",
    strokeWidth: el.strokeWidth,
    roughness: el.roughness,
    seed: el.seed,
  };
}

function getOrCreateDrawable(rc, el) {
  // For linear elements, compute rendered points once (may include obstacle avoidance)
  const isLinear = el.type === ELEMENT_TYPE.LINE || el.type === ELEMENT_TYPE.ARROW;
  const rendered = isLinear && el.points?.length >= 2 ? getRenderedPoints(el) : null;

  const key = cacheKey(el, rendered);
  if (drawableCache.has(key)) return drawableCache.get(key);

  let drawable;
  const opts = getRoughOptions(el);

  switch (el.type) {
    case ELEMENT_TYPE.RECTANGLE:
      drawable = rc.generator.rectangle(0, 0, el.width, el.height, opts);
      break;
    case ELEMENT_TYPE.ELLIPSE:
      drawable = rc.generator.ellipse(
        el.width / 2, el.height / 2,
        el.width, el.height,
        opts
      );
      break;
    case ELEMENT_TYPE.DIAMOND:
      drawable = rc.generator.polygon(
        [
          [el.width / 2, 0],
          [el.width, el.height / 2],
          [el.width / 2, el.height],
          [0, el.height / 2],
        ],
        opts
      );
      break;
    case ELEMENT_TYPE.LINE:
    case ELEMENT_TYPE.ARROW:
      if (rendered) {
        if (el.lineType === "curve") {
          drawable = rc.generator.curve(rendered, opts);
        } else {
          drawable = rc.generator.linearPath(rendered, opts);
        }
      }
      break;
    default:
      return null;
  }

  if (drawable) {
    drawableCache.set(key, drawable);
    // Evict old entries to prevent unbounded growth
    if (drawableCache.size > 2000) {
      const firstKey = drawableCache.keys().next().value;
      drawableCache.delete(firstKey);
    }
  }
  return drawable;
}

export function renderRoughElement(ctx, rc, el) {
  const drawable = getOrCreateDrawable(rc, el);
  if (!drawable) return;

  ctx.save();
  ctx.translate(el.x, el.y);

  // angle field preserved but rotation deferred to Phase 2
  // (no rotate handle in MVP; angle is always 0 for user-created elements)
  if (el.angle) {
    const cx = (el.width || 0) / 2;
    const cy = (el.height || 0) / 2;
    ctx.translate(cx, cy);
    ctx.rotate(el.angle);
    ctx.translate(-cx, -cy);
  }

  ctx.globalAlpha = el.opacity ?? 1;
  rc.draw(drawable);

  if (el.type === ELEMENT_TYPE.ARROW && el.points && el.points.length >= 2) {
    drawArrowheads(ctx, el);
  }

  ctx.restore();
}

function drawArrowheads(ctx, el) {
  const pts = el.points;
  if (pts.length < 2) return;

  const arrowLen = Math.max(10, el.strokeWidth * 4);
  const arrowAngle = Math.PI / 6;
  const { startAngle, endAngle } = getEndTangents(el);

  ctx.strokeStyle = el.strokeColor;
  ctx.lineWidth = el.strokeWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (el.endArrowhead) {
    const last = pts[pts.length - 1];
    ctx.beginPath();
    ctx.moveTo(
      last[0] - arrowLen * Math.cos(endAngle - arrowAngle),
      last[1] - arrowLen * Math.sin(endAngle - arrowAngle)
    );
    ctx.lineTo(last[0], last[1]);
    ctx.lineTo(
      last[0] - arrowLen * Math.cos(endAngle + arrowAngle),
      last[1] - arrowLen * Math.sin(endAngle + arrowAngle)
    );
    ctx.stroke();
  }

  if (el.startArrowhead) {
    const first = pts[0];
    ctx.beginPath();
    ctx.moveTo(
      first[0] - arrowLen * Math.cos(startAngle - arrowAngle),
      first[1] - arrowLen * Math.sin(startAngle - arrowAngle)
    );
    ctx.lineTo(first[0], first[1]);
    ctx.lineTo(
      first[0] - arrowLen * Math.cos(startAngle + arrowAngle),
      first[1] - arrowLen * Math.sin(startAngle + arrowAngle)
    );
    ctx.stroke();
  }
}

export function clearDrawableCache() {
  drawableCache.clear();
}
