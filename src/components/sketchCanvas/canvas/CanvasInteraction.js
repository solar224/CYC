import { ZOOM_LIMITS } from "../constants";

/*
 * Coordinate system:
 *   screenX = worldX * zoom + scrollX
 *   screenY = worldY * zoom + scrollY
 *
 * Therefore:
 *   worldX = (screenX - scrollX) / zoom
 *   worldY = (screenY - scrollY) / zoom
 *
 * scrollX/scrollY = pixel offset of the world-space origin on the screen.
 * Zoom is applied at the cursor position via zoomAtPoint().
 */

export function screenToScene(screenX, screenY, appState) {
  return {
    x: (screenX - appState.scrollX) / appState.zoom,
    y: (screenY - appState.scrollY) / appState.zoom,
  };
}

export function sceneToScreen(sceneX, sceneY, appState) {
  return {
    x: sceneX * appState.zoom + appState.scrollX,
    y: sceneY * appState.zoom + appState.scrollY,
  };
}

export function clampZoom(zoom) {
  return Math.min(ZOOM_LIMITS.max, Math.max(ZOOM_LIMITS.min, zoom));
}

// Zoom centered on the cursor position (screenX, screenY).
export function zoomAtPoint(appState, newZoom, screenX, screenY) {
  const clamped = clampZoom(newZoom);
  const scaleRatio = clamped / appState.zoom;
  return {
    zoom: clamped,
    scrollX: screenX - (screenX - appState.scrollX) * scaleRatio,
    scrollY: screenY - (screenY - appState.scrollY) * scaleRatio,
  };
}

// Resize via 8-point handle. Only for axis-aligned shapes (no rotation in MVP).
export function resizeElement(el, handle, dx, dy) {
  let { x, y, width, height } = el;

  switch (handle) {
    case "nw":
      x += dx; y += dy; width -= dx; height -= dy;
      break;
    case "n":
      y += dy; height -= dy;
      break;
    case "ne":
      y += dy; width += dx; height -= dy;
      break;
    case "e":
      width += dx;
      break;
    case "se":
      width += dx; height += dy;
      break;
    case "s":
      height += dy;
      break;
    case "sw":
      x += dx; height += dy; width -= dx;
      break;
    case "w":
      x += dx; width -= dx;
      break;
    default:
      break;
  }

  if (width < 1) { x += width - 1; width = 1; }
  if (height < 1) { y += height - 1; height = 1; }

  return { x, y, width, height };
}
