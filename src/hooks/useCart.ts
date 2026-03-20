import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
  slug: string;
  type: 'book';
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('drevaia-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const saveCart = useCallback((cartItems: CartItem[]) => {
    localStorage.setItem('drevaia-cart', JSON.stringify(cartItems));
    setItems(cartItems);
  }, []);

  const addItem = useCallback((item: CartItem) => {
    const exists = items.some(i => i.id === item.id);
    if (!exists) {
      saveCart([...items, item]);
      return true;
    }
    return false;
  }, [items, saveCart]);

  const removeItem = useCallback((id: string) => {
    saveCart(items.filter(i => i.id !== id));
  }, [items, saveCart]);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const getTotal = useCallback(() => {
    return items.reduce((total, item) => total + item.price, 0);
  }, [items]);

  const getItemCount = useCallback(() => {
    return items.length;
  }, [items]);

  const isInCart = useCallback((id: string) => {
    return items.some(i => i.id === id);
  }, [items]);

  return {
    items,
    isHydrated,
    addItem,
    removeItem,
    clearCart,
    getTotal,
    getItemCount,
    isInCart,
  };
}
