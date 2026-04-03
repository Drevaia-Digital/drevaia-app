import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

// ===== TESTIMONIOS COMPLETOS MULTI-IDIOMA =====

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

const testimonialsEN: Testimonial[] = [
  {
    id: 1,
    name: 'Emily Carter',
    role: 'Digital Entrepreneur',
    content: 'Drevaia Digital eBooks completely changed the way I understand marketing.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 2,
    name: 'James Walker',
    role: 'Life Coach',
    content: 'Each book carries a depth that truly resonates with the soul.',
    rating: 5,
    avatar: 'J',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'SEO Consultant',
    content: 'The SEO + AI combination is brilliant. It helped me a lot.',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Content Creator',
    content: 'It opened my eyes to the power of emotional connection.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 5,
    name: 'Carlos Mendoza',
    role: 'Psychologist',
    content: 'A deep work that truly transforms.',
    rating: 5,
    avatar: 'C',
  },
];

const testimonialsFR: Testimonial[] = [
  {
    id: 1,
    name: 'Claire Dubois',
    role: 'Entrepreneure Digitale',
    content: 'Les eBooks de Drevaia Digital ont transformé ma vision du marketing.',
    rating: 5,
    avatar: 'C',
  },
  {
    id: 2,
    name: 'Julien Moreau',
    role: 'Coach de Vie',
    content: 'Chaque livre possède une profondeur qui touche réellement l’âme.',
    rating: 5,
    avatar: 'J',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Consultante SEO',
    content: 'La combinaison SEO + IA est brillante. Cela m’a énormément aidé.',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Créatrice de Contenu',
    content: 'Cela m’a ouvert les yeux sur la puissance de la connexion émotionnelle.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 5,
    name: 'Carlos Mendoza',
    role: 'Psychologue',
    content: 'Une œuvre profonde qui transforme réellement.',
    rating: 5,
    avatar: 'C',
  },
];

const testimonialsPT: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Souza',
    role: 'Empreendedora Digital',
    content: 'Os eBooks da Drevaia Digital mudaram completamente minha visão de marketing.',
    rating: 5,
    avatar: 'A',
  },
  {
    id: 2,
    name: 'Rafael Costa',
    role: 'Coach de Vida',
    content: 'Cada livro tem uma profundidade que realmente toca a alma.',
    rating: 5,
    avatar: 'R',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Consultora SEO',
    content: 'A combinação de SEO + IA é brilhante. Me ajudou muito.',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Criadora de Conteúdo',
    content: 'Abriu meus olhos para o poder da conexão emocional.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 5,
    name: 'Carlos Mendoza',
    role: 'Psicólogo',
    content: 'Uma obra profunda que realmente transforma.',
    rating: 5,
    avatar: 'C',
  },
];

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 🔥 RESET AL CAMBIAR IDIOMA (PRO)
  useEffect(() => {
    setCurrentIndex(0);
  }, [language]);

  const startAutoPlay = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 250);
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
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 200);
    startAutoPlay();
  };

  const goToPrevious = () => {
    stopAutoPlay();
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        (prev - 1 + testimonials.length) % testimonials.length
      );
      setFade(true);
    }, 200);
    startAutoPlay();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
  setTouchStartX(e.targetTouches[0].clientX);
};

const handleTouchMove = (e: React.TouchEvent) => {
  setTouchEndX(e.targetTouches[0].clientX);
};

const handleTouchEnd = () => {
  if (!touchStartX || !touchEndX) return;

  const distance = touchStartX - touchEndX;

  if (distance > 50) {
    goToNext(); // izquierda
  } else if (distance < -50) {
    goToPrevious(); // derecha
  }

  setTouchStartX(null);
  setTouchEndX(null);
};

  const currentTestimonial = hasTestimonials ? testimonials[currentIndex] : null;

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-28 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden"
    >
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-300 text-sm font-medium mb-6">
          <Star className="w-4 h-4 fill-amber-500" />
          Testimonios reales
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Historias de transformación real
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
          Personas que ya han transformado su vida desde dentro.
        </p>

        <p className="text-sm text-white/50 opacity-0 animate-fadeInUpSoft [animation-delay:0.3s]">
          Contenido emocional profundo · Léelo con presencia
        </p>
  </div>
  <div
  className="relative max-w-4xl mx-auto cursor-grab active:cursor-grabbing"
  onMouseEnter={stopAutoPlay}
  onMouseLeave={startAutoPlay}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
        <div className={`bg-white/5 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 p-8 md:p-12 transition-all duration-500 ${
  fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
}`}>
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
        </div>

        {hasTestimonials && (
          <div className="flex justify-center gap-4 mt-8">
            <div className="flex justify-center gap-2 mt-4">
  {testimonials.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`w-2 h-2 rounded-full transition-all duration-300 ${
        currentIndex === index
          ? 'bg-amber-400 w-4'
          : 'bg-white/30 hover:bg-white/60'
      }`}
    />
  ))}
</div>
            <Button onClick={goToPrevious}><ChevronLeft /></Button>
            <Button onClick={goToNext}><ChevronRight /></Button>
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-center">
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-all duration-300"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
          Volver al inicio
        </button>
      </div>
    </section>
  );
}