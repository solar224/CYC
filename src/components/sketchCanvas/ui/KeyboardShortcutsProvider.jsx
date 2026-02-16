import { useKeyboardShortcuts } from "./KeyboardShortcuts";

export default function KeyboardShortcutsProvider({ children }) {
  useKeyboardShortcuts();
  return children;
}
