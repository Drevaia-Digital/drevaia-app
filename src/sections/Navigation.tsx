import { translations } from '../i18n/translations';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🔥 navegación normal
  const go = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // 🔥 scroll inteligente (funciona incluso si vienes de otra página)
  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;

        window.scrollTo({
          top: el.offsetTop - 80,
          behavior: "smooth",
        });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (!el) return;

      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[9999] 
        bg-[#0f0f1a]/80 backdrop-blur-xl 
        border-b border-white/10 shadow-lg">

        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* LOGO */}
          <button onClick={() => go("/")} className="flex items-center gap-2">
            <Sparkles className="text-amber-400" />
            <span className="text-white font-bold text-lg">Drevaia</span>
          </button>

          {/* DESKTOP */}
          {!isMobile && (
            <div className="flex items-center gap-6 text-sm font-medium">

              <button
                onClick={() => go("/")}
                className="text-white hover:text-amber-300 transition"
              >
                {language === "es" && "Inicio"}
                {language === "en" && "Start"}
                {language === "fr" && "Accueil"}
                {language === "pt" && "Início"}
              </button>

              <Link
                to="/library"
                className="text-white hover:text-amber-300 transition"
              >
                {t.nav.library}
              </Link>

              <button
                onClick={() => go("/portal")}
                className="text-white hover:text-amber-300 transition"
              >
                {language === "es" && "Portal"}
                {language === "en" && "Portal"}
                {language === "fr" && "Portail"}
                {language === "pt" && "Portal"}
              </button>

              <button
                onClick={() => scrollTo("daily")}
                className="text-white hover:text-amber-300 transition"
              >
                {language === "es" ? "Lectura diaria" : "Daily reading"}
              </button>

              <button
                onClick={() => scrollTo("testimonials")}
                className="text-white hover:text-amber-300 transition"
              >
                {language === "es" ? "Testimonios" : "Testimonials"}
              </button>

              <Link
                to="/legal"
                className="text-white hover:text-amber-300 transition"
              >
                {t.nav.legal}
              </Link>

              {/* IDIOMA */}
              <div className="flex gap-2 ml-2 bg-white/10 px-2 py-1 rounded-full">
                {['es','en','fr','pt'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={`px-2 py-1 rounded-full text-xs transition ${
                      language === lang
                        ? 'bg-amber-400 text-black'
                        : 'text-white hover:text-amber-300'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* MOBILE */}
          {isMobile && (
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <X /> : <Menu />}
            </button>
          )}

        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-16 left-0 w-full 
            bg-[#0f0f1a]/95 backdrop-blur-xl 
            p-6 z-[9998] space-y-4 text-white"
        >

          <button onClick={() => { go("/"); setOpen(false); }}>
            Inicio
          </button>

          <button onClick={() => { go("/portal"); setOpen(false); }}>
            Portal
          </button>

          <button onClick={() => { go("/library"); setOpen(false); }}>
            {t.nav.library}
          </button>

          <button onClick={() => { scrollTo("daily"); setOpen(false); }}>
            Lectura diaria
          </button>

          <button onClick={() => { scrollTo("testimonials"); setOpen(false); }}>
            Testimonios
          </button>

          <Link to="/legal" onClick={() => setOpen(false)}>
            {t.nav.legal}
          </Link>

          <div className="flex gap-2 mt-4">
            {['es','en','fr','pt'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as any);
                  setOpen(false);
                }}
                className={`px-3 py-1 rounded ${
                  language === lang
                    ? 'bg-amber-400 text-black'
                    : 'bg-white/10 text-white'
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