import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navigation(_: any) {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-purple-900/80 backdrop-blur-xl shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ✨ LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="text-amber-400 group-hover:rotate-12 transition" />
          <span className="font-bold text-lg text-white tracking-wide">
            Drevaia
          </span>
        </Link>

        {/* 🧭 MENU */}
        <div className="flex items-center gap-8">

          <Link
            to="/"
            className="text-white/80 hover:text-white transition font-medium"
          >
            Inicio
          </Link>

          <Link
            to="/library"
            className="text-white/80 hover:text-white transition font-medium"
          >
            Biblioteca
          </Link>

          {/* 🌍 IDIOMAS */}
          <div className="flex gap-2 ml-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">

            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-full text-sm transition ${
                language === 'es'
                  ? 'bg-amber-400 text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              ES
            </button>

            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-full text-sm transition ${
                language === 'en'
                  ? 'bg-amber-400 text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              EN
            </button>

            <button
              onClick={() => setLanguage('fr')}
              className={`px-2 py-1 rounded-full text-sm transition ${
                language === 'fr'
                  ? 'bg-amber-400 text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              FR
            </button>

            <button
              onClick={() => setLanguage('pt')}
              className={`px-2 py-1 rounded-full text-sm transition ${
                language === 'pt'
                  ? 'bg-amber-400 text-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              PT
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
}