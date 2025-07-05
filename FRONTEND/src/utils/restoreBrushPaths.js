import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "./element";
import { TOOL_ITEMS } from "../constants";

export const restoreBrushPaths = (elements) => {
  return elements.map((el) => {
    if (el.type === TOOL_ITEMS.BRUSH && el.points) {
      const path = new Path2D(getSvgPathFromStroke(getStroke(el.points)));
      return { ...el, path };
    }
    return el;
  });
};
