// Cart utilities — localStorage based cart for client-side use
// Mirrors the CartItem type from types/index.ts but simplified for client use

export interface ClientCartItem {
  product_id: string;
  product_name: string;
  slug: string;
  variant_id: string | null;
  color: string;
  size: string;
  unit_price: number; // in cents
  quantity: number;
  image_color: string; // hex placeholder
}

const CART_KEY = "vivea-cart";

export function getCart(): ClientCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: ClientCartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Dispatch event so cart UI components update
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(item: ClientCartItem): ClientCartItem[] {
  const cart = getCart();
  const existing = cart.find(
    (i) => i.variant_id === item.variant_id && i.product_id === item.product_id
  );
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
  return cart;
}

export function updateQuantity(
  index: number,
  quantity: number
): ClientCartItem[] {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    saveCart(cart);
  }
  return cart;
}

export function removeFromCart(index: number): ClientCartItem[] {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
  return cart;
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(): number {
  return getCart().reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
}

export function getCartItemCount(): number {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}
