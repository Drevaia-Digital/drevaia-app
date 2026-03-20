import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
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

export function FavoriteButton({
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
  const { toggleFavorite, isFavorite, isHydrated } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  const isFav = isHydrated ? isFavorite(id, type) : false;

  const labels = {
    add: language === 'es' ? 'Guardar' : language === 'en' ? 'Save' : language === 'fr' ? 'Sauvegarder' : 'Salvar',
    remove: language === 'es' ? 'Guardado' : language === 'en' ? 'Saved' : language === 'fr' ? 'Sauvegardé' : 'Salvo',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    toggleFavorite({
      id,
      type,
      title,
      url,
      image,
    });
  };

  if (!isHydrated) {
    return (
      <Button variant={variant} size={size} disabled>
        <Heart className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`transition-all duration-300 ${
        isFav 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      } ${isAnimating ? 'scale-110' : ''}`}
    >
      <Heart 
        className={`w-5 h-5 transition-all duration-300 ${
          isFav ? 'fill-current' : ''
        }`} 
      />
      {showLabel && (
        <span className="ml-2">{isFav ? labels.remove : labels.add}</span>
      )}
    </Button>
  );
}
