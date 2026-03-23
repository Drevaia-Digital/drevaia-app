useEffect(() => {
  window.scrollTo(0, 0);
}, []);
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
    loadLegalData();
  }, [currentSection, language]);

  const loadLegalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/legal/legal-${language}.json`);
      const data = await response.json();
      setLegalData(data[currentSection as keyof typeof data] as LegalData);
    } catch (error) {
      console.error('Error loading legal data:', error);
    }
    setLoading(false);
  };

  const Icon = icons[currentSection || 'privacy'] || FileText;
  const title = sectionTitles[currentSection || 'privacy']?.[language] || 'Legal';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={`${title} | Drevaia Digital`}
        description={legalData?.sections?.[0]?.content?.substring(0, 160) || ''}
        language={language}
        canonicalUrl={`https://drevaia.com/legal/${currentSection}`}
      />
      
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      {/* Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'es' ? 'Volver al inicio' : language === 'en' ? 'Back to home' : language === 'fr' ? 'Retour à l\'accueil' : 'Voltar ao início'}
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-amber-500 rounded-2xl mb-6">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h1>
            {legalData?.lastUpdated && (
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'es' ? 'Última actualización:' : language === 'en' ? 'Last updated:' : language === 'fr' ? 'Dernière mise à jour:' : 'Última atualização:'} {legalData.lastUpdated}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {validSections.map((sec) => {
              const SecIcon = icons[sec];
              const secTitle = sectionTitles[sec][language];
              return (
                <Link
                  key={sec}
                  to={`/legal/${sec}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    currentSection === sec
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
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

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              ))}
            </div>
          ) : legalData ? (
            <div className="space-y-10">
              {legalData.sections.map((sec) => (
                <div key={sec.id} id={sec.id}>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {sec.title}
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                  
                  {sec.details && (
                    <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                      <dl className="space-y-2">
                        {sec.details.map((detail, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:w-32">
                              {detail.label}:
                            </dt>
                            <dd className="text-sm text-gray-700 dark:text-gray-300">
                              {detail.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {sec.providers && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {language === 'es' ? 'Proveedores:' : language === 'en' ? 'Providers:' : language === 'fr' ? 'Fournisseurs:' : 'Provedores:'}
                      </h4>
                      <ul className="list-disc list-inside space-y-1">
                        {sec.providers.map((provider, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            {provider}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'es' ? 'Contenido no disponible' : language === 'en' ? 'Content not available' : language === 'fr' ? 'Contenu non disponible' : 'Conteúdo não disponível'}
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
