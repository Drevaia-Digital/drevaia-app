import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { motion } from 'framer-motion';
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

  // 🌍 MULTI IDIOMA
  const translations = {
    es: {
      title: "Portal Drevaia",
      subtitle: "Aquí no solo accedes a contenido.\nAquí te encuentras contigo.",
      continue: "✨ Para ti",
      explore: "Explorar eBooks",
      community: "Únete a la comunidad",
      communityText: "Contenido que se siente, no solo se lee.",
      subscribe: "Suscribirme",
      subscribed: "✨ Ya estás dentro"
    },
    en: {
      title: "Drevaia Portal",
      subtitle: "Reconnect with yourself.",
      continue: "✨ For you",
      explore: "Explore eBooks",
      community: "Join the community",
      communityText: "Content you feel, not just read.",
      subscribe: "Subscribe",
      subscribed: "✨ You are in"
    },
    fr: {
      title: "Portail Drevaia",
      subtitle: "Reconnecte-toi à toi-même.",
      continue: "✨ Pour toi",
      explore: "Explorer",
      community: "Rejoins la communauté",
      communityText: "Un contenu que l'on ressent.",
      subscribe: "S’abonner",
      subscribed: "✨ Tu es dedans"
    },
    pt: {
      title: "Portal Drevaia",
      subtitle: "Reconecte-se com você.",
      continue: "✨ Para você",
      explore: "Explorar",
      community: "Junte-se à comunidade",
      communityText: "Conteúdo que se sente.",
      subscribe: "Inscrever-se",
      subscribed: "✨ Você está dentro"
    }
  };

  const lang = (language in translations ? language : "es") as keyof typeof translations;
  const t = translations[lang];

  // 🔥 CARGAR LIBROS
  useEffect(() => {
    const loadBooks = async () => {
      const { data } = await supabase.from("books").select("*");
      setBooks(data || []);
    };
    loadBooks();
  }, []);

  // 🤖 IA PROACTIVA
  useEffect(() => {
    if (!books.length) return;

    const raw = localStorage.getItem("drevaia_history");
    const history = raw ? JSON.parse(raw) : {};

    const profile = Object.entries(history)
      .map(([id, data]: any) => ({
        id,
        score: data.views * 2 + data.clicks * 5
      }))
      .sort((a, b) => b.score - a.score);

    const baseBook =
      profile.length
        ? books.find(b => b.id === profile[0].id)
        : books[0];

    if (!baseBook) return;

    getAIRecommendations(baseBook)
      .then((data) => {
        const mapped =
          (Array.isArray(data) ? data : data?.data || [])
            .map((b: any) => {
              const original = books.find((bk) => bk.id === b.id);
              return original ? { ...original } : null;
            })
            .filter(Boolean);

        setAiBooks(mapped);
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

      {/* 🤖 IA */}
      {aiBooks.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <h3 className="text-xl mb-6">{t.continue}</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aiBooks.slice(0, 4).map((book: any) => (
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
      )}

      {/* 📚 CATÁLOGO */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <h3 className="text-xl mb-6">{t.explore}</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.slice(0, 8).map((book: any) => (
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

      <Footer />
    </div>
  );
}