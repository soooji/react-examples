import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  isLoading: boolean;
  isTypingAhead: boolean;
};

function ProductSearch({ value, onChange, isLoading, isTypingAhead }: Props) {
  const isStale = isLoading || isTypingAhead;

  return (
    <div className="px-6 py-3 border-b border-border">
      <div className="relative flex items-stretch">
        <Search
          size={12}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 transition-colors duration-150 pointer-events-none",
            isStale ? "text-amber" : "text-text-dim"
          )}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="search products…"
          className={cn(
            "w-full bg-transparent border border-border pl-6 pr-8 py-[5px]",
            "text-[11px] tracking-[0.05em] text-text placeholder:text-text-dim",
            "outline-none focus:border-amber transition-colors duration-150",
          )}
        />
        {value && !isStale && (
          <button
            onClick={() => onChange("")}
            className="absolute right-0 top-0 bottom-0 aspect-square flex items-center justify-center text-text-dim hover:text-text transition-colors duration-150"
          >
            <X size={11} />
          </button>
        )}
        {/* progress bar stuck to bottom edge of input border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
          {isLoading && <div className="search-progress-bar" />}
        </div>
      </div>
    </div>
  );
}

export default ProductSearch;
