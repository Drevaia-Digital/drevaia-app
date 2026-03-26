import { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  // ✨ PARTÍCULAS
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let particles: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,215,150,0.5)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌌 FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 via-purple-800/50 to-purple-900/90" />
      </div>

      {/* ✨ PARTICULAS */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* 🧠 CONTENIDO */}
      <div ref={contentRef} className="relative z-10 text-center max-w-4xl px-4">

        <div ref={badgeRef} className="mb-6 text-amber-300 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Transformación emocional</span>
        </div>

        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-6">
          DREVAIA <span className="text-amber-300">DIGITAL</span>
        </h1>

        <p ref={descRef} className="text-white/80 mb-10 text-lg">
          Tu santuario digital para sanar, crecer y transformar tu vida.
        </p>

        {/* 🔥 BOTONES CORREGIDOS */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >

          <Link to="/auth/register">
  <Button className="bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 rounded-full text-white hover:scale-105 transition">
    <Heart className="mr-2" />
    Comenzar ahora
  </Button>
</Link>

          <Link to="/library">
  <Button className="group bg-gradient-to-r from-purple-600 to-amber-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
    Explorar ebooks
    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
  </Button>
</Link>

        </div>

      </div>
    </section>
  );
}