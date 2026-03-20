import { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import type { Translations } from '@/i18n';

interface HeroProps {
  t: Translations;
}

export function Hero({ t }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for staggered entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(50, Math.floor(window.innerWidth / 30));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx2d.beginPath();
        ctx2d.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx2d.fillStyle = `rgba(255, 215, 150, ${particle.opacity})`;
        ctx2d.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-purple-900/80" />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span className="text-sm text-white/90">{t.hero.subtitle}</span>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {t.hero.title.split(' ').map((word: string, i: number) => (
            <span key={i} className={i >= 3 ? 'text-amber-300' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p ref={descRef} className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t.hero.description}
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => scrollToSection('register')}
            size="lg"
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" />
            {t.hero.cta}
          </Button>
          <Button
            onClick={() => scrollToSection('ebooks')}
            size="lg"
            className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/30 px-8 py-6 text-lg rounded-full shadow-lg"
          >
            {t.hero.ctaSecondary}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-700" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
