import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowUp } from 'lucide-react';import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

// ===== TESTIMONIOS =====

const testimonialsES: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    role: 'Emprendedora Digital',
    content: 'Los eBooks de Drevaia Digital transformaron completamente mi forma de ver el marketing.',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 2,
    name: 'Lucas Silva',
    role: 'Coach de Vida',
    content: 'Cada libro tiene una profundidad que realmente toca el alma.',
    rating: 5,
    avatar: 'L',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Consultora SEO',
    content: 'La combinación de SEO + IA es brillante. Me ayudó muchísimo.',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Content Creator',
    content: 'Me abrió los ojos al poder de la conexión emocional.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 5,
    name: 'Carlos Mendoza',
    role: 'Psicólogo',
    content: 'Una obra profunda que realmente transforma.',
    rating: 5,
    avatar: 'C',
  },
];

const testimonialsEN: Testimonial[] = testimonialsES;
const testimonialsFR: Testimonial[] = testimonialsES;
const testimonialsPT: Testimonial[] = testimonialsES;

const getTestimonialsByLanguage = (language: string): Testimonial[] => {
  switch (language) {
    case 'pt': return testimonialsPT;
    case 'fr': return testimonialsFR;
    case 'en': return testimonialsEN;
    default: return testimonialsES;
  }
};

export function Testimonials() {
  const { language } = useLanguage();
  const testimonials = getTestimonialsByLanguage(language);

  const hasTestimonials = testimonials.length > 0;

  // ===== TEXTOS =====
const uiText = {
  es: {
    badge: 'Testimonios reales',
    title: 'Historias de transformación real',
    subtitle: 'Personas que ya han transformado su vida desde dentro.',
    testimonialsSubtitle: 'Contenido emocional profundo · Léelo con presencia',
    stats: ['Lectores impactados', 'Ebooks creados', 'Idiomas disponibles', 'Satisfacción'],
    cta: 'Yo también quiero este cambio',
    backToTop: 'Volver al inicio',
  },
  en: {
    badge: 'Real testimonials',
    title: 'Real transformation stories',
    subtitle: 'People who have already transformed their lives from within.',
    testimonialsSubtitle: 'Deep emotional content · Read it with presence',
    stats: ['Readers impacted', 'Ebooks created', 'Languages available', 'Satisfaction'],
    cta: 'I want this change',
    backToTop: 'Back to top',
  },
  fr: {
    badge: 'Témoignages réels',
    title: 'Histoires de transformation réelle',
    subtitle: 'Des personnes qui ont déjà transformé leur vie.',
    testimonialsSubtitle: 'Contenu émotionnel profond · Lisez avec présence',
    stats: ['Lecteurs impactés', 'Ebooks créés', 'Langues disponibles', 'Satisfaction'],
    cta: 'Je veux ce changement',
    backToTop: 'Retour en haut',
  },
  pt: {
    badge: 'Depoimentos reais',
    title: 'Histórias de transformação real',
    subtitle: 'Pessoas que já transformaram suas vidas.',
    testimonialsSubtitle: 'Conteúdo emocional profundo · Leia com presença',
    stats: ['Leitores impactados', 'Ebooks criados', 'Idiomas disponíveis', 'Satisfação'],
    cta: 'Eu quero essa mudança',
    backToTop: 'Voltar ao topo',
  },
};

  const t = uiText[language as 'es' | 'en' | 'fr' | 'pt'] || uiText.es;

  // ===== CARRUSEL REAL (FIX DEFINITIVO) =====
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!hasTestimonials || testimonials.length <= 1) return;

    startAutoPlay();

    return () => stopAutoPlay();
  }, [testimonials.length]);

  const goToNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    startAutoPlay();
  };

  const goToPrevious = () => {
    stopAutoPlay();
    setCurrentIndex((prev) =>
      (prev - 1 + testimonials.length) % testimonials.length
    );
    startAutoPlay();
  };

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const currentTestimonial = hasTestimonials ? testimonials[currentIndex] : null;

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden"
    >

      {/* HEADER */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-300 text-sm font-medium mb-6">
          <Star className="w-4 h-4 fill-amber-500" />
          {t.badge}
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {t.title}
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
  {t.subtitle}
</p>
<p className="text-sm text-white/50 opacity-0 animate-fadeInUpSoft [animation-delay:0.3s]">
  {t.testimonialsSubtitle}
</p>  
      </div>

      {/* CARD */}
      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 p-8 md:p-12">

          {currentTestimonial && (
            <>
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-lg text-gray-300 italic text-center mb-6">
                "{currentTestimonial.content}"
              </p>

              <div className="text-center">
                <h4 className="font-semibold">{currentTestimonial.name}</h4>
                <p className="text-sm text-gray-400">{currentTestimonial.role}</p>
              </div>
            </>
          )}

          {/* CTA */}
          <div className="text-center mt-6">
            <a
              href="https://payhip.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold hover:scale-105 transition"
            >
              {t.cta}
            </a>
          </div>
        </div>

        {/* CONTROLES */}
        {hasTestimonials && (
          <div className="flex justify-center gap-4 mt-8">
            <Button onClick={goToPrevious}><ChevronLeft /></Button>
            <Button onClick={goToNext}><ChevronRight /></Button>
          </div>
        )}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {[
          { value: '10K+', label: t.stats[0] },
          { value: '24', label: t.stats[1] },
          { value: '4', label: t.stats[2] },
          { value: '98%', label: t.stats[3] },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-amber-400">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

    <div className="mt-16 flex justify-center">
  <button
    onClick={scrollToTop}
    className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-all duration-300"
  >
    <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
    {t.backToTop}
  </button>
</div>     

    </section>
  );
}