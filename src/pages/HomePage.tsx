import { Hero } from '@/sections/Hero';
import { Ebooks } from '@/sections/Ebooks';
import { Navigation } from '@/sections/Navigation';
import { Testimonials } from '@/sections/Testimonials';
import { Footer } from '@/sections/Footer';
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
  const [params] = useSearchParams();

  // 🌍 idioma dinámico desde URL
  const language = params.get('lang') || 'es';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      {/* 🔝 NAV */}
      <Navigation />

      {/* 🔥 HERO */}
      <Hero />

      {/* 📚 EBOOKS (YA FUNCIONA CON IDIOMA) */}
      <Ebooks language={language as any} />

      {/* 💬 TESTIMONIALS (AHORA TAMBIÉN) */}
      <Testimonials language={language} />

      {/* 🦶 FOOTER */}
      <Footer />

    </div>
  );
}