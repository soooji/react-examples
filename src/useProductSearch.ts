import { useCallback } from "react";
import type { Product } from "./types";
import { searchProducts, mockProducts } from "./mockServer";
import useDebouncedQuery from "./hooks/useDebouncedQuery";

function useProductSearch() {
  const fetchProducts = useCallback(
    (query: string, signal: AbortSignal) => searchProducts(query, signal),
    [],
  );

  return useDebouncedQuery<Product>(fetchProducts, mockProducts);
}

export default useProductSearch;
