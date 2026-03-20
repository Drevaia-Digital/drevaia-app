import { useState, useEffect } from 'react';
import { X, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section (about 800px)
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 800 && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const scrollToEbooks = () => {
    const element = document.getElementById('ebooks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-100 dark:border-purple-800 p-4 flex items-center gap-4 pr-12">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </button>

        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-white" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            24 eBooks disponibles
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Transforma tu vida hoy
          </span>
        </div>

        <Button
          onClick={scrollToEbooks}
          className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white rounded-xl shadow-lg"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Ver tienda
        </Button>
      </div>
    </div>
  );
}
