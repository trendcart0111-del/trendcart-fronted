import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "trendcart_cart_v1";
const WISH_KEY = "trendcart_wishlist_v1";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const addItem = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setDrawerOpen(true);
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));
  const incQty = (id) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const decQty = (id) =>
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  const clearCart = () => setItems([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };
  const isWished = (id) => !!wishlist.find((p) => p.id === id);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    items.forEach((i) => {
      c += i.qty;
      s += i.qty * i.price;
    });
    return { count: c, subtotal: s };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        wishlist,
        drawerOpen,
        setDrawerOpen,
        addItem,
        removeItem,
        incQty,
        decQty,
        clearCart,
        toggleWishlist,
        isWished,
        count,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
