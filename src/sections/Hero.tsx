import { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { EnergyTreeBackground } from '@/components/EnergyTreeBackground';

interface HeroProps {}

export function Hero({}: HeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-purple-900">

      {/* 🌳 FONDO ENERGÉTICO */}
      <EnergyTreeBackground />

      {/* ✨ GLOW DREVAIA */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-purple-500 opacity-30 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-amber-400 opacity-20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />
      </div>

      {/* 🧠 CONTENIDO */}
      <div ref={contentRef} className="relative z-10 max-w-3xl">

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
          className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          DREVAIA DIGITAL
        </h1>

        {/* 💬 DESCRIPCIÓN */}
        <p
          ref={descRef}
          className="text-white/80 max-w-xl mx-auto mb-10 text-lg"
        >
          Tu santuario digital para sanar, crecer y transformar tu vida.
        </p>

        {/* 🔥 BOTONES */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >

          {/* CTA PRINCIPAL (REGISTRO) */}
          <Link to="/auth">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
              <Heart className="w-5 h-5 mr-2" />
              Comenzar ahora
            </Button>
          </Link>

          {/* CTA SECUNDARIO */}
          <Link to="/library">
            <Button className="bg-white/20 border border-white/40 text-white px-6 py-3 rounded-full backdrop-blur-md hover:bg-white/10 transition hover:scale-105">
              Explorar ebooks
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

        </div>

      </div>

    </section>
  );
}