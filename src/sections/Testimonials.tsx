import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TestimonialsProps {
  language?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

// Testimonios en español (default)
const testimonialsES: Testimonial[] = [
  {
    id: 1,
    name: 'María González',
    role: 'Emprendedora Digital',
    content: 'Los eBooks de Drevaia Digital transformaron completamente mi forma de ver el marketing. "De Invisible a Referente" me dio las herramientas exactas que necesitaba para posicionar mi marca.',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 2,
    name: 'Lucas Silva',
    role: 'Coach de Vida',
    content: 'La colección en portugués es increíble. Cada libro está escrito con una profundidad que realmente toca el alma. "Liderar Contra la Derrota" cambió mi perspectiva sobre la resiliencia.',
    rating: 5,
    avatar: 'L',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Consultante SEO',
    content: 'Le guide SEO + IA est exactement ce dont j\'avais besoin. La combinaison entre stratégie traditionnelle et intelligence artificielle est brillante. Je recommande vivement !',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Content Creator',
    content: 'The English collection is pure gold. "Sympathy Weighs More" opened my eyes to the true power of emotional connection in business. Drevaia Digital understands the human side of success.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 5,
    name: 'Carlos Mendoza',
    role: 'Psicólogo',
    content: 'Como profesional de la salud mental, valoro profundamente el enfoque terapéutico de los eBooks. "Descubre cómo tus heridas invisibles..." es una obra maestra de introspección.',
    rating: 5,
    avatar: 'C',
  },
];

// Testimonios en portugués
const testimonialsPT: Testimonial[] = [
  {
    id: 1,
    name: 'Ana Souza',
    role: 'Empreendedora Digital',
    content: 'Os eBooks da Drevaia Digital transformaram completamente minha forma de ver o marketing. "Do Invisível para Referência" me deu as ferramentas exatas que eu precisava para posicionar minha marca.',
    rating: 5,
    avatar: 'A',
  },
  {
    id: 2,
    name: 'Pedro Oliveira',
    role: 'Coach de Vida',
    content: 'A coleção é incrível. Cada livro está escrito com uma profundidade que realmente toca a alma. "Liderar Contra a Derrota" mudou minha perspectiva sobre resiliência.',
    rating: 5,
    avatar: 'P',
  },
  {
    id: 3,
    name: 'Marie Dubois',
    role: 'Consultante SEO',
    content: 'Le guide SEO + IA est exactement ce dont j\'avais besoin. La combinaison entre stratégie traditionnelle et intelligence artificielle est brillante.',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    role: 'Content Creator',
    content: 'The English collection is pure gold. "Sympathy Weighs More" opened my eyes to the true power of emotional connection in business.',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 5,
    name: 'João Santos',
    role: 'Psicólogo',
    content: 'Como profissional da saúde mental, valorizo profundamente a abordagem terapêutica dos eBooks. É uma obra-prima de introspecção.',
    rating: 5,
    avatar: 'J',
  },
];

// Testimonios en francés
const testimonialsFR: Testimonial[] = [
  {
    id: 1,
    name: 'Marie Lefebvre',
    role: 'Entrepreneure Digitale',
    content: 'Les eBooks de Drevaia Digital ont complètement transformé ma façon de voir le marketing. "De l\'Invisible à la Référence" m\'a donné les outils exacts dont j\'avais besoin.',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 2,
    name: 'Lucas Ferreira',
    role: 'Coach de Vie',
    content: 'La collection est incroyable. Chaque livre est écrit avec une profondeur qui touche vraiment l\'âme. "Leader Contre la Défaite" a changé ma perspective sur la résilience.',
    rating: 5,
    avatar: 'L',
  },
  {
    id: 3,
    name: 'Sophie Bernard',
    role: 'Consultante SEO',
    content: 'Le guide SEO + IA est exactement ce dont j\'avais besoin. La combinaison entre stratégie traditionnelle et intelligence artificielle est brillante. Je recommande vivement !',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    role: 'Content Creator',
    content: 'The English collection is pure gold. "Sympathy Weighs More" opened my eyes to the true power of emotional connection in business.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 5,
    name: 'Pierre Martin',
    role: 'Psychologue',
    content: 'En tant que professionnel de la santé mentale, j\'apprécie profondément l\'approche thérapeutique des eBooks. C\'est un chef-d\'œuvre d\'introspection.',
    rating: 5,
    avatar: 'P',
  },
];

// Testimonios en inglés
const testimonialsEN: Testimonial[] = [
  {
    id: 1,
    name: 'Maria Gonzalez',
    role: 'Digital Entrepreneur',
    content: 'Drevaia Digital\'s eBooks completely transformed my view of marketing. "From Invisible to Authority" gave me the exact tools I needed to position my brand.',
    rating: 5,
    avatar: 'M',
  },
  {
    id: 2,
    name: 'Lucas Silva',
    role: 'Life Coach',
    content: 'The collection is incredible. Each book is written with a depth that truly touches the soul. "Leading Against Defeat" changed my perspective on resilience.',
    rating: 5,
    avatar: 'L',
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'SEO Consultant',
    content: 'The SEO + AI guide is exactly what I needed. The combination between traditional strategy and artificial intelligence is brilliant. Highly recommend!',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    role: 'Content Creator',
    content: 'The English collection is pure gold. "Sympathy Weighs More" opened my eyes to the true power of emotional connection in business.',
    rating: 5,
    avatar: 'E',
  },
  {
    id: 5,
    name: 'Charles Mendoza',
    role: 'Psychologist',
    content: 'As a mental health professional, I deeply value the therapeutic approach of the eBooks. It\'s a masterpiece of introspection.',
    rating: 5,
    avatar: 'C',
  },
];

const getTestimonialsByLanguage = (language: string): Testimonial[] => {
  switch (language) {
    case 'pt':
      return testimonialsPT;
    case 'fr':
      return testimonialsFR;
    case 'en':
      return testimonialsEN;
    default:
      return testimonialsES;
  }
};

export function Testimonials({ language = 'es' }: TestimonialsProps) {
  const uiText = {
  es: {
    badge: '{t.badge}',
    title: '{t.title}',
    subtitle: '{t.subtitle}',
    stats: [
      'Lectores impactados',
      'Ebooks creados',
      'Idiomas disponibles',
      'Satisfacción',
    ],
  },
  en: {
    badge: 'Real testimonials',
    title: 'Real transformation stories',
    subtitle: 'People who have already transformed their lives from within.',
    stats: [
      'Readers impacted',
      'Ebooks created',
      'Languages available',
      'Satisfaction',
    ],
  },
  fr: {
    badge: 'Témoignages réels',
    title: 'Histoires de transformation réelle',
    subtitle: 'Des personnes qui ont déjà transformé leur vie de l’intérieur.',
    stats: [
      'Lecteurs impactés',
      'Ebooks créés',
      'Langues disponibles',
      'Satisfaction',
    ],
  },
  pt: {
    badge: 'Depoimentos reais',
    title: 'Histórias de transformação real',
    subtitle: 'Pessoas que já transformaram suas vidas de dentro para fora.',
    stats: [
      'Leitores impactados',
      'Ebooks criados',
      'Idiomas disponíveis',
      'Satisfação',
    ],
  },
};

const t = uiText[language as 'es' | 'en' | 'fr' | 'pt'];

  // Get current language from document
    const testimonials = getTestimonialsByLanguage(language);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
  <section id="testimonials" className="relative py-20 md:py-28 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">

    {/* Background */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-300 text-sm font-medium mb-6">
          <Star className="w-4 h-4 fill-amber-500" />
          Testimonios reales
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Historias de transformación real
        </h2>

        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Personas que ya han transformado su vida desde dentro.
        </p>
      </div>

      {/* Testimonial Card */}
      <div className="relative max-w-4xl mx-auto">

        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-purple-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg z-10">
          <Quote className="w-6 h-6 text-white" />
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-xl border border-white/10 p-8 md:p-12 pt-14">

          <div className="flex justify-center gap-1 mb-6">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <blockquote className="text-center mb-8">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
              "{currentTestimonial.content}"
            </p>
          </blockquote>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-amber-400 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3 shadow-lg">
              {currentTestimonial.avatar}
            </div>

            <h4 className="text-lg font-semibold text-white">
              {currentTestimonial.name}
            </h4>

            <p className="text-sm text-purple-400">
              {currentTestimonial.role}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full border-white/10 hover:bg-white/5"
          >
            <ChevronLeft className="w-5 h-5 text-white/70" />
          </Button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  stopAutoPlay();
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-purple-500 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full border-white/10 hover:bg-white/5"
          >
            <ChevronRight className="w-5 h-5 text-white/70" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        {[
  { value: '10K+', label: t.stats[0] },
  { value: '24', label: t.stats[1] },
  { value: '4', label: t.stats[2] },
  { value: '98%', label: t.stats[3] },
].map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10"
          >
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>

            <div className="text-sm text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

    </div>
 </section>
);
}
