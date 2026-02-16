import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from "react";
import { TOOL_TYPES, ELEMENT_DEFAULTS } from "./constants";
import { createHistoryManager, pushToHistory, undo, redo } from "./history/historyManager";

const EditorContext = createContext(null);
const EditorDispatchContext = createContext(null);

const STORAGE_KEY = "roughframe_scene_v1";
const SAVE_DEBOUNCE_MS = 500;

export const ACTION = {
  ADD_ELEMENT: "ADD_ELEMENT",
  UPDATE_ELEMENT: "UPDATE_ELEMENT",
  UPDATE_ELEMENTS: "UPDATE_ELEMENTS",
  DELETE_ELEMENTS: "DELETE_ELEMENTS",
  SET_ELEMENTS: "SET_ELEMENTS",
  SET_SELECTION: "SET_SELECTION",
  ADD_TO_SELECTION: "ADD_TO_SELECTION",
  REMOVE_FROM_SELECTION: "REMOVE_FROM_SELECTION",
  CLEAR_SELECTION: "CLEAR_SELECTION",
  SET_TOOL: "SET_TOOL",
  SET_TOOL_LOCKED: "SET_TOOL_LOCKED",
  SET_APP_STATE: "SET_APP_STATE",
  UNDO: "UNDO",
  REDO: "REDO",
  PUSH_HISTORY: "PUSH_HISTORY",
  LOAD_SCENE: "LOAD_SCENE",
};

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!Array.isArray(data.elements)) return null;
    return data;
  } catch {
    return null;
  }
}

function saveToStorage(state) {
  try {
    const data = {
      elements: state.elements,
      appState: {
        zoom: state.appState.zoom,
        scrollX: state.appState.scrollX,
        scrollY: state.appState.scrollY,
        grid: state.appState.grid,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

function createInitialState(theme) {
  const saved = loadFromStorage();
  return {
    elements: saved?.elements || [],
    selectedIds: new Set(),
    activeTool: TOOL_TYPES.SELECT,
    toolLocked: false,
    appState: {
      zoom: saved?.appState?.zoom ?? 1,
      scrollX: saved?.appState?.scrollX ?? 0,
      scrollY: saved?.appState?.scrollY ?? 0,
      grid: saved?.appState?.grid ?? false,
      theme: theme || "dark",
      zenMode: false,
    },
    defaults: { ...ELEMENT_DEFAULTS },
    history: createHistoryManager(),
    clipboardElements: [],
  };
}

function editorReducer(state, action) {
  switch (action.type) {
    case ACTION.ADD_ELEMENT: {
      return {
        ...state,
        elements: [...state.elements, action.element],
      };
    }
    case ACTION.UPDATE_ELEMENT: {
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.id ? { ...el, ...action.updates } : el
        ),
      };
    }
    case ACTION.UPDATE_ELEMENTS: {
      const updatesMap = new Map(action.updates.map((u) => [u.id, u.changes]));
      return {
        ...state,
        elements: state.elements.map((el) =>
          updatesMap.has(el.id) ? { ...el, ...updatesMap.get(el.id) } : el
        ),
      };
    }
    case ACTION.DELETE_ELEMENTS: {
      const idsToDelete = new Set(action.ids);
      const remaining = state.elements.filter((el) => !idsToDelete.has(el.id));
      // Unbind any lines/arrows that were connected to deleted shapes
      const cleaned = remaining.map((el) => {
        if (!el.binding) return el;
        let changed = false;
        const binding = { ...el.binding };
        if (binding.start && idsToDelete.has(binding.start.elementId)) {
          binding.start = null;
          changed = true;
        }
        if (binding.end && idsToDelete.has(binding.end.elementId)) {
          binding.end = null;
          changed = true;
        }
        return changed ? { ...el, binding } : el;
      });
      return {
        ...state,
        elements: cleaned,
        selectedIds: new Set(
          [...state.selectedIds].filter((id) => !idsToDelete.has(id))
        ),
      };
    }
    case ACTION.SET_ELEMENTS: {
      return { ...state, elements: action.elements };
    }
    case ACTION.SET_SELECTION: {
      return { ...state, selectedIds: new Set(action.ids) };
    }
    case ACTION.ADD_TO_SELECTION: {
      const next = new Set(state.selectedIds);
      next.add(action.id);
      return { ...state, selectedIds: next };
    }
    case ACTION.REMOVE_FROM_SELECTION: {
      const next = new Set(state.selectedIds);
      next.delete(action.id);
      return { ...state, selectedIds: next };
    }
    case ACTION.CLEAR_SELECTION: {
      return { ...state, selectedIds: new Set() };
    }
    case ACTION.SET_TOOL: {
      return { ...state, activeTool: action.tool };
    }
    case ACTION.SET_TOOL_LOCKED: {
      return { ...state, toolLocked: action.locked };
    }
    case ACTION.SET_APP_STATE: {
      return {
        ...state,
        appState: { ...state.appState, ...action.updates },
      };
    }
    case ACTION.PUSH_HISTORY: {
      return {
        ...state,
        history: pushToHistory(state.history, state.elements),
      };
    }
    case ACTION.UNDO: {
      const result = undo(state.history, state.elements);
      if (!result) return state;
      return {
        ...state,
        elements: result.elements,
        history: result.history,
        selectedIds: new Set(),
      };
    }
    case ACTION.REDO: {
      const result = redo(state.history, state.elements);
      if (!result) return state;
      return {
        ...state,
        elements: result.elements,
        history: result.history,
        selectedIds: new Set(),
      };
    }
    case ACTION.LOAD_SCENE: {
      const newState = {
        ...state,
        elements: action.elements || [],
        appState: { ...state.appState, ...(action.appState || {}) },
        selectedIds: new Set(),
        history: createHistoryManager(),
      };
      saveToStorage(newState);
      return newState;
    }
    default:
      return state;
  }
}

export function EditorProvider({ children, theme }) {
  const [state, dispatch] = useReducer(editorReducer, theme, createInitialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const getState = useCallback(() => stateRef.current, []);

  // Debounced auto-save to localStorage
  const saveTimerRef = useRef(null);
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => saveToStorage(state), SAVE_DEBOUNCE_MS);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.elements, state.appState]);

  // Immediate save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => saveToStorage(stateRef.current);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <EditorContext.Provider value={{ state, getState }}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor must be inside EditorProvider");
  return ctx;
}

export function useEditorDispatch() {
  const dispatch = useContext(EditorDispatchContext);
  if (!dispatch) throw new Error("useEditorDispatch must be inside EditorProvider");
  return dispatch;
}
