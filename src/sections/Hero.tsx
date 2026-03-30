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

    const handleResize = () => {
  resize();
  createParticles();
};

window.addEventListener('resize', handleResize);

return () => {
  window.removeEventListener('resize', handleResize);
};
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

           
{/* 🌌 FONDO BASE (SIEMPRE OSCURO) */}
<div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-gray-900 to-black" />

{/* 🌫 TEXTURA (IMAGEN SUAVE) */}
<div
  className="absolute inset-0 bg-cover bg-center opacity-40"
  style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
/>

{/* ✨ AURA (EFECTO PREMIUM) */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)]" />

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
  <Button
    onMouseEnter={async () => {
      if (!localStorage.getItem('books_cache')) {
        try {
          const res = await fetch(
            'https://hkjiqihczalnekzuwjtw.supabase.co/rest/v1/books?select=*',
            {
              headers: {
                apikey: 'sb_publishable_7xUGlgvxEncNPPSO646vsw_LB30RW5Q',
              },
            }
          );

          const data = await res.json();

          const mapped = (data || []).map((book: any) => ({
            ...book,
            coverImage: book.image || "https://via.placeholder.com/300x400",
            buy_url:
              book.buy_url_es ||
              book.buy_url_en ||
              book.buy_url_fr ||
              book.buy_url_pt ||
              ""
          }));

          localStorage.setItem('books_cache', JSON.stringify(mapped));
        } catch (err) {
          console.error('Prefetch error:', err);
        }
      }
    }}
    className="group bg-gradient-to-r from-purple-600 to-amber-400 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
  >
    Explorar ebooks
    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
  </Button>
</Link>

        </div>

      </div>
    </section>
  );
}