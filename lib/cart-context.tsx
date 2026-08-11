"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CartLineItem {
  product_id: string;
  product_name: string;
  slug: string;
  variant_id: string;
  color: string;
  size: string;
  unit_price: number; // cents
  quantity: number;
  image_color: string; // hex placeholder
}

interface AddToCartInput {
  product_id: string;
  product_name: string;
  slug: string;
  color: string;
  size: string;
  unit_price: number;
  image_color: string;
  quantity?: number;
}

interface CartContextValue {
  items: CartLineItem[];
  addItem: (item: AddToCartInput) => void;
  removeItem: (variant_id: string) => void;
  updateQuantity: (variant_id: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "vivea-cart";
const FREE_SHIPPING_THRESHOLD = 7500; // $75.00

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items, hydrated]);

  const addItem = useCallback((input: AddToCartInput) => {
    const variant_id = `${input.product_id}-${input.color}-${input.size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.variant_id === variant_id);
      if (existing) {
        return prev.map((i) =>
          i.variant_id === variant_id
            ? { ...i, quantity: i.quantity + (input.quantity ?? 1) }
            : i,
        );
      }
      return [
        ...prev,
        {
          product_id: input.product_id,
          product_name: input.product_name,
          slug: input.slug,
          variant_id,
          color: input.color,
          size: input.size,
          unit_price: input.unit_price,
          quantity: input.quantity ?? 1,
          image_color: input.image_color,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variant_id: string) => {
    setItems((prev) => prev.filter((i) => i.variant_id !== variant_id));
  }, []);

  const updateQuantity = useCallback(
    (variant_id: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.variant_id !== variant_id));
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.variant_id === variant_id ? { ...i, quantity } : i,
        ),
      );
    },
    [],
  );

  const subtotal = items.reduce(
    (sum, i) => sum + i.unit_price * i.quantity,
    0,
  );
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

export { FREE_SHIPPING_THRESHOLD };
