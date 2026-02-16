import { HISTORY_LIMIT } from "../constants";

export function createHistoryManager() {
  return {
    undoStack: [],
    redoStack: [],
  };
}

export function pushToHistory(history, elements) {
  const snapshot = JSON.parse(JSON.stringify(elements));
  const undoStack = [...history.undoStack, snapshot];
  if (undoStack.length > HISTORY_LIMIT) {
    undoStack.shift();
  }
  return {
    undoStack,
    redoStack: [],
  };
}

export function undo(history, currentElements) {
  if (history.undoStack.length === 0) return null;
  const undoStack = [...history.undoStack];
  const snapshot = undoStack.pop();
  const redoStack = [...history.redoStack, JSON.parse(JSON.stringify(currentElements))];
  return {
    history: { undoStack, redoStack },
    elements: snapshot,
  };
}

export function redo(history, currentElements) {
  if (history.redoStack.length === 0) return null;
  const redoStack = [...history.redoStack];
  const snapshot = redoStack.pop();
  const undoStack = [...history.undoStack, JSON.parse(JSON.stringify(currentElements))];
  return {
    history: { undoStack, redoStack },
    elements: snapshot,
  };
}
