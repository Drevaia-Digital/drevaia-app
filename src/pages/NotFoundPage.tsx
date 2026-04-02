import { Link } from 'react-router-dom';
import { Home, Search, BookOpen, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useLanguage } from '@/context/LanguageContext';

export function NotFoundPage() {
  const { language } = useLanguage();

  const labels = {
    title:
      language === 'es'
        ? 'Página no encontrada'
        : language === 'en'
        ? 'Page not found'
        : language === 'fr'
        ? 'Page non trouvée'
        : 'Página não encontrada',

    description:
      language === 'es'
        ? 'Lo sentimos, la página que buscas no existe o ha sido movida.'
        : language === 'en'
        ? 'Sorry, the page you are looking for does not exist or has been moved.'
        : language === 'fr'
        ? "Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
        : 'Desculpe, a página que você procura não existe ou foi movida.',

    backHome:
      language === 'es'
        ? 'Volver al inicio'
        : language === 'en'
        ? 'Back to home'
        : language === 'fr'
        ? "Retour à l'accueil"
        : 'Voltar ao início',

    exploreLibrary:
      language === 'es'
        ? 'Explorar librería'
        : language === 'en'
        ? 'Explore library'
        : language === 'fr'
        ? 'Explorer la bibliothèque'
        : 'Explorar biblioteca',

    readBlog:
      language === 'es'
        ? 'Leer blog'
        : language === 'en'
        ? 'Read blog'
        : language === 'fr'
        ? 'Lire le blog'
        : 'Ler blog',

    goBack:
      language === 'es'
        ? 'Volver atrás'
        : language === 'en'
        ? 'Go back'
        : language === 'fr'
        ? 'Retourner'
        : 'Voltar',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">

      <SEO
        title={`404 | ${labels.title}`}
        description={labels.description}
        language={language}
        noIndex={true}
      />

      <Navigation />

      <main className="flex items-center justify-center min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 text-center">

          {/* 404 */}
          <div className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent mb-6">
            404
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {labels.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            {labels.description}
          </p>

          {/* BOTONES */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-600 to-amber-500">
                <Home className="w-5 h-5 mr-2" />
                {labels.backHome}
              </Button>
            </Link>

            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              {labels.goBack}
            </Button>

          </div>

          {/* LINKS */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">

            <p className="text-sm text-gray-500 mb-4">
              {language === 'es'
                ? 'O explora estas secciones:'
                : language === 'en'
                ? 'Or explore these sections:'
                : language === 'fr'
                ? 'Ou explorez ces sections:'
                : 'Ou explore estas seções:'}
            </p>

            <div className="flex flex-wrap justify-center gap-4">

              <Link to="/library" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <BookOpen className="w-4 h-4" />
                {labels.exploreLibrary}
              </Link>

              <Link to="/blog" className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Search className="w-4 h-4" />
                {labels.readBlog}
              </Link>

            </div>

          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
}