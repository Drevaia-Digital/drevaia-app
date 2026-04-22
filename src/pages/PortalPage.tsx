import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/sections/Navigation';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/partials/SEO';
import { useLanguage } from "@/context/LanguageContext";
import { EbookCard } from "@/components/EbookCard";
import { supabase } from "@/lib/supabase";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from "framer-motion";

export function PortalPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [books, setBooks] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // 🌍 MULTI IDIOMA
  const translations = {
    es: {
      title: "No es solo contenido.",
      subtitle: "Es un lugar donde empiezas a verte diferente.",
      discover: "Descubre por dónde empezar",
      explore: "Entrar a la biblioteca",
      community: "Recibe contenido que sí te cambia",
      placeholder: "tu email",
      subscribe: "Quiero entrar",
      success: "✨ Ya estás dentro"
    },
    en: {
      title: "This is not just content.",
      subtitle: "It’s where you start seeing yourself differently.",
      discover: "Where to start",
      explore: "Enter library",
      community: "Receive content that actually changes you",
      placeholder: "your email",
      subscribe: "Join now",
      success: "✨ You're in"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.es;

  // 🔥 LIBROS
  useEffect(() => {
    const loadBooks = async () => {
      const { data } = await supabase.from("books").select("*");
      setBooks(data || []);
    };
    loadBooks();
  }, []);

  const featured = books.slice(0, 3);

  const getTitle = (book: any) =>
    book[`title_${language}`] || book.title;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      <SEO title={t.title} description={t.subtitle} language={language} />
      <Navigation />

      {/* HERO */}
      <section className="py-32 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {t.title}
        </motion.h1>

        <p className="text-gray-400 text-lg">
          {t.subtitle}
        </p>

        <Button
          onClick={() => navigate("/library")}
          className="mt-8 bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg rounded-xl"
        >
          {t.explore}
        </Button>
      </section>

      {/* DESTACADOS */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-xl mb-8 text-center">{t.discover}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((book: any) => (
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
      <section className="text-center px-6 mb-24 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {t.community}
        </h2>

        {isSubscribed ? (
          <p>{t.success}</p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex gap-2 justify-center"
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
            />
            <Button>{t.subscribe}</Button>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
}