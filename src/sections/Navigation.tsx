import { translations } from '../i18n/translations';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export function Navigation(_: any) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // 🔥 SCROLL PRO: instantáneo + sensación premium
const scrollToSection = (id: string) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  // salto inmediato
  window.scrollTo({
    top: el.offsetTop,
    behavior: 'auto',
  });

  // micro feedback visual (no rompe nada)
  el.style.transform = 'scale(0.98)';
  el.style.transition = 'transform 0.18s ease-out';

  setTimeout(() => {
    el.style.transform = 'scale(1)';
  }, 120);
};

  // Detectar móvil
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

  // Cerrar menú al cambiar ruta
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f1a] border-b border-white/10">
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
            <div className="flex items-center gap-6">

              <button onClick={() => scrollToSection('top')} className="text-white/80 hover:text-white">
                {t.nav.home}
              </button>

              <Link to="/library" className="text-white/80 hover:text-white">
                {t.nav.library}
              </Link>

              <button onClick={() => scrollToSection('daily')} className="text-white/80 hover:text-white">
                {language === 'es' ? 'Lectura diaria' : 'Daily reading'}
              </button>

              <button onClick={() => scrollToSection('testimonials')} className="text-white/80 hover:text-white">
                {language === 'es' ? 'Testimonios' : 'Testimonials'}
              </button>

              <Link to="/legal" className="text-white/80 hover:text-white">
                {t.nav.legal}
              </Link>

              <div className="flex gap-2 bg-white/10 px-3 py-1 rounded-full">
                {['es','en','fr','pt'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`px-2 py-1 rounded-full ${
                      language === lang
                        ? 'bg-amber-400 text-black'
                        : 'text-white/70'
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
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}

        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-16 left-0 w-full bg-black/80 backdrop-blur-xl px-6 py-6 space-y-6 z-40"
        >

          <button
            onClick={() => {
              scrollToSection('top');
              setOpen(false); // 🔥 CERRAR
            }}
            className="block text-white text-lg"
          >
            {t.nav.home}
          </button>

          <Link
            to="/library"
            className="block text-white text-lg"
            onClick={() => setOpen(false)}
          >
            {t.nav.library}
          </Link>

          <button
            onClick={() => {
              scrollToSection('daily');
              setOpen(false);
            }}
            className="block text-white text-lg"
          >
            {language === 'es' ? 'Lectura diaria' : 'Daily reading'}
          </button>

          <button
            onClick={() => {
              scrollToSection('testimonials');
              setOpen(false);
            }}
            className="block text-white text-lg"
          >
            {language === 'es' ? 'Testimonios' : 'Testimonials'}
          </button>

          {/* 🔥 LEGAL RESTAURADO */}
          <Link
            to="/legal"
            className="block text-white text-lg"
            onClick={() => setOpen(false)}
          >
            {t.nav.legal}
          </Link>

        </motion.div>
      )}
    </>
  );
}