import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Heart, Zap, Users, ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { motion } from 'framer-motion';
import { getUserHistory } from "@/lib/userHistory";
import { useLanguage } from "@/context/LanguageContext";
import { EbookCard } from "@/components/EbookCard";
import { supabase } from "@/lib/supabase";
import { getAIRecommendations } from "@/lib/aiBackend";


export function PortalPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [books, setBooks] = useState<any[]>([]);
  const [aiBooks, setAiBooks] = useState<any[]>([]);

  const history = getUserHistory();
  const baseBook =
  history?.[0] || books?.[0] || null;

  // 🌍 MULTI IDIOMA COMPLETO (FIX REAL)
  const translations = {
    es: {
      title: "Portal Drevaia",
      subtitle: "Aquí no solo accedes a contenido.\nAquí te encuentras contigo.",
      continue: "✨ Continuar explorando",
      subscribe: "Suscribirme",
      subscribed: "✨ Ya estás dentro",
      community: "Únete a la comunidad",
      communityText: "Contenido que se siente, no solo se lee.",
      explore: "Explorar eBooks"
    },
    en: {
      title: "Drevaia Portal",
      subtitle: "Here you don’t just access content.\nYou reconnect with yourself.",
      continue: "✨ Continue exploring",
      subscribe: "Subscribe",
      subscribed: "✨ You are in",
      community: "Join the community",
      communityText: "Content you feel, not just read.",
      explore: "Explore eBooks"
    },
    fr: {
      title: "Portail Drevaia",
      subtitle: "Ici, tu n'accèdes pas seulement au contenu.\nTu te reconnectes à toi-même.",
      continue: "✨ Continuer à explorer",
      subscribe: "S’abonner",
      subscribed: "✨ Tu es déjà dedans",
      community: "Rejoins la communauté",
      communityText: "Un contenu que l'on ressent, pas seulement que l'on lit.",
      explore: "Explorer les eBooks"
    },
    pt: {
      title: "Portal Drevaia",
      subtitle: "Aqui você não apenas acessa conteúdo.\nVocê se reconecta consigo mesmo.",
      continue: "✨ Continuar explorando",
      subscribe: "Inscrever-se",
      subscribed: "✨ Você já está dentro",
      community: "Junte-se à comunidade",
      communityText: "Conteúdo que se sente, não apenas se lê.",
      explore: "Explorar eBooks"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.es;

  // 🔥 CARGAR LIBROS
  useEffect(() => {
    const loadBooks = async () => {
      const { data } = await supabase.from("books").select("*");
      setBooks(data || []);
    };
    loadBooks();
  }, []);

  // 🤖 IA REAL
  useEffect(() => {
    if (!books.length) return;

    const base = baseBook;
if (!base) return;

    getAIRecommendations(base)
      .then((data) => {
        setAiBooks(
          (Array.isArray(data) ? data : data?.data || [])
            .map((b: any) => {
              const original = books.find((bk) => bk.id === b.id);
              return original ? { ...original } : null;
            })
            .filter(Boolean)
        );
      })
      .catch(() => setAiBooks([]));
  }, [books]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const getTitle = (book: any) =>
    book[`title_${language}`] || book.title;

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      <SEO title={t.title} description={t.subtitle} language={language} />
      <Navigation />

      {/* HERO */}
      <section className="py-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {t.title}
        </motion.h1>

        <p className="text-gray-400 whitespace-pre-line max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </section>

      {/* 🤖 IA + HISTORIAL */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <h3 className="text-xl mb-6">{t.continue}</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(aiBooks.length ? aiBooks : history).slice(0, 4).map((book: any) => (
            <EbookCard
              key={book.id}
              id={book.id}
              title={getTitle(book)}
              cover={book.coverImage || book.image || ""}
              price={book.price}
              onClick={() => navigate("/library")}
            />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[BookOpen, Heart, Zap, Users].map((Icon, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className={`p-6 rounded-2xl border ${
              i === 0
                ? 'bg-purple-600/10 border-purple-500/40'
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <Icon className="w-6 h-6 mb-4 text-purple-400" />
            <h3 className="font-semibold mb-2">
              {["Mi Biblioteca", "Favoritos", "Contenido Exclusivo", "Comunidad"][i]}
            </h3>
            <p className="text-sm text-gray-400">
              {i === 0 ? "Accede a todos tus eBooks" : "Próximamente"}
            </p>
          </motion.div>
        ))}
      </section>

      {/* NEWSLETTER */}
      <section className="text-center px-6 mb-20">
        <Mail className="mx-auto mb-4 text-purple-400" />

        <h2 className="text-2xl font-bold mb-4">{t.community}</h2>

        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          {t.communityText}
        </p>

        {isSubscribed ? (
          <p>{t.subscribed}</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-2 justify-center">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <Button>{t.subscribe}</Button>
          </form>
        )}
      </section>

      {/* CTA FINAL */}
      <section className="text-center pb-20">
        <Link to="/library">
          <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg">
            <BookOpen className="mr-2" />
            {t.explore}
            <ChevronRight className="ml-2" />
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}