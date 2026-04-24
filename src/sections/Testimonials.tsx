import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

type Lang = "es" | "en" | "fr" | "pt";

// ===== TESTIMONIOS =====
const testimonialsES: Testimonial[] = [
  { id: 1, name: 'María González', role: 'Emprendedora Digital', content: 'Los eBooks de Drevaia Digital transformaron completamente mi forma de ver el marketing.', rating: 5, avatar: 'M' },
  { id: 2, name: 'Lucas Silva', role: 'Coach de Vida', content: 'Cada libro tiene una profundidad que realmente toca el alma.', rating: 5, avatar: 'L' },
  { id: 3, name: 'Sophie Martin', role: 'Consultora SEO', content: 'La combinación de SEO + IA es brillante. Me ayudó muchísimo.', rating: 5, avatar: 'S' },
  { id: 4, name: 'Emma Thompson', role: 'Content Creator', content: 'Me abrió los ojos al poder de la conexión emocional.', rating: 5, avatar: 'E' },
  { id: 5, name: 'Carlos Mendoza', role: 'Psicólogo', content: 'Una obra profunda que realmente transforma.', rating: 5, avatar: 'C' },
];

const testimonialsEN = testimonialsES;
const testimonialsFR = testimonialsES;
const testimonialsPT = testimonialsES;

const getTestimonialsByLanguage = (language: Lang): Testimonial[] => {
  switch (language) {
    case 'en': return testimonialsEN;
    case 'fr': return testimonialsFR;
    case 'pt': return testimonialsPT;
    default: return testimonialsES;
  }
};

// ===== TEXTOS =====
const uiText = {
  es: {
    badge: 'Testimonios reales',
    title: 'Historias de transformación real',
    subtitle: 'Personas que ya han transformado su vida desde dentro.',
    back: '← Volver al inicio'
  },
  en: {
    badge: 'Real testimonials',
    title: 'Real transformation stories',
    subtitle: 'People who have transformed their lives from within.',
    back: '← Back to home'
  },
  fr: {
    badge: 'Témoignages réels',
    title: 'Histoires de transformation réelle',
    subtitle: 'Des personnes qui ont transformé leur vie.',
    back: '← Retour à l’accueil'
  },
  pt: {
    badge: 'Depoimentos reais',
    title: 'Histórias de transformação real',
    subtitle: 'Pessoas que transformaram suas vidas.',
    back: '← Voltar ao início'
  },
};

export function Testimonials() {
  const { language } = useLanguage();
  const lang = (language || "es") as Lang;
  const t = uiText[lang];

  const navigate = useNavigate();

  const testimonials = getTestimonialsByLanguage(lang);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[index];

  const goHome = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  if (!current) return null;

  return (
    <section
  id="testimonials"
  className="min-h-[85vh] md:min-h-screen flex flex-col justify-center items-center px-4 py-12 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white"
>

  {/* HEADER */}
  <div className="text-center mb-6 md:mb-14">
    <div className="text-amber-400 font-semibold">{t.badge}</div>
    <h2 className="text-2xl md:text-3xl font-bold mt-2">{t.title}</h2>
    <p className="text-gray-400 mt-2 text-sm md:text-base">{t.subtitle}</p>
  </div>

  {/* CARD + CONTROLES */}
  <div className="w-full max-w-xl flex flex-col items-center">

    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg"
      >

        <div className="flex justify-center gap-1 mb-3">
          {[...Array(current.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-amber-400 fill-amber-400" />
          ))}
        </div>

        <p className="text-center italic text-gray-300 mb-5 text-sm md:text-base">
          "{current.content}"
        </p>

        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-semibold">
            {current.avatar}
          </div>

          <h4 className="font-semibold text-sm md:text-base">{current.name}</h4>
          <p className="text-xs md:text-sm text-gray-400">{current.role}</p>
        </div>

      </motion.div>
    </AnimatePresence>

    {/* CONTROLES */}
    <div className="flex justify-center gap-4 mt-5">
      <button
        onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <ChevronRight />
      </button>
    </div>

    {/* VOLVER */}
    <button
      onClick={goHome}
      className="mt-4 text-xs md:text-sm text-gray-400 hover:text-amber-300 transition"
    >
      {t.back}
    </button>

  </div>

</section>
  );
}