import { Hero } from '@/sections/Hero';
import type { Language } from '@/i18n';

interface HomePageProps {
  language: Language;
}

export function HomePage({}: HomePageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
    </div>
  );
}
