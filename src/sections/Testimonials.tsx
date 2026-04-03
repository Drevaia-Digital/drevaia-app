import { useLanguage } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

// ===== TESTIMONIOS =====

const testimonialsES: Testimonial[] = [
  { id: 1, name: 'María González', role: 'Emprendedora Digital', content: 'Los eBooks de Drevaia Digital transformaron completamente mi forma de ver el marketing.' },
  { id: 2, name: 'Lucas Silva', role: 'Coach de Vida', content: 'Cada libro tiene una profundidad que realmente toca el alma.' },
  { id: 3, name: 'Sophie Martin', role: 'Consultora SEO', content: 'La combinación de SEO + IA es brillante. Me ayudó muchísimo.' },
  { id: 4, name: 'Emma Thompson', role: 'Content Creator', content: 'Me abrió los ojos al poder de la conexión emocional.' },
  { id: 5, name: 'Carlos Mendoza', role: 'Psicólogo', content: 'Una obra profunda que realmente transforma.' },
];

const testimonialsEN: Testimonial[] = [
  { id: 1, name: 'Emily Carter', role: 'Digital Entrepreneur', content: 'Drevaia Digital completely changed how I see marketing.' },
  { id: 2, name: 'James Walker', role: 'Life Coach', content: 'Each book has a depth that truly touches the soul.' },
  { id: 3, name: 'Sophie Martin', role: 'SEO Consultant', content: 'The SEO + AI combination is brilliant. It helped me a lot.' },
  { id: 4, name: 'Emma Thompson', role: 'Content Creator', content: 'It opened my eyes to the power of emotional connection.' },
  { id: 5, name: 'Carlos Mendoza', role: 'Psychologist', content: 'A deep work that truly transforms.' },
];

const testimonialsFR = testimonialsEN;
const testimonialsPT = testimonialsEN;

const getTestimonialsByLanguage = (language: string): Testimonial[] => {
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
    small: 'Contenido emocional profundo · Léelo con presencia',
  },
  en: {
    badge: 'Real testimonials',
    title: 'Real transformation stories',
    subtitle: 'People who have transformed their lives from within.',
    small: 'Deep emotional content · Read with presence',
  },
  fr: {
    badge: 'Témoignages réels',
    title: 'Histoires de transformation réelle',
    subtitle: 'Des personnes qui ont transformé leur vie.',
    small: 'Contenu émotionnel profond',
  },
  pt: {
    badge: 'Depoimentos reais',
    title: 'Histórias de transformação real',
    subtitle: 'Pessoas que transformaram suas vidas.',
    small: 'Conteúdo emocional profundo',
  },
};

export function Testimonials() {
  const { language } = useLanguage();
  const t = uiText[language as 'es' | 'en' | 'fr' | 'pt'] || uiText.es;

  const testimonials = getTestimonialsByLanguage(language);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[index];

  if (!current) return null; // 🔥 evita crash

  return (
    <section
  id="testimonials"
  className="py-20 bg-gray-900 text-white"
>
      <div className="text-center mb-12">
        <div className="text-amber-400 font-semibold">{t.badge}</div>
        <h2 className="text-3xl font-bold mt-2">{t.title}</h2>
        <p className="text-gray-400 mt-2">{t.subtitle}</p>
        <p className="text-gray-500 text-sm mt-2">{t.small}</p>
      </div>

      <div className="text-center max-w-xl mx-auto">
        <p className="italic mb-4">"{current.content}"</p>
        <h4 className="font-semibold">{current.name}</h4>
        <p className="text-sm opacity-70">{current.role}</p>
      </div>
    </section>
  );
}