import { nanoid } from "nanoid";
import { ELEMENT_TYPE } from "./elementTypes";
import { ELEMENT_DEFAULTS } from "../constants";

let zCounter = 0;

export function resetZCounter(max = 0) {
  zCounter = max;
}

function randomSeed() {
  return Math.floor(Math.random() * 2147483647);
}

export function createElement(type, overrides = {}, defaults = ELEMENT_DEFAULTS) {
  zCounter += 1;
  const seed = randomSeed();
  const base = {
    id: nanoid(),
    type,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    angle: 0,
    seed,
    versionNonce: randomSeed(),
    strokeColor: defaults.strokeColor || ELEMENT_DEFAULTS.strokeColor,
    fillColor: defaults.fillColor || ELEMENT_DEFAULTS.fillColor,
    strokeWidth: defaults.strokeWidth ?? ELEMENT_DEFAULTS.strokeWidth,
    roughness: defaults.roughness ?? ELEMENT_DEFAULTS.roughness,
    opacity: defaults.opacity ?? ELEMENT_DEFAULTS.opacity,
    roundness: defaults.roundness ?? ELEMENT_DEFAULTS.roundness,
    locked: false,
    zIndex: zCounter,
  };

  switch (type) {
    case ELEMENT_TYPE.LINE:
    case ELEMENT_TYPE.ARROW:
      return {
        ...base,
        points: [[0, 0]],
        lineType: "straight", // "straight" | "curve" | "elbow"
        startArrowhead: type === ELEMENT_TYPE.ARROW ? "arrow" : null,
        endArrowhead: type === ELEMENT_TYPE.ARROW ? "arrow" : null,
        binding: { start: null, end: null },
        ...overrides,
      };
    case ELEMENT_TYPE.FREEDRAW:
      return {
        ...base,
        points: [],
        fillColor: "transparent",
        ...overrides,
      };
    case ELEMENT_TYPE.TEXT:
      return {
        ...base,
        text: "",
        fontSize: 20,
        fontFamily: "Caveat, cursive, sans-serif",
        textAlign: "left",
        fillColor: "transparent",
        ...overrides,
      };
    default:
      return { ...base, ...overrides };
  }
}
