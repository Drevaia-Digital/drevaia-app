import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    content: 'Este contenido cambió completamente mi forma de ver mi vida y mi negocio.',
    rating: 5,
    avatar: 'M',
  },
];

const testimonialsEN: Testimonial[] = [
  {
    id: 1,
    name: 'Maria Gonzalez',
    role: 'Digital Entrepreneur',
    content: 'This content completely changed how I see my life and business.',
    rating: 5,
    avatar: 'M',
  },
];

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

  // 🔥 TEXTOS UI
  const uiText = {
    es: {
      badge: 'Testimonios reales',
      title: 'Historias de transformación real',
      subtitle: 'Personas que ya han transformado su vida desde dentro.',
      stats: ['Lectores impactados', 'Ebooks creados', 'Idiomas disponibles', 'Satisfacción'],
      cta: 'Yo también quiero este cambio',
    },
    en: {
      badge: 'Real testimonials',
      title: 'Real transformation stories',
      subtitle: 'People who have already transformed their lives from within.',
      stats: ['Readers impacted', 'Ebooks created', 'Languages available', 'Satisfaction'],
      cta: 'I want this change',
    },
    fr: {
      badge: 'Témoignages réels',
      title: 'Histoires de transformation réelle',
      subtitle: 'Des personnes qui ont déjà transformé leur vie.',
      stats: ['Lecteurs impactés', 'Ebooks créés', 'Langues disponibles', 'Satisfaction'],
      cta: 'Je veux ce changement',
    },
    pt: {
      badge: 'Depoimentos reais',
      title: 'Histórias de transformação real',
      subtitle: 'Pessoas que já transformaram suas vidas.',
      stats: ['Leitores impactados', 'Ebooks criados', 'Idiomas disponíveis', 'Satisfação'],
      cta: 'Eu quero essa mudança',
    },
  };

  const t = uiText[language as 'es' | 'en' | 'fr' | 'pt'] || uiText.es;

  // ===== CARRUSEL =====
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasTestimonials = testimonials.length > 0;

  const startAutoPlay = () => {
    if (!hasTestimonials) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isAutoPlaying && hasTestimonials) startAutoPlay();
    return () => stopAutoPlay();
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    if (!hasTestimonials) return;
    stopAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    if (!hasTestimonials) return;
    stopAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
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

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* CARD */}
      <div className="relative max-w-4xl mx-auto">

        <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 p-8 md:p-12">

          {currentTestimonial ? (
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
          ) : (
            <p className="text-center text-gray-400">
              No testimonials available yet.
            </p>
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

    </section>
  );
}