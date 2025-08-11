import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, Product } from "@/data/products";

export type CartItem = { productId: string; quantity: number };

type CartContextType = {
  items: CartItem[];
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clear: () => void;
  total: number;
  detailed: Array<CartItem & { product: Product }>;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "lovable_cart_v1";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (productId: string, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.productId === productId);
      if (found) return prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i));
      return [...prev, { productId, quantity }];
    });
  };

  const remove = (productId: string) => setItems((prev) => prev.filter((i) => i.productId !== productId));
  const setQty = (productId: string, quantity: number) =>
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  const clear = () => setItems([]);

  const detailed = useMemo(
    () =>
      items
        .map((i) => {
          const product = products.find((p) => p.id === i.productId);
          if (!product) return null;
          return { ...i, product } as CartItem & { product: Product };
        })
        .filter(Boolean) as Array<CartItem & { product: Product }>,
    [items]
  );

  const total = detailed.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const value: CartContextType = { items, add, remove, setQty, clear, total, detailed };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
