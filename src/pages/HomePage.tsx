import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Story } from '@/sections/Story';
import { About } from '@/sections/About';
import { Ebooks } from '@/sections/Ebooks';
import { Testimonials } from '@/sections/Testimonials';
import { Register } from '@/sections/Register';
import { Legal } from '@/sections/Legal';
import { Footer } from '@/sections/Footer';
import { StickyCTA } from '@/components/StickyCTA';
import { SEO, seoConfigs } from '@/partials/SEO';
import type { Translations, Language } from '@/i18n';

interface HomePageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

export function HomePage({ t, language, changeLanguage }: HomePageProps) {
  const seo = seoConfigs.home(language);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        language={language}
        canonicalUrl={`https://drevaia.com${language === 'es' ? '' : `/${language}`}`}
      />
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />
      <main>
        <Hero t={t} />
        <Story t={t} />
        <About t={t} />
        <Ebooks t={t} language={language} />
        <Testimonials t={t} />
        <Register t={t} language={language} />
        <Legal t={t} />
      </main>
      <Footer t={t} />
      <StickyCTA />
    </div>
  );
}
