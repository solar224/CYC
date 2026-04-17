import { useEffect, useState } from "react";

export function usePersistentPreference(key, fallbackValue, allowedValues = null) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored === null || stored === undefined || stored === "") {
      return fallbackValue;
    }

    if (Array.isArray(allowedValues) && allowedValues.length > 0) {
      return allowedValues.includes(stored) ? stored : fallbackValue;
    }

    return stored;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
