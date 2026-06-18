import type { CartItem, Product, ProductId } from "./types";

const mockProducts: Product[] = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", price: 249.99 },
  { id: 2, name: "Mechanical Keyboard — TKL", price: 89.95 },
  { id: 3, name: "USB-C Hub 7-in-1", price: 44.5 },
  { id: 4, name: "27\" 4K IPS Monitor", price: 399.0 },
  { id: 5, name: "Ergonomic Office Chair", price: 319.99 },
  { id: 6, name: "Standing Desk Converter", price: 179.0 },
  { id: 7, name: "Webcam 1080p Pro", price: 74.99 },
  { id: 8, name: "Blue Light Blocking Glasses", price: 29.95 },
  { id: 9, name: "Laptop Stand Adjustable", price: 54.0 },
  { id: 10, name: "Mouse Pad XL Desk Mat", price: 22.5 },
  { id: 11, name: "Portable SSD 1TB", price: 109.99 },
  { id: 12, name: "Smart LED Desk Lamp", price: 64.95 },
  { id: 13, name: "Cable Management Kit", price: 17.99 },
  { id: 14, name: "Wireless Charging Pad", price: 35.0 },
  { id: 15, name: "Noise Machine for Focus", price: 49.95 },
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

function doWithDelayNoError<T>(fn: () => Promise<T>, signal?: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(fn()), 1000);
    signal?.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
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
  return doWithDelayNoError(() => Promise.resolve(mockProducts));
};

export const getCart = async (): Promise<CartItem[]> => {
  return doWithDelayNoError(() => Promise.resolve(getStoredCart()));
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

export const searchProducts = async (query: string, signal?: AbortSignal): Promise<Product[]> => {
  return doWithDelayNoError(() => {
    const lower = query.toLowerCase().trim();
    if (!lower) return Promise.resolve(mockProducts);
    return Promise.resolve(
      mockProducts.filter((p) => p.name.toLowerCase().includes(lower))
    );
  }, signal);
};

export { mockProducts };
