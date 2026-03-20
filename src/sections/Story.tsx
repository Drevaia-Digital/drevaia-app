import { useEffect, useRef } from 'react';
import { Heart, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Translations } from '@/i18n';

gsap.registerPlugin(ScrollTrigger);

interface StoryProps {
  t: Translations;
}

export function Story({ t }: StoryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.story-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div ref={contentRef} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="story-text text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Heart className="w-4 h-4 text-amber-300" />
            <span className="text-sm text-white/90">{t.story.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.story.title}
            <br />
            <span className="text-amber-300">{t.story.titleHighlight}</span>
          </h2>
        </div>

        {/* Quote Mark */}
        <div className="story-text flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Quote className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Story Content */}
        <div className="space-y-6 text-lg md:text-xl text-white/90 leading-relaxed">
          <p className="story-text">
            {t.story.p1}
            <span className="text-amber-300 font-semibold">{t.story.p1Highlight}</span>
          </p>

          <p className="story-text">
            {t.story.p2}{' '}
            <em className="text-white italic">{t.story.p2Quote}</em>
          </p>

          <p className="story-text text-2xl md:text-3xl font-light text-center py-6">
            <span className="text-amber-300">{t.story.p3Highlight}</span>
          </p>

          <p className="story-text">
            {t.story.p4}{' '}
            <span className="font-semibold">{t.story.p4Highlight}</span>{t.story.p4b}
          </p>

          <p className="story-text">
            {t.story.p5}
            <br />
            <span className="text-amber-300 font-semibold text-xl md:text-2xl">
              {t.story.p5Highlight}
            </span>
          </p>

          <p className="story-text">
            {t.story.p6}
          </p>

          <p className="story-text">
            {t.story.p7}
          </p>

          {/* Three Pillars */}
          <div className="story-text grid md:grid-cols-3 gap-6 py-8">
            {[
              { text: t.story.pillar1, color: 'from-purple-500 to-purple-600' },
              { text: t.story.pillar2, color: 'from-amber-400 to-orange-500' },
              { text: t.story.pillar3, color: 'from-pink-500 to-rose-500' },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform duration-300`}
              >
                <p className="text-white font-medium">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="story-text">
            {t.story.p8}
            <br />
            <span className="text-2xl md:text-3xl font-bold text-amber-300">
              {t.story.p8Highlight}
            </span>
          </p>

          <p className="story-text">
            {t.story.p9}
          </p>

          {/* Closing Statement */}
          <div className="story-text text-center pt-8 pb-4">
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              {t.story.p10}
            </p>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              {t.story.p10Highlight}
              <br />
              <span className="text-white">{t.story.p10b}</span>
            </p>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="story-text flex justify-center mt-12">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}
