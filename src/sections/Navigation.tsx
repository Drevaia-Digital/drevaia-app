import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-purple-900/80 backdrop-blur-xl shadow-lg border-b border-white/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="text-amber-400" />
          <span className="font-bold text-white">Drevaia</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">

          <Link className="text-white/80 hover:text-white" to="/">
            Inicio
          </Link>

          <Link className="text-white/80 hover:text-white" to="/library">
            Biblioteca
          </Link>

          {/* IDIOMAS */}
          <div className="flex gap-2 bg-white/10 px-3 py-1 rounded-full">
            {['es', 'en', 'fr', 'pt'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={`px-2 py-1 rounded-full text-sm ${
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

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-purple-900/95 backdrop-blur-xl px-6 py-6 space-y-6">

          <Link onClick={() => setOpen(false)} to="/" className="block text-white">
            Inicio
          </Link>

          <Link onClick={() => setOpen(false)} to="/library" className="block text-white">
            Biblioteca
          </Link>

          {/* IDIOMAS */}
          <div className="flex gap-2 pt-4">
            {['es', 'en', 'fr', 'pt'].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as any);
                  setOpen(false);
                }}
                className={`px-3 py-2 rounded-full ${
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
      )}
    </nav>
  );
}