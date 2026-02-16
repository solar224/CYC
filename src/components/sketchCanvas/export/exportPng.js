import rough from "roughjs";
import { renderElement } from "../elements/elementRenderer";
import { getAllElementsBounds } from "../elements/elementTypes";

export function exportToPng(elements, options = {}) {
  const {
    background = true,
    bgColor = "#ffffff",
    padding = 32,
    scale = 2,
  } = options;

  if (elements.length === 0) return;

  const bounds = getAllElementsBounds(elements);
  const w = bounds.width + padding * 2;
  const h = bounds.height + padding * 2;

  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d");
  const rc = rough.canvas(canvas);

  ctx.scale(scale, scale);

  if (background) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
  }

  ctx.translate(-bounds.x + padding, -bounds.y + padding);

  const sorted = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
  for (const el of sorted) {
    renderElement(ctx, rc, el);
  }

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sketch.png";
    a.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
