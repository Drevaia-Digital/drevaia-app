import { useState, useEffect } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { favoriteService } from '@/services/favorites';
import { useAuth } from '@/hooks/useAuth';
import type { Language } from '@/i18n';

interface FavoriteButtonProps {
  id: string;
  type: 'book' | 'post';
  title: string;
  url: string;
  image?: string;
  language: Language;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export function FavoriteButtonSupabase({
  id,
  type,
  title,
  url,
  image,
  language,
  variant = 'ghost',
  size = 'icon',
  showLabel = false,
}: FavoriteButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const labels = {
    add: language === 'es' ? 'Guardar' : language === 'en' ? 'Save' : language === 'fr' ? 'Sauvegarder' : 'Salvar',
    remove: language === 'es' ? 'Guardado' : language === 'en' ? 'Saved' : language === 'fr' ? 'Sauvegardé' : 'Salvo',
    loginRequired: language === 'es' ? 'Inicia sesión para guardar' : language === 'en' ? 'Sign in to save' : language === 'fr' ? 'Connectez-vous pour sauvegarder' : 'Entre para salvar',
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      checkFavoriteStatus();
    }
  }, [isAuthenticated, user, id, type]);

  const checkFavoriteStatus = async () => {
    if (!user) return;
    try {
      const status = await favoriteService.isFavorite(user.id, id, type);
      setIsFavorite(status);
    } catch (err) {
      console.error('Error checking favorite status:', err);
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      alert(labels.loginRequired);
      return;
    }

    if (!user) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    setIsLoading(true);

    try {
      const result = await favoriteService.toggleFavorite(user.id, {
        itemId: id,
        itemType: type,
        title,
        url,
        image,
      });
      setIsFavorite(result.isFavorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={`transition-all duration-300 ${
        isFavorite 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      } ${isAnimating ? 'scale-110' : ''}`}
      title={!isAuthenticated ? labels.loginRequired : isFavorite ? labels.remove : labels.add}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Heart 
          className={`w-5 h-5 transition-all duration-300 ${
            isFavorite ? 'fill-current' : ''
          }`} 
        />
      )}
      {showLabel && (
        <span className="ml-2">{isFavorite ? labels.remove : labels.add}</span>
      )}
    </Button>
  );
}
