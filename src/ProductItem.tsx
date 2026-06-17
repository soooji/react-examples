import { Trash2 } from "lucide-react";
import type { Product, ProductId } from "./types";

type Props = {
  product: Product;
  inCartCount: number;
  onAdd: (productId: ProductId) => void;
  onDecrement: (productId: ProductId) => void;
  onRemove: (productId: ProductId) => void;
};

function ProductItem({ product, inCartCount, onAdd, onDecrement, onRemove }: Props) {
  const inCart = inCartCount > 0;

  return (
    <li
      className={[
        "grid gap-x-4 items-center px-6 py-[10px]",
        "transition-colors duration-150",
        inCart ? "bg-amber-dim" : "bg-transparent",
      ].join(" ")}
      style={{ gridTemplateColumns: "1fr auto auto auto" }}
    >
      <div>
        <div
          className={[
            "text-[13px]",
            inCart ? "text-text-bright font-medium" : "text-text font-normal",
          ].join(" ")}
        >
          {product.name}
        </div>
        <div className="text-[11px] text-text-dim mt-px">
          ${product.price.toFixed(2)} ea.
        </div>
      </div>

      <div className="flex items-center gap-[6px]">
        <button
          onClick={() => onDecrement(product.id)}
          disabled={inCartCount === 0}
          className={[
            "w-[22px] h-[22px] border border-border bg-transparent",
            "text-[14px] leading-none flex items-center justify-center font-mono",
            inCartCount === 0 ? "text-text-dim cursor-not-allowed" : "text-text cursor-pointer",
          ].join(" ")}
        >
          −
        </button>

        <span
          className={[
            "text-[13px] min-w-[16px] text-center",
            inCart ? "text-amber font-semibold" : "text-text-dim font-normal",
          ].join(" ")}
        >
          {inCartCount}
        </span>

        <button
          onClick={() => onAdd(product.id)}
          className={[
            "w-[22px] h-[22px] border border-border bg-transparent",
            "text-text text-[14px] leading-none flex items-center justify-center font-mono cursor-pointer",
          ].join(" ")}
        >
          +
        </button>
      </div>

      <div
        className={[
          "min-w-[60px] text-right text-[13px]",
          inCart ? "text-text font-medium" : "text-text-dim font-normal",
        ].join(" ")}
      >
        {inCart ? `$${(product.price * inCartCount).toFixed(2)}` : "—"}
      </div>

      <button
        onClick={() => onRemove(product.id)}
        disabled={!inCart}
        className={[
          "w-[22px] h-[22px] bg-transparent flex items-center justify-center",
          inCart ? "text-text-dim hover:text-red-500 cursor-pointer" : "text-border cursor-not-allowed",
          "transition-colors duration-150",
        ].join(" ")}
      >
        <Trash2 size={13} />
      </button>
    </li>
  );
}

export default ProductItem;
