
import { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

interface HeroProps {}

export function Hero({}: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // 🎬 Animaciones
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
        .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(buttonsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-purple-900 text-center px-4">
      
      <div ref={contentRef}>
        
        {/* ✨ BADGE */}
        <div
          ref={badgeRef}
          className="mb-6 text-amber-300 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Transformación emocional</span>
        </div>

        {/* 🧠 TÍTULO */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          DREVAIA DIGITAL
        </h1>

        {/* 💬 DESCRIPCIÓN */}
        <p
          ref={descRef}
          className="text-white/80 max-w-xl mx-auto mb-8 text-lg"
        >
          Tu santuario digital para sanar, crecer y transformar tu vida.
        </p>

        {/* 🔥 BOTONES */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >

          {/* CTA PRINCIPAL */}
          <Link to="/library">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full">
              <Heart className="w-5 h-5 mr-2" />
              Comenzar ahora
            </Button>
          </Link>

          {/* CTA SECUNDARIO */}
          <Link to="/library">
            <Button className="bg-white/20 border border-white/40 text-white px-6 py-3 rounded-full backdrop-blur-md hover:bg-white/10 transition">
              Explorar ebooks
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

        </div>

      </div>

    </section>
  );
}