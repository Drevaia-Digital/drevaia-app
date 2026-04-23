import { translations } from '../i18n/translations';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { getUserHistory } from "@/lib/userHistory";

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const hasHistory = getUserHistory().length > 0;

  // 🔥 SCROLL SIMPLE
  
  // 🔥 HOME
  const goToHome = () => {
    navigate("/");
  };

  // 📱 DETECTAR MÓVIL
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

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* LOGO */}
          <button onClick={goToHome} className="flex items-center gap-2">
            <Sparkles className="text-amber-400" />
            <span className="text-white font-bold text-lg">Drevaia</span>
          </button>

          {/* DESKTOP */}
          {!isMobile && (
            <div className="flex items-center gap-6">

              {/* INICIO */}
              <button onClick={() => navigate("/")} className="text-white/80 hover:text-white">
                {language === "es" && "Inicio"}
                {language === "en" && "Start"}
                {language === "fr" && "Accueil"}
                {language === "pt" && "Início"}
              </button>

              {/* LIBRARY */}
              <Link to="/library" className="text-white/80 hover:text-white">
                {t.nav.library}
              </Link>

              {/* PORTAL (APUNTA A HOME) */}
              <button onClick={() => navigate("/")} className="text-white/80 hover:text-white relative">
                {language === "es" && "Portal"}
                {language === "en" && "Portal"}
                {language === "fr" && "Portail"}
                {language === "pt" && "Portal"}

                {hasHistory && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 bg-purple-400 rounded-full"></span>
                )}
              </button>

              {/* 🔥 SIMPLIFICADO (SIN SCROLL ROTO) */}
              <button onClick={() => navigate("/library")} className="text-white/80 hover:text-white">
                {language === 'es' ? 'Lectura diaria' : 'Daily reading'}
              </button>

              <button onClick={() => navigate("/library")} className="text-white/80 hover:text-white">
                {language === 'es' ? 'Testimonios' : 'Testimonials'}
              </button>

              {/* LEGAL */}
              <Link to="/legal" className="text-white/80 hover:text-white">
                {t.nav.legal}
              </Link>

              {/* IDIOMA */}
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
              className="flex flex-col items-center justify-center text-neutral-400 hover:text-white"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
              <span className="text-[10px] mt-1">
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

          <button onClick={() => { navigate("/"); setOpen(false); }} className="block text-white text-lg">
            Inicio
          </button>

          <Link to="/library" className="block text-white text-lg" onClick={() => setOpen(false)}>
            {t.nav.library}
          </Link>

          <button onClick={() => { navigate("/"); setOpen(false); }} className="block text-white text-lg">
            Portal
          </button>

          <button onClick={() => { navigate("/library"); setOpen(false); }} className="block text-white text-lg">
            Lectura diaria
          </button>

          <button onClick={() => { navigate("/library"); setOpen(false); }} className="block text-white text-lg">
            Testimonios
          </button>

          <Link to="/legal" className="block text-white text-lg" onClick={() => setOpen(false)}>
            {t.nav.legal}
          </Link>

          <div className="flex gap-2 mt-4">
            {['es','en','fr','pt'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as any);
                  setOpen(false);
                  navigate("/");
                }}
                className={`text-xs px-3 py-1 rounded-lg ${
                  language === lang
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

        </motion.div>
      )}
    </>
  );
}