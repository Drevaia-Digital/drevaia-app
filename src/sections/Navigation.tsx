import { translations } from '../i18n/translations';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export function Navigation(_: any) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState('top');
  const location = useLocation();

  const navRef = useRef<HTMLDivElement>(null);

  // 🔥 SCROLL SUAVE PRO
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // 🔥 DETECTAR SECCIÓN ACTIVA (SCROLL SPY)
  useEffect(() => {
    const sections = ['top', 'daily', 'testimonials'];

    const handleScroll = () => {
      let current = 'top';

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 120) {
          current = id;
        }
      }

      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 DETECTAR MÓVIL
  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 1024;
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setIsMobile(isSmallScreen || isTouchDevice);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // 🔥 LINK ITEM
  const NavItem = ({
    id,
    label,
  }: {
    id: string;
    label: string;
  }) => {
    const isActive = active === id;

    return (
      <button
        onClick={() => scrollToSection(id)}
        className="relative text-white/80 hover:text-white transition cursor-pointer px-1"
      >
        {label}

        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute left-0 right-0 -bottom-1 h-[2px] bg-amber-400 rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </button>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* LOGO */}
          <button
            onClick={() => scrollToSection('top')}
            className="flex items-center gap-2"
          >
            <Sparkles className="text-amber-400" />
            <span className="text-white font-bold text-lg">Drevaia</span>
          </button>

          {/* DESKTOP */}
          {!isMobile && (
            <div ref={navRef} className="flex items-center gap-6">

              <NavItem id="top" label={t.nav.home} />

              <Link className="text-white/80 hover:text-white transition" to="/library">
                {t.nav.library}
              </Link>

              <NavItem
                id="daily"
                label={
                  language === 'es'
                    ? 'Lectura diaria'
                    : language === 'fr'
                    ? 'Lecture du jour'
                    : language === 'pt'
                    ? 'Leitura diária'
                    : 'Daily reading'
                }
              />

              <NavItem
                id="testimonials"
                label={
                  language === 'es'
                    ? 'Testimonios'
                    : language === 'fr'
                    ? 'Témoignages'
                    : language === 'pt'
                    ? 'Depoimentos'
                    : 'Testimonials'
                }
              />

              <Link className="text-white/80 hover:text-white transition" to="/legal">
                {t.nav.legal}
              </Link>

              {/* IDIOMAS */}
              <div className="flex gap-2 bg-white/10 px-3 py-1 rounded-full">
                {['es','en','fr','pt'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`px-2 py-1 rounded-full text-sm transition ${
                      language === lang
                        ? 'bg-amber-400 text-black'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* MOBILE BUTTON */}
          {isMobile && (
            <button
              className="flex flex-col items-center text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}

              <span className="text-xs mt-1 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent font-semibold">
                {language === 'es' && "Menú"}
                {language === 'en' && "Menu"}
                {language === 'fr' && "Menu"}
                {language === 'pt' && "Menu"}
              </span>
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-16 left-0 w-full backdrop-blur-xl bg-black/60 border-t border-white/10 px-6 py-6 space-y-6 z-40"
        >

          <button onClick={() => scrollToSection('top')} className="block text-white text-lg">
            {t.nav.home}
          </button>

          <Link to="/library" className="block text-white text-lg">
            {t.nav.library}
          </Link>

          <button onClick={() => scrollToSection('daily')} className="block text-white text-lg">
            {language === 'es' ? 'Lectura diaria' : 'Daily reading'}
          </button>

          <button onClick={() => scrollToSection('testimonials')} className="block text-white text-lg">
            {language === 'es' ? 'Testimonios' : 'Testimonials'}
          </button>

        </motion.div>
      )}
    </>
  );
}