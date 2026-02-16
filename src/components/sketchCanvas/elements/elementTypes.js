export const ELEMENT_TYPE = {
  RECTANGLE: "rectangle",
  ELLIPSE: "ellipse",
  DIAMOND: "diamond",
  LINE: "line",
  ARROW: "arrow",
  FREEDRAW: "freedraw",
  TEXT: "text",
};

export const SHAPE_TYPES = new Set([
  ELEMENT_TYPE.RECTANGLE,
  ELEMENT_TYPE.ELLIPSE,
  ELEMENT_TYPE.DIAMOND,
]);

export const LINEAR_TYPES = new Set([
  ELEMENT_TYPE.LINE,
  ELEMENT_TYPE.ARROW,
]);

export function isShapeElement(el) {
  return SHAPE_TYPES.has(el.type);
}

export function isLinearElement(el) {
  return LINEAR_TYPES.has(el.type);
}

export function getElementBounds(el) {
  if (el.type === ELEMENT_TYPE.FREEDRAW && el.points?.length) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [px, py] of el.points) {
      const ax = el.x + px;
      const ay = el.y + py;
      if (ax < minX) minX = ax;
      if (ay < minY) minY = ay;
      if (ax > maxX) maxX = ax;
      if (ay > maxY) maxY = ay;
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }
  if (isLinearElement(el) && el.points?.length) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [px, py] of el.points) {
      const ax = el.x + px;
      const ay = el.y + py;
      if (ax < minX) minX = ax;
      if (ay < minY) minY = ay;
      if (ax > maxX) maxX = ax;
      if (ay > maxY) maxY = ay;
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }
  return { x: el.x, y: el.y, width: el.width || 0, height: el.height || 0 };
}

export function getAllElementsBounds(elements) {
  if (elements.length === 0) return { x: 0, y: 0, width: 0, height: 0 };
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const el of elements) {
    const b = getElementBounds(el);
    if (b.x < minX) minX = b.x;
    if (b.y < minY) minY = b.y;
    if (b.x + b.width > maxX) maxX = b.x + b.width;
    if (b.y + b.height > maxY) maxY = b.y + b.height;
  }
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}
