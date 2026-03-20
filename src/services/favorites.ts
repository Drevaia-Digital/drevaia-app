import { supabase } from '@/lib/supabase';
import type { Favorite } from '@/lib/supabase';

export interface CreateFavoriteData {
  itemId: string;
  itemType: 'book' | 'post';
  title: string;
  url: string;
  image?: string;
}

class FavoriteService {
  async getFavorites(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getFavoritesByType(userId: string, itemType: 'book' | 'post'): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async isFavorite(userId: string, itemId: string, itemType: 'book' | 'post'): Promise<boolean> {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('item_id', itemId)
      .eq('item_type', itemType)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  }

  async addFavorite(userId: string, data: CreateFavoriteData): Promise<Favorite> {
    // Check if already exists
    const exists = await this.isFavorite(userId, data.itemId, data.itemType);
    if (exists) {
      throw new Error('Item already in favorites');
    }

    const { data: favorite, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        item_id: data.itemId,
        item_type: data.itemType,
        title: data.title,
        url: data.url,
        image: data.image,
      })
      .select()
      .single();

    if (error) throw error;
    return favorite;
  }

  async removeFavorite(userId: string, itemId: string, itemType: 'book' | 'post'): Promise<void> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('item_id', itemId)
      .eq('item_type', itemType);

    if (error) throw error;
  }

  async toggleFavorite(userId: string, data: CreateFavoriteData): Promise<{ isFavorite: boolean; favorite?: Favorite }> {
    const isFav = await this.isFavorite(userId, data.itemId, data.itemType);
    
    if (isFav) {
      await this.removeFavorite(userId, data.itemId, data.itemType);
      return { isFavorite: false };
    } else {
      const favorite = await this.addFavorite(userId, data);
      return { isFavorite: true, favorite };
    }
  }

  async getFavoriteCount(userId: string): Promise<number> {
    const { count, error } = await supabase
      .from('favorites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (error) throw error;
    return count || 0;
  }

  async clearFavorites(userId: string): Promise<void> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
  }
}

export const favoriteService = new FavoriteService();
export default favoriteService;
