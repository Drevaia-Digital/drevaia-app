import { translations } from '../i18n/translations';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export function Navigation(_: any) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 SCROLL PRO (solo cuando estás en home)
  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop,
      behavior: 'auto',
    });

    // micro feedback visual
    el.style.transform = 'scale(0.98)';
    el.style.transition = 'transform 0.18s ease-out';

    setTimeout(() => {
      el.style.transform = 'scale(1)';
    }, 120);
  };

  // 🔥 NAVEGACIÓN INTELIGENTE (CLAVE)
  const goToHomeSmart = () => {
  if (location.pathname === "/landing") {
    scrollToSection('top');
  } else {
    navigate('/landing');
  }
};

  const goToSectionSmart = (section: string) => {
    if (location.pathname === "/") {
      scrollToSection(section);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(section);
      }, 50);
    }
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
            onClick={goToHomeSmart}
            className="flex items-center gap-2"
          >
            <Sparkles className="text-amber-400" />
            <span className="text-white font-bold text-lg">Drevaia</span>
          </button>

          {/* DESKTOP */}
          {!isMobile && (
            <div className="flex items-center gap-6">

              <button onClick={goToHomeSmart} className="text-white/80 hover:text-white">
                {t.nav.home}
              </button>

              <Link to="/library" className="text-white/80 hover:text-white">
                {t.nav.library}
              </Link>

              <button onClick={() => goToSectionSmart('daily')} className="text-white/80 hover:text-white">
                {language === 'es' ? 'Lectura diaria' : 'Daily reading'}
              </button>

              <button onClick={() => goToSectionSmart('testimonials')} className="text-white/80 hover:text-white">
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
            <button
              onClick={() => setOpen(prev => !prev)}
              className="flex flex-col items-center justify-center text-neutral-400 hover:text-white transition-all duration-200"
            >
              <div className="flex items-center justify-center h-6">
                {open ? <X size={24} /> : <Menu size={24} />}
              </div>

              <span className="text-[10px] mt-1 leading-none">
                {open ? "Cerrar" : "Menú"}
              </span>
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
              goToHomeSmart();
              setOpen(false);
            }}
            className="block text-white text-lg"
          >
            {t.nav.home}
          </button>

          <div className="flex items-center gap-2 mt-4">

  {/* ES */}
  <button
    onClick={() => {
      setLanguage("es");
      setOpen(false);
      goToHomeSmart();
    }}
    className={`text-xs px-3 py-1 rounded-lg transition ${
      language === "es"
        ? "bg-purple-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    ES
  </button>

  {/* EN */}
  <button
    onClick={() => {
      setLanguage("en");
      setOpen(false);
      goToHomeSmart();
    }}
    className={`text-xs px-3 py-1 rounded-lg transition ${
      language === "en"
        ? "bg-purple-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    EN
  </button>

  {/* FR */}
  <button
    onClick={() => {
      setLanguage("fr");
      setOpen(false);
      goToHomeSmart();
    }}
    className={`text-xs px-3 py-1 rounded-lg transition ${
      language === "fr"
        ? "bg-purple-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    FR
  </button>

  {/* PT */}
  <button
    onClick={() => {
      setLanguage("pt");
      setOpen(false);
      goToHomeSmart();
    }}
    className={`text-xs px-3 py-1 rounded-lg transition ${
      language === "pt"
        ? "bg-purple-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    PT
  </button>

</div>

          <Link
            to="/library"
            className="block text-white text-lg"
            onClick={() => setOpen(false)}
          >
            {t.nav.library}
          </Link>

          <button
            onClick={() => {
              goToSectionSmart('daily');
              setOpen(false);
            }}
            className="block text-white text-lg"
          >
            {language === 'es' ? 'Lectura diaria' : 'Daily reading'}
          </button>

          <button
            onClick={() => {
              goToSectionSmart('testimonials');
              setOpen(false);
            }}
            className="block text-white text-lg"
          >
            {language === 'es' ? 'Testimonios' : 'Testimonials'}
          </button>

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