import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Zap, Users, ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { motion } from 'framer-motion';
import { getUserHistory } from "@/lib/userHistory";

import { useLanguage } from "@/context/LanguageContext";

export function PortalPage() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const history = getUserHistory();

  const labels = {
    title: language === 'es' ? 'Portal Drevaia' : 'Drevaia Portal',
    subtitle: language === 'es'
      ? 'Aquí no solo accedes a contenido.\nAquí te encuentras contigo.'
      : 'Here you don’t just access content.\nYou reconnect with yourself.',
    comingSoon: language === 'es' ? 'Próximamente' : 'Coming Soon',
    subscribe: language === 'es' ? 'Suscribirme' : 'Subscribe',
    subscribed: language === 'es' ? '✨ Ya estás dentro' : '✨ You are in',
    continue: language === 'es' ? '✨ Continuar explorando' : '✨ Continue exploring'
  };

  const features = [
    {
      icon: BookOpen,
      title: language === 'es' ? 'Mi Biblioteca' : 'My Library',
      description: language === 'es'
        ? 'Accede a todos tus eBooks'
        : 'Access your eBooks',
      active: true
    },
    {
      icon: Heart,
      title: language === 'es' ? 'Favoritos' : 'Favorites',
      description: language === 'es'
        ? 'Guarda lo que te toca'
        : 'Save what resonates',
      active: false
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Contenido Exclusivo' : 'Exclusive Content',
      description: language === 'es'
        ? 'Contenido solo para miembros'
        : 'Members-only content',
      active: false
    },
    {
      icon: Users,
      title: language === 'es' ? 'Comunidad' : 'Community',
      description: language === 'es'
        ? 'Conecta con otros lectores'
        : 'Connect with others',
      active: false
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
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      <SEO title={labels.title} description={labels.subtitle} language={language} />

    <Navigation />
      {/* HERO */}
      <section className="py-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {labels.title}
        </motion.h1>

        <p className="text-gray-400 whitespace-pre-line max-w-xl mx-auto">
          {labels.subtitle}
        </p>
      </section>

      {/* 🔥 HISTORIAL INTELIGENTE */}
      {history.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <h3 className="text-xl mb-6">{labels.continue}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {history.map((item: any) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                className="p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition cursor-pointer border border-white/10"
              >
                <p className="text-sm text-gray-300">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

        {features.map((feature) => (
          <motion.div
            key={feature.title}
            whileHover={{ scale: 1.03 }}
            className={`p-6 rounded-2xl border transition
              ${feature.active
                ? 'bg-purple-600/10 border-purple-500/40'
                : 'bg-white/5 border-white/10 opacity-60'
              }`}
          >
            <feature.icon className="w-6 h-6 mb-4 text-purple-400" />

            <h3 className="font-semibold mb-2">
              {feature.title}
            </h3>

            <p className="text-sm text-gray-400 mb-4">
              {feature.description}
            </p>

            {!feature.active && (
              <span className="text-xs text-purple-400">
                {labels.comingSoon}
              </span>
            )}
          </motion.div>
        ))}

      </section>

      {/* NEWSLETTER */}
      <section className="text-center px-6 mb-20">
        <Mail className="mx-auto mb-4 text-purple-400" />

        <h2 className="text-2xl font-bold mb-4">
          {language === 'es' ? 'Únete a la comunidad' : 'Join the community'}
        </h2>

        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          {language === 'es'
            ? 'Contenido que se siente, no solo se lee.'
            : 'Content you feel, not just read.'}
        </p>

        {isSubscribed ? (
          <p>{labels.subscribed}</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-2 justify-center">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Button>{labels.subscribe}</Button>
          </form>
        )}
      </section>

      {/* CTA FINAL */}
      <section className="text-center pb-20">
        <Link to="/library">
          <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg">
            <BookOpen className="mr-2" />
            {language === 'es' ? 'Explorar eBooks' : 'Explore eBooks'}
            <ChevronRight className="ml-2" />
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}