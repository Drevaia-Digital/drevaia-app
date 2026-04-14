import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: {
    id: string | number;
    title: string;
    description: string;
    collection: string;
    cover?: string;

    // 🔥 MULTI LINK
    buy_url_es?: string;
    buy_url_en?: string;
    buy_url_fr?: string;
    buy_url_pt?: string;
  } | null;
}

export function BookPreviewModal({ isOpen, onClose, book }: BookPreviewModalProps) {
  const { language } = useLanguage();

  if (!isOpen || !book) return null;

  // 🌍 LINK DINÁMICO (CLAVE)
  const getLink = () => {
    if (language === "es") return book.buy_url_es;
    if (language === "fr") return book.buy_url_fr;
    if (language === "pt") return book.buy_url_pt;
    return book.buy_url_en;
  };

  const finalLink = getLink() || "#";

  // 🌍 COPY DINÁMICO
  const copy = {
    es: {
      cta: "Acceder ahora",
      explore: "Seguir explorando",
      social: "Varias personas están viendo este ebook ahora mismo",
      instant: "Acceso inmediato · Lectura sin límites",
      text: "Este ebook no es solo información. Es una nueva forma de ver tu vida.",
    },
    en: {
      cta: "Access now",
      explore: "Keep exploring",
      social: "Several people are viewing this ebook right now",
      instant: "Instant access · Unlimited reading",
      text: "This ebook is not just information. It's a new way to see your life.",
    },
    fr: {
      cta: "Accéder maintenant",
      explore: "Continuer à explorer",
      social: "Plusieurs personnes consultent cet ebook en ce moment",
      instant: "Accès immédiat · Lecture illimitée",
      text: "Cet ebook n'est pas seulement une information. C'est une nouvelle façon de voir votre vie.",
    },
    pt: {
      cta: "Acessar agora",
      explore: "Continuar explorando",
      social: "Várias pessoas estão vendo este ebook agora",
      instant: "Acesso imediato · Leitura ilimitada",
      text: "Este ebook não é apenas informação. É uma nova forma de ver sua vida.",
    },
  };

  const t = copy[language];

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

        {/* MODAL */}
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-2xl max-h-[95vh] md:max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}
            <div className="relative h-48 bg-gradient-to-br from-purple-600 via-indigo-600 to-amber-500">

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 z-50 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <BookOpen className="w-12 h-12 mb-2 opacity-90" />
                <span className="text-sm opacity-80">{book.collection}</span>
              </div>
            </div>

            {/* CONTENIDO */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 md:pb-24">

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {book.title}
              </h2>

              <p className="text-gray-600 mb-6">
                {book.description}
              </p>

              <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-gray-700">
                  {t.text}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {["Acceso inmediato", "Contenido transformador"].map((f, i) => (
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

              <p className="text-xs text-center mt-2">
                {t.instant}
              </p>

              <p className="text-xs text-center text-purple-500 mt-1 animate-pulse">
                {t.social}
              </p>

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