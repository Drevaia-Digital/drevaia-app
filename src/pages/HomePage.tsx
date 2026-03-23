import { Hero } from '@/sections/Hero';
import { Ebooks } from '@/sections/Ebooks';
import { Navigation } from '@/sections/Navigation';
import type { Language } from '@/i18n';

interface HomePageProps {
  language: Language;
}

export function HomePage({}: HomePageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* 🔝 NAVIGATION */}
      <Navigation />

      {/* 🔥 HERO (mantiene fondo morado y estilo Drevaia) */}
      <Hero />

      {/* 📚 EBOOKS */}
      <Ebooks language="es" />

    </div>
  );
}