import { translations } from '../i18n/translations';
import { useEffect, useRef } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { userProfile } from '@/utils/userProfile';

type Props = {
  language: 'es' | 'en' | 'fr' | 'pt';
};

type Emotion = 'ansiedad' | 'proposito' | 'patrones';

export function Hero({ language }: Props) {

  const t = translations[language];
  const emotion = userProfile.getEmotion() as Emotion | null;

  const emotionalContent = {
    ansiedad: {
      es: "No estás roto. Estás agotado de sostener demasiado.",
      en: "You're not broken. You're exhausted from holding too much.",
      fr: "Tu n'es pas brisé. Tu es épuisé de porter trop.",
      pt: "Você não está quebrado. Está cansado de carregar demais.",
    },
    proposito: {
      es: "No estás perdido. Solo estás desconectado de lo que importa.",
      en: "You're not lost. You're just disconnected from what matters.",
      fr: "Tu n'es pas perdu. Tu es déconnecté de l'essentiel.",
      pt: "Você não está perdido. Está desconectado do que importa.",
    },
    patrones: {
      es: "No es que no avances. Es que repites lo que no has sanado.",
      en: "You're not stuck. You're repeating what hasn't healed.",
      fr: "Tu n'es pas bloqué. Tu répètes ce qui n'a pas guéri.",
      pt: "Você não está travado. Está repetindo o que não curou.",
    },
  };

  const emotionalCTA = {
    ansiedad: { es: "Encontrar calma", en: "Find calm", fr: "Trouver la paix", pt: "Encontrar calma" },
    proposito: { es: "Descubrir mi camino", en: "Find my path", fr: "Trouver mon chemin", pt: "Descobrir meu caminho" },
    patrones: { es: "Romper este ciclo", en: "Break the cycle", fr: "Briser ce cycle", pt: "Quebrar esse ciclo" },
  };

  const emotionalLinks = {
    ansiedad: {
      es: "https://payhip.com/b/Wz0IG",
      en: "https://payhip.com/b/BYviE",
      fr: "https://payhip.com/b/6xTwV",
      pt: "https://payhip.com/b/OWV4T",
    },
    proposito: {
      es: "https://payhip.com/b/kNSQa",
      en: "https://payhip.com/b/CdrP5",
      fr: "https://payhip.com/b/MDdsb",
      pt: "https://payhip.com/b/KGMWi",
    },
    patrones: {
      es: "https://payhip.com/b/Nx0cF",
      en: "https://payhip.com/b/0rjX8",
      fr: "https://payhip.com/b/hBRzA",
      pt: "https://payhip.com/b/kE8hV",
    },
  };

  const dynamicTitle =
    emotion && emotionalContent[emotion]
      ? emotionalContent[emotion][language]
      : t.hero.title;

  const dynamicCTA =
    emotion && emotionalCTA[emotion]
      ? emotionalCTA[emotion][language]
      : t.hero.cta;

  const dynamicLink =
    emotion && emotionalLinks[emotion]
      ? emotionalLinks[emotion][language]
      : null;

  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(descRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(buttonsRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: -Math.random() * 0.3,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 210, 140, 0.6)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-start md:justify-between items-center overflow-hidden pt-24 md:pt-0">

  {/* FONDO NIVEL LEGENDARIO */}
<div className="absolute inset-0 bg-[#090611]" />

{/* imagen base */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
  style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
/>

{/* glow central premium */}
<div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at center, rgba(168,85,247,0.28) 0%, rgba(99,32,182,0.18) 28%, rgba(9,6,17,0) 62%)",
  }}
/>

{/* viñeta elegante */}
<div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

{/* bordes laterales premium */}
<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/25 to-transparent" />
<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/25 to-transparent" />

  {/* ÁRBOL + PARTÍCULAS (AJUSTADO) */}
  <canvas
  ref={canvasRef}
  className="
    absolute inset-0 
    pointer-events-none 
    opacity-90
    md:scale-100
  "
/>

  {/* TEXTO */}

<div ref={contentRef} className="relative z-10 text-center max-w-2xl px-4 mt-44 md:mt-20">    
<h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4">
      DREVAIA DIGITAL
    </h1>

    <p className="text-xl sm:text-2xl md:text-4xl text-amber-300 font-semibold mb-4">
      {dynamicTitle}
    </p>

    <p ref={descRef} className="text-white/80 text-sm sm:text-base">
      {t.hero.description}
    </p>

  </div>

 {/* BOTONES (RESPONSIVO REAL) */}
<div 
  ref={buttonsRef} 
  className="
    absolute bottom-12 left-0 w-full px-6
    flex justify-between items-center
    md:bottom-10 md:left-1/2 md:-translate-x-1/2 md:w-auto md:px-0 md:justify-center md:gap-4
    z-20
  "
>

  {/* IZQUIERDA */}
  {dynamicLink ? (
    <a href={dynamicLink} target="_blank">
      <Button className="bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm sm:text-base rounded-full text-white">
        <Heart className="mr-2" />
        {dynamicCTA}
      </Button>
    </a>
  ) : (
    <Link to="/auth/register">
      <Button className="bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm sm:text-base rounded-full text-white">
        <Heart className="mr-2" />
        {t.hero.cta}
      </Button>
    </Link>
  )}

  {/* DERECHA */}
  <Link to="/library">
    <Button className="bg-gradient-to-r from-purple-600 to-amber-400 text-white px-5 py-3 text-sm sm:text-base rounded-full">
      {t.hero.explore}
      <ArrowRight className="ml-2" />
    </Button>
  </Link>

</div>

</section>
  );
}