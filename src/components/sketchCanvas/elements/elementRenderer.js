import { ELEMENT_TYPE } from "./elementTypes";
import { renderRoughElement } from "./roughRenderer";
import { renderTextElement } from "./textRenderer";
import { renderFreedrawElement } from "./freedrawRenderer";

export function renderElement(ctx, rc, el) {
  switch (el.type) {
    case ELEMENT_TYPE.RECTANGLE:
    case ELEMENT_TYPE.ELLIPSE:
    case ELEMENT_TYPE.DIAMOND:
    case ELEMENT_TYPE.LINE:
    case ELEMENT_TYPE.ARROW:
      renderRoughElement(ctx, rc, el);
      break;
    case ELEMENT_TYPE.TEXT:
      renderTextElement(ctx, el);
      break;
    case ELEMENT_TYPE.FREEDRAW:
      renderFreedrawElement(ctx, el);
      break;
    default:
      break;
  }
}
