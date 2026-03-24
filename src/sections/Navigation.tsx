import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navigation(props: any) {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 Detectar móvil REAL (MEJORADO)
  useEffect(() => {
    const check = () => {
      const isSmallScreen = window.innerWidth < 1024;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setIsMobile(isSmallScreen || isTouchDevice);
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-purple-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

// force deploy

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="text-amber-400" />
          <span className="text-white font-bold text-lg">Drevaia</span>
        </Link>

        {/* DESKTOP */}
        {!isMobile && (
          <div className="flex items-center gap-6">

            <Link className="text-white/80 hover:text-white" to="/">Inicio</Link>
            <Link className="text-white/80 hover:text-white" to="/library">Biblioteca</Link>

            <div className="flex gap-2 bg-white/10 px-3 py-1 rounded-full">
              {['es','en','fr','pt'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={`px-2 py-1 rounded-full text-sm ${
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

        {/* BOTÓN MOBILE */}
        {isMobile && (
          <button
            className="text-white z-50"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}

      </div>

      {/* MENÚ MOBILE */}
      {open && isMobile && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-purple-900/95 backdrop-blur-md px-6 py-6 space-y-4 overflow-y-auto z-40">

          <Link onClick={() => setOpen(false)} to="/" className="block text-white text-lg">
            Inicio
          </Link>

          <Link onClick={() => setOpen(false)} to="/library" className="block text-white text-lg">
            Biblioteca
          </Link>

          {/* IDIOMAS */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm mb-2">Idioma</p>

            <div className="flex gap-2">
              {['es','en','fr','pt'].map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang as any);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg ${
                    language === lang
                      ? 'bg-amber-400 text-black'
                      : 'bg-white/10 text-white'
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