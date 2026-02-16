import { ELEMENT_TYPE } from "./elementTypes";

export function renderTextElement(ctx, el) {
  if (el.type !== ELEMENT_TYPE.TEXT || !el.text) return;

  ctx.save();
  ctx.translate(el.x, el.y);
  if (el.angle) {
    const cx = (el.width || 0) / 2;
    const cy = (el.height || 0) / 2;
    ctx.translate(cx, cy);
    ctx.rotate(el.angle);
    ctx.translate(-cx, -cy);
  }
  ctx.globalAlpha = el.opacity ?? 1;

  ctx.font = `${el.fontSize || 20}px ${el.fontFamily || "Caveat, cursive, sans-serif"}`;
  ctx.fillStyle = el.strokeColor;
  ctx.textBaseline = "top";
  ctx.textAlign = el.textAlign || "left";

  const lines = el.text.split("\n");
  const lineHeight = (el.fontSize || 20) * 1.3;

  let xOffset = 0;
  if (el.textAlign === "center") xOffset = (el.width || 0) / 2;
  else if (el.textAlign === "right") xOffset = el.width || 0;

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], xOffset, i * lineHeight);
  }

  ctx.restore();
}

export function measureText(text, fontSize, fontFamily) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `${fontSize}px ${fontFamily}`;
  const lines = text.split("\n");
  const lineHeight = fontSize * 1.3;
  let maxWidth = 0;
  for (const line of lines) {
    const m = ctx.measureText(line);
    if (m.width > maxWidth) maxWidth = m.width;
  }
  return {
    width: maxWidth + 4,
    height: lines.length * lineHeight,
  };
}
