import { translations } from '../i18n/translations';
import { useEffect, useRef } from 'react';
import { ArrowRight, Heart, Menu } from 'lucide-react';
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
    <>
      {/* NAVBAR */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
        <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white/80">
              <Menu size={18} />
              <span className="text-xs tracking-widest">MENU</span>
            </div>

            <Link to="/" className="flex items-center gap-3 ml-2">
              <img src="/assets/logo/logo-icon-azul.png" alt="Drevaia" className="h-9 md:h-10 w-auto" />
              <span className="text-white font-semibold tracking-[0.2em] text-sm md:text-base">
                DREVAIA
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 md:pt-28">

        <div className="absolute inset-0 bg-[#090611]" />

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.28) 0%, rgba(99,32,182,0.18) 28%, rgba(9,6,17,0) 62%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-90" />

        <div ref={contentRef} className="relative z-10 text-center max-w-2xl px-4">

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

        <div ref={buttonsRef} className="relative z-20 mt-12 md:mt-16 w-full max-w-2xl px-6 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-5">

          {dynamicLink ? (
            <a href={dynamicLink} target="_blank" rel="noreferrer">
              <Button className="h-14 px-7 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-base shadow-xl hover:scale-105 transition-all duration-300">
                <Heart className="mr-2 h-5 w-5" />
                {dynamicCTA}
              </Button>
            </a>
          ) : (
            <Link to={`/${language}/auth/register`}>
              <Button className="h-14 px-7 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-semibold text-base shadow-xl hover:scale-105 transition-all duration-300">
                <Heart className="mr-2 h-5 w-5" />
                {t.hero.cta}
              </Button>
            </Link>
          )}

          <Link to="/library">
            <Button variant="outline" className="h-14 px-7 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-white font-medium text-base hover:bg-white/15 hover:scale-105 transition-all duration-300">
              {{
                es: "Empieza gratis",
                en: "Start free",
                fr: "Commencer gratuit",
                pt: "Começar grátis"
              }[language]}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

        </div>

      </section>
    </>
  );
}