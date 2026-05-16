import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { EmotionalPaths } from '@/sections/EmotionalPaths';
import { Ebooks } from '@/sections/Ebooks';
import { DailyReading } from '@/sections/DailyReading';
import { Testimonials } from '@/sections/Testimonials';
import { Footer } from '@/sections/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { RealityCheck } from '@/sections/RealityCheck';
import { prefetchBooks } from "@/lib/prefetchBooks";
import { useEffect } from "react";
import { Stats } from '@/sections/Stats';

export default function HomePage() {
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      prefetchBooks();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handlePrefetch = () => {
    prefetchBooks();
  };

  const seo = {
    es: {
      title: "Drevaia Digital | Sanación emocional y crecimiento personal",
      desc: "Ebooks y recursos para sanar heridas emocionales, crecer y transformar tu vida."
    },
    en: {
      title: "Drevaia Digital | Emotional Healing and Personal Growth",
      desc: "Books and resources to heal emotional wounds and transform your life."
    },
    fr: {
      title: "Drevaia Digital | Guérison émotionnelle et croissance personnelle",
      desc: "Ressources pour guérir intérieurement et transformer votre vie."
    },
    pt: {
      title: "Drevaia Digital | Cura emocional e crescimento pessoal",
      desc: "Recursos para curar feridas emocionais e transformar sua vida."
    }
  }[language];

  return (
    <>
      <Helmet>
  <html lang={language} />

  <title>{seo.title}</title>

  <meta name="description" content={seo.desc} />

  <meta
    name="robots"
    content="index,follow,max-image-preview:large"
  />

  {/* Canonical */}
  <link
    rel="canonical"
    href={`https://drevaia.com/${language}`}
  />

  {/* Hreflang */}
  <link rel="alternate" hrefLang="es" href="https://drevaia.com/es" />
  <link rel="alternate" hrefLang="en" href="https://drevaia.com/en" />
  <link rel="alternate" hrefLang="fr" href="https://drevaia.com/fr" />
  <link rel="alternate" hrefLang="pt" href="https://drevaia.com/pt" />
  <link rel="alternate" hrefLang="x-default" href="https://drevaia.com/es" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Drevaia Digital" />
  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.desc} />
  <meta property="og:url" content={`https://drevaia.com/${language}`} />
  <meta property="og:image" content="https://drevaia.com/logo.png" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seo.title} />
  <meta name="twitter:description" content={seo.desc} />
  <meta name="twitter:image" content="https://drevaia.com/logo.png" />
</Helmet>

      <div
        id="top"
        className="min-h-screen pt-20 bg-white dark:bg-gray-900"
        onMouseEnter={handlePrefetch}
        onTouchStart={handlePrefetch}
      >
        <Navigation />
        <Hero language={language} />
        <RealityCheck />
        <EmotionalPaths />

        <div onMouseEnter={handlePrefetch}>
          <Ebooks language={language} />
        </div>

        <section id="daily" className="scroll-mt-24">
          <DailyReading />
        </section>

        <section id="stats" className="scroll-mt-24">
          <Stats />
        </section>

        <section id="testimonials" className="scroll-mt-24">
          <Testimonials />
        </section>

        <Footer />
      </div>
    </>
  );
}