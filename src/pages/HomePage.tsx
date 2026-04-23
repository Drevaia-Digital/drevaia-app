import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { EmotionalPaths } from '@/sections/EmotionalPaths';
import { Ebooks } from '@/sections/Ebooks';
import { DailyReading } from '../sections/DailyReading';
import { Testimonials } from '@/sections/Testimonials';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { RealityCheck } from '@/sections/RealityCheck';
import { prefetchBooks } from "@/lib/prefetchBooks";
import { useEffect } from "react";
import { Stats } from '@/sections/Stats';

export function HomePage() {
  const { language } = useLanguage();

  // 🚀 PREFETCH AUTOMÁTICO
  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchBooks();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // 🚀 PREFETCH INTERACCIÓN
  const handlePrefetch = () => {
    prefetchBooks();
  };

  return (
    <div
      id="top"
      className="min-h-screen pt-20 bg-white dark:bg-gray-900"
      onMouseEnter={handlePrefetch}
      onTouchStart={handlePrefetch}
    >

      {/* NAV */}
      <Navigation />

      {/* HERO */}
      <Hero language={language} />

      {/* REALITY */}
      <RealityCheck />

      {/* CAMINOS */}
      <EmotionalPaths />

      {/* EBOOKS */}
      <div onMouseEnter={handlePrefetch}>
        <Ebooks language={language} />
      </div>

      {/* LECTURA DIARIA */}
      <section id="daily" className="scroll-mt-24">
        <DailyReading />
      </section>

      {/* CONTADOR */}
      <Stats />

      {/* TESTIMONIOS */}
      <section id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}