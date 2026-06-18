import { useState, useEffect, useDeferredValue, useEffectEvent } from "react";
import useDebounce from "./useDebounce";

const DEFAULT_DEBOUNCE_MS = 300;

type UseDebouncedQueryOptions = {
  debounceMs?: number;
};

type UseDebouncedQueryResult<T> = {
  inputValue: string;
  setInputValue: (v: string) => void;
  results: T[];
  isLoading: boolean;
  isTypingAhead: boolean;
};

function useDebouncedQuery<T>(
  fetchFn: (query: string, signal: AbortSignal) => Promise<T[]>,
  initialResults: T[],
  options: UseDebouncedQueryOptions = {}
): UseDebouncedQueryResult<T> {
  const { debounceMs = DEFAULT_DEBOUNCE_MS } = options;

  const [inputValue, setInputValue] = useState("");
  const [settledQuery, setSettledQuery] = useState<string | null>(null);
  const [results, setResults] = useState<T[]>(initialResults);

  const deferredInputValue = useDeferredValue(inputValue);
  const isTypingAhead = inputValue !== deferredInputValue;
  const debouncedQuery = useDebounce(inputValue, debounceMs);
  const isLoading = debouncedQuery !== settledQuery;

  const stableFetch = useEffectEvent(fetchFn);

  useEffect(() => {
    if (debouncedQuery === null) return;

    const controller = new AbortController();

    stableFetch(debouncedQuery, controller.signal)
      .then((found) => {
        setResults(found);
        setSettledQuery(debouncedQuery);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setSettledQuery(debouncedQuery);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return { inputValue, setInputValue, results, isLoading, isTypingAhead };
}

export default useDebouncedQuery;
