import { ELEMENT_TYPE } from "./elementTypes";

export function renderFreedrawElement(ctx, el) {
  if (el.type !== ELEMENT_TYPE.FREEDRAW || !el.points || el.points.length < 2) return;

  ctx.save();
  ctx.translate(el.x, el.y);
  ctx.globalAlpha = el.opacity ?? 1;
  ctx.strokeStyle = el.strokeColor;
  ctx.lineWidth = el.strokeWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(el.points[0][0], el.points[0][1]);

  if (el.points.length === 2) {
    ctx.lineTo(el.points[1][0], el.points[1][1]);
  } else {
    for (let i = 1; i < el.points.length - 1; i++) {
      const xc = (el.points[i][0] + el.points[i + 1][0]) / 2;
      const yc = (el.points[i][1] + el.points[i + 1][1]) / 2;
      ctx.quadraticCurveTo(el.points[i][0], el.points[i][1], xc, yc);
    }
    const last = el.points[el.points.length - 1];
    ctx.lineTo(last[0], last[1]);
  }

  ctx.stroke();
  ctx.restore();
}
