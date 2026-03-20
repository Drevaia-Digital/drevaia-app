import { useState, useEffect, useCallback } from 'react';

export interface FavoriteItem {
  id: string;
  type: 'book' | 'post';
  title: string;
  url: string;
  image?: string;
  addedAt: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('drevaia-favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const saveFavorites = useCallback((items: FavoriteItem[]) => {
    localStorage.setItem('drevaia-favorites', JSON.stringify(items));
    setFavorites(items);
  }, []);

  const addFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    const newItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString(),
    };
    
    const exists = favorites.some(f => f.id === item.id && f.type === item.type);
    if (!exists) {
      saveFavorites([newItem, ...favorites]);
      return true;
    }
    return false;
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((id: string, type: 'book' | 'post') => {
    saveFavorites(favorites.filter(f => !(f.id === id && f.type === type)));
  }, [favorites, saveFavorites]);

  const toggleFavorite = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    const exists = favorites.some(f => f.id === item.id && f.type === item.type);
    if (exists) {
      removeFavorite(item.id, item.type);
      return false;
    } else {
      addFavorite(item);
      return true;
    }
  }, [favorites, addFavorite, removeFavorite]);

  const isFavorite = useCallback((id: string, type: 'book' | 'post') => {
    return favorites.some(f => f.id === id && f.type === type);
  }, [favorites]);

  const getFavoritesByType = useCallback((type: 'book' | 'post') => {
    return favorites.filter(f => f.type === type);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites,
    isHydrated,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesByType,
    clearFavorites,
  };
}
