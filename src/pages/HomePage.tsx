import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { EmotionalPaths } from '@/sections/EmotionalPaths';
import { Ebooks } from '@/sections/Ebooks';
import { DailyReading } from '../sections/DailyReading';
import { Testimonials } from '@/sections/Testimonials';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';

export function HomePage() {
  const { language } = useLanguage();

  return (
  <div id="top" className="min-h-screen bg-white dark:bg-gray-900">

      <Navigation />

      <Hero language={language} />

      <EmotionalPaths />

      <Ebooks language={language} />

      <DailyReading />

      <Testimonials />

      <Footer />

    </div>
  );
}