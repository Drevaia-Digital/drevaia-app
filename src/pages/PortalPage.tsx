import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Heart, Zap, Lock, Users, ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import type { Translations, Language } from '@/i18n';

interface PortalPageProps {
  t: Translations;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

export function PortalPage({ t, language, changeLanguage }: PortalPageProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const labels = {
    title: language === 'es' ? 'Portal Drevaia' : language === 'en' ? 'Drevaia Portal' : language === 'fr' ? 'Portail Drevaia' : 'Portal Drevaia',
    subtitle: language === 'es' 
      ? 'Tu espacio personal de transformación' 
      : language === 'en' 
        ? 'Your personal transformation space' 
        : language === 'fr' 
          ? 'Votre espace personnel de transformation' 
          : 'Seu espaço pessoal de transformação',
    comingSoon: language === 'es' ? 'Próximamente' : language === 'en' ? 'Coming Soon' : language === 'fr' ? 'Bientôt' : 'Em Breve',
    newsletterTitle: language === 'es' 
      ? 'Únete a la comunidad' 
      : language === 'en' 
        ? 'Join the community' 
        : language === 'fr' 
          ? 'Rejoignez la communauté' 
          : 'Junte-se à comunidade',
    newsletterDesc: language === 'es'
      ? 'Recibe contenido exclusivo, novedades y regalos poéticos directamente en tu correo.'
      : language === 'en'
        ? 'Receive exclusive content, updates and poetic gifts directly to your email.'
        : language === 'fr'
          ? 'Recevez du contenu exclusif, des nouveautés et des cadeaux poétiques directement dans votre e-mail.'
          : 'Receba conteúdo exclusivo, novidades e presentes poéticos diretamente no seu e-mail.',
    emailPlaceholder: language === 'es' ? 'tu@email.com' : language === 'en' ? 'your@email.com' : language === 'fr' ? 'votre@email.com' : 'seu@email.com',
    subscribe: language === 'es' ? 'Suscribirme' : language === 'en' ? 'Subscribe' : language === 'fr' ? 'M\'abonner' : 'Inscrever-me',
    subscribed: language === 'es' ? '¡Gracias por suscribirte!' : language === 'en' ? 'Thanks for subscribing!' : language === 'fr' ? 'Merci de vous être abonné!' : 'Obrigado por se inscrever!',
  };

  const features = [
    {
      icon: BookOpen,
      title: language === 'es' ? 'Mi Biblioteca' : language === 'en' ? 'My Library' : language === 'fr' ? 'Ma Bibliothèque' : 'Minha Biblioteca',
      description: language === 'es' ? 'Accede a todos tus eBooks comprados' : language === 'en' ? 'Access all your purchased eBooks' : language === 'fr' ? 'Accédez à tous vos eBooks achetés' : 'Acesse todos os seus eBooks comprados',
      status: 'coming',
    },
    {
      icon: Heart,
      title: language === 'es' ? 'Favoritos' : language === 'en' ? 'Favorites' : language === 'fr' ? 'Favoris' : 'Favoritos',
      description: language === 'es' ? 'Guarda tus artículos y libros favoritos' : language === 'en' ? 'Save your favorite articles and books' : language === 'fr' ? 'Enregistrez vos articles et livres favoris' : 'Salve seus artigos e livros favoritos',
      status: 'coming',
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Contenido Exclusivo' : language === 'en' ? 'Exclusive Content' : language === 'fr' ? 'Contenu Exclusif' : 'Conteúdo Exclusivo',
      description: language === 'es' ? 'Material adicional solo para miembros' : language === 'en' ? 'Additional material for members only' : language === 'fr' ? 'Matériel supplémentaire réservé aux membres' : 'Material adicional apenas para membros',
      status: 'coming',
    },
    {
      icon: Users,
      title: language === 'es' ? 'Comunidad' : language === 'en' ? 'Community' : language === 'fr' ? 'Communauté' : 'Comunidade',
      description: language === 'es' ? 'Conecta con otros lectores' : language === 'en' ? 'Connect with other readers' : language === 'fr' ? 'Connectez-vous avec d\'autres lecteurs' : 'Conecte-se com outros leitores',
      status: 'coming',
    },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title={labels.title}
        description={labels.subtitle}
        language={language}
        canonicalUrl={`https://drevaia.com${language === 'es' ? '' : `/${language}`}/portal`}
      />
      
      <Navigation t={t} language={language} changeLanguage={changeLanguage} />

      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {labels.comingSoon}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {labels.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {labels.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="group bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                  <Lock className="w-3 h-3" />
                  {labels.comingSoon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-purple-50 dark:bg-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {labels.newsletterTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {labels.newsletterDesc}
          </p>

          {isSubscribed ? (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-6 py-4 rounded-xl">
              {labels.subscribed}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={labels.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600">
                {labels.subscribe}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-600 to-amber-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {language === 'es' 
                ? '¿Listo para empezar tu viaje?' 
                : language === 'en' 
                  ? 'Ready to start your journey?' 
                  : language === 'fr' 
                    ? 'Prêt à commencer votre voyage?' 
                    : 'Pronto para começar sua jornada?'}
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              {language === 'es'
                ? 'Explora nuestra biblioteca de eBooks diseñados para tu transformación personal.'
                : language === 'en'
                  ? 'Explore our library of eBooks designed for your personal transformation.'
                  : language === 'fr'
                    ? 'Explorez notre bibliothèque d\'eBooks conçus pour votre transformation personnelle.'
                    : 'Explore nossa biblioteca de eBooks projetados para sua transformação pessoal.'}
            </p>
            <Link to="/library">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-white/90">
                <BookOpen className="w-5 h-5 mr-2" />
                {language === 'es' ? 'Explorar eBooks' : language === 'en' ? 'Explore eBooks' : language === 'fr' ? 'Explorer les eBooks' : 'Explorar eBooks'}
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </div>
  );
}
