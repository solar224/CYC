import { useEffect, useState } from "react";

export function usePersistentPreference(key, fallbackValue) {
  const [value, setValue] = useState(() => localStorage.getItem(key) || fallbackValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
