export type ProductId = number;

export type Product = {
  id: ProductId;
  name: string;
  price: number; // in cents
};

export type CartItem = {
  id: number;
  quantity: number;
  productId: ProductId;
};

export type UpdateCartActionPayload = {
  type: "addProductToCart" | "decrementProductFromCart" | "removeProductFromCart";
  productId: ProductId;
};

export type CartState = {
  cart: CartItem[];
  error?: string;
};
