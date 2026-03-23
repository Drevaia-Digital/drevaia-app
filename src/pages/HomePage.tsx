import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Ebooks } from '@/sections/Ebooks';
import { Testimonials } from '@/sections/Testimonials';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';

export function HomePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      <Navigation />

      <Hero />

      <Ebooks language={language} />

      <Testimonials language={language} />

      <Footer />

    </div>
  );
}