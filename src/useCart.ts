import { useActionState, useOptimistic, startTransition } from "react";
import { addProductToCart, decrementProductFromCart, removeProductFromCart } from "./mockServer";
import type { CartItem, CartState, ProductId, UpdateCartActionPayload } from "./types";

const updateCartAction = async (
  prevState: CartState,
  payload: UpdateCartActionPayload
): Promise<CartState> => {
  try {
    let cart: CartItem[];
    switch (payload.type) {
      case "addProductToCart":
        cart = await addProductToCart(payload.productId);
        break;
      case "decrementProductFromCart":
        cart = await decrementProductFromCart(payload.productId);
        break;
      case "removeProductFromCart":
        cart = await removeProductFromCart(payload.productId);
        break;
      default:
        throw new Error("Invalid action");
    }
    return { cart };
  } catch {
    return { cart: prevState.cart, error: "Failed to update cart. Please try again." };
  }
};

function useCart(initialCart: CartItem[]) {
  const [{ cart, error }, dispatchAction, isPending] = useActionState(
    updateCartAction,
    { cart: initialCart }
  );
  const [optimisticCart, applyOptimisticUpdate] = useOptimistic(cart);

  const addToCart = (productId: ProductId) => {
    startTransition(() => {
      applyOptimisticUpdate([
        ...optimisticCart,
        { id: optimisticCart.length + 1, quantity: 1, productId },
      ]);
      dispatchAction({ type: "addProductToCart", productId });
    });
  };

  const decrementFromCart = (productId: ProductId) => {
    startTransition(() => {
      const idx = [...optimisticCart].findLastIndex((item) => item.productId === productId);
      if (idx === -1) return;
      applyOptimisticUpdate([
        ...optimisticCart.slice(0, idx),
        ...optimisticCart.slice(idx + 1),
      ]);
      dispatchAction({ type: "decrementProductFromCart", productId });
    });
  };

  const removeFromCart = (productId: ProductId) => {
    startTransition(() => {
      applyOptimisticUpdate(
        optimisticCart.filter((item) => item.productId !== productId)
      );
      dispatchAction({ type: "removeProductFromCart", productId });
    });
  };

  const getCountForProduct = (productId: ProductId): number =>
    optimisticCart.filter((item) => item.productId === productId).length;

  return {
    optimisticCart,
    isPending,
    error,
    addToCart,
    decrementFromCart,
    removeFromCart,
    getCountForProduct,
  };
}

export default useCart;
