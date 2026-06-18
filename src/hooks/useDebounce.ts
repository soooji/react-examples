import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delayMs: number): T | null {
  const [debounced, setDebounced] = useState<T | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export default useDebounce;
