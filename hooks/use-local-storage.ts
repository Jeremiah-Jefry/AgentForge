"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item) as T);
      }
    } catch {
      // Ignore storage read failures in restricted browser contexts.
    }

    setHasLoaded(true);
  }, [key]);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage write failures in restricted browser contexts.
    }
  }, [hasLoaded, key, value]);

  return [value, setValue] as const;
}
