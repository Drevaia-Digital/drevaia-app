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
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">

      {/* HEADER */}
      <div className="text-center mb-14">
        <div className="text-amber-400 font-semibold">{t.badge}</div>
        <h2 className="text-3xl font-bold mt-2">{t.title}</h2>
        <p className="text-gray-400 mt-2">{t.subtitle}</p>
      </div>

      {/* CARD */}
      <div className="max-w-xl mx-auto">

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.45 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg"
          >

            <div className="flex justify-center gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>

            <p className="text-center italic text-gray-300 mb-6">
              "{current.content}"
            </p>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-semibold">
                {current.avatar}
              </div>

              <h4 className="font-semibold">{current.name}</h4>
              <p className="text-sm text-gray-400">{current.role}</p>
            </div>

          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
            <ChevronLeft />
          </button>

          <button onClick={() => setIndex((i) => (i + 1) % testimonials.length)} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
            <ChevronRight />
          </button>
        </div>

        {/* 🔥 VOLVER AL INICIO */}
        <div className="mt-6 md:mt-10 text-center">
          <button
            onClick={goHome}
            className="text-gray-400 hover:text-amber-300 
            transition text-sm flex items-center justify-center gap-2 mx-auto"
          >
            {t.back}
          </button>
        </div>

      </div>

    </section>
  );
}