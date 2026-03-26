import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navigation(_: any) {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Scroll navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar móvil correctamente
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

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

return (
  <nav
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-purple-900/90 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}
  >
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
            Inicio
          </Link>

          <Link className="text-white/80 hover:text-white transition" to="/library">
            Biblioteca
          </Link>

          <Link className="text-white/80 hover:text-white transition" to="/legal">
            Legal
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
          className="text-white z-50"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      )}

    </div>

    {/* MOBILE MENU */}
    {open && isMobile && (
      <div className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-purple-900/95 backdrop-blur-md px-6 py-6 space-y-6 overflow-y-auto z-40">

        <Link to="/" className="block text-white text-lg">
          Inicio
        </Link>

        <Link to="/library" className="block text-white text-lg">
          Biblioteca
        </Link>

        <div>
          <p className="text-white/60 text-sm mb-2">Legal</p>

          <Link to="/legal/privacy" className="block text-white text-lg">
            Privacidad
          </Link>

          <Link to="/legal/cookies" className="block text-white text-lg">
            Cookies
          </Link>

          <Link to="/legal/refunds" className="block text-white text-lg">
            Reembolsos
          </Link>
        </div>

        {/* IDIOMAS */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-white/60 text-sm mb-2">Idioma</p>

          <div className="flex gap-2">
            {['es','en','fr','pt'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
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
  </nav>
);
}