import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Lang = "es" | "en" | "fr" | "pt";

interface BookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: any;
}

export function BookPreviewModal({ isOpen, onClose, book }: BookPreviewModalProps) {
  const { language } = useLanguage();
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    if (!book?.id) return;

    // 🧠 HISTORIAL
    const raw = localStorage.getItem("drevaia_history");
    const history = raw ? JSON.parse(raw) : {};

    if (!history[book.id]) {
      history[book.id] = { views: 0, clicks: 0 };
    }

    history[book.id].views += 1;

    localStorage.setItem("drevaia_history", JSON.stringify(history));

    // 📊 ANALYTICS
    trackEvent({
      type: "view",
      bookId: book.id
    });

    // 👀 viewers dinámicos
    const base = Math.floor(Math.random() * 6) + 3;
    setViewers(base);

    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(2, Math.min(12, prev + change));
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
      cta: "Acceder ahora →",
      explore: "Seguir explorando",
      text: "Este ebook no es solo información. Es una nueva forma de ver tu vida.",
      features: ["Acceso inmediato", "Contenido transformador"],
      social: `${viewers} personas están viendo este ebook ahora`
    },
    en: {
      cta: "Access now →",
      explore: "Keep exploring",
      text: "This ebook is not just information. It's a new way to see your life.",
      features: ["Instant access", "Transformational content"],
      social: `${viewers} people are viewing this ebook`
    },
    fr: {
      cta: "Accéder maintenant →",
      explore: "Continuer",
      text: "Une nouvelle façon de voir ta vie.",
      features: ["Accès immédiat", "Contenu transformateur"],
      social: `${viewers} personnes consultent cet ebook`
    },
    pt: {
      cta: "Acessar agora →",
      explore: "Continuar",
      text: "Uma nova forma de ver sua vida.",
      features: ["Acesso imediato", "Conteúdo transformador"],
      social: `${viewers} pessoas estão vendo este ebook`
    }
  };

  const t = copy[language as Lang];

  return (
    <AnimatePresence>
      <>
        <motion.div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="relative h-48 bg-gradient-to-br from-purple-600 to-indigo-600">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/30 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <BookOpen className="w-10 h-10 mb-2" />
                <span>{book.collection}</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-3">{title}</h2>
              <p className="text-gray-600 mb-4">{description}</p>

              <p className="text-sm text-purple-600 mb-4">{t.text}</p>

              <p className="text-xs text-gray-400 mb-4">
                {language === "es" && "Acceso inmediato. Sin suscripciones. Pago único."}
                {language === "en" && "Instant access. No subscriptions. One-time payment."}
                {language === "fr" && "Accès immédiat. Paiement unique."}
                {language === "pt" && "Acesso imediato. Pagamento único."}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {t.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mb-2">{t.social}</p>

              <p className="text-[11px] text-orange-400 mb-4">
                {language === "es" && "Disponible ahora · Acceso inmediato"}
                {language === "en" && "Available now · Instant access"}
                {language === "fr" && "Disponible maintenant"}
                {language === "pt" && "Disponível agora"}
              </p>
            </div>

            <div className="p-4 border-t">
              <button
                onClick={() => {
                  const raw = localStorage.getItem("drevaia_history");
                  const history = raw ? JSON.parse(raw) : {};

                  if (!history[book.id]) {
                    history[book.id] = { views: 0, clicks: 0 };
                  }

                  history[book.id].clicks += 1;

                  localStorage.setItem("drevaia_history", JSON.stringify(history));

                  trackEvent({
                    type: "click",
                    bookId: book.id
                  });

                  window.open(finalLink, "_blank");
                }}
                className="w-full bg-purple-600 text-white py-3 rounded-xl"
              >
                {t.cta}
              </button>

              <Button
                variant="outline"
                onClick={onClose}
                className="w-full mt-2"
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