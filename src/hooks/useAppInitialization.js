import { useEffect, useState } from "react";

export function usePersistentPreference(key, fallbackValue) {
  const [value, setValue] = useState(() => localStorage.getItem(key) || fallbackValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export function useAppOverflowGuard(isToolPage) {
  useEffect(() => {
    const appDiv = document.querySelector(".app");

    if (isToolPage) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      if (appDiv) {
        appDiv.style.height = "100vh";
        appDiv.style.minHeight = "0";
        appDiv.style.overflow = "hidden";
        appDiv.style.boxSizing = "border-box";
      }
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (appDiv) {
        appDiv.style.height = "";
        appDiv.style.minHeight = "";
        appDiv.style.overflow = "";
        appDiv.style.boxSizing = "";
      }
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (appDiv) {
        appDiv.style.height = "";
        appDiv.style.minHeight = "";
        appDiv.style.overflow = "";
        appDiv.style.boxSizing = "";
      }
    };
  }, [isToolPage]);
}
