import { translations } from '../i18n/translations';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navigation(_: any) {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="text-amber-400" />
            <span className="text-white font-bold text-lg">Drevaia</span>
          </Link>

          {/* DESKTOP */}
          {!isMobile && (
            <div className="flex items-center gap-6">

              <Link className="text-white/80 hover:text-white transition" to="/">
                {t.nav.home}
              </Link>

              <Link className="text-white/80 hover:text-white transition" to="/library">
                {t.nav.library}
              </Link>

              {/* LECTURA DEL DÍA */}
              <a href="#daily" className="text-white/80 hover:text-white transition">
                {language === 'es'
                  ? 'Lectura'
                  : language === 'fr'
                  ? 'Lecture'
                  : language === 'pt'
                  ? 'Leitura'
                  : 'Reading'}
              </a>

              {/* TESTIMONIOS */}
              <a href="#testimonials" className="text-white/80 hover:text-white transition">
                {language === 'es'
                  ? 'Testimonios'
                  : language === 'fr'
                  ? 'Témoignages'
                  : language === 'pt'
                  ? 'Depoimentos'
                  : 'Testimonials'}
              </a>

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
        <div className="fixed top-16 left-0 w-full backdrop-blur-xl bg-black/60 border-t border-white/10 px-6 py-6 space-y-6 z-40 animate-fadeIn">

          <Link to="/" className="block text-white text-lg">
            {t.nav.home}
          </Link>

          <Link to="/library" className="block text-white text-lg">
            {t.nav.library}
          </Link>

          {/* LECTURA */}
          <a
            href="#daily"
            onClick={() => setOpen(false)}
            className="block text-white text-lg"
          >
            {language === 'es'
              ? 'Lectura'
              : language === 'fr'
              ? 'Lecture'
              : language === 'pt'
              ? 'Leitura'
              : 'Reading'}
          </a>

          {/* TESTIMONIOS */}
          <a
            href="#testimonials"
            onClick={() => setOpen(false)}
            className="block text-white text-lg"
          >
            {language === 'es'
              ? 'Testimonios'
              : language === 'fr'
              ? 'Témoignages'
              : language === 'pt'
              ? 'Depoimentos'
              : 'Testimonials'}
          </a>

          <div>
            <p className="text-white/60 text-sm mb-2">{t.nav.legal}</p>

            <Link to="/legal/privacy" className="block text-white text-lg">
              {t.nav.privacy}
            </Link>

            <Link to="/legal/cookies" className="block text-white text-lg">
              {t.nav.cookies}
            </Link>

            <Link to="/legal/refunds" className="block text-white text-lg">
              {t.nav.refunds}
            </Link>
          </div>

          {/* IDIOMAS */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm mb-2">{t.nav.language}</p>

            <div className="flex gap-2">
              {['es','en','fr','pt'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as any);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg transition ${
                    language === lang
                      ? 'bg-amber-400 text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
}