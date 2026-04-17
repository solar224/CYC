import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map();

function getEntryKey(location) {
  return location.key || `${location.pathname}${location.search}${location.hash}`;
}

export default function useScrollNavigationBehavior() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousLocationRef = useRef(location);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return undefined;
    }

    const previousMode = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previousMode;
    };
  }, []);

  useLayoutEffect(() => {
    const previousLocation = previousLocationRef.current;
    const previousKey = getEntryKey(previousLocation);

    scrollPositions.set(previousKey, {
      x: window.scrollX,
      y: window.scrollY,
    });

    previousLocationRef.current = location;

    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView();
        return;
      }
    }

    if (navigationType === "POP") {
      const saved = scrollPositions.get(getEntryKey(location));
      if (saved) {
        window.scrollTo(saved.x, saved.y);
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [location, navigationType]);

  useEffect(() => {
    const currentKey = getEntryKey(location);
    const handleBeforeUnload = () => {
      scrollPositions.set(currentKey, {
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location]);
}
