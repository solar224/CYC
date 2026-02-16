import rough from "roughjs";
import { getAllElementsBounds, isShapeElement } from "../elements/elementTypes";
import { getRenderedPoints, getEndTangents, setShapeObstacles } from "../elements/lineHelpers";

/*
 * SVG export uses roughjs SVG generator with element.seed
 * so the hand-drawn style matches the canvas rendering exactly.
 */
export function exportToSvg(elements, options = {}) {
  const {
    background = true,
    bgColor = "#ffffff",
    padding = 32,
  } = options;

  if (elements.length === 0) return;

  const bounds = getAllElementsBounds(elements);
  const w = bounds.width + padding * 2;
  const h = bounds.height + padding * 2;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", w);
  svg.setAttribute("height", h);
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

  if (background) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", w);
    rect.setAttribute("height", h);
    rect.setAttribute("fill", bgColor);
    svg.appendChild(rect);
  }

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("transform", `translate(${-bounds.x + padding}, ${-bounds.y + padding})`);
  svg.appendChild(g);

  const rc = rough.svg(svg);
  setShapeObstacles(elements.filter(isShapeElement));
  const sorted = [...elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

  for (const el of sorted) {
    renderElementToSvg(g, rc, el);
  }

  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svg);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sketch.svg";
  a.click();
  URL.revokeObjectURL(url);
}

function getRoughOpts(el) {
  return {
    stroke: el.strokeColor,
    fill: el.fillColor === "transparent" ? undefined : el.fillColor,
    fillStyle: el.fillColor === "transparent" ? undefined : "hachure",
    strokeWidth: el.strokeWidth,
    roughness: el.roughness,
    seed: el.seed,
  };
}

function renderElementToSvg(parent, rc, el) {
  const opts = getRoughOpts(el);
  let node;

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  let transform = `translate(${el.x}, ${el.y})`;
  if (el.angle) {
    transform += ` rotate(${(el.angle * 180) / Math.PI}, ${(el.width || 0) / 2}, ${(el.height || 0) / 2})`;
  }
  g.setAttribute("transform", transform);
  g.setAttribute("opacity", el.opacity ?? 1);

  switch (el.type) {
    case "rectangle":
      node = rc.rectangle(0, 0, el.width, el.height, opts);
      g.appendChild(node);
      break;
    case "ellipse":
      node = rc.ellipse(el.width / 2, el.height / 2, el.width, el.height, opts);
      g.appendChild(node);
      break;
    case "diamond":
      node = rc.polygon(
        [
          [el.width / 2, 0],
          [el.width, el.height / 2],
          [el.width / 2, el.height],
          [0, el.height / 2],
        ],
        opts
      );
      g.appendChild(node);
      break;
    case "line":
    case "arrow":
      if (el.points && el.points.length >= 2) {
        const rendered = getRenderedPoints(el);
        if (el.lineType === "curve") {
          node = rc.curve(rendered, opts);
        } else {
          node = rc.linearPath(rendered, opts);
        }
        g.appendChild(node);
        if (el.type === "arrow") {
          appendArrowheadSvg(g, el);
        }
      }
      break;
    case "freedraw":
      if (el.points && el.points.length >= 2) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d = `M ${el.points[0][0]} ${el.points[0][1]}`;
        for (let i = 1; i < el.points.length; i++) {
          d += ` L ${el.points[i][0]} ${el.points[i][1]}`;
        }
        path.setAttribute("d", d);
        path.setAttribute("stroke", el.strokeColor);
        path.setAttribute("stroke-width", el.strokeWidth);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        g.appendChild(path);
      }
      break;
    case "text":
      if (el.text) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("font-size", el.fontSize || 20);
        text.setAttribute("font-family", el.fontFamily || "Caveat, cursive, sans-serif");
        text.setAttribute("fill", el.strokeColor);
        text.setAttribute("dominant-baseline", "hanging");
        const lines = el.text.split("\n");
        lines.forEach((line, i) => {
          const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
          tspan.setAttribute("x", "0");
          tspan.setAttribute("dy", i === 0 ? "0" : `${(el.fontSize || 20) * 1.3}`);
          tspan.textContent = line;
          text.appendChild(tspan);
        });
        g.appendChild(text);
      }
      break;
    default:
      break;
  }

  parent.appendChild(g);
}

function appendArrowheadSvg(g, el) {
  const pts = el.points;
  if (pts.length < 2) return;
  const arrowLen = Math.max(10, el.strokeWidth * 4);
  const arrowAngle = Math.PI / 6;
  const { startAngle, endAngle } = getEndTangents(el);

  if (el.endArrowhead) {
    const last = pts[pts.length - 1];
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const x1 = last[0] - arrowLen * Math.cos(endAngle - arrowAngle);
    const y1 = last[1] - arrowLen * Math.sin(endAngle - arrowAngle);
    const x2 = last[0] - arrowLen * Math.cos(endAngle + arrowAngle);
    const y2 = last[1] - arrowLen * Math.sin(endAngle + arrowAngle);
    path.setAttribute("d", `M ${x1} ${y1} L ${last[0]} ${last[1]} L ${x2} ${y2}`);
    path.setAttribute("stroke", el.strokeColor);
    path.setAttribute("stroke-width", el.strokeWidth);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    g.appendChild(path);
  }

  if (el.startArrowhead) {
    const first = pts[0];
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const x1 = first[0] - arrowLen * Math.cos(startAngle - arrowAngle);
    const y1 = first[1] - arrowLen * Math.sin(startAngle - arrowAngle);
    const x2 = first[0] - arrowLen * Math.cos(startAngle + arrowAngle);
    const y2 = first[1] - arrowLen * Math.sin(startAngle + arrowAngle);
    path.setAttribute("d", `M ${x1} ${y1} L ${first[0]} ${first[1]} L ${x2} ${y2}`);
    path.setAttribute("stroke", el.strokeColor);
    path.setAttribute("stroke-width", el.strokeWidth);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    g.appendChild(path);
  }
}
