import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Lang = "es" | "en" | "fr" | "pt";

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: any;
}

export function BookPreviewModal({ isOpen, onClose, book }: BookPreviewModalProps) {
  const { language } = useLanguage();

  const [viewers, setViewers] = useState(0);
  const [rank] = useState(() => Math.floor(Math.random() * 5) + 1);

  useEffect(() => {
    if (book?.id) {
      const history = JSON.parse(localStorage.getItem("drevaia_history") || "[]");

      if (!history.includes(book.id)) {
        history.push(book.id);
        localStorage.setItem("drevaia_history", JSON.stringify(history));
      }

      supabase.from("ebook_events").insert([
        { book_id: book.id, event_type: "view" }
      ]);
    }

    const base = Math.floor(Math.random() * 6) + 3;
    setViewers(base);

    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return Math.max(2, Math.min(12, next));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [book?.id]);

  if (!isOpen || !book) return null;

  const finalLink =
    book[`buy_url_${language}`] ||
    book.buy_url_es ||
    book.buy_url_en ||
    "#";

  const title = book[`title_${language}`] || book.title;
  const description = book[`description_${language}`] || book.description;

      const copy = {
    es: {
      cta: "Acceder ahora",
      explore: "Seguir explorando",
      instant: "Acceso inmediato · Lectura privada · Sin complicaciones",
      text: "Este ebook no es solo información. Es una nueva forma de ver tu vida.",
      features: ["Acceso inmediato", "Contenido transformador"],
      social: `${viewers} personas están viendo este ebook ahora`,
      badge: "🔥 Más vendido",
      rank: `Top ${rank} en lecturas hoy`,
      smart: "✨ Recomendado para ti",
      related: "También podría resonar contigo"
    },
    en: {
      cta: "Access now",
      explore: "Keep exploring",
      instant: "Instant access · Private reading · No complications",
      text: "This ebook is not just information. It's a new way to see your life.",
      features: ["Instant access", "Transformational content"],
      social: `${viewers} people are viewing this ebook`,
      badge: "🔥 Best seller",
      rank: `Top ${rank} today`,
      smart: "✨ Recommended for you",
      related: "You may also resonate with"
    },
    fr: {
      cta: "Accéder maintenant",
      explore: "Continuer",
      instant: "Accès immédiat · Lecture privée · Sans complications",
      text: "Ce n'est pas seulement un ebook. C'est une nouvelle façon de voir ta vie.",
      features: ["Accès immédiat", "Contenu transformateur"],
      social: `${viewers} personnes consultent cet ebook`,
      badge: "🔥 Bestseller",
      rank: `Top ${rank} aujourd’hui`,
      smart: "✨ Recommandé pour toi",
      related: "Cela pourrait aussi résonner avec toi"
    },
    pt: {
      cta: "Acessar agora",
      explore: "Continuar explorando",
      instant: "Acesso imediato · Leitura privada · Sem complicações",
      text: "Este ebook não é apenas informação. É uma nova forma de ver sua vida.",
      features: ["Acesso imediato", "Conteúdo transformador"],
      social: `${viewers} pessoas estão vendo este ebook`,
      badge: "🔥 Mais vendido",
      rank: `Top ${rank} hoje`,
      smart: "✨ Recomendado para você",
      related: "Isso também pode ressoar com você"
    }
  };

  const t = copy[language as Lang];

  return (
    <AnimatePresence>
      <>
        {/* OVERLAY */}
        <motion.div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* MODAL CONTAINER */}
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        >
          {/* MODAL */}
          <motion.div
            className="w-full max-w-2xl max-h-[95vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}
            <div className="relative h-48 bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/30 hover:bg-white/50 transition rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <BookOpen className="w-12 h-12 mb-2 opacity-90" />
                <span className="text-sm opacity-80">{book.collection}</span>
              </div>
            </div>

            {/* CONTENIDO */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <p className="text-gray-600 mb-6">{description}</p>

              <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-gray-700">{t.text}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {t.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-4 border-t bg-white">
              <a href={finalLink} target="_blank">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 rounded-xl">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  {t.cta}
                </Button>
              </a>

              <Button
                variant="outline"
                onClick={onClose}
                className="w-full mt-3 rounded-xl py-5"
              >
                {t.explore}
              </Button>
            </div>

          </motion.div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}