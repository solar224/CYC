import { ENV } from "../config/env";
import notesRaw from "./notes/notes.json";

function resolvePublicAsset(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.replace(/^\/+/, "");
  return `${ENV.PUBLIC_URL}/${normalized}`;
}

export const NOTES = notesRaw.map((note) => ({
  ...note,
  cover: resolvePublicAsset(note.coverAsset || note.cover),
}));
