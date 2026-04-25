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
import { EnergyTreeBackground } from "@/components/EnergyTreeBackground";

export function PortalPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [books, setBooks] = useState<any[]>([]);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const translations = {
    es: {
      title: "No viniste aquí por casualidad.",
      subtitle: "Algo en ti ya sabía que era momento de cambiar.",
      line: "No es solo lo que lees.\nEs lo que empieza a moverse dentro de ti.",
      discover: "Empieza por aquí",
      explore: "Entrar a la biblioteca",
      community: "Recibe contenido que sí transforma",
      placeholder: "tu email",
      subscribe: "Quiero entrar",
      success: "✨ Ya estás dentro"
    },
    en: {
      title: "You didn’t arrive here by accident.",
      subtitle: "Something in you knew it was time.",
      line: "It’s not just what you read.\nIt’s what starts shifting inside you.",
      discover: "Start here",
      explore: "Enter library",
      community: "Receive content that transforms you",
      placeholder: "your email",
      subscribe: "Join now",
      success: "✨ You're in"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.es;

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
    <div className="min-h-screen text-white relative overflow-hidden bg-[#090611]">

      <SEO title={t.title} description={t.subtitle} language={language} />
      <Navigation />

      {/* Fondo Drevaia uniforme */}
<div className="absolute inset-0 z-0">

  {/* árbol actual */}
  <EnergyTreeBackground />

  {/* glow premium */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at center, rgba(168,85,247,0.22) 0%, rgba(99,32,182,0.14) 28%, rgba(9,6,17,0) 62%)",
    }}
  />

  {/* viñeta elegante */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />

</div>

      {/* ✨ PARTÍCULAS */}
      <EnergyTreeBackground />

      {/* HERO */}
      <section className="relative py-32 text-center px-6 max-w-3xl mx-auto z-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          {t.title}
        </motion.h1>

        <p className="text-gray-300 text-lg mb-6">
          {t.subtitle}
        </p>

        <p className="text-gray-400 whitespace-pre-line mb-8">
          {t.line}
        </p>

        <Button
          onClick={() => navigate("/library")}
          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 px-10 py-5 text-lg rounded-2xl shadow-xl"
        >
          {t.explore}
        </Button>
      </section>

      {/* DESTACADOS */}
      <section className="relative max-w-5xl mx-auto px-6 mb-28 z-20">
        <h2 className="text-center text-xl mb-10">{t.discover}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((book: any, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <EbookCard
                id={book.id}
                title={getTitle(book)}
                cover={book.coverImage || book.image || ""}
                price={book.price}
                onClick={() => navigate("/library")}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="relative text-center px-6 mb-28 max-w-xl mx-auto z-20">
        <h2 className="text-2xl font-semibold mb-4">
          {t.community}
        </h2>

        {isSubscribed ? (
          <p>{t.success}</p>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-2 justify-center">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              className="bg-white/10 border-white/20"
            />
            <Button className="bg-purple-600 hover:bg-purple-700">
              {t.subscribe}
            </Button>
          </form>
        )}
      </section>

      <Footer />
    </div>
  );
}