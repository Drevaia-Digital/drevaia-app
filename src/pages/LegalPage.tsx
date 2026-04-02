import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Cookie, RefreshCw, FileText } from 'lucide-react';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useLanguage } from '@/context/LanguageContext';

interface Section {
  id: string;
  title: string;
  content: string;
  details?: { label: string; value: string }[];
  providers?: string[];
}

interface LegalData {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

export function LegalPage() {
  const { language } = useLanguage();
  const { section } = useParams<{ section: string }>();

  const [legalData, setLegalData] = useState<LegalData | null>(null);
  const [loading, setLoading] = useState(true);

  const validSections = ['privacy', 'cookies', 'refunds'];
  const currentSection = validSections.includes(section || '') ? section : 'privacy';

  const sectionTitles: Record<string, Record<string, string>> = {
    privacy: {
      es: 'Política de Privacidad',
      en: 'Privacy Policy',
      fr: 'Politique de Confidentialité',
      pt: 'Política de Privacidade',
    },
    cookies: {
      es: 'Política de Cookies',
      en: 'Cookie Policy',
      fr: 'Politique de Cookies',
      pt: 'Política de Cookies',
    },
    refunds: {
      es: 'Política de Reembolsos',
      en: 'Refund Policy',
      fr: 'Politique de Remboursements',
      pt: 'Política de Reembolsos',
    },
  };

  const backText: Record<string, string> = {
    es: 'Volver al inicio',
    en: 'Back to home',
    fr: 'Retour à l’accueil',
    pt: 'Voltar ao início',
  };

  const lastUpdatedText: Record<string, string> = {
    es: 'Última actualización:',
    en: 'Last updated:',
    fr: 'Dernière mise à jour:',
    pt: 'Última atualização:',
  };

  const notAvailableText: Record<string, string> = {
    es: 'Contenido no disponible',
    en: 'Content not available',
    fr: 'Contenu non disponible',
    pt: 'Conteúdo não disponível',
  };

  const icons: Record<string, typeof Shield> = {
    privacy: Shield,
    cookies: Cookie,
    refunds: RefreshCw,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLegalData();
  }, [currentSection, language]);

  const loadLegalData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/legal/legal-${language}.json`);
      const data = await response.json();

      if (currentSection && data[currentSection]) {
        setLegalData(data[currentSection]);
      } else {
        setLegalData(null);
      }

    } catch (error) {
      console.error('Error loading legal data:', error);
      setLegalData(null);
    }

    setLoading(false);
  };

  const Icon = icons[currentSection as keyof typeof icons] || FileText;
  const title =
  sectionTitles[currentSection as keyof typeof sectionTitles]?.[language] || 'Legal';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">

      <SEO 
        title={`${title} | Drevaia Digital`}
        description={legalData?.sections?.[0]?.content?.substring(0, 160) || ''}
        language={language}
        canonicalUrl={`https://drevaia.com/legal/${currentSection}`}
      />

      <Navigation />

      {/* HEADER */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">

        <div className="relative max-w-4xl mx-auto px-4">

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-x-1 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {backText[language]}
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-amber-500 rounded-2xl mb-6">
              <Icon className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>

            {legalData?.lastUpdated && (
              <p className="text-gray-400">
                {lastUpdatedText[language]} {legalData.lastUpdated}
              </p>
            )}
          </div>

        </div>
      </section>

      {/* TABS */}
      <div className="border-b border-white/10 bg-gray-900 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4">

          <div className="flex gap-2 overflow-x-auto py-4">
            {validSections.map((sec) => {
              const SecIcon = icons[sec];
              const secTitle = sectionTitles[sec][language];

              return (
                <Link
                  key={sec}
                  to={`/legal/${sec}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                    currentSection === sec
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'text-gray-400 hover:bg-white/5'
                  }`}
                >
                  <SecIcon className="w-4 h-4" />
                  {secTitle}
                </Link>
              );
            })}
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">

          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-6 bg-white/10 rounded w-1/3" />
              <div className="h-4 bg-white/10 rounded" />
              <div className="h-4 bg-white/10 rounded w-5/6" />
            </div>

          ) : legalData ? (

            <div className="space-y-10">

              {legalData.sections.map((sec) => (
                <div key={sec.id}>

                  <h2 className="text-xl font-bold text-white mb-4">
                    {sec.title}
                  </h2>

                  <p className="text-gray-300">
                    {sec.content}
                  </p>

                </div>
              ))}

            </div>

          ) : (
            <div className="text-center py-16 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              {notAvailableText[language]}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}