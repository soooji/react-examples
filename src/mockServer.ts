import type { CartItem, Product, ProductId } from "./types";

const mockProducts: Product[] = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

function doWithDelay<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error("Network error"));
        return;
      }
      resolve(fn());
    }, 1000);
  });
}

const CART_STORAGE_KEY = "mock_cart";

function getStoredCart(): CartItem[] {
  const cartJSON = localStorage.getItem(CART_STORAGE_KEY);
  if (cartJSON) {
    try {
      return JSON.parse(cartJSON);
    } catch {
      return [];
    }
  }
  return [];
}

function setStoredCart(cart: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export const getProducts = async (): Promise<Product[]> => {
  return doWithDelay(() => Promise.resolve(mockProducts));
};

export const getCart = async (): Promise<CartItem[]> => {
  return doWithDelay(() => Promise.resolve(getStoredCart()));
};

export const addProductToCart = async (
  productId: ProductId
): Promise<CartItem[]> => {
  return doWithDelay(() => {
    const cart = getStoredCart();
    const newId =
      cart.length > 0 ? Math.max(...cart.map((item) => item.id)) + 1 : 1;
    const updatedCart = [...cart, { id: newId, quantity: 1, productId }];
    setStoredCart(updatedCart);
    return Promise.resolve(updatedCart);
  });
};

export const decrementProductFromCart = async (
  productId: ProductId
): Promise<CartItem[]> => {
  return doWithDelay(() => {
    const cart = getStoredCart();
    const idx = cart.findLastIndex((item) => item.productId === productId);
    if (idx === -1) return Promise.resolve(cart);
    const updatedCart = [...cart.slice(0, idx), ...cart.slice(idx + 1)];
    setStoredCart(updatedCart);
    return Promise.resolve(updatedCart);
  });
};

export const removeProductFromCart = async (
  productId: ProductId
): Promise<CartItem[]> => {
  return doWithDelay(() => {
    const cart = getStoredCart();
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setStoredCart(updatedCart);
    return Promise.resolve(updatedCart);
  });
};

export { mockProducts };
