import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect, useRef } from 'react';


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
  { id: 1, name: 'María González', role: 'Emprendedora Digital', content: 'Los eBooks de Drevaia Digital transformaron completamente mi forma de ver el marketing.', rating: 5, avatar: 'M' },
  { id: 2, name: 'Lucas Silva', role: 'Coach de Vida', content: 'Cada libro tiene una profundidad que realmente toca el alma.', rating: 5, avatar: 'L' },
  { id: 3, name: 'Sophie Martin', role: 'Consultora SEO', content: 'La combinación de SEO + IA es brillante. Me ayudó muchísimo.', rating: 5, avatar: 'S' },
  { id: 4, name: 'Emma Thompson', role: 'Content Creator', content: 'Me abrió los ojos al poder de la conexión emocional.', rating: 5, avatar: 'E' },
  { id: 5, name: 'Carlos Mendoza', role: 'Psicólogo', content: 'Una obra profunda que realmente transforma.', rating: 5, avatar: 'C' },
];

const testimonialsEN: Testimonial[] = [
  { id: 1, name: 'Emily Carter', role: 'Digital Entrepreneur', content: 'Drevaia Digital eBooks completely changed the way I understand marketing.', rating: 5, avatar: 'E' },
  { id: 2, name: 'James Walker', role: 'Life Coach', content: 'Each book carries a depth that truly resonates with the soul.', rating: 5, avatar: 'J' },
  { id: 3, name: 'Sophie Martin', role: 'SEO Consultant', content: 'The SEO + AI combination is brilliant. It helped me a lot.', rating: 5, avatar: 'S' },
  { id: 4, name: 'Emma Thompson', role: 'Content Creator', content: 'It opened my eyes to the power of emotional connection.', rating: 5, avatar: 'E' },
  { id: 5, name: 'Carlos Mendoza', role: 'Psychologist', content: 'A deep work that truly transforms.', rating: 5, avatar: 'C' },
];

const testimonialsFR = testimonialsEN;
const testimonialsPT = testimonialsEN;

const getTestimonialsByLanguage = (language: string): Testimonial[] => {
  switch (language) {
    case 'pt': return testimonialsPT;
    case 'fr': return testimonialsFR;
    case 'en': return testimonialsEN;
    default: return testimonialsES;
  }
};

// ✅ AQUÍ VA uiText (CORRECTO)
const uiText = {
  es: {
    badge: 'Testimonios reales',
    title: 'Historias de transformación real',
    subtitle: 'Personas que ya han transformado su vida desde dentro.',
    testimonialsSubtitle: 'Contenido emocional profundo · Léelo con presencia',
  },
  en: {
    badge: 'Real testimonials',
    title: 'Real transformation stories',
    subtitle: 'People who have already transformed their lives from within.',
    testimonialsSubtitle: 'Deep emotional content · Read it with presence',
  },
  fr: {
    badge: 'Témoignages réels',
    title: 'Histoires de transformation réelle',
    subtitle: 'Des personnes qui ont déjà transformé leur vie.',
    testimonialsSubtitle: 'Contenu émotionnel profond · Lisez avec présence',
  },
  pt: {
    badge: 'Depoimentos reais',
    title: 'Histórias de transformação real',
    subtitle: 'Pessoas que já transformaram suas vidas.',
    testimonialsSubtitle: 'Conteúdo emocional profundo · Leia com presença',
  },
};

export function Testimonials() {
  const { language } = useLanguage();
  const t = uiText[language as 'es' | 'en' | 'fr' | 'pt'] || uiText.es;

  const testimonials = getTestimonialsByLanguage(language);
  const hasTestimonials = testimonials.length > 0;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!hasTestimonials) return;
    startAutoPlay();
    return stopAutoPlay;
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
  id="testimonials"
  className="py-20 text-white"
>
      <div className="text-center mb-12">
        <div>{t.badge}</div>
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        <p>{t.testimonialsSubtitle}</p>
      </div>

      <div className={`transition ${fade ? 'opacity-100' : 'opacity-0'}`}>
        <p>"{currentTestimonial.content}"</p>
        <h4>{currentTestimonial.name}</h4>
        <p>{currentTestimonial.role}</p>
      </div>
    </section>
  );
}