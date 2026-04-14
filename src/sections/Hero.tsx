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

  // 🌍 EMOCIÓN SEGURA
  const emotion = userProfile.getEmotion() as Emotion | null;

  // 🔥 CONTENIDO EMOCIONAL
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

  // 🔥 CTA
  const emotionalCTA = {
    ansiedad: { es: "Encontrar calma", en: "Find calm", fr: "Trouver la paix", pt: "Encontrar calma" },
    proposito: { es: "Descubrir mi camino", en: "Find my path", fr: "Trouver mon chemin", pt: "Descobrir meu caminho" },
    patrones: { es: "Romper este ciclo", en: "Break the cycle", fr: "Briser ce cycle", pt: "Quebrar esse ciclo" },
  };

  // 🔥 LINKS
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

  // 🔥 DINÁMICOS
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

  // 🎬 ANIMACIONES
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(buttonsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
    }, contentRef);

    return () => ctx.revert();
  }, []);

  // ✨ PARTÍCULAS
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
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
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
        ctx.fillStyle = 'rgba(255, 200, 150, 0.4)';
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-gray-900 to-black" />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.15),transparent_60%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div ref={contentRef} className="relative z-10 text-center max-w-4xl px-4">

        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-4">
          DREVAIA DIGITAL
        </h1>

        <p className="text-2xl md:text-4xl text-amber-300 font-semibold mb-6">
          {dynamicTitle}
        </p>

        <p ref={descRef} className="text-white/80 mb-10 text-lg">
          {t.hero.description}
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">

          {dynamicLink ? (
            <a href={dynamicLink} target="_blank">
              <Button className="bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 rounded-full text-white hover:scale-105 transition">
                <Heart className="mr-2" />
                {dynamicCTA}
              </Button>
            </a>
          ) : (
            <Link to="/auth/register">
              <Button className="bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 rounded-full text-white hover:scale-105 transition">
                <Heart className="mr-2" />
                {t.hero.cta}
              </Button>
            </Link>
          )}

          <Link to="/library">
            <Button className="group bg-gradient-to-r from-purple-600 to-amber-400 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all">
              {t.hero.explore}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
            </Button>
          </Link>

        </div>

      </div>
    </section>
  );
}