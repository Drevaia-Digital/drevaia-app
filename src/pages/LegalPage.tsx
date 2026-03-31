import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Cookie, RefreshCw, FileText } from 'lucide-react';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import type { Translations, Language } from '@/i18n';

interface LegalPageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

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

export function LegalPage({ t, language, changeLanguage }: LegalPageProps) {
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

  const Icon = icons[currentSection || 'privacy'] || FileText;
  const title = sectionTitles[currentSection || 'privacy']?.[language] || 'Legal';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">

      <SEO 
        title={`${title} | Drevaia Digital`}
        description={legalData?.sections?.[0]?.content?.substring(0, 160) || ''}
        language={language}
        canonicalUrl={`https://drevaia.com/legal/${currentSection}`}
      />

      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      {/* HEADER */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">

          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-x-1 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'es' ? 'Volver al inicio' : 'Back to home'}
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
                {language === 'es' ? 'Última actualización:' : 'Last updated:'} {legalData.lastUpdated}
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

                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300">
                      {sec.content}
                    </p>
                  </div>

                  {sec.details && (
                    <div className="mt-4 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
                      {sec.details.map((detail, idx) => (
                        <div key={idx} className="text-sm text-gray-400">
                          <strong className="text-gray-300">{detail.label}:</strong> {detail.value}
                        </div>
                      ))}
                    </div>
                  )}

                  {sec.providers && (
                    <ul className="mt-4 list-disc list-inside text-gray-400">
                      {sec.providers.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  )}

                </div>
              ))}

            </div>

          ) : (
            <div className="text-center py-16 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              Contenido no disponible
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}