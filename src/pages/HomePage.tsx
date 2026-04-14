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

export function HomePage() {
  const { language } = useLanguage();

  return (
    <div id="top" className="min-h-screen bg-white dark:bg-gray-900">

      {/* NAV */}
      <Navigation />

      {/* HERO */}
      <Hero language={language} />
      <RealityCheck />

      {/* CAMINOS EMOCIONALES */}
      <EmotionalPaths />

      {/* EBOOKS */}
      <Ebooks language={language} />

      {/* LECTURA DIARIA */}
      <DailyReading />

      {/* 🔥 STATS (NUEVO ORDEN CORRECTO) */}
      <Stats />

      {/* 🔥 TESTIMONIOS (AHORA CONECTADO VISUALMENTE) */}
      <Testimonials />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}