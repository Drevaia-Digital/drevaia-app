import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navigation(_: any) {
  const { setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

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
        ? 'bg-white/80 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="text-purple-600" />
          <span className="font-bold text-lg">Drevaia</span>
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-6">

          <Link to="/">Inicio</Link>
          <Link to="/library">Biblioteca</Link>

          {/* 🌍 IDIOMA REAL */}
          <div className="flex gap-2 ml-4">
            <button onClick={() => setLanguage('es')}>🇪🇸</button>
            <button onClick={() => setLanguage('en')}>🇬🇧</button>
            <button onClick={() => setLanguage('fr')}>🇫🇷</button>
            <button onClick={() => setLanguage('pt')}>🇧🇷</button>
          </div>

        </div>

      </div>
    </nav>
  );
}