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
      subtitle: "Something in you already knew it was time to change.",
      line: "It’s not only what you read.\nIt’s what begins to move inside you.",
      discover: "Start here",
      explore: "Enter the library",
      community: "Receive content that truly transforms",
      placeholder: "your email",
      subscribe: "Join now",
      success: "✨ You're in"
    },

    fr: {
      title: "Tu n’es pas arrivé ici par hasard.",
      subtitle: "Quelque chose en toi savait déjà que le moment était venu.",
      line: "Ce n’est pas seulement ce que tu lis.\nC’est ce qui commence à bouger en toi.",
      discover: "Commence ici",
      explore: "Entrer dans la bibliothèque",
      community: "Reçois du contenu qui transforme vraiment",
      placeholder: "votre email",
      subscribe: "Je veux entrer",
      success: "✨ Tu es dedans"
    },

    pt: {
      title: "Você não chegou aqui por acaso.",
      subtitle: "Algo em você já sabia que era hora de mudar.",
      line: "Não é só o que você lê.\nÉ o que começa a se mover dentro de você.",
      discover: "Comece por aqui",
      explore: "Entrar na biblioteca",
      community: "Receba conteúdo que realmente transforma",
      placeholder: "seu email",
      subscribe: "Quero entrar",
      success: "✨ Você entrou"
    }
  };

  const t =
    translations[language as keyof typeof translations] || translations.es;

  useEffect(() => {
    const loadBooks = async () => {
      const { data } = await supabase.from("books").select("*");
      setBooks(data || []);
    };

    loadBooks();
  }, []);

  const featured = books.slice(0, 3);

  const getTitle = (book: any) => {
    return book[`title_${language}`] || book.title;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#090611] text-white">

      <SEO
        title={t.title}
        description={t.subtitle}
        language={language}
      />

      <Navigation />

      {/* FONDO PREMIUM */}
      <div className="absolute inset-0 -z-10">

        {/* base */}
        <div className="absolute inset-0 bg-[#090611]" />

        {/* glow central */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.24) 0%, rgba(99,32,182,0.14) 28%, rgba(9,6,17,0) 62%)"
          }}
        />

        {/* viñeta */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

      </div>

      {/* PARTÍCULAS */}
      <EnergyTreeBackground />

      {/* HERO */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 pt-28 pb-20 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-200 mb-6"
        >
          {t.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 whitespace-pre-line max-w-2xl mx-auto mb-10 text-sm sm:text-base"
        >
          {t.line}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          <Button
            onClick={() => navigate("/library")}
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 px-10 py-6 text-lg rounded-2xl shadow-2xl"
          >
            {t.explore}
          </Button>
        </motion.div>

      </section>

      {/* DESTACADOS */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pb-24">

        <h2 className="text-center text-2xl font-semibold mb-12">
          {t.discover}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {featured.map((book: any, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-3 shadow-xl"
            >
              <EbookCard
                id={book.id}
                title={getTitle(book)}
                cover={book.coverImage || book.image || ""}
                price={book.price}
                onClick={() => navigate(`/library?book=${book.id}`)}
              />
            </motion.div>
          ))}

        </div>

      </section>

      {/* NEWSLETTER */}
      <section className="relative z-20 max-w-2xl mx-auto px-6 pb-24 text-center">

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          {t.community}
        </h2>

        {isSubscribed ? (
          <p className="text-emerald-300 text-lg">
            {t.success}
          </p>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-6"
          >

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              className="bg-white/10 border-white/20 h-12"
            />

            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 h-12 px-8"
            >
              {t.subscribe}
            </Button>

          </form>
        )}

      </section>

      <Footer />

    </div>
  );
}