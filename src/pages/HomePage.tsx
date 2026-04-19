import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { EmotionalPaths } from '@/sections/EmotionalPaths';
import { Ebooks } from '@/sections/Ebooks';
import { DailyReading } from '../sections/DailyReading';
import { Stats } from '@/sections/Stats';
import { Testimonials } from '@/sections/Testimonials';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { RealityCheck } from '@/sections/RealityCheck';
import { prefetchBooks } from "@/lib/prefetchBooks";
import { useEffect } from "react";

export function HomePage() {
  const { language } = useLanguage();

  // 🚀 PREFETCH AUTOMÁTICO AL ENTRAR
  useEffect(() => {
    // pequeño delay para no bloquear render inicial
    const timer = setTimeout(() => {
      prefetchBooks();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 🚀 PREFETCH MANUAL (hover / interacción)
  const handlePrefetch = () => {
    prefetchBooks();
  };

  return (
    <div
      id="top"
      className="min-h-screen bg-white dark:bg-gray-900"
      onMouseEnter={handlePrefetch}   // 🖱 desktop
      onTouchStart={handlePrefetch}   // 📱 mobile
    >

      {/* NAV */}
      <Navigation />

      {/* HERO */}
      <Hero language={language} />
      <RealityCheck />

      {/* CAMINOS EMOCIONALES */}
      <EmotionalPaths />

      {/* EBOOKS */}
      <div onMouseEnter={handlePrefetch}>
        <Ebooks language={language} />
      </div>

      {/* LECTURA DIARIA */}
      <DailyReading />

      {/* STATS */}
      <Stats />

      {/* TESTIMONIOS */}
      <Testimonials />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}