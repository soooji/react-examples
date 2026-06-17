import { mockProducts } from "./mockServer";
import ProductItem from "./ProductItem";
import useCart from "./useCart";
import useBeforeUnload from "./useBeforeUnload";
import type { CartItem } from "./types";

type Props = {
  initialCart: CartItem[];
};

function ProductList({ initialCart }: Props) {
  const { optimisticCart, isPending, error, addToCart, decrementFromCart, removeFromCart, getCountForProduct } =
    useCart(initialCart);

  useBeforeUnload(isPending, "Cart is still syncing. Leave anyway?");

  const totalItems = optimisticCart.length;
  const totalPrice = optimisticCart.reduce((sum, item) => {
    const product = mockProducts.find((p) => p.id === item.productId);
    return sum + (product?.price ?? 0);
  }, 0);

  return (
    <div className="w-full max-w-[480px] border border-border bg-surface">
      {/* Receipt header */}
      <div className="px-6 pt-6 pb-5 border-b border-dashed border-border text-center">
        <div className="text-[11px] tracking-[0.2em] text-text-dim uppercase mb-[6px]">
          Store
        </div>
        <div className="text-[18px] font-bold text-text-bright tracking-[0.05em] uppercase">
          React Shop
        </div>
        <div className="text-[11px] text-text-dim mt-[6px]">
          {isPending && (
            <span className="text-amber">● syncing…</span>
          )}
          {!isPending && error && (
            <span className="text-red-500">{error}</span>
          )}
          {!isPending && !error && (
            <span>{totalItems === 0 ? "cart empty" : `${totalItems} item${totalItems !== 1 ? "s" : ""} in cart`}</span>
          )}
        </div>
      </div>

      {/* Column labels */}
      <div
        className="grid gap-x-4 px-6 py-[10px] border-b border-border-dim text-[10px] tracking-[0.15em] uppercase text-text-dim"
        style={{ gridTemplateColumns: "1fr auto auto" }}
      >
        <span>Item</span>
        <span className="text-center">Qty</span>
        <span className="text-right min-w-[60px]">Price</span>
      </div>

      {/* Line items */}
      <ul className="list-none m-0">
        {mockProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            inCartCount={getCountForProduct(product.id)}
            onAdd={addToCart}
            onDecrement={decrementFromCart}
            onRemove={removeFromCart}
          />
        ))}
      </ul>

      {/* Receipt footer */}
      <div className="border-t border-dashed border-border px-6 pt-4 pb-5">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[10px] tracking-[0.15em] uppercase text-text-dim">
            Subtotal ({totalItems})
          </span>
          <span className="text-[10px] text-text-dim">
            {"·".repeat(18)}
          </span>
          <span className="text-[13px] text-text font-medium">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-baseline pt-[10px] border-t border-border mt-[10px]">
          <span className="text-[11px] tracking-[0.15em] uppercase text-text-bright font-bold">
            Total
          </span>
          <span className="text-[16px] text-amber font-bold tracking-[0.02em]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
