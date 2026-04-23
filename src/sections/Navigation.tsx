import { translations } from '../i18n/translations';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const go = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f1a] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* LOGO */}
          <button onClick={() => go("/")} className="flex items-center gap-2">
            <Sparkles className="text-amber-400" />
            <span className="text-white font-bold text-lg">Drevaia</span>
          </button>

          {!isMobile && (
            <div className="flex items-center gap-6">

              <button onClick={() => go("/")}>Inicio</button>

              <Link to="/library">{t.nav.library}</Link>

              <button onClick={() => go("/portal")}>Portal</button>

              <button onClick={() => go("/")}>Lectura diaria</button>

              <button onClick={() => go("/")}>Testimonios</button>

              <Link to="/legal">{t.nav.legal}</Link>

              <div className="flex gap-2">
                {['es','en','fr','pt'].map((lang) => (
                  <button key={lang} onClick={() => setLanguage(lang as any)}>
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

            </div>
          )}

          {isMobile && (
            <button onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          )}

        </div>
      </nav>

      {open && isMobile && (
        <motion.div className="fixed top-16 left-0 w-full bg-black p-6 z-40">

          <button onClick={() => go("/")}>Inicio</button>
          <button onClick={() => go("/portal")}>Portal</button>
          <button onClick={() => go("/library")}>Library</button>

        </motion.div>
      )}
    </>
  );
}